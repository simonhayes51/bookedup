import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search, Star, MapPin, Calendar, Music, MessageCircle, Sparkles, TrendingUp,
  CheckCircle, Award, Send, X, Menu, BarChart3, Users, DollarSign, Activity,
  Instagram, Facebook, Youtube, Globe, Clock, Heart, Filter, Eye, AlertCircle,
  Check, XCircle, Settings, Bell, Mail, Plus, Trash2
} from "lucide-react";

/** Utility helpers */
const clampNum = (v, def = 0) => {
  const n = parseFloat(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : def;
};
const parseRange = (price) => {
  // "£300-500" -> {min:300, max:500}
  const [a, b] = String(price).split("-").map(clampNum);
  return { min: a || 0, max: b || a || 0 };
};
const ratingBuckets = [
  { label: "Any", value: 0 },
  { label: "4.0+", value: 4.0 },
  { label: "4.5+", value: 4.5 },
  { label: "4.8+", value: 4.8 },
];

const initialNotifications = [
  { id: 1, type: "booking", message: "New booking request from Sarah Jones Live", time: "5m ago", read: false },
  { id: 2, type: "message", message: "New message from The Neon Beats", time: "1h ago", read: false },
  { id: 3, type: "review",  message: "You received a 5-star review!", time: "3h ago", read: true  },
];

const BookedUp = () => {
  const [currentView, setCurrentView] = useState("home"); // home, signup, messages, admin, favourites
  const [userType, setUserType] = useState(null);         // 'performer', 'venue', 'admin'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedPerformer, setSelectedPerformer] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);

  const [notifications, setNotifications] = useState(initialNotifications);

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    verified: false,
    premium: false,
    rating: 0,
    availability: "", // ISO yyyy-mm-dd; demo only
  });

  // Favourites (persist in localStorage)
  const [favoriteActs, setFavoriteActs] = useState(() => {
    try {
      const raw = localStorage.getItem("bookedup:favourites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("bookedup:favourites", JSON.stringify(favoriteActs));
  }, [favoriteActs]);

  // Sign-up state
  const [signupData, setSignupData] = useState({
    name: "", email: "", genre: "", location: "", price: "",
    description: "", instagram: "", facebook: "", youtube: "", website: "", photos: []
  });

  // Simple demo conversations
  const conversations = [
    { id: 1, performer: "The Neon Beats",    lastMessage: "Sounds great! I'm available on that date.", time: "10m ago", unread: 2 },
    { id: 2, performer: "Sarah Jones Live",  lastMessage: "What time would you need me to arrive?",   time: "1h ago",  unread: 0 },
    { id: 3, performer: "Retro Groove Band", lastMessage: "Thanks for the booking! Looking forward.", time: "2h ago",  unread: 1 },
  ];

  // Demo performers
  const performers = [
    {
      id: 1,
      name: "The Neon Beats",
      genre: "DJ",
      location: "Manchester",
      rating: 4.9,
      reviews: 127,
      price: "£300-500",
      image: "https://images.unsplash.com/photo-1571266028243-d220c6c65921?w=800&h=600&fit=crop",
      verified: true,
      premium: true,
      responseTime: "< 2 hours",
      description: "High-energy DJ bringing the best club vibes to your event. Specialising in house, techno, and commercial hits.",
      socials: { instagram: "@neonbeats", youtube: "NeonBeatsOfficial" },
      views: 1243,
      likes: 342,
      bookings: 89,
      availableDates: ["2025-12-15", "2026-01-10"],
    },
    {
      id: 2,
      name: "Sarah Jones Live",
      genre: "Singer",
      location: "London",
      rating: 5.0,
      reviews: 89,
      price: "£400-700",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
      verified: true,
      premium: true,
      responseTime: "< 1 hour",
      description: "Stunning vocals for weddings, corporate events, and private parties. Jazz, soul, and contemporary pop.",
      socials: { instagram: "@sarahjones", facebook: "SarahJonesMusic" },
      views: 2156,
      likes: 567,
      bookings: 134,
      availableDates: ["2025-12-15", "2026-02-01"],
    },
    {
      id: 3,
      name: "Comedy Kings",
      genre: "Comedy",
      location: "Birmingham",
      rating: 4.7,
      reviews: 64,
      price: "£250-400",
      image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&h=600&fit=crop",
      verified: true,
      premium: false,
      responseTime: "< 4 hours",
      description: "Stand-up comedy duo bringing laughs to corporate events and private functions across the UK.",
      socials: { instagram: "@comedykings", youtube: "ComedyKingsUK" },
      views: 876,
      likes: 234,
      bookings: 52,
      availableDates: ["2026-01-20"],
    },
    {
      id: 4,
      name: "Retro Groove Band",
      genre: "Band",
      location: "Leeds",
      rating: 4.8,
      reviews: 112,
      price: "£500-800",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
      verified: true,
      premium: true,
      responseTime: "< 3 hours",
      description: "5-piece band covering classic hits from the 60s to 90s. Perfect for weddings and corporate events.",
      socials: { instagram: "@retrogroove", facebook: "RetroGrooveBand", website: "retrogroove.co.uk" },
      views: 1789,
      likes: 445,
      bookings: 97,
      availableDates: ["2025-12-31", "2026-01-10"],
    },
    {
      id: 5,
      name: "DJ Velocity",
      genre: "DJ",
      location: "Bristol",
      rating: 4.6,
      reviews: 73,
      price: "£200-400",
      image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&h=600&fit=crop",
      verified: false,
      premium: false,
      responseTime: "< 6 hours",
      description: "Electronic music specialist with 10 years experience. Drum & bass, dubstep, and festival vibes.",
      socials: { instagram: "@djvelocity" },
      views: 543,
      likes: 156,
      bookings: 38,
      availableDates: [],
    },
    {
      id: 6,
      name: "Jazz & Soul Collective",
      genre: "Band",
      location: "Edinburgh",
      rating: 4.9,
      reviews: 95,
      price: "£600-1000",
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
      verified: true,
      premium: true,
      responseTime: "< 2 hours",
      description: "Sophisticated jazz ensemble for premium events. 7-piece band with world-class musicians.",
      socials: { instagram: "@jazzsoulcollective", facebook: "JazzSoulCollective", website: "jazzsoul.co.uk" },
      views: 2341,
      likes: 678,
      bookings: 156,
      availableDates: ["2025-12-15", "2026-01-10", "2026-02-20"],
    },
  ];

  const genres = ["all", "DJ", "Singer", "Band", "Comedy"];

  /** Notifications unread count */
  const unreadNotiCount = React.useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  /** Filtering logic */
  const filteredPerformers = React.useMemo(() => {
    return performers.filter((p) => {
      if (!(selectedGenre === "all" || p.genre === selectedGenre)) return false;
      const sq = searchQuery.trim().toLowerCase();
      if (sq && !(p.name.toLowerCase().includes(sq) || p.location.toLowerCase().includes(sq))) return false;
      const { min, max } = parseRange(p.price);
      const fMin = clampNum(filters.minPrice, 0);
      const fMax = clampNum(filters.maxPrice, Infinity);
      if (filters.minPrice !== "" && max < fMin) return false;
      if (filters.maxPrice !== "" && min > fMax) return false;
      if (filters.rating && p.rating < filters.rating) return false;
      if (filters.verified && !p.verified) return false;
      if (filters.premium && !p.premium) return false;
      if (filters.availability) {
        const isAvailable = (p.availableDates || []).includes(filters.availability);
        if (!isAvailable) return false;
      }
      return true;
    });
  }, [performers, selectedGenre, searchQuery, filters]);

  /** Favourites helpers */
  const isFaved = (id) => favoriteActs.includes(id);
  const toggleFav = (e, id) => {
    if (e) e.stopPropagation();
    setFavoriteActs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const sendMessage = () => {
    if (currentMessage.trim()) {
      setMessages((m) => [...m, { text: currentMessage, sender: "me", time: "Just now" }]);
      setCurrentMessage("");
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted! Our team will review it within 24 hours.");
    setCurrentView("home");
  };

  const dropRef = useRef(null);
  const onDropFiles = (files) => {
    const arr = Array.from(files);
    setSignupData((s) => ({ ...s, photos: [...s.photos, ...arr] }));
  };

  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    const prevent = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = (e) => {
      prevent(e);
      if (e.dataTransfer?.files?.length) onDropFiles(e.dataTransfer.files);
    };
    el.addEventListener("dragover", prevent);
    el.addEventListener("dragenter", prevent);
    el.addEventListener("drop", handleDrop);
    return () => {
      el.removeEventListener("dragover", prevent);
      el.removeEventListener("dragenter", prevent);
      el.removeEventListener("drop", handleDrop);
    };
  }, []);

  // HEADER (inline here to keep the component self-contained when used standalone)
  const renderHeader = () => (
    <header className="bg-black/50 backdrop-blur-md border-b-4 border-yellow-400 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-lg flex items-center justify-center -rotate-12">
              <Sparkles className="text-black" size={28} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300" 
                style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.3)', fontFamily: 'Impact, sans-serif' }}>
              BOOKEDUP
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <button onClick={() => setCurrentView('home')} className="text-white font-bold hover:text-yellow-300 transition">Browse Acts</button>
            <button onClick={() => setCurrentView('signup')} className="text-white font-bold hover:text-yellow-300 transition">Join as Performer</button>
            <button onClick={() => setCurrentView('favourites')} className="text-white font-bold hover:text-yellow-300 transition relative">
              <Heart size={22} />
              {favoriteActs.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteActs.length}
                </span>
              )}
            </button>
            <button onClick={() => setCurrentView('messages')} className="text-white font-bold hover:text-yellow-300 transition relative">
              <MessageCircle size={24} />
            </button>
            {userType === 'admin' && (
              <button onClick={() => setCurrentView('admin')} className="text-white font-bold hover:text-yellow-300 transition flex items-center gap-2">
                <Settings size={20} /> Admin
              </button>
            )}
            <button className="relative text-white hover:text-yellow-300 transition">
              <Bell size={22} />
              {unreadNotiCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotiCount}
                </span>
              )}
            </button>
            <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-6 py-2 rounded-full font-black hover:scale-105 transition">
              Sign In
            </button>
          </nav>
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );

  const renderHome = () => (
    <>
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6" 
              style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)', fontFamily: 'Impact, sans-serif' }}>
            BOOK THE BEST<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">
              ENTERTAINMENT
            </span>
          </h2>
          <p className="text-2xl text-white mb-8 font-bold" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>
            DJs • Bands • Singers • Comedians • All in One Place
          </p>
          
          <div className="bg-white rounded-full p-2 shadow-2xl max-w-3xl mx-auto flex items-center gap-2 border-4 border-yellow-400">
            <Search className="ml-4 text-gray-400" size={24} />
            <input 
              type="text" 
              placeholder="Search by act name or location..."
              className="flex-1 px-4 py-3 outline-none text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 px-4 py-3 rounded-full font-black border-2 border-gray-200 hover:bg-gray-50 transition"
            >
              <Filter size={18} /> Filters
            </button>
            <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-8 py-3 rounded-full font-black hover:scale-105 transition">
              SEARCH
            </button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2 rounded-full font-bold transition transform hover:scale-105 border-2 ${
                  selectedGenre === genre 
                    ? 'bg-yellow-400 text-black border-yellow-400' 
                    : 'bg-white bg-opacity-20 text-white border-white'
                }`}
              >
                {genre === 'all' ? '✨ ALL' : genre.toUpperCase()}
              </button>
            ))}
          </div>

          {showFilters && (
            <div className="mt-6 max-w-4xl mx-auto bg-white/95 rounded-2xl p-5 border-4 border-yellow-400 text-left">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600">Min Price (£)</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 outline-none"
                    placeholder="e.g. 200"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Max Price (£)</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 outline-none"
                    placeholder="e.g. 800"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
                    className="mt-1 w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 outline-none"
                  >
                    {[
                      { label: "Any", value: 0 },
                      { label: "4.0+", value: 4.0 },
                      { label: "4.5+", value: 4.5 },
                      { label: "4.8+", value: 4.8 },
                    ].map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600">Availability (date)</label>
                  <input
                    type="date"
                    value={filters.availability}
                    onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input id="verifiedOnly" type="checkbox" checked={filters.verified} onChange={(e) => setFilters({ ...filters, verified: e.target.checked })} className="w-5 h-5" />
                  <label htmlFor="verifiedOnly" className="text-sm font-bold text-gray-700">Verified only</label>
                </div>
                <div className="flex items-center gap-2">
                  <input id="premiumOnly" type="checkbox" checked={filters.premium} onChange={(e) => setFilters({ ...filters, premium: e.target.checked })} className="w-5 h-5" />
                  <label htmlFor="premiumOnly" className="text-sm font-bold text-gray-700">Premium only</label>
                </div>
              </div>
              <div className="mt-4 flex gap-3 justify-end">
                <button
                  onClick={() => setFilters({ minPrice: "", maxPrice: "", verified: false, premium: false, rating: 0, availability: "" })}
                  className="px-5 py-2 rounded-full border-2 border-gray-300 font-bold hover:bg-gray-100"
                >
                  Clear
                </button>
                <button onClick={() => setShowFilters(false)} className="px-6 py-2 rounded-full font-black text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90">
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-black bg-opacity-60 backdrop-blur-md border-y-4 border-yellow-400 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-4xl font-black text-yellow-400 mb-2">2,500+</div><div className="text-white font-bold">Acts Listed</div></div>
            <div><div className="text-4xl font-black text-pink-400 mb-2">15,000+</div><div className="text-white font-bold">Bookings Made</div></div>
            <div><div className="text-4xl font-black text-purple-400 mb-2">4.8★</div><div className="text-white font-bold">Average Rating</div></div>
            <div><div className="text-4xl font-black text-orange-400 mb-2">98%</div><div className="text-white font-bold">Success Rate</div></div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-4xl font-black text-white" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>
            🔥 FEATURED ACTS
          </h3>
          <button className="text-yellow-300 font-bold hover:text-yellow-400 transition flex items-center gap-2">
            View All <TrendingUp size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPerformers.map(performer => (
            <div 
              key={performer.id}
              onClick={() => { setSelectedPerformer(performer); setShowBookingModal(true); }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition border-4 border-transparent hover:border-yellow-400 cursor-pointer"
            >
              <div className="relative">
                <img 
                  src={performer.image} 
                  alt={performer.name}
                  className="w-full h-64 object-cover"
                />
                {performer.premium && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full font-black text-sm flex items-center gap-1 shadow-lg">
                    <Award size={16} /> PREMIUM
                  </div>
                )}
                {performer.verified && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                    <CheckCircle size={20} />
                  </div>
                )}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Eye size={14} /> {performer.views}
                  </div>
                  <button
                    onClick={(e) => toggleFav(e, performer.id)}
                    className={`bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 hover:scale-105 transition ${isFaved(performer.id) ? "ring-2 ring-pink-400" : ""}`}
                  >
                    <Heart size={14} className={isFaved(performer.id) ? "fill-pink-500 text-pink-500" : ""} />
                    {performer.likes + (isFaved(performer.id) ? 1 : 0)}
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-2xl font-black text-gray-900 mb-1">{performer.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Music size={16} />
                      <span className="font-bold">{performer.genre}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-full">
                      <Star size={16} fill="currentColor" />
                      <span className="font-black">{performer.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{performer.reviews} reviews</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin size={16} />
                  <span className="font-semibold">{performer.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-100">
                  <div>
                    <div className="text-sm text-gray-500">Price Range</div>
                    <div className="text-lg font-black text-pink-600">{performer.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Response</div>
                    <div className="text-sm font-bold text-green-600">{performer.responseTime}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-black hover:shadow-xl transition transform hover:scale-105">
                    VIEW PROFILE & BOOK
                  </button>
                  <button
                    onClick={(e) => toggleFav(e, performer.id)}
                    className={`px-4 rounded-full border-2 font-black hover:scale-105 transition ${isFaved(performer.id) ? "border-pink-500 text-pink-600" : "border-gray-300"}`}
                  >
                    {isFaved(performer.id) ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredPerformers.length === 0 && (
            <div className="col-span-full text-center text-white/90">
              <p className="text-xl font-bold">No acts match your filters. Try widening them.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-black bg-opacity-60 backdrop-blur-md border-t-4 border-yellow-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-5xl font-black text-white mb-6" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
            ARE YOU A PERFORMER?
          </h3>
          <p className="text-2xl text-white mb-8 font-bold max-w-2xl mx-auto">
            Join thousands of acts getting booked for amazing events across the UK!
          </p>
          <button 
            onClick={() => setCurrentView('signup')}
            className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-black hover:scale-105 transition transform shadow-2xl"
          >
            CREATE YOUR PROFILE NOW
          </button>
        </div>
      </section>
    </>
  );

  const renderSignup = () => (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="bg:white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-yellow-400 bg-white">
          <h2 className="text-5xl font-black text-gray-900 mb-4 text-center" style={{ fontFamily: 'Impact, sans-serif' }}>
            JOIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">BOOKEDUP</span>
          </h2>
          <p className="text-center text-gray-600 mb-8 text-lg">Complete your profile and start getting booked today!</p>

          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Act Name *</label>
                <input 
                  type="text" 
                  required
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                  placeholder="The Amazing Act"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  required
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Genre *</label>
                <select 
                  required
                  value={signupData.genre}
                  onChange={(e) => setSignupData({...signupData, genre: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                >
                  <option value="">Select genre...</option>
                  <option value="DJ">DJ</option>
                  <option value="Singer">Singer</option>
                  <option value="Band">Band</option>
                  <option value="Comedy">Comedy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location *</label>
                <input 
                  type="text" 
                  required
                  value={signupData.location}
                  onChange={(e) => setSignupData({...signupData, location: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                  placeholder="London, UK"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price Range *</label>
              <input 
                type="text" 
                required
                value={signupData.price}
                onChange={(e) => setSignupData({...signupData, price: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                placeholder="£300-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
              <textarea 
                required
                value={signupData.description}
                onChange={(e) => setSignupData({...signupData, description: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                placeholder="Tell us about your act, experience, and what makes you unique..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Portfolio Uploads (Photos/Videos)</label>
                <div ref={dropRef} className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-pink-400 transition">
                  <p className="text-gray-600 mb-3">Drag & drop files here, or click to select</p>
                  <input 
                    type="file" multiple
                    onChange={(e) => e.target.files && onDropFiles(e.target.files)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-pink-50 border-2 border-yellow-300 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="text-yellow-500" />
                  <h4 className="text-xl font-black text-gray-900">Go Premium</h4>
                </div>
                <p className="text-gray-700 mb-3">Boost your visibility and get booked more often.</p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-center gap-2"><Check className="text-green-600" size={18} /> Priority listings</li>
                  <li className="flex items-center gap-2"><Check className="text-green-600" size={18} /> Premium badge</li>
                  <li className="flex items-center gap-2"><Check className="text-green-600" size={18} /> Advanced insights</li>
                  <li className="flex items-center gap-2"><Check className="text-green-600" size={18} /> Lower booking fees</li>
                </ul>
                <div className="mt-4">
                  <div className="text-3xl font-black">£29.99<span className="text-base font-bold">/month</span></div>
                </div>
                <button type="button" className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-6 py-3 rounded-full font-black hover:scale-105 transition">
                  Upgrade to Premium
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white py-4 rounded-full font-black text-lg hover:scale-105 transition"
              >
                SUBMIT APPLICATION
              </button>
              <button 
                type="button"
                onClick={() => setCurrentView('home')}
                className="px-8 py-4 border-2 border-gray-300 rounded-full font-bold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  const renderMessages = () => (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400" style={{ height: '80vh' }}>
        <div className="flex h-full">
          <div className="w-1/3 border-r-2 border-gray-200 overflow-y-auto">
            <div className="p-6 border-b-2 border-gray-200 bg-gradient-to-r from-purple-600 to-pink-600">
              <h2 className="text-2xl font-black text-white">Messages</h2>
            </div>
            {[
              { id: 1, performer: "The Neon Beats", lastMessage: "Sounds great! I'm available on that date.", time: "10m ago", unread: 2 },
              { id: 2, performer: "Sarah Jones Live", lastMessage: "What time would you need me to arrive?", time: "1h ago", unread: 0 },
              { id: 3, performer: "Retro Groove Band", lastMessage: "Thanks for the booking! Looking forward.", time: "2h ago", unread: 1 },
            ].map(conv => (
              <div 
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition ${selectedConversation?.id === conv.id ? 'bg-pink-50' : ''}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-900">{conv.performer}</h3>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-600 truncate flex-1">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-6 border-b-2 border-gray-200 bg-gray-50">
                  <h3 className="text-xl font-black text-gray-900">{selectedConversation.performer}</h3>
                  <p className="text-sm text-gray-600">Active now</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow max-w-md">
                        <p className="text-gray-800">Hi! I'm interested in booking you for a wedding on December 15th. Are you available?</p>
                        <span className="text-xs text-gray-500 mt-1 block">2h ago</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow max-w-md">
                        <p>Yes, I'm available that day! What time would you need me?</p>
                        <span className="text-xs text-pink-200 mt-1 block">1h ago</span>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow max-w-md">
                        <p className="text-gray-800">Perfect! The ceremony is at 3pm, so probably from 2:30pm for setup?</p>
                        <span className="text-xs text-gray-500 mt-1 block">45m ago</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow max-w-md">
                        <p>Sounds great! I'm available on that date.</p>
                        <span className="text-xs text-pink-200 mt-1 block">10m ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t-2 border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && currentMessage.trim() && setMessages([...messages, { text: currentMessage, sender: 'me', time: 'Just now' }])}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-full focus:border-pink-500 focus:outline-none"
                    />
                    <button 
                      onClick={() => currentMessage.trim() && setMessages([...messages, { text: currentMessage, sender: 'me', time: 'Just now' }]) or setCurrentMessage('')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full hover:scale-105 transition transform"
                    >
                      <Send size={24} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageCircle size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  const pendingApplications = [
    { id: 101, name: "Electric Dreams DJ", genre: "DJ", location: "Glasgow", appliedDate: "2025-11-01", status: "pending" },
    { id: 102, name: "The Acoustic Duo", genre: "Singer", location: "Cardiff", appliedDate: "2025-11-02", status: "pending" },
    { id: 103, name: "Funk Fusion Band", genre: "Band", location: "Liverpool", appliedDate: "2025-11-03", status: "pending" },
  ];

  const renderAdmin = () => (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-5xl font-black text-white mb-8" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>
        ADMIN DASHBOARD
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl border-4 border-white">
          <div className="flex items-center justify-between mb-4">
            <Users size={32} className="text-white" />
            <TrendingUp size={24} className="text-white opacity-70" />
          </div>
          <div className="text-4xl font-black text-white mb-2">2,487</div>
          <div className="text-white font-bold">Total Acts</div>
          <div className="text-sm text-white opacity-80 mt-2">+12% this month</div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 shadow-2xl border-4 border-white">
          <div className="flex items-center justify-between mb-4">
            <Calendar size={32} className="text-white" />
            <TrendingUp size={24} className="text-white opacity-70" />
          </div>
          <div className="text-4xl font-black text-white mb-2">14,892</div>
          <div className="text-white font-bold">Total Bookings</div>
          <div className="text-sm text-white opacity-80 mt-2">+8% this month</div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 shadow-2xl border-4 border-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign size={32} className="text-white" />
            <TrendingUp size={24} className="text-white opacity-70" />
          </div>
          <div className="text-4xl font-black text-white mb-2">£2.4M</div>
          <div className="text-white font-bold">Total Revenue</div>
          <div className="text-sm text-white opacity-80 mt-2">+15% this month</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-2xl border-4 border-white">
          <div className="flex items-center justify-between mb-4">
            <Activity size={32} className="text-white" />
            <AlertCircle size={24} className="text-white opacity-70" />
          </div>
          <div className="text-4xl font-black text-white mb-2">{pendingApplications.length}</div>
          <div className="text-white font-bold">Pending Reviews</div>
          <div className="text-sm text-white opacity-80 mt-2">Requires attention</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-400 mb-8">
        <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
          <AlertCircle className="text-orange-500" size={32} />
          PENDING APPLICATIONS
        </h3>
        <div className="space-y-4">
          {pendingApplications.map(app => (
            <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-pink-300 transition">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900">{app.name}</h4>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Music size={14} /> {app.genre}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {app.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> Applied {app.appliedDate}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition flex items-center gap-2">
                  <Check size={18} /> Approve
                </button>
                <button className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition flex items-center gap-2">
                  <XCircle size={18} /> Deny
                </button>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition flex items-center gap-2">
                  <Eye size={18} /> Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-pink-400">
        <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
          <Award className="text-yellow-500" size={32} />
          TOP PERFORMERS THIS MONTH
        </h3>
        <div className="space-y-4">
          {performers.slice(0, 5).sort((a, b) => b.bookings - a.bookings).map((performer, idx) => (
            <div key={performer.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className={`text-2xl font-black ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-orange-600' : 'text-gray-500'}`}>
                #{idx + 1}
              </div>
              <img src={performer.image} alt={performer.name} className="w-16 h-16 rounded-full object-cover border-2 border-pink-400" />
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900">{performer.name}</h4>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {performer.bookings} bookings
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} fill="currentColor" className="text-yellow-400" /> {performer.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {performer.views} views
                  </span>
                </div>
              </div>
              {performer.premium && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full font-black text-sm">
                  PREMIUM
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderBookingModal = () => {
    if (!showBookingModal || !selectedPerformer) return null;

    const p = selectedPerformer;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-yellow-400">
          <div className="relative">
            <img 
              src={p.image} 
              alt={p.name}
              className="w-full h-80 object-cover rounded-t-3xl"
            />
            <button 
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition"
            >
              <X size={24} />
            </button>
            {p.premium && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-black flex items-center gap-2">
                <Award size={20} /> PREMIUM ACT
              </div>
            )}
            <button
              onClick={(e) => toggleFav(e, p.id)}
              className={`absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-full font-bold shadow hover:scale-105 transition flex items-center gap-2 ${isFaved(p.id) ? "ring-2 ring-pink-400" : ""}`}
            >
              <Heart size={18} className={isFaved(p.id) ? "fill-pink-500 text-pink-500" : ""} />
              {isFaved(p.id) ? "Saved" : "Save"}
            </button>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-2">{p.name}</h2>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-2">
                    <Music size={20} />
                    <span className="font-bold">{p.genre}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span className="font-bold">{p.location}</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-full mb-2">
                  <Star size={20} fill="currentColor" />
                  <span className="font-black text-xl">{p.rating}</span>
                </div>
                <div className="text-sm text-gray-600">{p.reviews} reviews</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-xl text-center border-2 border-purple-300">
                <Eye className="mx-auto mb-2 text-purple-600" size={24} />
                <div className="text-2xl font-black text-gray-900">{p.views}</div>
                <div className="text-sm text-gray-600">Profile Views</div>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-red-100 p-4 rounded-xl text-center border-2 border-pink-300">
                <Heart className="mx-auto mb-2 text-pink-600" size={24} />
                <div className="text-2xl font-black text-gray-900">{p.likes + (isFaved(p.id) ? 1 : 0)}</div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-teal-100 p-4 rounded-xl text-center border-2 border-green-300">
                <Calendar className="mx-auto mb-2 text-green-600" size={24} />
                <div className="text-2xl font-black text-gray-900">{p.bookings}</div>
                <div className="text-sm text-gray-600">Bookings</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-gray-900 mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">{p.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-gray-900 mb-3">Pricing & Availability</h3>
              <div className="flex gap-6">
                <div className="flex-1 bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Price Range</div>
                  <div className="text-2xl font-black text-pink-600">{p.price}</div>
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Response Time</div>
                  <div className="text-2xl font-black text-green-600">{p.responseTime}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-gray-900 mb-3">Social Media</h3>
              <div className="flex gap-3">
                {p.socials.instagram && (
                  <a href="#" className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition">
                    <Instagram size={20} /> {p.socials.instagram}
                  </a>
                )}
                {p.socials.facebook && (
                  <a href="#" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition">
                    <Facebook size={20} /> Facebook
                  </a>
                )}
                {p.socials.youtube && (
                  <a href="#" className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition">
                    <Youtube size={20} /> YouTube
                  </a>
                )}
                {p.socials.website && (
                  <a href="#" className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition">
                    <Globe size={20} /> Website
                  </a>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {setShowBookingModal(false); setCurrentView('messages');}}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full font-black text-lg hover:scale-105 transition transform flex items-center justify-center gap-2"
              >
                <Calendar size={24} /> REQUEST BOOKING
              </button>
              <button 
                onClick={() => {setShowBookingModal(false); setCurrentView('messages');}}
                className="px-8 py-4 bg-white border-2 border-gray-300 rounded-full font-bold hover:bg-gray-100 transition flex items-center gap-2"
              >
                <MessageCircle size={20} /> Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
      {renderHeader()}
      {currentView === 'home' && renderHome()}
      {currentView === 'signup' && renderSignup()}
      {currentView === 'messages' && renderMessages()}
      {currentView === 'admin' && renderAdmin()}
      {renderBookingModal()}

      <footer className="bg-black bg-opacity-80 text-white py-12 border-t-4 border-pink-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-black text-yellow-400 mb-4">BOOKEDUP</h4>
              <p className="text-sm">The UK's most exciting entertainment booking platform.</p>
            </div>
            <div>
              <h5 className="font-bold mb-3">For Venues</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-400">Browse Acts</a></li>
                <li><a href="#" className="hover:text-yellow-400">How It Works</a></li>
                <li><a href="#" className="hover:text-yellow-400">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-3">For Performers</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-400">Sign Up</a></li>
                <li><a href="#" className="hover:text-yellow-400">Premium Plans</a></li>
                <li><a href="#" className="hover:text-yellow-400">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-3">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-400">Help Centre</a></li>
                <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
                <li><button onClick={() => setUserType('admin')} className="hover:text-yellow-400">Admin Login</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>© 2025 BookedUp. Making entertainment booking fun since 2025. 🎉</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookedUp;
