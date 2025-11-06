import React from 'react'

const Footer = ({ setView }) => (
  <footer className="bg-black/80 text-white py-12 border-t-4 border-pink-500">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-black text-yellow-400 mb-4">BOOKEDUP</h4>
          <p className="text-sm">The UK's most exciting entertainment booking platform.</p>
        </div>
        <div>
          <h5 className="font-bold mb-3">For Venues</h5>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => setView('home')} className="hover:text-yellow-400">Browse Acts</button></li>
            <li><a href="#" className="hover:text-yellow-400">How It Works</a></li>
            <li><a href="#" className="hover:text-yellow-400">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3">For Performers</h5>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => setView('signup')} className="hover:text-yellow-400">Sign Up</button></li>
            <li><a href="#" className="hover:text-yellow-400">Premium Plans</a></li>
            <li><a href="#" className="hover:text-yellow-400">Success Stories</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3">Support</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400">Help Centre</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
            <li><button onClick={() => setView('admin')} className="hover:text-yellow-400">Admin Login</button></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
        <p>© 2025 BookedUp. Making entertainment booking fun since 2025. 🎉</p>
      </div>
    </div>
  </footer>
)

export default Footer
