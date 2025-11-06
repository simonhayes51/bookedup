import React, { useState } from 'react'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import BookedUp from './components/BookedUp.jsx'

export default function App() {
  // We'll render the full BookedUp component, which already manages its internal views.
  const [view, setView] = useState('home')
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
      <Header setView={setView} favCount={0} unread={0} isAdmin={true} />
      <BookedUp />
      <Footer setView={setView} />
    </div>
  )
}
