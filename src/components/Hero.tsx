import { motion } from 'framer-motion';
import { SpotifyIcon, AppleMusicIcon } from './icons/BrandIcons';

interface HeroProps {
  latestDropTitle: string;
  artworkUrl: string;
  spotifyLink?: string;
  appleMusicLink?: string;
  subtitle?: string;
  spotifyBtnText?: string;
  appleMusicBtnText?: string;
  /** Optional: path to a muted looping video (mp4/webm). If set, plays as the full-bleed background. */
  videoUrl?: string;
  /** Optional: path to a press/promo photo to use as the full-bleed background instead of blurred album art. */
  backgroundPhotoUrl?: string;
}

const Hero = ({
  latestDropTitle = "GARFIELD PARK",
  artworkUrl = "/garfield-park.jpg",
  spotifyLink = "#",
  appleMusicLink = "#",
  subtitle = "Upcoming Album",
  spotifyBtnText = "Spotify Pre-Save",
  appleMusicBtnText = "iTunes Pre-Order",
  videoUrl,
  backgroundPhotoUrl,
}: HeroProps) => {
  return (
    <section className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden">

      {/* Background: video (if provided) or blurred artwork/press photo */}
      {videoUrl ? (
        <video
          className="absolute inset-0 z-0 w-full h-full object-cover"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : backgroundPhotoUrl ? (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundPhotoUrl})` }}
        />
      ) : (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${artworkUrl})`, filter: 'blur(18px) brightness(0.35)' }}
        />
      )}

      {/* Dark gradient overlay — heavier at top/bottom */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]" />
      {(videoUrl || backgroundPhotoUrl) && <div className="absolute inset-0 z-10 bg-[#0a0a0a]/45" />}

      {/* Centered content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-6 max-w-5xl mx-auto w-full">

        {/* Album art — the actual visible cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div className="relative w-56 h-56 md:w-72 md:h-72 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <img
              src={artworkUrl}
              alt={latestDropTitle}
              width={576}
              height={576}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
            {/* Subtle glow behind the cover */}
            <div className="absolute inset-0 -z-10 blur-2xl opacity-50 scale-110" style={{ backgroundImage: `url(${artworkUrl})`, backgroundSize: 'cover' }} />
          </div>
        </motion.div>

        {/* Text + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
          className="text-center md:text-left"
        >
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-4">{subtitle}</h2>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">{latestDropTitle}</h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 mb-10">Colin Cherry · August 1, 2026</p>

          <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
            {spotifyLink && (
              <a
                href={spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#1DB954] text-black px-7 py-3.5 rounded-full font-black uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all hover:bg-[#1ed760] hover:shadow-[0_0_30px_rgba(29,185,84,0.4)] w-full sm:w-auto justify-center"
              >
                <SpotifyIcon className="w-[15px] h-[15px]" />
                {spotifyBtnText}
              </a>
            )}
            {appleMusicLink && (
              <a
                href={appleMusicLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#FA243C] text-white px-7 py-3.5 rounded-full font-black uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all hover:bg-[#fb4a5f] hover:shadow-[0_0_30px_rgba(250,36,60,0.4)] w-full sm:w-auto justify-center"
              >
                <AppleMusicIcon className="w-[15px] h-[15px]" />
                {appleMusicBtnText}
              </a>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
