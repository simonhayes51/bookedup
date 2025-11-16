import { Link } from 'react-router-dom';
import { Music, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const navigation = {
    platform: [
      { name: 'Find Performers', href: '/performers' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Become a Performer', href: '/register?type=performer' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Safety', href: '/safety' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-900 via-black to-purple-900 text-white border-t-8 border-gradient-to-r border-pink-500">
      <div style={{ borderTop: '8px solid', borderImage: 'linear-gradient(to right, #FF10F0, #00F0FF, #FFFF00) 1' }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <Music className="h-10 w-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,0,0.8)]" />
              <span className="text-2xl font-black text-white uppercase tracking-wider neon-glow">BookedUp</span>
            </Link>
            <p className="text-sm mb-6 font-bold text-cyan-300">
              The UK's MOST RADICAL platform for booking entertainment! 🎸 Connect with talented performers for your TOTALLY AWESOME events! 🎉
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-black/30 px-3 py-2 border-2 border-cyan-400">
                <Mail className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-bold text-white">support@bookedup.com</span>
              </div>
              <div className="flex items-center space-x-3 bg-black/30 px-3 py-2 border-2 border-pink-500">
                <Phone className="h-5 w-5 text-pink-500" />
                <span className="text-sm font-bold text-white">+44 20 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3 bg-black/30 px-3 py-2 border-2 border-yellow-400">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-bold text-white">London, UK</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 uppercase tracking-wider mb-4 pb-2 border-b-4 border-pink-500">
              Platform
            </h3>
            <ul className="space-y-2">
              {navigation.platform.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm font-bold text-white hover:text-yellow-400 transition-colors flex items-center hover:translate-x-1 transform"
                  >
                    <span className="mr-2">▸</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 uppercase tracking-wider mb-4 pb-2 border-b-4 border-cyan-500">
              Company
            </h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm font-bold text-white hover:text-yellow-400 transition-colors flex items-center hover:translate-x-1 transform"
                  >
                    <span className="mr-2">▸</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 uppercase tracking-wider mb-4 pb-2 border-b-4 border-yellow-400">
              Support
            </h3>
            <ul className="space-y-2">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm font-bold text-white hover:text-yellow-400 transition-colors flex items-center hover:translate-x-1 transform"
                  >
                    <span className="mr-2">▸</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 uppercase tracking-wider mb-4 pb-2 border-b-4 border-purple-500">
              Legal
            </h3>
            <ul className="space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm font-bold text-white hover:text-yellow-400 transition-colors flex items-center hover:translate-x-1 transform"
                  >
                    <span className="mr-2">▸</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-4 border-gradient-to-r from-pink-500 via-cyan-500 to-yellow-400" style={{ borderImage: 'linear-gradient(to right, #FF10F0, #00F0FF, #FFFF00) 1' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm font-black uppercase text-cyan-400">
              © {new Date().getFullYear()} BookedUp. All rights reserved. STAY RADICAL! 🤘
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="bg-gradient-to-br from-pink-500 to-purple-500 p-3 border-4 border-black rounded-none hover:from-cyan-400 hover:to-yellow-400 transition-all retro-shadow transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
