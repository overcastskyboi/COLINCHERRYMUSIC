import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Music', path: '/discography' },
    { name: 'Visuals', path: '/visuals' },
    { name: 'Booking', path: '/booking' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
        <NavLink to="/" className="text-xl font-display uppercase tracking-tighter">
          COLIN CHERRY
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `text-[11px] uppercase tracking-[0.4em] font-black transition-all hover:text-white ${isActive ? 'text-white' : 'text-white/30'}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white/50 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass backdrop-blur-3xl overflow-hidden mx-4 mb-4"
          >
            <div className="flex flex-col items-center py-10 gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `text-xs font-black uppercase tracking-[0.5em] transition-colors ${isActive ? 'text-white' : 'text-white/30'}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
