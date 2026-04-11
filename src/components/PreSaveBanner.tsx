import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RELEASES = [
  { 
    title: 'ROSE', 
    date: '2026-04-24T00:00:00', 
    link: 'https://distrokid.com/hyperfollow/colincherry/rose?ref=release' 
  },
  { 
    title: 'HOLDING ON', 
    date: '2026-05-08T00:00:00', 
    link: 'https://distrokid.com/hyperfollow/colincherry/holding-on?ref=release' 
  },
  { 
    title: 'DIFFERENT', 
    date: '2026-05-22T00:00:00', 
    link: 'https://distrokid.com/hyperfollow/colincherry/different?ref=release' 
  }
];

const PreSaveBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [nextRelease, setNextRelease] = useState<typeof RELEASES[0] | null>(null);

  useEffect(() => {
    const now = Date.now();
    const futureReleases = RELEASES
      .filter(release => new Date(release.date).getTime() > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (futureReleases.length > 0) {
      const upcoming = futureReleases[0];
      setNextRelease(upcoming);
      
      const isDismissed = localStorage.getItem(`preSaveDismissed_${upcoming.title}`);
      if (!isDismissed) {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  }, []);

  const dismiss = () => {
    if (nextRelease) {
      setIsVisible(false);
      localStorage.setItem(`preSaveDismissed_${nextRelease.title}`, 'true');
    }
  };

  if (!nextRelease) return null;

  const formattedDate = new Date(nextRelease.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  }).toUpperCase();

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
               <span className="hidden sm:inline">PRE-SAVE "{nextRelease.title}" - OUT {formattedDate}</span>
               <a 
                 href={nextRelease.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 hover:opacity-70 transition-opacity border-b border-black"
               >
                 PRE-SAVE NOW <ArrowRight size={12} />
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
