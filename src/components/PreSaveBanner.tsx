import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { upcomingReleases, RELEASE_DATA } from '../config/releaseData';

interface PreSaveBannerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

interface BannerData {
  title: string;
  date: string;
  link: string;
  isAlbum: boolean;
}

const PreSaveBanner = ({ onVisibilityChange }: PreSaveBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bannerData, setBannerData] = useState<BannerData | null>(null);

  useEffect(() => {
    const now = Date.now();

    const parseReleaseDate = (dateStr: string) => {
      if (dateStr === "PAST RELEASE") return 0;
      const parsed = Date.parse(`${dateStr}, ${new Date().getFullYear()}`);
      return isNaN(parsed) ? 0 : parsed;
    };

    // Only count releases that have their own standalone link -- unreleased album
    // tracks (e.g. "Only Human") fall back to the album link and are not singles.
    const futureSingles = upcomingReleases
      .filter(release => release.hasOwnLink && parseReleaseDate(release.date) > now)
      .sort((a, b) => parseReleaseDate(a.date) - parseReleaseDate(b.date));

    let data: BannerData | null = null;

    if (futureSingles.length > 0) {
      const upcoming = futureSingles[0];
      data = { title: upcoming.title, date: upcoming.date, link: upcoming.link, isAlbum: false };
    } else if (RELEASE_DATA.rollout.showTeaser) {
      data = {
        title: RELEASE_DATA.rollout.albumTitle,
        date: RELEASE_DATA.rollout.targetMonth.toUpperCase(),
        link: RELEASE_DATA.rollout.spotifyPreSaveLink,
        isAlbum: true,
      };
    }

    setBannerData(data);

    if (data) {
      const dismissKey = `preSaveDismissed_${data.title}`;
      const isDismissed = localStorage.getItem(dismissKey);
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
    if (bannerData) {
      setIsVisible(false);
      onVisibilityChange?.(false);
      localStorage.setItem(`preSaveDismissed_${bannerData.title}`, 'true');
    }
  };

  if (!bannerData) return null;

  const formattedDate = bannerData.date.toUpperCase();

  const singleMarqueeItem = bannerData.isAlbum
    ? `✦ PRE-SAVE THE ALBUM "${bannerData.title}" — OUT ${formattedDate}        `
    : `✦ PRE-SAVE NEW SINGLE "${bannerData.title}" — OUT ${formattedDate}        `;
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
              href={bannerData.link}
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
