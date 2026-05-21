import { useEffect, useState } from 'react';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play, X, Music as MusicIcon } from 'lucide-react';
import { upcomingReleases } from '../config/releaseData';
import LyricModal from '../components/LyricModal';

interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  album_type: string;
}

const LYRICS_CACHE: Record<string, string> = {
  'Dark Ether': `Neon signs in the rearview mirror\nThe nights are getting clearer\nCalculated chaos in my veins\nSystems failing, break the chains\n\n(Chorus)\nIn the dark ether, I find my peace\nAtmospheric tension, sweet release\nFrom the 317 to the void beyond\nThe digital heart has grown so fond`,
  'Neon Nights': `Static on the line, air is getting thin\nWondering where the dream ends and life begins\nIndustrial textures, grit and bone\nBuilding empires on a throne of chrome\n\n(Chorus)\nNeon nights are all we have\nWalking down the empty path\nFlicker once then fade to grey\nNoir is here to stay`,
};

const Discography = () => {
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbum | null>(null);
  const [selectedLyrics, setSelectedLyrics] = useState<{title: string, lyrics: string, themeColor: string} | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => 
            new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
          );
          setAlbums(sorted);
        } else {
          setAlbums([]);
        }
      } catch (err) {
        console.error('Error fetching music:', err);
        setError('Unable to load music catalog.');
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

        {/* Interactive Gallery for Upcoming */}
        <section className="mb-32">
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-12 flex items-center gap-4">
            Upcoming Releases <span className="h-px flex-grow bg-white/5"></span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {upcomingReleases.map((release) => (
              <button 
                key={release.title}
                onClick={() => setSelectedLyrics({title: release.title, lyrics: release.lyrics, themeColor: release.themeColor})}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
              >
                <img src={release.art} alt={release.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-black uppercase tracking-widest text-white">View Lyrics</span>
                </div>
              </button>
            ))}
          </div>
        </section>
        
        {selectedLyrics && (
          <LyricModal
            isOpen={!!selectedLyrics}
            onClose={() => setSelectedLyrics(null)}
            title={selectedLyrics.title}
            lyrics={selectedLyrics.lyrics}
            themeColor={selectedLyrics.themeColor}
          />
        )}

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : error ? (
            <div className="text-center py-40 text-white/40 space-y-4">
                <MusicIcon size={48} className="mx-auto" />
                <p className="uppercase tracking-widest text-xs font-black">{error}</p>
            </div>
        ) : albums.length === 0 ? (
            <div className="text-center py-40 text-white/40">
                <p>No music found.</p>
            </div>
        ) : (
          <>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-12 flex items-center gap-4">
              Catalog <span className="h-px flex-grow bg-white/5"></span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
              {albums.map((album, i) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="relative aspect-square glass overflow-hidden mb-6 shadow-2xl">
                    <img
                      src={album.images[0]?.url}
                      alt={album.name}
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-2xl">
                        <Play size={24} fill="currentColor" className="ml-1" />
                      </div>
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
          </>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedAlbum && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
              onClick={() => setSelectedAlbum(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="glass w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedAlbum(null)}
                  className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
                >
                  <X size={32} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <div className="aspect-square glass overflow-hidden rounded-xl">
                       <img src={selectedAlbum.images[0]?.url} alt={selectedAlbum.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-4">
                       <iframe 
                          src={`https://open.spotify.com/embed/album/${selectedAlbum.id}?utm_source=generator&theme=0`} 
                          width="100%" 
                          height="152" 
                          frameBorder="0" 
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                          loading="lazy"
                          className="rounded-xl"
                        ></iframe>
                        <a 
                          href={selectedAlbum.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 py-4 glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                          View on Spotify <ExternalLink size={14} />
                        </a>
                    </div>
                  </div>

                  <div className="space-y-12">
                    <div>
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2 leading-none">{selectedAlbum.name}</h2>
                      <p className="text-[10px] uppercase font-black tracking-[0.4em] text-white/20">{selectedAlbum.album_type} &bull; {selectedAlbum.release_date}</p>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 border-b border-white/5 pb-4">Lyrics</h4>
                       <pre className="font-mono text-sm md:text-base leading-relaxed text-white/40 whitespace-pre-wrap">
                         {LYRICS_CACHE[selectedAlbum.name] || "Lyrics coming soon."}
                       </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Discography;
