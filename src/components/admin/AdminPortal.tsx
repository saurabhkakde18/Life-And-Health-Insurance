import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  UserCheck,
  ShieldCheck,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Download,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Database,
  Eye,
  EyeOff,
  Trash2,
  FileSpreadsheet,
  Layers,
  ChevronDown
} from 'lucide-react';
import {
  checkAdminSlotStatus,
  claimSingleAdminSlot,
  verifyAdminLogin,
  getActiveAdminSession,
  logoutAdmin,
  fetchAllAppointments,
  updateAppointmentStatus,
  deleteAppointmentRecord,
  AppointmentRecord,
  SUPABASE_PROJECT_ID
} from '../../lib/supabaseClient';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  // Session & Auth state
  const [isSlotClaimed, setIsSlotClaimed] = useState<boolean>(true);
  const [adminEmailDisplay, setAdminEmailDisplay] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Forms state
  const [authMode, setAuthMode] = useState<'login' | 'setup'>('login');
  const [setupName, setSetupName] = useState('Nitin Agrawal');
  const [setupEmail, setSetupEmail] = useState('');
  const [setupPassword, setSetupPassword] = useState('');
  const [setupConfirmPassword, setSetupConfirmPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  // Bookings Data state
  const [bookings, setBookings] = useState<AppointmentRecord[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [supabaseErrorMsg, setSupabaseErrorMsg] = useState<string | null>(null);

  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [requirementFilter, setRequirementFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<AppointmentRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      initPortal();
    }
  }, [isOpen]);

  const initPortal = async () => {
    setIsLoadingAuth(true);
    setAuthError('');

    // Check if user is already logged in
    const session = getActiveAdminSession();
    if (session) {
      setCurrentUser(session);
      loadBookings();
    }

    // Check single admin slot status
    const slotStatus = await checkAdminSlotStatus();
    setIsSlotClaimed(slotStatus.isSlotClaimed);
    if (slotStatus.adminEmail) {
      setAdminEmailDisplay(slotStatus.adminEmail);
      setLoginEmail(slotStatus.adminEmail);
    }

    if (!slotStatus.isSlotClaimed) {
      setAuthMode('setup');
    } else {
      setAuthMode('login');
    }

    setIsLoadingAuth(false);
  };

  const loadBookings = async () => {
    setIsLoadingBookings(true);
    try {
      const result = await fetchAllAppointments();
      setBookings(result.appointments);
      setSupabaseConnected(result.isFromSupabase);
      setSupabaseErrorMsg(result.error || null);
    } catch (err: any) {
      console.error('Failed to load bookings', err);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  const handleSetupMasterAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!setupEmail.trim()) {
      setAuthError('Please enter a valid administrator email address.');
      return;
    }
    if (setupPassword.length < 6) {
      setAuthError('Master password must be at least 6 characters.');
      return;
    }
    if (setupPassword !== setupConfirmPassword) {
      setAuthError('Passwords do not match. Please verify.');
      return;
    }

    setIsAuthSubmitting(true);
    try {
      const res = await claimSingleAdminSlot({
        name: setupName,
        email: setupEmail,
        password: setupPassword,
      });

      if (!res.success) {
        setAuthError(res.error || 'Failed to claim admin slot.');
        setIsAuthSubmitting(false);
        return;
      }

      // Slot claimed successfully! Automatically logged in
      const session = getActiveAdminSession();
      setCurrentUser(session);
      setIsSlotClaimed(true);
      setAdminEmailDisplay(setupEmail);
      loadBookings();
    } catch (err: any) {
      setAuthError(err.message || 'An error occurred during setup.');
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError('Please enter both administrator email and password.');
      return;
    }

    setIsAuthSubmitting(true);
    try {
      const res = await verifyAdminLogin({
        email: loginEmail,
        password: loginPassword,
      });

      if (!res.authenticated) {
        setAuthError(res.error || 'Invalid administrator credentials.');
        setIsAuthSubmitting(false);
        return;
      }

      const session = getActiveAdminSession();
      setCurrentUser(session);
      loadBookings();
    } catch (err: any) {
      setAuthError(err.message || 'Authentication error.');
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setCurrentUser(null);
    setLoginPassword('');
    setAuthError('');
  };

  const handleStatusChange = async (
    bookingId: string,
    newStatus: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
    await updateAppointmentStatus(bookingId, newStatus);
  };

  const handleDelete = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to remove this appointment record?')) {
      return;
    }
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    if (selectedBooking?.id === bookingId) {
      setSelectedBooking(null);
    }
    await deleteAppointmentRecord(bookingId);
  };

  const exportToCSV = () => {
    if (bookings.length === 0) return;

    const headers = [
      'ID',
      'Date & Time',
      'Customer Name',
      'Mobile Number',
      'Email',
      'City',
      'Requirement',
      'Consultation Mode',
      'Status',
      'Source',
      'Message'
    ];

    const rows = bookings.map((b) => [
      `"${b.id}"`,
      `"${new Date(b.created_at).toLocaleString('en-IN')}"`,
      `"${(b.full_name || '').replace(/"/g, '""')}"`,
      `"${b.mobile_number}"`,
      `"${b.email || ''}"`,
      `"${b.city || ''}"`,
      `"${b.requirement || ''}"`,
      `"${b.consultation_preference || ''}"`,
      `"${b.status}"`,
      `"${b.source || ''}"`,
      `"${(b.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lifeexpress_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      b.full_name?.toLowerCase().includes(query) ||
      b.mobile_number?.includes(query) ||
      b.email?.toLowerCase().includes(query) ||
      b.city?.toLowerCase().includes(query) ||
      b.requirement?.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesRequirement =
      requirementFilter === 'all' || b.requirement?.toLowerCase().includes(requirementFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesRequirement;
  });

  const countNew = bookings.filter((b) => b.status === 'new').length;
  const countInProgress = bookings.filter((b) => b.status === 'in_progress' || b.status === 'contacted').length;
  const countCompleted = bookings.filter((b) => b.status === 'completed').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl w-full max-w-6xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg font-display text-white">
                  LifeExpress Advisor Portal
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  Admin Desk
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Secure management & lead follow-up for client appointment bookings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{currentUser.name}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">{currentUser.email}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portal Body */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          {isLoadingAuth ? (
            <div className="py-24 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
              <p className="text-sm text-slate-600 font-medium">Checking administrator credentials...</p>
            </div>
          ) : !currentUser ? (
            /* =================== AUTHENTICATION SCREENS =================== */
            <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-md">
              
              {/* Single Slot Badge Notice */}
              <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Single Admin Slot Protection</span>
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSlotClaimed ? 'bg-slate-900 text-white' : 'bg-emerald-600 text-white'}`}>
                    {isSlotClaimed ? 'Slot 1/1 Occupied' : 'Slot 1/1 Available'}
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 leading-normal">
                  {isSlotClaimed
                    ? 'The master administrator account is established. New registrations are permanently locked.'
                    : 'Claim your single administrator slot below. Once initialized, registration will be locked forever.'}
                </p>
              </div>

              {authError && (
                <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {/* VIEW 1: ONE-TIME ADMIN SETUP (Slot Available) */}
              {!isSlotClaimed || authMode === 'setup' ? (
                <div>
                  <div className="mb-6 text-center">
                    <h4 className="text-xl font-bold text-slate-900 font-display">
                      Create Master Administrator
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Set up your exclusive credentials to access the appointments backend.
                    </p>
                  </div>

                  <form onSubmit={handleSetupMasterAdmin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Administrator Name
                      </label>
                      <input
                        type="text"
                        value={setupName}
                        onChange={(e) => setSetupName(e.target.value)}
                        placeholder="e.g. Nitin Agrawal"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Master Email Address
                      </label>
                      <input
                        type="email"
                        value={setupEmail}
                        onChange={(e) => setSetupEmail(e.target.value)}
                        placeholder="admin@lifeexpress.com"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Master Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={setupPassword}
                          onChange={(e) => setSetupPassword(e.target.value)}
                          placeholder="Minimum 6 characters"
                          required
                          className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Confirm Master Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={setupConfirmPassword}
                        onChange={(e) => setSetupConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isAuthSubmitting}
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2 mt-4"
                    >
                      {isAuthSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-teal-300" />
                          <span>Locking & Creating Slot...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-teal-400" />
                          <span>Establish & Lock Admin Slot</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* VIEW 2: ADMIN LOGIN (Slot Claimed) */
                <div>
                  <div className="mb-6 text-center">
                    <h4 className="text-xl font-bold text-slate-900 font-display">
                      Administrator Login
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Enter credentials for registered administrator ({adminEmailDisplay || 'Designated Admin'}).
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                          className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isAuthSubmitting}
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2 mt-4"
                    >
                      {isAuthSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-teal-300" />
                          <span>Verifying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-4 h-4 text-teal-400" />
                          <span>Sign In to Admin Portal</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

            </div>
          ) : (
            /* =================== LOGGED IN ADMIN DASHBOARD =================== */
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
              
              {/* Dashboard Top Stats & Controls Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    Appointments & Customer Bookings
                  </h3>
                  <p className="text-xs text-slate-500">
                    Real-time leads synchronized with Supabase backend ({SUPABASE_PROJECT_ID})
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={loadBookings}
                    disabled={isLoadingBookings}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingBookings ? 'animate-spin text-teal-600' : 'text-slate-500'}`} />
                    <span>Refresh</span>
                  </button>

                  <button
                    onClick={exportToCSV}
                    disabled={bookings.length === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>

              {/* Status Notice for Supabase Table */}
              {supabaseErrorMsg && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                  <Database className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">Supabase Backend Connected (Local Leads Active):</p>
                    <p className="text-amber-800 leading-relaxed">
                      All new submissions are safely captured and viewable right here. When you run the <code>appointments</code> table SQL script in your Supabase dashboard, rows will automatically populate directly in PostgreSQL as well!
                    </p>
                  </div>
                </div>
              )}

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Bookings</span>
                  <div className="text-2xl font-extrabold text-slate-900 mt-1">{bookings.length}</div>
                  <span className="text-[10px] text-slate-400">All recorded client inquiries</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">New Inquiries</span>
                  <div className="text-2xl font-extrabold text-amber-600 mt-1">{countNew}</div>
                  <span className="text-[10px] text-amber-600/80">Awaiting contact / follow-up</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-blue-200/80 shadow-xs">
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">In Progress</span>
                  <div className="text-2xl font-extrabold text-blue-600 mt-1">{countInProgress}</div>
                  <span className="text-[10px] text-blue-600/80">Active consultation discussion</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-xs">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Completed</span>
                  <div className="text-2xl font-extrabold text-emerald-600 mt-1">{countCompleted}</div>
                  <span className="text-[10px] text-emerald-600/80">Policy issued or advised</span>
                </div>
              </div>

              {/* Filters & Search Control Bar */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
                
                {/* Search */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, phone, city..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Dropdown Filters */}
                <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span>Filter:</span>
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <select
                    value={requirementFilter}
                    onChange={(e) => setRequirementFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                  >
                    <option value="all">All Plans</option>
                    <option value="life">Life Insurance</option>
                    <option value="health">Health Insurance</option>
                    <option value="child">Child Education</option>
                    <option value="retirement">Retirement</option>
                    <option value="revival">Policy Servicing / Revival</option>
                    <option value="claim">Claim Support</option>
                  </select>
                </div>

              </div>

              {/* Bookings Table / List */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                {isLoadingBookings ? (
                  <div className="py-16 text-center space-y-2">
                    <RefreshCw className="w-6 h-6 text-teal-600 animate-spin mx-auto" />
                    <p className="text-xs text-slate-500">Fetching latest bookings...</p>
                  </div>
                ) : filteredBookings.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm">No appointment bookings found</h5>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      {searchQuery || statusFilter !== 'all' || requirementFilter !== 'all'
                        ? 'Try clearing your search query or filter selections.'
                        : 'New appointments submitted through the website form will appear here automatically.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                          <th className="py-3 px-4">Date / Source</th>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Requirement</th>
                          <th className="py-3 px-4">Preference</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {filteredBookings.map((b) => {
                          const dateStr = new Date(b.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          });
                          const timeStr = new Date(b.created_at).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          });

                          return (
                            <tr
                              key={b.id}
                              className="hover:bg-slate-50/80 transition-colors group"
                            >
                              {/* Date & Source */}
                              <td className="py-3 px-4 whitespace-nowrap">
                                <div className="font-semibold text-slate-900">{dateStr}</div>
                                <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3" />
                                  <span>{timeStr}</span>
                                  <span className="text-slate-300">·</span>
                                  <span className="capitalize">{b.source === 'modal' ? 'Popup Modal' : 'Website Form'}</span>
                                </div>
                              </td>

                              {/* Customer Details */}
                              <td className="py-3 px-4">
                                <div className="font-bold text-slate-900 text-sm">
                                  {b.full_name}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="font-mono text-slate-600 text-xs font-semibold">
                                    {b.mobile_number}
                                  </span>
                                  {b.city && (
                                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                      <span>{b.city}</span>
                                    </span>
                                  )}
                                </div>
                                {b.email && (
                                  <div className="text-[11px] text-slate-500 mt-0.5">
                                    {b.email}
                                  </div>
                                )}
                                {b.message && (
                                  <div className="text-[11px] text-slate-600 bg-slate-100 p-1.5 rounded-lg mt-1.5 line-clamp-2 max-w-xs">
                                    "{b.message}"
                                  </div>
                                )}
                              </td>

                              {/* Requirement */}
                              <td className="py-3 px-4">
                                <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                                  {b.requirement || 'Life Insurance'}
                                </span>
                              </td>

                              {/* Consultation Mode */}
                              <td className="py-3 px-4 whitespace-nowrap text-slate-600 font-medium">
                                {b.consultation_preference || 'In-Office Visit'}
                              </td>

                              {/* Status Dropdown */}
                              <td className="py-3 px-4 whitespace-nowrap">
                                <select
                                  value={b.status || 'new'}
                                  onChange={(e) =>
                                    handleStatusChange(b.id, e.target.value as any)
                                  }
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                    b.status === 'new'
                                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                                      : b.status === 'contacted'
                                      ? 'bg-sky-50 text-sky-800 border-sky-200'
                                      : b.status === 'in_progress'
                                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                                      : b.status === 'completed'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : 'bg-slate-100 text-slate-600 border-slate-300'
                                  }`}
                                >
                                  <option value="new">● New</option>
                                  <option value="contacted">● Contacted</option>
                                  <option value="in_progress">● In Progress</option>
                                  <option value="completed">● Completed</option>
                                  <option value="cancelled">● Cancelled</option>
                                </select>
                              </td>

                              {/* Action Buttons */}
                              <td className="py-3 px-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* Call Button */}
                                  <a
                                    href={`tel:${b.mobile_number}`}
                                    className="p-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg transition-colors"
                                    title="Call Customer"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>

                                  {/* WhatsApp Button */}
                                  <a
                                    href={`https://wa.me/91${b.mobile_number.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${b.full_name}, this is Nitin Agrawal following up on your consultation request for ${b.requirement}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 rounded-lg transition-colors"
                                    title="Chat on WhatsApp"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </a>

                                  {/* Delete Record */}
                                  <button
                                    onClick={() => handleDelete(b.id)}
                                    className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-400 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
