import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SpotifyIcon, AppleMusicIcon } from './icons/BrandIcons';
import type { FeaturedRelease } from '../config/releaseData';

interface HeroProps {
  release: FeaturedRelease;
  /** Small label above the title, e.g. "New EP · Out Now". */
  eyebrow: string;
}

const formatLongDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const Hero = ({ release, eyebrow }: HeroProps) => {
  const { title, coverArt, coverArtSmall, accent, spotifyLink, appleMusicLink, amazonLink, tracks, releaseDateISO } = release;

  return (
    <section className="relative w-full min-h-[calc(100svh-5rem)] flex items-center justify-center overflow-hidden py-20">
      {/* Background: the cover itself, blown up and blurred into a wash of its own colors */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-center scale-125"
        style={{ backgroundImage: `url(${coverArtSmall})`, filter: 'blur(40px) saturate(1.2) brightness(0.4)' }}
      />
      <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/20 to-[#0a0a0a]" />
      <div aria-hidden className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0a_95%)]" />

      <div className="relative z-20 grid lg:grid-cols-[auto_1fr] items-center gap-12 lg:gap-20 px-6 max-w-6xl mx-auto w-full">
        {/* Cover, framed like a developed photo print */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mx-auto"
        >
          <div className="bg-[#f2efe8] p-3 md:p-4 shadow-[0_30px_80px_rgba(0,0,0,0.7)] w-64 sm:w-72 lg:w-[22rem] 2xl:w-[26rem]">
            <img
              src={coverArt}
              alt={`${title} cover art`}
              width={1200}
              height={1200}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full aspect-square object-cover"
            />
            {/* Hand-written caption (Colin's own Sharpie scan) in the polaroid's thick bottom border.
                The strip is a fixed proportion of the frame width so the caption scales with the polaroid. */}
            <div className="flex items-center justify-center aspect-[100/34] pt-1">
              <picture className="h-[92%]">
                <source srcSet="/tngb-handwritten.webp" type="image/webp" />
                <img
                  src="/tngb-handwritten.png"
                  alt={title}
                  width={900}
                  height={756}
                  decoding="async"
                  className="h-full w-auto -rotate-[3deg] select-none pointer-events-none"
                  draggable={false}
                />
              </picture>
            </div>
          </div>
        </motion.div>

        {/* Copy + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
          className="text-center lg:text-left"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-5" style={{ color: accent }}>
            {eyebrow}
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl 2xl:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            {title}
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 mb-10">
            Colin Cherry &middot; {formatLongDate(releaseDateISO)} &middot; {tracks.length} songs
          </p>

          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
            <a
              href={spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#1DB954] text-black px-7 py-3.5 rounded-full font-black uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all hover:bg-[#1ed760] w-full sm:w-auto"
            >
              <SpotifyIcon className="w-[15px] h-[15px]" />
              Listen on Spotify
            </a>
            <a
              href={appleMusicLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#FA243C] text-white px-7 py-3.5 rounded-full font-black uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all hover:bg-[#fb4a5f] w-full sm:w-auto"
            >
              <AppleMusicIcon className="w-[15px] h-[15px]" />
              Apple Music
            </a>
          </div>
          {amazonLink && (
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-colors"
            >
              Also on Amazon Music
            </a>
          )}
        </motion.div>
      </div>

      <a
        href="#listen"
        aria-label="Scroll to the tracklist"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40 hover:text-white transition-colors motion-safe:animate-bounce"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
};

export default Hero;
