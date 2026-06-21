import { useEffect, useState } from 'react';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play, X } from 'lucide-react';
import { upcomingReleases } from '../config/releaseData';
import LyricModal from '../components/LyricModal';
import { Helmet } from 'react-helmet-async';
import catalogDb from '../config/catalogDb.json';
import lyricsDb from '../config/lyricsDb.json';

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
  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbum | null>(null);
  const [selectedLyrics, setSelectedLyrics] = useState<{title: string, lyrics: string, themeColor: string} | null>(null);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0);

  const now = Date.now();
  const parseReleaseDate = (dateStr: string) => {
    if (dateStr === "PAST RELEASE") return 0;
    const parsed = Date.parse(`${dateStr}, ${new Date().getFullYear()}`);
    return isNaN(parsed) ? 0 : parsed;
  };

  const futureReleasesOnly = upcomingReleases.filter(release => parseReleaseDate(release.date) > now);

  // Fallback albums from our local release data
  const localFallbackAlbums: SpotifyAlbum[] = upcomingReleases
    .filter(release => release.date === "PAST RELEASE" || parseReleaseDate(release.date) <= now)
    .map((release, i) => ({
      id: `local-fallback-${i}`,
      name: release.title,
      release_date: parseReleaseDate(release.date) > 0 
        ? new Date(parseReleaseDate(release.date)).toISOString().split('T')[0] 
        : '2025-01-01',
      images: [{ url: release.art }],
      external_urls: { spotify: release.link },
      album_type: 'single'
    }));

  // Build local database albums
  const localDbAlbums: SpotifyAlbum[] = catalogDb.albums.map((album, idx) => ({
    id: `local-db-${idx}`,
    name: album.title,
    release_date: album.releaseDate ? new Date(album.releaseDate).toISOString().split('T')[0] : '2026-08-01',
    images: [{ url: album.coverArt || "/different.jpg" }],
    external_urls: { spotify: album.spotifyLink || album.appleMusicLink || "#" },
    album_type: album.type
  }));

  // Back catalog singles/EPs from catalogDb.singles — these were previously parsed
  // but never rendered anywhere, so the whole pre-Garfield-Park catalog was invisible.
  // Skip anything already represented via localDbAlbums/localFallbackAlbums (the
  // Garfield Park tracks that have already been released, e.g. More Lonely, Different).
  const localSinglesAlbums: SpotifyAlbum[] = catalogDb.singles
    .filter(single => !upcomingReleases.some(r => r.title.toLowerCase() === single.title.toLowerCase()))
    .map((single, idx) => ({
      id: `local-single-${idx}`,
      name: single.title,
      release_date: single.releaseDate || '2025-01-01',
      images: [{ url: single.coverArt || "/different.jpg" }],
      external_urls: { spotify: single.spotifyLink || single.appleMusicLink || "#" },
      album_type: single.type
    }));

  useEffect(() => {
    setSelectedTrackIndex(0);
  }, [selectedAlbum]);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        
        if (Array.isArray(data) && data.length > 0) {
          const sorted = data.sort((a, b) => 
            new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
          );

          // Merge localDbAlbums at the beginning if not already present
          const merged = [...localDbAlbums, ...localSinglesAlbums];
          sorted.forEach(apiAlbum => {
            if (!merged.some(ma => ma.name.toLowerCase() === apiAlbum.name.toLowerCase())) {
              merged.push(apiAlbum);
            }
          });
          setAlbums(merged);
        } else {
          setAlbums([...localDbAlbums, ...localSinglesAlbums, ...localFallbackAlbums]);
        }
      } catch (err) {
        console.warn('Spotify API fetch failed. Using local fallback catalog:', err);
        setAlbums([...localDbAlbums, ...localSinglesAlbums, ...localFallbackAlbums]);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  const getLyricsForAlbum = (albumName: string) => {
    const matched = upcomingReleases.find(r => r.title.toLowerCase() === albumName.toLowerCase());
    if (matched) return matched.lyrics;
    const lyricsEntry = Object.entries(lyricsDb as Record<string, string>)
      .find(([title]) => title.toLowerCase() === albumName.toLowerCase());
    return lyricsEntry ? lyricsEntry[1] : "Lyrics coming soon.";
  };

  const getThemeColorForAlbum = (albumName: string) => {
    const matched = upcomingReleases.find(r => r.title.toLowerCase() === albumName.toLowerCase());
    return matched ? matched.themeColor : "#FFFFFF";
  };

  const getSpotifyEmbedUrl = (album: SpotifyAlbum) => {
    if (album.id.startsWith('local-db-')) {
      const dbIdx = parseInt(album.id.split('-').pop() || '0');
      const dbAlbum = catalogDb.albums[dbIdx];
      if (dbAlbum && dbAlbum.spotifyLink) {
        const match = dbAlbum.spotifyLink.match(/album\/([a-zA-Z0-9]+)/);
        if (match) return `https://open.spotify.com/embed/album/${match[1]}?utm_source=generator&theme=0`;
      }
      return null;
    }
    if (album.id.includes('local-fallback')) {
      return null;
    }
    return `https://open.spotify.com/embed/album/${album.id}?utm_source=generator&theme=0`;
  };

  // Find if current selected album is in our database
  const dbAlbum = selectedAlbum ? catalogDb.albums.find(a => a.title.toLowerCase() === selectedAlbum.name.toLowerCase()) : null;

  return (
    <PageTransition>
      <Helmet>
        <title>Colin Cherry | Music Catalog & Lyrics</title>
        <meta name="description" content="Explore Colin Cherry's full discography. View official album artwork, listen to streaming music, and read high-fidelity song lyrics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thecolincherry.com/music" />
        <meta property="og:title" content="Colin Cherry — Music Catalog" />
        <meta property="og:description" content="Explore every Colin Cherry release — singles, albums, and lyrics." />
        <meta property="og:image" content="https://www.thecolincherry.com/Garfield Park.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colin Cherry — Music Catalog" />
        <meta name="twitter:description" content="Explore every Colin Cherry release — singles, albums, and lyrics." />
        <meta name="twitter:image" content="https://www.thecolincherry.com/Garfield Park.jpg" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-24 text-center max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-9xl font-display uppercase tracking-tighter mb-6 leading-none">Music</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/60">Official Streaming Catalog</p>
        </header>

        {/* Interactive Gallery for Upcoming */}
        {futureReleasesOnly.length > 0 && (
          <section className="mb-32">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-12 flex items-center gap-4">
              Upcoming Releases <span className="h-px flex-grow bg-white/5"></span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {futureReleasesOnly.map((release) => (
                <button 
                  key={release.title}
                  onClick={() => setSelectedLyrics({title: release.title, lyrics: release.lyrics, themeColor: release.themeColor})}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
                >
                  <img 
                    src={release.art} 
                    alt={release.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => { e.currentTarget.src = "/different.jpg"; }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-black uppercase tracking-widest text-white">View Lyrics</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
        
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
        ) : albums.length === 0 ? (
          <div className="text-center py-40 text-white/70">
            <p>No music found.</p>
          </div>
        ) : (
          <>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-12 flex items-center gap-4">
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
                      onError={(e) => { e.currentTarget.src = "/different.jpg"; }}
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
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/65">
                        {album.album_type}
                      </span>
                      <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/65">
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
                  className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
                >
                  <X size={32} />
                </button>
 
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <div className="aspect-square glass overflow-hidden rounded-xl">
                      <img 
                        src={selectedAlbum.images[0]?.url} 
                        alt={selectedAlbum.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.currentTarget.src = "/different.jpg"; }}
                      />
                    </div>
                    <div className="space-y-4">
                      {getSpotifyEmbedUrl(selectedAlbum) ? (
                        <iframe 
                          src={getSpotifyEmbedUrl(selectedAlbum)!} 
                          width="100%" 
                          height="152" 
                          frameBorder="0" 
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                          loading="lazy"
                          className="rounded-xl border border-white/5"
                        ></iframe>
                      ) : (
                        <div className="p-6 glass rounded-xl text-center space-y-2 border border-white/10">
                          <Play size={24} className="mx-auto text-white/60" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Streaming Embed available on production build</p>
                        </div>
                      )}
                      {selectedAlbum.external_urls.spotify && selectedAlbum.external_urls.spotify !== "#" && (
                        <a 
                          href={selectedAlbum.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 py-4 glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5 rounded-lg"
                        >
                          View on Platform <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
 
                  <div className="space-y-12">
                    <div>
                      <h2 
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2 leading-none transition-colors"
                        style={{ color: dbAlbum ? (dbAlbum.tracks[selectedTrackIndex]?.themeColor || "#FFFFFF") : getThemeColorForAlbum(selectedAlbum.name) }}
                      >
                        {selectedAlbum.name}
                      </h2>
                      <p className="text-[10px] uppercase font-black tracking-[0.4em] text-white/60">{selectedAlbum.album_type} &bull; {selectedAlbum.release_date}</p>
                    </div>

                    {dbAlbum ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 border-b border-white/5 pb-2 mb-3">Tracks</h4>
                          {dbAlbum.tracks.map((track, tIdx) => (
                            <button
                              key={track.title}
                              onClick={() => setSelectedTrackIndex(tIdx)}
                              className={`w-full text-left p-2 rounded transition-all border ${selectedTrackIndex === tIdx ? 'bg-white/10 border-white/10 text-white' : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'}`}
                            >
                              <div className="flex items-start gap-2">
                                <span className="text-[10px] font-mono mt-0.5 text-white/40">{(tIdx + 1).toString().padStart(2, '0')}</span>
                                <span className="text-xs font-semibold uppercase tracking-wider leading-tight">{track.title}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="md:col-span-2 space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 border-b border-white/5 pb-2">Lyrics: {dbAlbum.tracks[selectedTrackIndex]?.title}</h4>
                          <div className="font-sans text-xs md:text-sm leading-relaxed tracking-wide text-white/85 whitespace-pre-wrap max-h-[40vh] overflow-y-auto pr-4 font-light antialiased">
                            {dbAlbum.tracks[selectedTrackIndex]?.lyrics}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 border-b border-white/5 pb-4">Lyrics</h4>
                        <div className="font-sans text-xs md:text-sm leading-relaxed tracking-wide text-white/85 whitespace-pre-wrap max-h-[40vh] overflow-y-auto pr-4 font-light antialiased">
                          {getLyricsForAlbum(selectedAlbum.name)}
                        </div>
                      </div>
                    )}
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
