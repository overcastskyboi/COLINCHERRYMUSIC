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

  const status = isOut ? 'Out Now' : 'Pre-Save Now';
  // One marquee group = a handful of identical items. Two groups sit side by side and the
  // track slides by exactly one group width (-50%), so the loop is seamless.
  const group = (hidden: boolean) => (
    <div className="flex items-center flex-shrink-0" aria-hidden={hidden || undefined}>
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className="inline-flex items-center gap-4 px-8 md:px-12">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">New {release.kind}</span>
          <span className="font-lyric text-[13px] text-white/90 whitespace-nowrap">{release.title}</span>
          <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: release.accent }}>{status}</span>
          <span className="ml-8 md:ml-12 w-1 h-1 rounded-full bg-white/20" />
        </span>
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative overflow-hidden bg-[#0b1320]/95 backdrop-blur-md border-b border-white/5 z-50"
        >
          <a
            href={release.spotifyLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${release.title}, new ${release.kind}, ${status.toLowerCase()}. Listen on Spotify`}
            className="group/banner block py-2.5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          >
            <div className="flex w-max animate-marquee-slow group-hover/banner:[animation-play-state:paused]">
              {group(false)}
              {group(true)}
            </div>
          </a>

          <button
            onClick={dismiss}
            className="absolute right-0 inset-y-0 pl-6 pr-3 flex items-center bg-gradient-to-l from-[#0b1320] via-[#0b1320] to-transparent text-white/40 hover:text-white transition-colors"
            aria-label="Dismiss announcement"
            title="Dismiss"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreSaveBanner;
