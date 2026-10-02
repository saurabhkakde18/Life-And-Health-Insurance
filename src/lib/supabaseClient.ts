import { createClient } from '@supabase/supabase-js';

// Supabase Configuration from provided project credentials
export const SUPABASE_PROJECT_ID = 'kfblrdsjbsaciygesjxh';
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_yHcnm-Gy7YfoUvNSIMXpPA_pHQm1_nL';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface AppointmentBookingPayload {
  fullName: string;
  mobileNumber: string;
  email?: string;
  city?: string;
  requirement?: string;
  consultationPreference?: string;
  message?: string;
  source?: 'website_form' | 'modal';
}

export interface AppointmentRecord {
  id: string;
  full_name: string;
  mobile_number: string;
  email?: string;
  city?: string;
  requirement?: string;
  consultation_preference?: string;
  message?: string;
  source?: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  is_local_backup?: boolean;
}

export interface SaveAppointmentResult {
  success: boolean;
  savedToSupabase: boolean;
  error?: string;
  details?: any;
  needsTableSetup?: boolean;
}

const LOCAL_BACKUP_KEY = 'lifeexpress_pending_appointments_backup';
const ADMIN_SLOT_KEY = 'lifeexpress_single_admin_account_slot';
const ADMIN_SESSION_KEY = 'lifeexpress_active_admin_session';

/**
 * SHA-256 password hash utility using browser Web Crypto API
 */
async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText.trim() + '_lifeexpress_secure_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export interface MasterAdminRecord {
  isSlotClaimed: boolean;
  adminEmail: string;
  adminName: string;
  passwordHash: string;
  claimedAt: string;
  lastLoginAt?: string;
}

/**
 * Check if the master admin single slot has already been claimed
 */
export async function checkAdminSlotStatus(): Promise<{
  isSlotClaimed: boolean;
  adminEmail?: string;
  claimedAt?: string;
}> {
  // First check local persistent storage
  try {
    const raw = localStorage.getItem(ADMIN_SLOT_KEY);
    if (raw) {
      const parsed: MasterAdminRecord = JSON.parse(raw);
      if (parsed.isSlotClaimed) {
        return {
          isSlotClaimed: true,
          adminEmail: parsed.adminEmail,
          claimedAt: parsed.claimedAt,
        };
      }
    }
  } catch (err) {
    console.warn('Could not read local admin slot status', err);
  }

  // Also check Supabase 'admin_slot' or 'admin_config' table if exists
  try {
    const { data } = await supabase.from('admin_slot').select('*').limit(1);
    if (data && data.length > 0) {
      const row = data[0];
      // Sync back to localStorage
      localStorage.setItem(
        ADMIN_SLOT_KEY,
        JSON.stringify({
          isSlotClaimed: true,
          adminEmail: row.admin_email,
          adminName: row.admin_name,
          passwordHash: row.password_hash,
          claimedAt: row.created_at,
        })
      );
      return {
        isSlotClaimed: true,
        adminEmail: row.admin_email,
        claimedAt: row.created_at,
      };
    }
  } catch {
    // Table not created or blocked by RLS, proceed with localStorage
  }

  return { isSlotClaimed: false };
}

/**
 * Claim the SINGLE admin slot.
 * If the slot is already claimed, NOBODY else can register.
 */
export async function claimSingleAdminSlot(credentials: {
  email: string;
  name: string;
  password: string;
}): Promise<{ success: boolean; error?: string }> {
  const currentStatus = await checkAdminSlotStatus();
  if (currentStatus.isSlotClaimed) {
    return {
      success: false,
      error: 'The single admin account slot is already claimed. Additional registrations are strictly prohibited.',
    };
  }

  if (!credentials.email.trim() || !credentials.password.trim() || credentials.password.length < 6) {
    return {
      success: false,
      error: 'Please provide a valid email and a password of at least 6 characters.',
    };
  }

  const passwordHash = await hashPassword(credentials.password);
  const now = new Date().toISOString();

  const adminRecord: MasterAdminRecord = {
    isSlotClaimed: true,
    adminEmail: credentials.email.trim().toLowerCase(),
    adminName: credentials.name.trim() || 'Nitin Agrawal (Admin)',
    passwordHash,
    claimedAt: now,
  };

  // 1. Save to persistent local storage
  localStorage.setItem(ADMIN_SLOT_KEY, JSON.stringify(adminRecord));

  // 2. Also attempt saving to Supabase if table exists
  try {
    await supabase.from('admin_slot').insert([
      {
        id: 1,
        admin_email: adminRecord.adminEmail,
        admin_name: adminRecord.adminName,
        password_hash: adminRecord.passwordHash,
        created_at: now,
      },
    ]);
  } catch (err) {
    console.warn('Could not insert admin slot to Supabase table (local fallback used):', err);
  }

  // 3. Automatically log them in upon successful setup
  localStorage.setItem(
    ADMIN_SESSION_KEY,
    JSON.stringify({
      email: adminRecord.adminEmail,
      name: adminRecord.adminName,
      token: `admin_session_${Date.now()}`,
      loginAt: now,
    })
  );

  return { success: true };
}

/**
 * Verify admin login against the single admin credentials
 */
export async function verifyAdminLogin(credentials: {
  email: string;
  password: string;
}): Promise<{ authenticated: boolean; adminName?: string; error?: string }> {
  let storedAdmin: MasterAdminRecord | null = null;

  try {
    const raw = localStorage.getItem(ADMIN_SLOT_KEY);
    if (raw) {
      storedAdmin = JSON.parse(raw);
    }
  } catch (e) {
    console.error(e);
  }

  // Check Supabase if local was empty
  if (!storedAdmin) {
    try {
      const { data } = await supabase.from('admin_slot').select('*').limit(1);
      if (data && data.length > 0) {
        const row = data[0];
        storedAdmin = {
          isSlotClaimed: true,
          adminEmail: row.admin_email,
          adminName: row.admin_name,
          passwordHash: row.password_hash,
          claimedAt: row.created_at,
        };
        localStorage.setItem(ADMIN_SLOT_KEY, JSON.stringify(storedAdmin));
      }
    } catch {
      // ignore
    }
  }

  if (!storedAdmin || !storedAdmin.isSlotClaimed) {
    return {
      authenticated: false,
      error: 'No administrator account has been set up yet. Please complete the initial one-time admin setup slot.',
    };
  }

  if (storedAdmin.adminEmail.toLowerCase() !== credentials.email.trim().toLowerCase()) {
    return {
      authenticated: false,
      error: 'Invalid administrator email address.',
    };
  }

  const inputHash = await hashPassword(credentials.password);
  if (inputHash !== storedAdmin.passwordHash) {
    return {
      authenticated: false,
      error: 'Incorrect administrator password.',
    };
  }

  // Login successful
  const now = new Date().toISOString();
  storedAdmin.lastLoginAt = now;
  localStorage.setItem(ADMIN_SLOT_KEY, JSON.stringify(storedAdmin));

  localStorage.setItem(
    ADMIN_SESSION_KEY,
    JSON.stringify({
      email: storedAdmin.adminEmail,
      name: storedAdmin.adminName,
      token: `admin_session_${Date.now()}`,
      loginAt: now,
    })
  );

  return {
    authenticated: true,
    adminName: storedAdmin.adminName,
  };
}

/**
 * Get active admin session
 */
export function getActiveAdminSession(): {
  email: string;
  name: string;
  loginAt: string;
} | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Terminate active admin session
 */
export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

/**
 * Saves appointment details into Supabase backend table 'appointments'.
 * Also provides a resilient offline local backup so no leads are lost.
 */
export async function saveAppointmentBooking(
  payload: AppointmentBookingPayload
): Promise<SaveAppointmentResult> {
  const timestamp = new Date().toISOString();
  const generatedId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const localRow: AppointmentRecord = {
    id: generatedId,
    full_name: payload.fullName,
    mobile_number: payload.mobileNumber,
    email: payload.email || '',
    city: payload.city || 'Jalna',
    requirement: payload.requirement || 'Life Insurance',
    consultation_preference: payload.consultationPreference || 'In-Office Visit',
    message: payload.message || '',
    source: payload.source || 'website_form',
    status: 'new',
    created_at: timestamp,
    is_local_backup: true,
  };

  // Save to local backup first
  try {
    const existingBackup: AppointmentRecord[] = JSON.parse(
      localStorage.getItem(LOCAL_BACKUP_KEY) || '[]'
    );
    existingBackup.unshift(localRow);
    localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(existingBackup.slice(0, 200)));
  } catch (err) {
    console.warn('Could not write appointment to local backup', err);
  }

  // Row format suitable for Supabase PostgreSQL table
  const rowData = {
    full_name: payload.fullName,
    mobile_number: payload.mobileNumber,
    email: payload.email || '',
    city: payload.city || 'Jalna',
    requirement: payload.requirement || 'Life Insurance',
    consultation_preference: payload.consultationPreference || 'In-Office Visit',
    message: payload.message || '',
    source: payload.source || 'website_form',
    status: 'new',
    created_at: timestamp,
  };

  try {
    // Primary attempt: 'appointments' table
    const { data, error } = await supabase.from('appointments').insert([rowData]).select();

    if (!error) {
      return {
        success: true,
        savedToSupabase: true,
        details: data,
      };
    }

    console.warn('Supabase insert into appointments returned notice:', error);

    // If table doesn't exist in schema cache, try 'consultations' as fallback
    if (error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
      const fallbackResult = await supabase.from('consultations').insert([rowData]).select();
      if (!fallbackResult.error) {
        return {
          success: true,
          savedToSupabase: true,
          details: fallbackResult.data,
        };
      }

      return {
        success: true,
        savedToSupabase: false,
        needsTableSetup: true,
        error: `Supabase table 'appointments' is not yet created in project ${SUPABASE_PROJECT_ID}.`,
      };
    }

    return {
      success: true,
      savedToSupabase: false,
      error: error.message,
    };
  } catch (err: any) {
    console.error('Error connecting to Supabase:', err);
    return {
      success: true,
      savedToSupabase: false,
      error: err?.message || 'Network error while contacting Supabase',
    };
  }
}

/**
 * Fetch all appointments from Supabase (merging with any offline leads)
 */
export async function fetchAllAppointments(): Promise<{
  appointments: AppointmentRecord[];
  isFromSupabase: boolean;
  error?: string;
}> {
  let supabaseRecords: AppointmentRecord[] = [];
  let isFromSupabase = false;
  let supabaseError: string | undefined = undefined;

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      supabaseRecords = data.map((item: any) => ({
        id: item.id?.toString() || Math.random().toString(),
        full_name: item.full_name || item.name || 'Anonymous',
        mobile_number: item.mobile_number || item.mobile || item.phone || '',
        email: item.email || '',
        city: item.city || 'Jalna',
        requirement: item.requirement || 'Life Insurance',
        consultation_preference: item.consultation_preference || item.visit_type || 'In-Office Visit',
        message: item.message || '',
        source: item.source || 'website_form',
        status: (item.status as any) || 'new',
        created_at: item.created_at || new Date().toISOString(),
        is_local_backup: false,
      }));
      isFromSupabase = true;
    } else if (error) {
      supabaseError = error.message;
    }
  } catch (err: any) {
    supabaseError = err?.message;
  }

  // Load local backup records to make sure none are missed
  let localRecords: AppointmentRecord[] = [];
  try {
    localRecords = JSON.parse(localStorage.getItem(LOCAL_BACKUP_KEY) || '[]');
  } catch {
    localRecords = [];
  }

  // Merge unique by mobile and timestamp or ID
  const combinedMap = new Map<string, AppointmentRecord>();

  // Add Supabase rows first
  for (const item of supabaseRecords) {
    const key = `${item.mobile_number}_${item.full_name}_${item.created_at?.substring(0, 16)}`;
    combinedMap.set(key, item);
  }

  // Merge local records if not already in Supabase
  for (const item of localRecords) {
    const key = `${item.mobile_number}_${item.full_name}_${item.created_at?.substring(0, 16)}`;
    if (!combinedMap.has(key)) {
      combinedMap.set(key, item);
    }
  }

  const allAppointments = Array.from(combinedMap.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    appointments: allAppointments,
    isFromSupabase,
    error: supabaseError,
  };
}

/**
 * Update the status of an appointment
 */
export async function updateAppointmentStatus(
  id: string,
  newStatus: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
): Promise<boolean> {
  // Update in local backup
  try {
    const raw = localStorage.getItem(LOCAL_BACKUP_KEY);
    if (raw) {
      const records: AppointmentRecord[] = JSON.parse(raw);
      const updated = records.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
      localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn(e);
  }

  // Update in Supabase
  try {
    await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
  } catch (err) {
    console.warn('Could not update in Supabase:', err);
  }

  return true;
}

/**
 * Delete an appointment booking
 */
export async function deleteAppointmentRecord(id: string): Promise<boolean> {
  // Remove from local backup
  try {
    const raw = localStorage.getItem(LOCAL_BACKUP_KEY);
    if (raw) {
      const records: AppointmentRecord[] = JSON.parse(raw);
      const filtered = records.filter((r) => r.id !== id);
      localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(filtered));
    }
  } catch (e) {
    console.warn(e);
  }

  // Remove from Supabase
  try {
    await supabase.from('appointments').delete().eq('id', id);
  } catch (err) {
    console.warn('Could not delete in Supabase:', err);
  }

  return true;
}
