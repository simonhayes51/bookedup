// src/components/BookedUp.jsx
import React, { useState, useEffect } from 'react';
import {
  Search, Star, MapPin, Calendar, Music, Sparkles, TrendingUp, CheckCircle, Award,
  MessageCircle, Send, X, Menu, Users, DollarSign, Activity, Instagram, Facebook,
  Youtube, Globe, Clock, Heart, Eye, AlertCircle
} from 'lucide-react';

/* ---------- tiny utilities ---------- */
const LS = {
  get: (k, defVal) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : defVal; } catch { return defVal; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};
const ADMIN_CODE = import.meta.env?.VITE_ADMIN_CODE || 'BOOKEDUP2025';

/* ---------- hash router ---------- */
const VIEWS = ['home','signup','messages','admin','favourites','how','pricing'];
const getViewFromHash = () => {
  const raw = (window.location.hash || '').replace(/^#\/?/, '');
  return VIEWS.includes(raw) ? raw : 'home';
};
const navigate = (view) => { window.location.hash = `/${view}`; };

/* ---------- demo data ---------- */
const seedPerformers = [
  { id:1, name:"The Neon Beats", genre:"DJ", location:"Manchester", rating:4.9, reviews:127, price:"£300-500",
    image:"https://images.unsplash.com/photo-1571266028243-d220c6c65921?w=800&h=600&fit=crop",
    verified:true, premium:true, responseTime:"< 2 hours", description:"High-energy DJ...", socials:{ instagram:"@neonbeats" },
    views:1243, likes:342, bookings:89 },
  { id:2, name:"Sarah Jones Live", genre:"Singer", location:"London", rating:5.0, reviews:89, price:"£400-700",
    image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
    verified:true, premium:true, responseTime:"< 1 hour", description:"Stunning vocals...", socials:{ instagram:"@sarahjones" },
    views:2156, likes:567, bookings:134 },
  { id:3, name:"Comedy Kings", genre:"Comedy", location:"Birmingham", rating:4.7, reviews:64, price:"£250-400",
    image:"https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&h=600&fit=crop",
    verified:true, premium:false, responseTime:"< 4 hours", description:"Stand-up duo...", socials:{ instagram:"@comedykings" },
    views:876, likes:234, bookings:52 },
  { id:4, name:"Retro Groove Band", genre:"Band", location:"Leeds", rating:4.8, reviews:112, price:"£500-800",
    image:"https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
    verified:true, premium:true, responseTime:"< 3 hours", description:"5-piece classics...", socials:{ instagram:"@retrogroove" },
    views:1789, likes:445, bookings:97 },
];

const conversations = [
  { id:1, performer:"The Neon Beats", lastMessage:"Sounds great! I'm available on that date.", time:"10m ago", unread:2 },
  { id:2, performer:"Sarah Jones Live", lastMessage:"What time would you need me to arrive?", time:"1h ago", unread:0 },
];

const genres = ['all','DJ','Singer','Band','Comedy'];

/* ==================================================================== */
const BookedUp = () => {
  /* router */
  const [currentView, setCurrentView] = useState(getViewFromHash());
  useEffect(() => {
    const onHash = () => setCurrentView(getViewFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  /* app state */
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPerformer, setSelectedPerformer] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const [favoriteActs, setFavoriteActs] = useState(() => LS.get('favoriteActs', []));
  useEffect(() => LS.set('favoriteActs', favoriteActs), [favoriteActs]);

  /* admin + applications persisted */
  const [adminAuthed, setAdminAuthed] = useState(() => LS.get('adminAuthed', false));
  const [applications, setApplications] = useState(() => LS.get('applications', []));
  useEffect(() => LS.set('applications', applications), [applications]);

  /* signup form */
  const [signupData, setSignupData] = useState({
    name:'', email:'', genre:'', location:'', price:'', description:'',
    instagram:'', facebook:'', youtube:'', website:'', photos:[]
  });

  const performers = seedPerformers; // could be fetched later

  const filteredPerformers = performers.filter(p =>
    (selectedGenre === 'all' || p.genre === selectedGenre) &&
    (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     p.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  /* helpers */
  const toggleFav = (e, id) => {
    e?.stopPropagation?.();
    setFavoriteActs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    const rec = {
      id,
      name: signupData.name.trim(),
      genre: signupData.genre,
      location: signupData.location.trim(),
      price: signupData.price.trim(),
      email: signupData.email.trim(),
      description: signupData.description.trim(),
      socials: {
        instagram: signupData.instagram || '',
        facebook: signupData.facebook || '',
        youtube: signupData.youtube || '',
        website: signupData.website || '',
      },
      appliedDate: new Date().toISOString().slice(0,10),
      status: 'pending'
    };
    setApplications([rec, ...applications]);
    alert('Application submitted! Our team will review it shortly.');
    setSignupData({name:'',email:'',genre:'',location:'',price:'',description:'',instagram:'',facebook:'',youtube:'',website:'',photos:[]});
    navigate('home');
  };

  /* ------------- header ------------- */
  const Header = () => (
    <header className="bg-black/50 backdrop-blur-md border-b-2 border-yellow-400 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="#/home" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-lg flex items-center justify-center -rotate-12">
              <Sparkles className="text-black" size={22} />
            </div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300"
                style={{textShadow:'1px 1px 0 rgba(0,0,0,.25)', fontFamily:'Impact, sans-serif'}}>
              BOOKEDUP
            </h1>
          </a>

          <nav className="hidden md:flex gap-6 items-center">
            <a href="#/home" className="text-white font-bold hover:text-yellow-300">Browse Acts</a>
            <a href="#/signup" className="text-white font-bold hover:text-yellow-300">Join as Performer</a>
            <a href="#/favourites" className="text-white font-bold hover:text-yellow-300 flex items-center gap-1">
              <Heart size={18} /> {favoriteActs.length}
            </a>
            <a href="#/messages" className="text-white font-bold hover:text-yellow-300"><MessageCircle size={20} /></a>
            <a href="#/admin" className="text-white font-bold hover:text-yellow-300 flex items-center gap-1">
              <Users size={18} /> Admin
            </a>
            <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-5 py-2 rounded-full font-black hover:scale-105">
              Sign In
            </button>
          </nav>

          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );

  /* ------------- home ------------- */
  const renderHome = () => (
    <>
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6"
              style={{textShadow:'4px 4px 0 rgba(0,0,0,.5)', fontFamily:'Impact, sans-serif'}}>
            BOOK THE BEST<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">
              ENTERTAINMENT
            </span>
          </h2>
          <p className="text-xl text-white mb-8 font-bold" style={{textShadow:'2px 2px 0 rgba(0,0,0,.3)'}}>
            DJs &bull; Bands &bull; Singers &bull; Comedians &mdash; All in One Place
          </p>

          <div className="bg-white rounded-full p-2 shadow-2xl max-w-2xl mx-auto flex items-center gap-2 border-2 border-yellow-400">
            <Search className="ml-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by act name or location..."
              className="flex-1 px-4 py-2 outline-none text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-6 py-2 rounded-full font-black hover:scale-105">
              SEARCH
            </button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-6">
            {genres.map(genre => (
              <button key={genre} onClick={() => setSelectedGenre(genre)}
                className={`px-5 py-2 rounded-full font-bold border-2 transition
                  ${selectedGenre===genre ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-white/20 text-white border-white'}`}>
                {genre === 'all' ? '✨ ALL' : genre.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black/60 backdrop-blur-md border-y-2 border-yellow-400 py-6">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><div className="text-3xl font-black text-yellow-400">2,500+</div><div className="text-white font-bold">Acts Listed</div></div>
          <div><div className="text-3xl font-black text-pink-400">15,000+</div><div className="text-white font-bold">Bookings Made</div></div>
          <div><div className="text-3xl font-black text-purple-400">4.8★</div><div className="text-white font-bold">Avg Rating</div></div>
          <div><div className="text-3xl font-black text-orange-400">98%</div><div className="text-white font-bold">Success Rate</div></div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-black text-white" style={{textShadow:'3px 3px 0 rgba(0,0,0,.3)'}}>🔥 FEATURED ACTS</h3>
          <button className="text-yellow-300 font-bold hover:text-yellow-400 flex items-center gap-2">
            View All <TrendingUp size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPerformers.map(p => (
            <div key={p.id}
              onClick={() => { setSelectedPerformer(p); setShowBookingModal(true); }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition cursor-pointer border-2 border-transparent hover:border-yellow-400">
              <div className="relative">
                <img src={p.image} alt={p.name} className="w-full h-56 object-cover" />
                {p.premium && <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full font-black text-xs flex items-center gap-1">
                  <Award size={14}/> PREMIUM
                </div>}
                {p.verified && <div className="absolute top-3 right-3 bg-blue-500 text-white p-2 rounded-full shadow">
                  <CheckCircle size={18}/>
                </div>}
                <button
                  onClick={(e) => toggleFav(e, p.id)}
                  className={`absolute bottom-3 right-3 rounded-full p-2 shadow ${favoriteActs.includes(p.id) ? 'bg-pink-500 text-white' : 'bg-white text-gray-700'}`}>
                  <Heart size={18}/>
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-xl font-black text-gray-900">{p.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600"><Music size={16}/><span className="font-bold">{p.genre}</span></div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-full">
                      <Star size={14} fill="currentColor" /><span className="font-black">{p.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">{p.reviews} reviews</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2"><MapPin size={16}/><span className="font-semibold">{p.location}</span></div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div><div className="text-xs text-gray-500">Price</div><div className="text-lg font-black text-pink-600">{p.price}</div></div>
                  <div className="text-right"><div className="text-xs text-gray-500">Response</div><div className="text-sm font-bold text-green-600">{p.responseTime}</div></div>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-full font-black hover:shadow">
                  VIEW PROFILE & BOOK
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black/60 backdrop-blur-md border-t-2 border-yellow-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-black text-white mb-4" style={{textShadow:'3px 3px 0 rgba(0,0,0,.5)'}}>ARE YOU A PERFORMER?</h3>
          <p className="text-xl text-white mb-6 font-bold max-w-2xl mx-auto">Join thousands of acts getting booked for amazing events across the UK!</p>
          <a href="#/signup" className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-black inline-block hover:scale-105">
            CREATE YOUR PROFILE NOW
          </a>
        </div>
      </section>
    </>
  );

  /* ------------- signup ------------- */
  const renderSignup = () => (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-yellow-400">
          <h2 className="text-4xl font-black text-gray-900 mb-2 text-center" style={{fontFamily:'Impact, sans-serif'}}>
            JOIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">BOOKEDUP</span>
          </h2>
          <p className="text-center text-gray-600 mb-6 text-base">Complete your profile and start getting booked today!</p>

          <form onSubmit={handleSignupSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Act Name *</label>
                <input required type="text" value={signupData.name}
                  onChange={(e)=>setSignupData({...signupData,name:e.target.value})}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-pink-500 outline-none"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                <input required type="email" value={signupData.email}
                  onChange={(e)=>setSignupData({...signupData,email:e.target.value})}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-pink-500 outline-none"/>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Genre *</label>
                <select required value={signupData.genre}
                  onChange={(e)=>setSignupData({...signupData,genre:e.target.value})}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-pink-500 outline-none">
                  <option value="">Select genre...</option>
                  <option value="DJ">DJ</option><option value="Singer">Singer</option>
                  <option value="Band">Band</option><option value="Comedy">Comedy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location *</label>
                <input required type="text" value={signupData.location}
                  onChange={(e)=>setSignupData({...signupData,location:e.target.value})}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-pink-500 outline-none"/>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price Range *</label>
              <input required type="text" value={signupData.price}
                onChange={(e)=>setSignupData({...signupData,price:e.target.value})}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-pink-500 outline-none" placeholder="£300-500"/>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
              <textarea required rows="4" value={signupData.description}
                onChange={(e)=>setSignupData({...signupData,description:e.target.value})}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-pink-500 outline-none"
                placeholder="Tell us about your act, experience, and what makes you unique..."/>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="text-xl font-black text-gray-900 mb-3">Social Media & Links</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Instagram size={16} className="text-pink-500"/> Instagram</label>
                  <input type="text" value={signupData.instagram}
                    onChange={(e)=>setSignupData({...signupData,instagram:e.target.value})}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-pink-500 outline-none" placeholder="@yourusername"/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Facebook size={16} className="text-blue-600"/> Facebook</label>
                  <input type="text" value={signupData.facebook}
                    onChange={(e)=>setSignupData({...signupData,facebook:e.target.value})}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-pink-500 outline-none" placeholder="YourPageName"/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Youtube size={16} className="text-red-600"/> YouTube</label>
                  <input type="text" value={signupData.youtube}
                    onChange={(e)=>setSignupData({...signupData,youtube:e.target.value})}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-pink-500 outline-none" placeholder="YourChannelName"/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Globe size={16} className="text-green-600"/> Website</label>
                  <input type="url" value={signupData.website}
                    onChange={(e)=>setSignupData({...signupData,website:e.target.value})}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-pink-500 outline-none" placeholder="https://yourwebsite.com"/>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="flex-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white py-3 rounded-full font-black text-lg hover:scale-105">
                SUBMIT APPLICATION
              </button>
              <a href="#/home" className="px-6 py-3 border-2 border-gray-300 rounded-full font-bold hover:bg-gray-100 inline-flex items-center">Cancel</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  /* ------------- messages ------------- */
  const renderMessages = () => (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-yellow-400" style={{height:'70vh'}}>
        <div className="flex h-full">
          {/* conversations list */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-pink-600">
              <h2 className="text-xl font-black text-white">Messages</h2>
            </div>
            {conversations.map(conv => (
              <div key={conv.id} onClick={()=>setSelectedConversation(conv)}
                   className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedConversation?.id===conv.id ? 'bg-pink-50':''}`}>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-900">{conv.performer}</h3>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-600 truncate flex-1">{conv.lastMessage}</p>
                  {conv.unread>0 && <span className="ml-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{conv.unread}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* thread */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-5 border-b bg-gray-50">
                  <h3 className="text-lg font-black text-gray-900">{selectedConversation.performer}</h3>
                  <p className="text-sm text-gray-500">Active now</p>
                </div>
                <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
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
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.sender==='me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`${m.sender==='me' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'} rounded-2xl px-4 py-3 shadow max-w-md`}>
                          <p>{m.text}</p>
                          <span className={`text-xs ${m.sender==='me' ? 'text-pink-200':'text-gray-500'} mt-1 block`}>{m.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e)=>setCurrentMessage(e.target.value)}
                      onKeyDown={(e)=>{ if(e.key==='Enter' && currentMessage.trim()){ setMessages([...messages, {text:currentMessage, sender:'me', time:'Just now'}]); setCurrentMessage(''); } }}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-full focus:border-pink-500 outline-none"
                    />
                    <button
                      onClick={()=>{ if(currentMessage.trim()){ setMessages([...messages, {text:currentMessage, sender:'me', time:'Just now'}]); setCurrentMessage(''); } }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full hover:scale-105">
                      <Send size={22}/>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageCircle size={56} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  /* ------------- admin ------------- */
  const renderAdmin = () => {
    const pending = applications.filter(a => a.status === 'pending');
    const approved = applications.filter(a => a.status === 'approved');
    const denied = applications.filter(a => a.status === 'denied');

    const setStatus = (id, status) => {
      const next = applications.map(a => a.id === id ? { ...a, status } : a);
      setApplications(next);
    };
    const review = (id) => {
      const a = applications.find(x => x.id===id);
      if (!a) return;
      alert(`Application:\n\n${a.name} (${a.genre})\n${a.location}\nPrice: ${a.price}\nEmail: ${a.email}\n\n${a.description}`);
    };

    if (!adminAuthed) {
      const tryLogin = () => {
        const code = prompt('Enter admin access code:');
        if (code && code === ADMIN_CODE) { setAdminAuthed(true); LS.set('adminAuthed', true); alert('Admin unlocked.'); }
        else if (code !== null) alert('Incorrect code.');
      };
      return (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-black text-white mb-6" style={{textShadow:'3px 3px 0 rgba(0,0,0,.3)'}}>ADMIN LOGIN</h2>
          <div className="bg-white rounded-2xl p-8 border-2 border-yellow-400">
            <p className="text-gray-700 mb-4">Restricted area. Click below and enter your admin access code.</p>
            <button onClick={tryLogin} className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-6 py-3 rounded-full font-black">Enter Code</button>
            <p className="text-xs text-gray-400 mt-4">Tip: set <code>VITE_ADMIN_CODE</code>. Fallback: BOOKEDUP2025.</p>
          </div>
        </section>
      );
    }

    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-black text-white mb-8" style={{textShadow:'3px 3px 0 rgba(0,0,0,.3)'}}>ADMIN DASHBOARD</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl border-2 border-white">
            <div className="text-3xl font-black text-white mb-2">{applications.length}</div>
            <div className="text-white font-bold">Total Applications</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-2xl border-2 border-white">
            <div className="text-3xl font-black text-white mb-2">{pending.length}</div>
            <div className="text-white font-bold">Pending Reviews</div>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 shadow-2xl border-2 border-white">
            <div className="text-3xl font-black text-white mb-2">{approved.length}</div>
            <div className="text-white font-bold">Approved</div>
          </div>
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 shadow-2xl border-2 border-white">
            <div className="text-3xl font-black text-white mb-2">{denied.length}</div>
            <div className="text-white font-bold">Denied</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-yellow-400 mb-8">
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2"><AlertCircle className="text-orange-500"/> Pending Applications</h3>
          <div className="space-y-4">
            {pending.map(app => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">{app.name}</h4>
                  <div className="flex gap-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1"><Music size={14}/> {app.genre}</span>
                    <span className="flex items-center gap-1"><MapPin size={14}/> {app.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> Applied {app.appliedDate}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={()=>setStatus(app.id,'approved')} className="bg-green-500 text-white px-5 py-2 rounded-full font-bold hover:bg-green-600">Approve</button>
                  <button onClick={()=>setStatus(app.id,'denied')} className="bg-red-500 text-white px-5 py-2 rounded-full font-bold hover:bg-red-600">Deny</button>
                  <button onClick={()=>review(app.id)} className="bg-blue-500 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-600">Review</button>
                </div>
              </div>
            ))}
            {pending.length===0 && <div className="text-gray-600">No pending applications.</div>}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-200">
          <h3 className="text-2xl font-black text-gray-900 mb-6">Decisioned</h3>
          <div className="space-y-3">
            {[...approved, ...denied].map(app => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <div className="flex-1">
                  <div className="font-bold">{app.name}</div>
                  <div className="text-sm text-gray-600">{app.genre} • {app.location}</div>
                </div>
                <div className="font-bold">{app.status==='approved' ? '✅ Approved' : '❌ Denied'}</div>
                <div><button onClick={()=>setStatus(app.id,'pending')} className="px-4 py-2 rounded-full border-2">Move to Pending</button></div>
              </div>
            ))}
            {approved.length+denied.length===0 && <div className="text-gray-600">Nothing here yet.</div>}
          </div>
        </div>
      </section>
    );
  };

  /* ------------- favourites ------------- */
  const renderFavourites = () => {
    const favs = performers.filter(p => favoriteActs.includes(p.id));
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-black text-white" style={{textShadow:'3px 3px 0 rgba(0,0,0,.3)'}}>❤️ Your Favourites</h3>
          {favs.length>0 && (
            <button onClick={()=>setFavoriteActs([])} className="text-sm px-4 py-2 rounded-full border-2 border-gray-300 font-bold hover:bg-gray-100">Clear all</button>
          )}
        </div>
        {favs.length===0 ? (
          <div className="bg-white/90 rounded-2xl p-10 text-center border-2 border-pink-400">
            <p className="text-lg font-bold text-gray-800 mb-3">No saved acts yet.</p>
            <a href="#/home" className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-black inline-block">Browse acts and tap “Save”</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favs.map(p => (
              <div key={p.id} onClick={()=>{ setSelectedPerformer(p); setShowBookingModal(true); }}
                   className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition cursor-pointer border-2 border-transparent hover:border-yellow-400">
                <div className="relative">
                  <img src={p.image} alt={p.name} className="w-full h-56 object-cover" />
                  <button onClick={(e)=>toggleFav(e,p.id)} className="absolute top-3 right-3 bg-white/90 text-gray-800 px-3 py-1 rounded-full font-bold shadow">Remove</button>
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-black text-gray-900 mb-1">{p.name}</h4>
                  <div className="text-gray-600 font-semibold">{p.genre} • {p.location}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-pink-600 font-black">{p.price}</div>
                    <div className="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-full">
                      <span className="font-black">{p.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

  /* ------------- booking modal ------------- */
  const renderBookingModal = () => {
    if (!showBookingModal || !selectedPerformer) return null;
    const p = selectedPerformer;
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-400">
          <div className="relative">
            <img src={p.image} alt={p.name} className="w-full h-72 object-cover rounded-t-3xl"/>
            <button onClick={()=>setShowBookingModal(false)} className="absolute top-4 right-4 bg-black/70 text-white p-3 rounded-full hover:bg-black/90">
              <X size={22}/>
            </button>
            {p.premium && <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-black flex items-center gap-2">
              <Award size={18}/> PREMIUM ACT
            </div>}
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-1">{p.name}</h2>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-2"><Music size={18}/><span className="font-bold">{p.genre}</span></span>
                  <span className="flex items-center gap-2"><MapPin size={18}/><span className="font-bold">{p.location}</span></span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full mb-1">
                  <Star size={18} fill="currentColor"/><span className="font-black text-lg">{p.rating}</span>
                </div>
                <div className="text-sm text-gray-600">{p.reviews} reviews</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-purple-100 p-3 rounded-xl text-center border-2 border-purple-300"><Eye className="mx-auto mb-1 text-purple-600" size={20}/><div className="text-xl font-black">{p.views}</div><div className="text-xs text-gray-600">Views</div></div>
              <div className="bg-pink-100 p-3 rounded-xl text-center border-2 border-pink-300"><Heart className="mx-auto mb-1 text-pink-600" size={20}/><div className="text-xl font-black">{p.likes}</div><div className="text-xs text-gray-600">Likes</div></div>
              <div className="bg-green-100 p-3 rounded-xl text-center border-2 border-green-300"><Calendar className="mx-auto mb-1 text-green-600" size={20}/><div className="text-xl font-black">{p.bookings}</div><div className="text-xs text-gray-600">Bookings</div></div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-black text-gray-900 mb-2">About</h3>
              <p className="text-gray-700">{p.description}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-black text-gray-900 mb-2">Pricing & Availability</h3>
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 p-3 rounded-xl border-2 border-gray-200"><div className="text-xs text-gray-500">Price Range</div><div className="text-xl font-black text-pink-600">{p.price}</div></div>
                <div className="flex-1 bg-gray-50 p-3 rounded-xl border-2 border-gray-200"><div className="text-xs text-gray-500">Response Time</div><div className="text-xl font-black text-green-600">{p.responseTime}</div></div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-black text-gray-900 mb-2">Social Media</h3>
              <div className="flex gap-3 flex-wrap">
                {p.socials?.instagram && <a href="#" className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold"><Instagram size={18}/> {p.socials.instagram}</a>}
                {p.socials?.facebook && <a href="#" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-bold"><Facebook size={18}/> Facebook</a>}
                {p.socials?.youtube && <a href="#" className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold"><Youtube size={18}/> YouTube</a>}
                {p.socials?.website && <a href="#" className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full font-bold"><Globe size={18}/> Website</a>}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={()=>{ setShowBookingModal(false); navigate('messages'); }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-black text-lg hover:scale-105 flex items-center justify-center gap-2">
                <Calendar size={22}/> REQUEST BOOKING
              </button>
              <button onClick={()=>{ setShowBookingModal(false); navigate('messages'); }}
                      className="px-6 py-3 bg-white border-2 border-gray-300 rounded-full font-bold hover:bg-gray-100 flex items-center gap-2">
                <MessageCircle size={18}/> Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ------------- simple pages ------------- */
  const renderHowItWorks = () => (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-8" style={{textShadow:'3px 3px 0 rgba(0,0,0,.3)'}}>HOW IT WORKS</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {title:'Search & Filter',desc:'Find the perfect act by genre, price, rating, location & availability.'},
          {title:'Chat & Confirm',desc:'Message acts directly, align on details, and confirm availability.'},
          {title:'Book Securely',desc:'Lock in your date with confidence and track everything in one place.'},
        ].map((s,i)=>(
          <div key={i} className="bg-white/95 rounded-2xl p-6 border-2 border-yellow-400">
            <h3 className="text-2xl font-black mb-2 text-gray-900">{s.title}</h3>
            <p className="text-gray-700">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#/home" className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-black inline-block">Start Browsing</a>
      </div>
    </section>
  );

  const renderPricing = () => (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-8" style={{textShadow:'3px 3px 0 rgba(0,0,0,.3)'}}>PRICING</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
          <h3 className="text-2xl font-black mb-2 text-gray-900">Free</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Create a profile</li><li>Basic search visibility</li><li>Messages & booking requests</li>
          </ul>
          <div className="mt-6"><a href="#/signup" className="px-6 py-3 rounded-full font-black border-2 border-gray-300 inline-block">Get Started</a></div>
        </div>
        <div className="bg-white rounded-2xl p-8 border-2 border-pink-400">
          <h3 className="text-2xl font-black mb-2 text-gray-900">Premium <span className="text-pink-600">£29.99/mo</span></h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Priority listings & premium badge</li><li>Advanced insights & lower fees</li><li>Featured placement & promos</li>
          </ul>
          <div className="mt-6"><a href="#/signup" className="px-6 py-3 rounded-full font-black bg-gradient-to-r from-yellow-400 to-pink-500 text-black inline-block">Upgrade Now</a></div>
        </div>
      </div>
    </section>
  );

  /* ------------- footer ------------- */
  const Footer = () => (
    <footer className="bg-black/80 text-white py-10 border-t-2 border-pink-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-black text-yellow-400 mb-3">BOOKEDUP</h4>
            <p className="text-sm">The UK's most exciting entertainment booking platform.</p>
          </div>
          <div>
            <h5 className="font-bold mb-2">For Venues</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#/home" className="hover:text-yellow-400">Browse Acts</a></li>
              <li><a href="#/how" className="hover:text-yellow-400">How It Works</a></li>
              <li><a href="#/pricing" className="hover:text-yellow-400">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">For Performers</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#/signup" className="hover:text-yellow-400">Sign Up</a></li>
              <li><a href="#/pricing" className="hover:text-yellow-400">Premium Plans</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Support</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#/how" className="hover:text-yellow-400">Help Centre</a></li>
              <li><a href="#/home" className="hover:text-yellow-400">Contact Us</a></li>
              <li><a href="#/admin" className="hover:text-yellow-400">Admin</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-xs">
          <p>© 2025 BookedUp. Making entertainment booking fun since 2025. 🎉</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
      <Header />
      {currentView === 'home' && renderHome()}
      {currentView === 'signup' && renderSignup()}
      {currentView === 'messages' && renderMessages()}
      {currentView === 'admin' && renderAdmin()}
      {currentView === 'favourites' && renderFavourites()}
      {currentView === 'how' && renderHowItWorks()}
      {currentView === 'pricing' && renderPricing()}
      {renderBookingModal()}
      <Footer />
    </div>
  );
};

export default BookedUp;
