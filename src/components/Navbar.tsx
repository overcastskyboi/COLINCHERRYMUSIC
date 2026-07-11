import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Music', path: '/music' },
    { name: 'Store', path: '/store' },
  ];

  return (
    <nav className="w-full glass-nav">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">
        <NavLink to="/" className="flex items-center gap-6 group">
          <img 
            src="/logo-textured.png" 
            alt="Colin Cherry Logo" 
            className="h-10 md:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-110" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="text-2xl font-display uppercase tracking-tighter transition-opacity group-hover:opacity-80">
            COLIN CHERRY
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-16">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `text-lg uppercase tracking-[0.5em] font-black transition-all hover:text-white ${isActive ? 'text-white' : 'text-white/60'}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white/75 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
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
            <div className="flex flex-col items-center py-12 gap-10">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `text-xl font-black uppercase tracking-[0.6em] transition-colors ${isActive ? 'text-white' : 'text-white/60'}`
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
