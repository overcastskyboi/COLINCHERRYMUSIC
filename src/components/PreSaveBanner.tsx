import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { upcomingReleases } from '../config/releaseData';

interface PreSaveBannerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

const PreSaveBanner = ({ onVisibilityChange }: PreSaveBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [nextRelease, setNextRelease] = useState<typeof upcomingReleases[0] | null>(null);

  useEffect(() => {
    const now = Date.now();
    
    const parseReleaseDate = (dateStr: string) => {
      if (dateStr === "PAST RELEASE") return 0;
      const parsed = Date.parse(`${dateStr}, ${new Date().getFullYear()}`);
      return isNaN(parsed) ? 0 : parsed;
    };

    const futureReleases = upcomingReleases
      .filter(release => parseReleaseDate(release.date) > now)
      .sort((a, b) => parseReleaseDate(a.date) - parseReleaseDate(b.date));

    if (futureReleases.length > 0) {
      const upcoming = futureReleases[0];
      setNextRelease(upcoming);
      
      const isDismissed = localStorage.getItem(`preSaveDismissed_${upcoming.title}`);
      if (!isDismissed) {
        setIsVisible(true);
        onVisibilityChange?.(true);
      } else {
        setIsVisible(false);
        onVisibilityChange?.(false);
      }
    } else {
      setIsVisible(false);
      onVisibilityChange?.(false);
    }
  }, [onVisibilityChange]);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (nextRelease) {
      setIsVisible(false);
      onVisibilityChange?.(false);
      localStorage.setItem(`preSaveDismissed_${nextRelease.title}`, 'true');
    }
  };

  if (!nextRelease) return null;

  const formattedDate = nextRelease.date.toUpperCase();

  // Create elegant marquee text with stars and tracking
  const singleMarqueeItem = `✦ PRE-SAVE NEW SINGLE "${nextRelease.title}" — OUT ${formattedDate} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 `;
  const marqueeText = singleMarqueeItem.repeat(15);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative overflow-hidden bg-[#0c0c0c]/80 backdrop-blur-md border-b border-white/5 text-white/75 font-black uppercase tracking-[0.25em] text-[9px] py-3 group/banner cursor-pointer z-50"
        >
          <div className="relative flex items-center w-full">
            <a 
              href={nextRelease.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full hover:text-white transition-colors flex items-center"
            >
              <div className="whitespace-nowrap animate-marquee-slow flex items-center">
                <span>{marqueeText}</span>
                <span>{marqueeText}</span>
              </div>
            </a>
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pl-4 bg-gradient-to-l from-[#0c0c0c]/90 via-[#0c0c0c]/70 to-transparent h-full flex items-center z-10">
               <button 
                 onClick={dismiss} 
                 className="p-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-black/80 text-white/70 hover:text-white transition-all hover:scale-110 z-20 flex items-center justify-center opacity-0 group-hover/banner:opacity-100"
                 title="Dismiss Announcement"
               >
                 <X size={12} strokeWidth={3} />
               </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreSaveBanner;
