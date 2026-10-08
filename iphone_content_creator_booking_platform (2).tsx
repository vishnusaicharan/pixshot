import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  Sparkles, 
  Film, 
  ShieldCheck, 
  Settings, 
  Check, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Smartphone, 
  ChevronRight, 
  Star, 
  Zap, 
  Eye, 
  X,
  Play,
  Heart,
  QrCode,
  CreditCard,
  Lock,
  Key,
  LogIn,
  LogOut,
  Upload,
  AlertCircle,
  CopyCheck,
  Send,
  SmartphoneNfc,
  Copy
} from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: 'marriage', label: 'Marriage Reels', icon: '💍', desc: 'Cinematic wedding highlights & viral reel edits' },
  { id: 'housewarming', label: 'House Warming', icon: '🏡', desc: 'Grip & ambient home setup showcase' },
  { id: 'events', label: 'Events & Parties', icon: '🎉', desc: 'Concerts, birthdays, dynamic crowds & nightlife' },
  { id: 'carbike', label: 'Car & Bike Delivery', icon: '🏎️', desc: 'High-octane delivery reveals & cinematic vehicle walkarounds' }
];

const INITIAL_PACKAGES = [
  {
    id: 'pkg-1',
    categoryId: 'marriage',
    title: 'Essential Wedding Reels',
    price: 299,
    unit: 'per event',
    duration: 'Up to 4 Hours',
    features: ['1 Dedicated iPhone 16 Pro Max Creator', '3 Edited High-Energy Reels (4K 60fps)', 'Raw Footage Handover via AirDrop', 'Trending Audio Sync & Color Grade'],
    popular: false
  },
  {
    id: 'pkg-2',
    categoryId: 'marriage',
    title: 'Cinematic Grand Marriage',
    price: 599,
    unit: 'per event',
    duration: 'Full Day (8 Hours)',
    features: ['2 iPhone Creators (Multicam)', '7 Edited Reels + 1 Master Teaser', 'Live Story Updates During Event', 'Pro Audio Lavalier Mics + Stabilizers', '24-Hour Express Delivery'],
    popular: true
  },
  {
    id: 'pkg-3',
    categoryId: 'housewarming',
    title: 'Warm Welcome Package',
    price: 199,
    unit: 'per event',
    duration: '3 Hours',
    features: ['1 iPhone Pro Creator', '2 Aesthetic Home Tour Reels', '4k Cinematic Walkthrough', 'AirDrop Raw Files immediately'],
    popular: true
  },
  {
    id: 'pkg-4',
    categoryId: 'events',
    title: 'Vibe & Party Blitz',
    price: 249,
    unit: 'per event',
    duration: '4 Hours',
    features: ['1 Energetic Content Creator', '4 Fast-paced Story/Reel Edits', 'Gimbal Smooth Moves', 'Custom Branding/Watermark Overlay'],
    popular: false
  },
  {
    id: 'pkg-5',
    categoryId: 'carbike',
    title: 'Ultimate Vehicle Unveiling',
    price: 179,
    unit: 'per delivery',
    duration: '2 Hours',
    features: ['4K Dynamic Engine & Delivery Angles', '2 Reels (Intense beat drop edit)', 'Slow-motion Reveal Shots', 'Optimized for Instagram & TikTok'],
    popular: true
  }
];

const INITIAL_REELS = [
  {
    id: 'reel-1',
    categoryId: 'marriage',
    title: 'Royal Indian Wedding Vows',
    views: '124K',
    likes: '14.2K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-posing-for-the-camera-42898-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    description: 'Captured on iPhone 16 Pro Max in ProRes LOG.'
  },
  {
    id: 'reel-2',
    categoryId: 'carbike',
    title: 'Superbike Delivery Reveal',
    views: '280K',
    likes: '32.1K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-helmet-and-getting-on-a-motorbike-42894-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80',
    description: 'Dynamic 60fps gimbal camera sweep.'
  },
  {
    id: 'reel-3',
    categoryId: 'housewarming',
    title: 'Modern Luxury Villa Entrance',
    views: '89K',
    likes: '8.9K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-with-modern-furniture-41551-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    description: 'Warm lighting, ultra-smooth wide lens motion.'
  },
  {
    id: 'reel-4',
    categoryId: 'events',
    title: 'Electric Night Festival Highlights',
    views: '412K',
    likes: '45.8K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-people-dancing-at-a-party-with-lights-42891-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    description: 'Low-light Action mode & optical stabilization.'
  }
];

const INITIAL_BOOKINGS = [
  {
    id: 'PX-1001',
    customerName: 'Alex Rivera',
    email: 'alex@example.com',
    phone: '+1 555-0192',
    category: 'marriage',
    packageTitle: 'Cinematic Grand Marriage',
    price: 599,
    advancePaid: 180,
    utrNumber: 'UTR982341209841',
    date: '2026-11-15',
    time: '14:00',
    status: 'Confirmed',
    location: 'Grand Ballroom, NY'
  }
];

const DEFAULT_PAYMENT_CONFIG = {
  upiId: 'pixshot@upi',
  qrImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=pixshot@upi&pn=PixShot%20Creators',
  advancePercent: 30,
  merchantName: 'Pix Shot Creator Studio'
};

export default function App() {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('pixshot_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('pixshot_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [reels, setReels] = useState(() => {
    const saved = localStorage.getItem('pixshot_reels');
    return saved ? JSON.parse(saved) : INITIAL_REELS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('pixshot_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [paymentConfig, setPaymentConfig] = useState(() => {
    const saved = localStorage.getItem('pixshot_payment_config');
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_CONFIG;
  });

  // UI state
  const [activeTab, setActiveTab] = useState('marriage');
  const [isAdminView, setIsAdminView] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('bookings');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [upiCopied, setUpiCopied] = useState(false);

  // Auth & 2FA State
  const [googleUser, setGoogleUser] = useState(null);
  const [is2FAVerified, setIs2FAVerified] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [simulatedSecretOTP, setSimulatedSecretOTP] = useState('842910');

  // Booking & Payment Flow Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1: Info, 2: UPI / QR Payment
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '12:00',
    location: '',
    utrNumber: '',
    notes: ''
  });
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState(false);

  // Admin Forms State
  const [editingPackage, setEditingPackage] = useState(null);
  const [newCategoryForm, setNewCategoryForm] = useState({ label: '', icon: '📹', desc: '' });
  const [newReelForm, setNewReelForm] = useState({
    title: '',
    categoryId: 'marriage',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-posing-for-the-camera-42898-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    description: ''
  });

  useEffect(() => {
    localStorage.setItem('pixshot_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('pixshot_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('pixshot_reels', JSON.stringify(reels));
  }, [reels]);

  useEffect(() => {
    localStorage.setItem('pixshot_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('pixshot_payment_config', JSON.stringify(paymentConfig));
  }, [paymentConfig]);

  // Keyboard shortcut listener for hidden admin access (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminView((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSimulatedGoogleLogin = () => {
    setGoogleUser({
      name: 'Admin PixShot',
      email: 'admin@pixshot.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    });
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedSecretOTP(generatedOTP);
  };

  const handleSimulatedGoogleLogout = () => {
    setGoogleUser(null);
    setIs2FAVerified(false);
    setIsAdminView(false);
  };

  const handleVerify2FA = (e) => {
    e.preventDefault();
    if (otpInput.trim() === simulatedSecretOTP) {
      setIs2FAVerified(true);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP Code. Please use the passcode generated above.');
    }
  };

  const handleOpenBooking = (pkg) => {
    setSelectedPackageForBooking(pkg);
    setBookingStep(1);
    setIsBookingOpen(true);
    setBookingSuccessMsg(false);
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setBookingStep(2);
  };

  const handleFinalizeBooking = (e) => {
    e.preventDefault();
    if (!selectedPackageForBooking) return;

    const advanceAmount = Math.round((selectedPackageForBooking.price * paymentConfig.advancePercent) / 100);

    const newBooking = {
      id: `PX-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: bookingFormData.name,
      email: bookingFormData.email,
      phone: bookingFormData.phone,
      category: selectedPackageForBooking.categoryId,
      packageTitle: selectedPackageForBooking.title,
      price: selectedPackageForBooking.price,
      advancePaid: advanceAmount,
      utrNumber: bookingFormData.utrNumber || 'PENDING_VERIFICATION',
      date: bookingFormData.date || new Date().toISOString().split('T')[0],
      time: bookingFormData.time,
      status: 'Pending',
      location: bookingFormData.location || 'Client Venue'
    };

    setBookings([newBooking, ...bookings]);
    setBookingSuccessMsg(true);
    setTimeout(() => {
      setIsBookingOpen(false);
      setBookingFormData({ name: '', email: '', phone: '', date: '', time: '12:00', location: '', utrNumber: '', notes: '' });
      setBookingSuccessMsg(false);
      setBookingStep(1);
    }, 2500);
  };

  const handleSavePackage = (e) => {
    e.preventDefault();
    if (!editingPackage) return;

    if (editingPackage.id) {
      setPackages(packages.map(p => p.id === editingPackage.id ? editingPackage : p));
    } else {
      const newPkg = {
        ...editingPackage,
        id: `pkg-${Date.now()}`,
        features: typeof editingPackage.features === 'string' 
          ? editingPackage.features.split(',').map(s => s.trim()) 
          : editingPackage.features
      };
      setPackages([...packages, newPkg]);
    }
    setEditingPackage(null);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryForm.label) return;
    const newId = newCategoryForm.label.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cat = {
      id: newId || `cat-${Date.now()}`,
      label: newCategoryForm.label,
      icon: newCategoryForm.icon || '🎬',
      desc: newCategoryForm.desc || 'Professional content creation.'
    };
    setCategories([...categories, cat]);
    setNewCategoryForm({ label: '', icon: '📹', desc: '' });
  };

  const handleAddReel = (e) => {
    e.preventDefault();
    if (!newReelForm.title) return;
    const newR = {
      id: `reel-${Date.now()}`,
      ...newReelForm,
      views: '1.2K',
      likes: '240'
    };
    setReels([newR, ...reels]);
    setNewReelForm({
      title: '',
      categoryId: activeTab,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-posing-for-the-camera-42898-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      description: ''
    });
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(paymentConfig.upiId);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

  const handleQRImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentConfig({ ...paymentConfig, qrImageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const activeCategoryObj = categories.find(c => c.id === activeTab) || categories[0];
  const filteredPackages = packages.filter(p => p.categoryId === activeTab);
  const filteredReels = reels.filter(r => r.categoryId === activeTab);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between">
      <div>
        {/* Navigation & Clean Header (No Admin or Export Buttons) */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsAdminView(false)}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    Pix<span className="text-cyan-400">Shot</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded">
                    4K ProRes
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">Pro iPhone Content Creation & Reels</p>
              </div>
            </div>

            {/* Exit Admin Button shown ONLY when in Admin Mode */}
            {isAdminView && (
              <button
                onClick={() => setIsAdminView(false)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 hover:bg-slate-800 text-xs font-bold transition shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Exit Admin</span>
              </button>
            )}
          </div>

          {/* Dynamic Service Category Tabs Header */}
          {!isAdminView && (
            <div className="border-t border-slate-800/60 bg-slate-900/40 backdrop-blur-md overflow-x-auto scrollbar-none">
              <div className="max-w-7xl mx-auto px-4 flex space-x-2 py-2.5">
                {categories.map((cat) => {
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        isActive 
                          ? 'bg-cyan-500/10 border border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </header>

        {}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isAdminView ? (
            /* ================= HIDDEN ADMIN MANAGEMENT ================= */
            <div className="space-y-8 animate-fadeIn">
              {!googleUser ? (
                /* Step 1: Google Login Required */
                <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Pix Shot Admin Auth</h2>
                    <p className="text-xs text-slate-400 mt-1">Authenticate with your Google account to access settings.</p>
                  </div>

                  <button
                    onClick={handleSimulatedGoogleLogin}
                    className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-3 transition shadow-lg"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                </div>
              ) : !is2FAVerified ? (
                /* Step 2: 2-Step Verification OTP */
                <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
                  <div className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <img src={googleUser.avatar} alt="Avatar" className="w-10 h-10 rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{googleUser.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{googleUser.email}</p>
                    </div>
                    <button onClick={handleSimulatedGoogleLogout} className="text-slate-400 hover:text-red-400 p-1">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3">
                      <Key className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-white">Two-Step Verification</h3>
                    <p className="text-xs text-slate-400">Enter the security passcode generated for your session.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Simulated 2FA Passcode</span>
                    <span className="text-xl font-mono font-black text-cyan-400 tracking-widest">{simulatedSecretOTP}</span>
                  </div>

                  <form onSubmit={handleVerify2FA} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        className="w-full text-center text-lg font-mono tracking-widest bg-slate-950 border border-slate-800 rounded-2xl py-3 text-white focus:outline-none focus:border-cyan-500"
                      />
                      {otpError && <p className="text-[11px] text-red-400 mt-1.5 text-center">{otpError}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20"
                    >
                      Verify Passcode & Unlock
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated Admin Dashboard */
                <div className="space-y-8">
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                          <ShieldCheck className="w-4 h-4" />
                          <span>2FA Authenticated • {googleUser.name}</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Pix Shot Admin Control Panel</h1>
                        <p className="text-sm text-slate-400 mt-1">Manage UPI payments, QR details, packages, video reels, and bookings.</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
                          {['bookings', 'payments', 'packages', 'reels', 'categories'].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveAdminTab(tab)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                                activeAdminTab === tab 
                                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={handleSimulatedGoogleLogout}
                          className="p-2 rounded-2xl bg-slate-900 hover:bg-red-500/20 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition"
                          title="Sign Out Admin"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TAB 1: BOOKING REQUESTS */}
                  {activeAdminTab === 'bookings' && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-slate-200 flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <span>Received Creator Bookings ({bookings.length})</span>
                      </h2>

                      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                        {bookings.length === 0 ? (
                          <div className="p-8 text-center text-slate-500">No booking requests available yet.</div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                                <tr>
                                  <th className="p-4">Customer</th>
                                  <th className="p-4">Package</th>
                                  <th className="p-4">Advance Paid</th>
                                  <th className="p-4">UTR / Transaction ID</th>
                                  <th className="p-4">Date & Time</th>
                                  <th className="p-4">Status</th>
                                  <th className="p-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800/60">
                                {bookings.map((b) => (
                                  <tr key={b.id} className="hover:bg-slate-800/30 transition">
                                    <td className="p-4">
                                      <div className="font-bold text-white">{b.customerName}</div>
                                      <div className="text-xs text-slate-400">{b.email} • {b.phone}</div>
                                      <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{b.id}</div>
                                    </td>
                                    <td className="p-4 font-medium text-slate-200">
                                      {b.packageTitle}
                                      <span className="block text-[10px] text-slate-400">${b.price} Total</span>
                                    </td>
                                    <td className="p-4 font-bold text-emerald-400">
                                      ${b.advancePaid}
                                    </td>
                                    <td className="p-4 font-mono text-cyan-300 text-xs">
                                      {b.utrNumber}
                                    </td>
                                    <td className="p-4">
                                      <div className="text-slate-200">{b.date}</div>
                                      <div className="text-xs text-slate-400">{b.time}</div>
                                    </td>
                                    <td className="p-4">
                                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        b.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                                        b.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                                        'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                      }`}>
                                        {b.status}
                                      </span>
                                    </td>
                                    <td className="p-4 text-right space-x-1">
                                      {b.status === 'Pending' && (
                                        <button
                                          onClick={() => setBookings(bookings.map(x => x.id === b.id ? { ...x, status: 'Confirmed' } : x))}
                                          className="px-2.5 py-1 rounded bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/40 text-xs font-semibold"
                                        >
                                          Approve
                                        </button>
                                      )}
                                      <button
                                        onClick={() => setBookings(bookings.filter(x => x.id !== b.id))}
                                        className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: PAYMENTS */}
                  {activeAdminTab === 'payments' && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-bold text-slate-200 flex items-center space-x-2">
                        <QrCode className="w-5 h-5 text-cyan-400" />
                        <span>Payment Gateway Configuration (UPI & Payment QR)</span>
                      </h2>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <form className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">UPI & Merchant Setup</h3>
                          
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Merchant / Studio Name</label>
                            <input
                              type="text"
                              value={paymentConfig.merchantName}
                              onChange={e => setPaymentConfig({ ...paymentConfig, merchantName: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">UPI ID for Receiving Payments</label>
                            <input
                              type="text"
                              value={paymentConfig.upiId}
                              onChange={e => setPaymentConfig({
                                ...paymentConfig, 
                                upiId: e.target.value,
                                qrImageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${e.target.value}&pn=${encodeURIComponent(paymentConfig.merchantName)}`
                              })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 font-mono text-cyan-300"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Required Booking Advance (% of Total)</label>
                            <input
                              type="number"
                              min="10"
                              max="100"
                              value={paymentConfig.advancePercent}
                              onChange={e => setPaymentConfig({ ...paymentConfig, advancePercent: Number(e.target.value) })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Upload Custom Payment QR Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleQRImageUpload}
                              className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
                            />
                          </div>
                        </form>

                        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active QR Code Preview</span>
                          <div className="p-4 rounded-2xl bg-white shadow-xl">
                            <img src={paymentConfig.qrImageUrl} alt="UPI QR" className="w-44 h-44 object-contain" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{paymentConfig.merchantName}</p>
                            <p className="text-xs font-mono text-cyan-400 mt-0.5">{paymentConfig.upiId}</p>
                            <p className="text-[11px] text-slate-400 mt-2">Advance Ratio: {paymentConfig.advancePercent}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PACKAGES */}
                  {activeAdminTab === 'packages' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-200">Manage Creator Packages & Rates</h2>
                        <button
                          onClick={() => setEditingPackage({
                            categoryId: categories[0]?.id || 'marriage',
                            title: '',
                            price: 199,
                            unit: 'per event',
                            duration: '3 Hours',
                            features: ['4K iPhone Recording', 'Raw AirDrop Delivery'],
                            popular: false
                          })}
                          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Package</span>
                        </button>
                      </div>

                      {editingPackage && (
                        <form onSubmit={handleSavePackage} className="p-6 rounded-2xl bg-slate-900 border border-slate-700 space-y-4 shadow-xl">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                              <input
                                type="text"
                                required
                                value={editingPackage.title}
                                onChange={e => setEditingPackage({ ...editingPackage, title: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                              <select
                                value={editingPackage.categoryId}
                                onChange={e => setEditingPackage({ ...editingPackage, categoryId: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                              >
                                {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Price ($)</label>
                              <input
                                type="number"
                                required
                                value={editingPackage.price}
                                onChange={e => setEditingPackage({ ...editingPackage, price: Number(e.target.value) })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Duration Tag</label>
                              <input
                                type="text"
                                value={editingPackage.duration}
                                onChange={e => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Features (comma separated)</label>
                            <input
                              type="text"
                              value={Array.isArray(editingPackage.features) ? editingPackage.features.join(', ') : editingPackage.features}
                              onChange={e => setEditingPackage({ ...editingPackage, features: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              onClick={() => setEditingPackage(null)}
                              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {packages.map((pkg) => (
                          <div key={pkg.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-base font-bold text-white">{pkg.title}</h3>
                                <span className="text-[10px] text-cyan-400 font-mono">{pkg.duration}</span>
                              </div>
                              <button
                                onClick={() => setPackages(packages.filter(p => p.id !== pkg.id))}
                                className="p-1 text-slate-500 hover:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-2xl font-black text-white">${pkg.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: REELS */}
                  {activeAdminTab === 'reels' && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-bold text-slate-200">Upload / Add New Reel Video</h2>
                      <form onSubmit={handleAddReel} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Reel Title</label>
                            <input
                              type="text"
                              required
                              value={newReelForm.title}
                              onChange={e => setNewReelForm({ ...newReelForm, title: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Category Tab</label>
                            <select
                              value={newReelForm.categoryId}
                              onChange={e => setNewReelForm({ ...newReelForm, categoryId: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                            >
                              {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Thumbnail Image URL</label>
                            <input
                              type="url"
                              value={newReelForm.thumbnail}
                              onChange={e => setNewReelForm({ ...newReelForm, thumbnail: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Video Stream MP4 URL</label>
                          <input
                            type="url"
                            required
                            value={newReelForm.videoUrl}
                            onChange={e => setNewReelForm({ ...newReelForm, videoUrl: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                        >
                          Upload Reel
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TAB 5: CATEGORIES */}
                  {activeAdminTab === 'categories' && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-bold text-slate-200">Manage Service Tabs</h2>
                      <form onSubmit={handleAddCategory} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Tab Title</label>
                            <input
                              type="text"
                              required
                              value={newCategoryForm.label}
                              onChange={e => setNewCategoryForm({ ...newCategoryForm, label: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Emoji / Icon</label>
                            <input
                              type="text"
                              value={newCategoryForm.icon}
                              onChange={e => setNewCategoryForm({ ...newCategoryForm, icon: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                            <input
                              type="text"
                              value={newCategoryForm.desc}
                              onChange={e => setNewCategoryForm({ ...newCategoryForm, desc: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                        >
                          Add Category Tab
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* ================= PUBLIC LANDING VIEW ================= */
            <div className="space-y-16 animate-fadeIn">
              {/* Hero Banner */}
              <section className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-slate-800/80 shadow-2xl">
                <div className="relative z-10 max-w-3xl space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pix Shot • Premium 4K iPhone Creators</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                    High Impact Reels For Your{' '}
                    <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                      {activeCategoryObj.label}
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 font-normal">
                    {activeCategoryObj.desc}. Professional iPhone videographers equipped with ProRes LOG 4K, gimbals, & instant UPI advance confirmation.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <a
                      href="#packages"
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 transition duration-200 flex items-center space-x-2"
                    >
                      <span>View Packages</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                    <a
                      href="#reels"
                      className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4 text-cyan-400" />
                      <span>Watch Sample Reels</span>
                    </a>
                  </div>
                </div>
              </section>

              {/* Packages Section */}
              <section id="packages" className="space-y-8">
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Select Service</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    {activeCategoryObj.label} Creator Packages
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPackages.map((pkg) => {
                    const advanceValue = Math.round((pkg.price * paymentConfig.advancePercent) / 100);
                    return (
                      <div
                        key={pkg.id}
                        className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                          pkg.popular 
                            ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/80 border-2 border-cyan-500/80 shadow-2xl' 
                            : 'bg-slate-900/60 border border-slate-800'
                        }`}
                      >
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                            <p className="text-xs text-cyan-400 font-medium mt-1">{pkg.duration}</p>
                          </div>

                          <div className="flex items-baseline space-x-1">
                            <span className="text-4xl font-black text-white">${pkg.price}</span>
                            <span className="text-xs text-slate-400">/ {pkg.unit}</span>
                          </div>

                          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                            <div className="flex justify-between text-slate-400">
                              <span>Total Price:</span>
                              <span className="font-bold text-white">${pkg.price}</span>
                            </div>
                            <div className="flex justify-between text-cyan-400 font-semibold">
                              <span>Advance Required ({paymentConfig.advancePercent}%):</span>
                              <span className="font-bold">${advanceValue}</span>
                            </div>
                          </div>

                          <div className="space-y-2.5 pt-2">
                            {pkg.features.map((feature, i) => (
                              <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 mt-auto">
                          <button
                            onClick={() => handleOpenBooking(pkg)}
                            className="w-full py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
                          >
                            <span>Book & Pay Advance</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Video Reels Section */}
              <section id="reels" className="space-y-8">
                <div>
                  <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Portfolio</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Sample Reels for {activeCategoryObj.label}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredReels.map((reel) => (
                    <div
                      key={reel.id}
                      onClick={() => setSelectedVideo(reel)}
                      className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 aspect-[9/16] cursor-pointer shadow-xl hover:border-cyan-500/50 transition duration-300"
                    >
                      <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-cyan-400 border border-slate-800">
                            PixShot 4K
                          </span>
                          <div className="w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:text-black transition">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                            {reel.title}
                          </h4>
                          <p className="text-[11px] text-slate-300 line-clamp-2">{reel.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Pix Shot Creators. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-600">Press Ctrl+Shift+A for portal</span>
            {/* Hidden admin entrance trigger */}
            <button
              onClick={() => setIsAdminView(true)}
              className="text-slate-800 hover:text-slate-600 transition-colors p-1 rounded"
              title="Portal"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>

      {}
      {/* Booking & Payment Flow Modal */}
      {isBookingOpen && selectedPackageForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${bookingStep === 1 ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                <span className={`w-2 h-2 rounded-full ${bookingStep === 2 ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest ml-1">
                  Step {bookingStep} of 2 • {bookingStep === 1 ? 'Event Info' : 'UPI Payment'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">{selectedPackageForBooking.title}</h3>
            </div>

            {bookingSuccessMsg ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-black text-emerald-300 text-lg">Booking Submitted Successfully!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Transaction UTR received. Pix Shot creators will verify payment and send event confirmation shortly.
                </p>
              </div>
            ) : bookingStep === 1 ? (
              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingFormData.name}
                    onChange={e => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={bookingFormData.email}
                      onChange={e => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={bookingFormData.phone}
                      onChange={e => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Event Date</label>
                    <input
                      type="date"
                      required
                      value={bookingFormData.date}
                      onChange={e => setBookingFormData({ ...bookingFormData, date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Start Time</label>
                    <input
                      type="time"
                      required
                      value={bookingFormData.time}
                      onChange={e => setBookingFormData({ ...bookingFormData, time: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Venue Location</label>
                  <input
                    type="text"
                    required
                    value={bookingFormData.location}
                    onChange={e => setBookingFormData({ ...bookingFormData, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-cyan-400 transition"
                >
                  Proceed to Payment Gateway
                </button>
              </form>
            ) : (
              <form onSubmit={handleFinalizeBooking} className="space-y-5">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    Scan UPI QR to Pay Advance
                  </span>
                  
                  <div className="p-3 bg-white rounded-2xl shadow-lg">
                    <img src={paymentConfig.qrImageUrl} alt="UPI QR Code" className="w-40 h-40 object-contain" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-400">Advance Amount Required:</p>
                    <p className="text-2xl font-black text-emerald-400">
                      ${Math.round((selectedPackageForBooking.price * paymentConfig.advancePercent) / 100)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300">
                    <span className="font-mono">{paymentConfig.upiId}</span>
                    <button type="button" onClick={handleCopyUPI} className="p-1 hover:text-white">
                      {upiCopied ? <CopyCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Enter UTR / Transaction Reference ID
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingFormData.utrNumber}
                    onChange={e => setBookingFormData({ ...bookingFormData, utrNumber: e.target.value })}
                    placeholder="e.g. UTR12093847291"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Found in your GPay / PhonePe / PayTM payment details.</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className="w-1/3 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20"
                  >
                    Submit UTR & Reserve
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 text-white p-2 rounded-full bg-black/60 hover:bg-black/80"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[9/16] w-full bg-black">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
                poster={selectedVideo.thumbnail}
              />
            </div>
            <div className="p-4 bg-slate-900">
              <h3 className="font-bold text-white text-base">{selectedVideo.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}