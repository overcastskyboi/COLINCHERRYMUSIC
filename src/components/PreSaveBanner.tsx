import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PreSaveBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('preSaveDismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem('preSaveDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[60] overflow-hidden bg-white text-black font-black uppercase tracking-[0.2em] text-[10px]"
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <span className="hidden sm:inline">New Single "Dark Ether" out soon</span>
               <a 
                 href="https://distrokid.com/hyperfollow/colincherry/dark-ether" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 hover:opacity-70 transition-opacity border-b border-black"
               >
                 Pre-Save Now <ArrowRight size={12} />
               </a>
            </div>
            <button onClick={dismiss} className="p-1 hover:scale-110 transition-transform">
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreSaveBanner;
