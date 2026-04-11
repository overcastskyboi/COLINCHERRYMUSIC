import { useEffect, useState } from 'react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';

interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  album_type: string;
}

const Discography = () => {
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch('/api/spotify');
        const data = await response.json();
        if (Array.isArray(data)) {
          setAlbums(data);
        }
      } catch (error) {
        console.error('Error fetching music:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-24 text-center max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-9xl font-display uppercase tracking-tighter mb-6 leading-none">Music</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">Official Streaming Catalog</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
            {albums.map((album, i) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square glass overflow-hidden mb-6 shadow-2xl">
                  <img
                    src={album.images[0]?.url}
                    alt={album.name}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6 backdrop-blur-sm">
                    <a
                      href={album.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl"
                    >
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </a>
                    <a
                      href={album.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 bg-white/10 border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all shadow-2xl"
                    >
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black uppercase tracking-tight truncate group-hover:text-white transition-colors">
                    {album.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">
                      {album.album_type}
                    </span>
                    <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">
                      {album.release_date.split('-')[0]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-32">
          {/* Main Embeds as backup/fallback */}
          <div className="glass p-1 shadow-2xl overflow-hidden rounded-xl">
             <iframe 
                src="https://open.spotify.com/embed/artist/2lCz91g9DugcZhbtvMnaUN?utm_source=generator&theme=0" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                style={{ borderRadius: '12px' }}
              ></iframe>
          </div>
          <div className="glass p-1 shadow-2xl overflow-hidden rounded-xl">
            <iframe 
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
              frameBorder="0" 
              height="352" 
              style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', borderRadius: '12px' }} 
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
              src="https://embed.music.apple.com/us/artist/colin-cherry/1639040887"
            ></iframe>
          </div>
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
