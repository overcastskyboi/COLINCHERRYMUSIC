import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
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
      // Append the current year (2026) to the month-day format
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

  const dismiss = () => {
    if (nextRelease) {
      setIsVisible(false);
      onVisibilityChange?.(false);
      localStorage.setItem(`preSaveDismissed_${nextRelease.title}`, 'true');
    }
  };

  if (!nextRelease) return null;

  const formattedDate = nextRelease.date.toUpperCase();

  // Create elegant marquee text with large gaps and bullets
  const singleMarqueeItem = `PRE-SAVE "${nextRelease.title}" — OUT ${formattedDate} \u00A0\u00A0\u00A0\u2022\u00A0\u00A0\u00A0 `;
  const marqueeText = singleMarqueeItem.repeat(15);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative overflow-hidden bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] py-3"
        >
          <div className="relative flex items-center w-full">
            <div className="whitespace-nowrap animate-marquee-slow flex items-center">
              <span>{marqueeText}</span>
              <span>{marqueeText}</span>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white pl-8 pr-6 h-full flex items-center z-10 shadow-[-30px_0_30px_rgba(255,255,255,1)]">
               <a 
                 href={nextRelease.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 hover:opacity-70 transition-opacity border-b-2 border-black mr-8"
               >
                 PRE-SAVE <ArrowRight size={12} strokeWidth={3} />
               </a>
               <button onClick={dismiss} className="p-1 hover:scale-125 transition-transform">
                 <X size={16} strokeWidth={3} />
               </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreSaveBanner;
