import { motion } from 'framer-motion';

interface HeroProps {
  latestDropTitle: string;
  artworkUrl: string;
  spotifyLink?: string;
  appleMusicLink?: string;
  subtitle?: string;
  spotifyBtnText?: string;
  appleMusicBtnText?: string;
}

const Hero = ({ 
  latestDropTitle = "LONELY", 
  artworkUrl = "/more-lonely.png",
  spotifyLink = "#",
  appleMusicLink = "#",
  subtitle = "Latest Release",
  spotifyBtnText = "Spotify Pre-Save",
  appleMusicBtnText = "Apple Music"
}: HeroProps) => {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Full-bleed Artwork Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center animate-pulse-slow"
        style={{ backgroundImage: `url(${artworkUrl})` }}
      />
      
      {/* Atmospheric Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />
 
      {/* Centered Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/75 mb-6">{subtitle}</h2>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-10 leading-none">{latestDropTitle}</h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            {spotifyLink && (
              <a 
                href={spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#1DB954] text-black px-8 py-4 rounded-full font-black uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all hover:bg-[#1ed760] hover:shadow-[0_0_30px_rgba(29,185,84,0.4)] w-full sm:w-auto justify-center"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-.982-.336.076-.67-.135-.746-.472-.076-.336.135-.67.472-.746 3.854-.878 7.15-.508 9.822 1.13.295.18.387.566.206.863zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.183-.41.125-.843-.105-.968-.515-.125-.41.105-.843.515-.968 3.666-1.112 8.24-.567 11.34 1.34.368.227.49.707.262 1.066zm.106-2.833C14.385 8.71 8.568 8.52 5.186 9.547c-.52.158-1.07-.143-1.227-.663-.158-.52.143-1.07.663-1.227 3.896-1.183 10.322-.96 14.388 1.454.468.278.622.88.344 1.347-.278.468-.88.622-1.347.344z"/>
                </svg>
                {spotifyBtnText}
              </a>
            )}
            {appleMusicLink && (
              <a 
                href={appleMusicLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#FC3C44] text-white px-8 py-4 rounded-full font-black uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all hover:bg-[#ff4f56] hover:shadow-[0_0_30px_rgba(252,60,68,0.4)] w-full sm:w-auto justify-center"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                </svg>
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
