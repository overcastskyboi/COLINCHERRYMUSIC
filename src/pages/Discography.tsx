import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const Discography = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-24 text-center max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-9xl font-display uppercase tracking-tighter mb-6 leading-none">Music</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">Official Streaming Catalog</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-32">
          {/* Spotify Embed */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="glass p-1 shadow-2xl"
          >
            <iframe 
              src="https://open.spotify.com/embed/artist/2lCz91g9DugcZhbtvMnaUN?utm_source=generator&theme=0" 
              width="100%" 
              height="450" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="spotify-embed"
            ></iframe>
          </motion.div>
          
          {/* Apple Music Embed */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="glass p-1 shadow-2xl"
          >
            <iframe 
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
              frameBorder="0" 
              height="450" 
              style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', borderRadius: '12px' }} 
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
              src="https://embed.music.apple.com/us/artist/colin-cherry/1639040887"
            ></iframe>
          </motion.div>
        </div>

        {/* Pure Aesthetic Section */}
        <div className="relative py-40 flex items-center justify-center opacity-10">
           <h2 className="text-5xl md:text-8xl font-display uppercase tracking-[1em] text-white">MIDWEST</h2>
        </div>
      </div>
    </PageTransition>
  );
};

export default Discography;
