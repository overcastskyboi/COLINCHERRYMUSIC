import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CURRENT_RELEASE, isReleased } from '../config/releaseData';

interface PreSaveBannerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

// Announcement marquee for whatever CURRENT_RELEASE is: "pre-save" before release
// day, "out now" after. Dismissal is remembered per release title.
const PreSaveBanner = ({ onVisibilityChange }: PreSaveBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const release = CURRENT_RELEASE;
  const dismissKey = `releaseBannerDismissed_${release.title}`;
  const isOut = isReleased(release.releaseDateISO);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(dismissKey) === 'true';
    } catch {
      dismissed = false;
    }
    setIsVisible(!dismissed);
    onVisibilityChange?.(!dismissed);
  }, [dismissKey, onVisibilityChange]);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    onVisibilityChange?.(false);
    try {
      localStorage.setItem(dismissKey, 'true');
    } catch {
      /* storage unavailable: dismissal just won't persist */
    }
  };

  const message = isOut
    ? `NEW ${release.kind.toUpperCase()} "${release.title.toUpperCase()}" OUT NOW EVERYWHERE`
    : `PRE-SAVE THE NEW ${release.kind.toUpperCase()} "${release.title.toUpperCase()}"`;
  const marqueeText = Array(12).fill(message).join('   ✦   ') + '   ✦   ';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative overflow-hidden bg-[#0b1320]/90 backdrop-blur-md border-b border-white/5 font-black uppercase tracking-[0.25em] text-[9px] py-3 group/banner z-50"
          style={{ color: release.accent }}
        >
          <div className="relative flex items-center w-full">
            <a
              href={release.spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full hover:text-white transition-colors flex items-center"
            >
              <div className="whitespace-nowrap animate-marquee-slow flex items-center">
                <span>{marqueeText}</span>
                <span aria-hidden>{marqueeText}</span>
              </div>
            </a>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 pl-4 bg-gradient-to-l from-[#0b1320] via-[#0b1320]/80 to-transparent h-full flex items-center z-10">
              <button
                onClick={dismiss}
                className="p-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-black/80 text-white/70 hover:text-white transition-all hover:scale-110 flex items-center justify-center md:opacity-0 md:group-hover/banner:opacity-100 focus:opacity-100"
                aria-label="Dismiss announcement"
                title="Dismiss announcement"
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
