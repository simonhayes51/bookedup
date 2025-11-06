import React from 'react'
import { Sparkles, MessageCircle, Heart, Settings, Bell } from 'lucide-react'

const Header = ({ setView, favCount = 0, unread = 0, isAdmin = false }) => {
  return (
    <header className="bg-black/50 backdrop-blur-md border-b-4 border-yellow-400 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-lg flex items-center justify-center -rotate-12">
              <Sparkles className="text-black" size={28} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300" 
                style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.3)', fontFamily: 'Impact, sans-serif' }}>
              BOOKEDUP
            </h1>
          </div>
          <nav className="hidden md:flex gap-4 items-center">
            <button onClick={() => setView('home')} className="text-white font-bold hover:text-yellow-300 transition">Browse Acts</button>
            <button onClick={() => setView('signup')} className="text-white font-bold hover:text-yellow-300 transition">Join as Performer</button>
            <button onClick={() => setView('favourites')} className="text-white font-bold hover:text-yellow-300 transition relative">
              <Heart size={22} />
              {favCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{favCount}</span>
              )}
            </button>
            <button onClick={() => setView('messages')} className="text-white font-bold hover:text-yellow-300 transition relative">
              <MessageCircle size={24} />
            </button>
            {isAdmin && (
              <button onClick={() => setView('admin')} className="text-white font-bold hover:text-yellow-300 transition flex items-center gap-2">
                <Settings size={20} /> Admin
              </button>
            )}
            <button className="relative text-white hover:text-yellow-300 transition">
              <Bell size={22} />
              {unread > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">{unread}</span>
              )}
            </button>
            <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-6 py-2 rounded-full font-black hover:scale-105 transition">Sign In</button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
