import { NavLink } from 'react-router-dom';
import { Home, Music, PlayCircle, FileText, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Music', path: '/music', icon: <Music size={18} /> },
    { name: 'Videos', path: '/videos', icon: <PlayCircle size={18} /> },
    { name: 'EPK', path: '/epk', icon: <FileText size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 pointer-events-auto shadow-2xl">
        <NavLink to="/" className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
          COLIN CHERRY
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black transition-all hover:text-white ${isActive ? 'text-white' : 'text-white/30'}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="lg:hidden mt-4 glass p-8 space-y-8 pointer-events-auto flex flex-col items-center"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-6 text-sm font-black uppercase tracking-[0.4em] transition-colors ${isActive ? 'text-white' : 'text-white/30'}`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
