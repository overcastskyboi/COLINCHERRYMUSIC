import { useEffect, useState } from 'react';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import LyricModal from '../components/LyricModal';
import { useModalA11y } from '../hooks/useModalA11y';
import { Helmet } from 'react-helmet-async';
import catalogDb from '../config/catalogDb.json';
import lyricsDb from '../config/lyricsDb.json';
import { upcomingReleases } from '../config/releaseData';
import { SpotifyIcon, AppleMusicIcon } from '../components/icons/BrandIcons';

interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  album_type: string;
}

const sortByDateDesc = (arr: SpotifyAlbum[]) =>
  [...arr].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

const isReleased = (dateStr: string) => {
  const t = new Date(dateStr).getTime();
  return !isNaN(t) && t <= Date.now();
};

const Discography = () => {
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbum | null>(null);
  const [selectedLyrics, setSelectedLyrics] = useState<{title: string, lyrics: string, themeColor: string} | null>(null);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0);

  // Split the local album catalog into released (belongs in the main Catalog grid)
  // vs. unreleased (belongs in the Upcoming Releases banner) — keeping the original
  // catalogDb.albums index baked into the id so embed/track lookups still resolve.
  const dbAlbumEntries = catalogDb.albums.map((album, idx) => ({ album, idx }));

  const toSpotifyAlbumShape = (album: typeof catalogDb.albums[number], idx: number): SpotifyAlbum => ({
    id: `local-db-${idx}`,
    name: album.title,
    release_date: album.releaseDate ? new Date(album.releaseDate).toISOString().split('T')[0] : '2026-08-01',
    images: [{ url: album.coverArt || "/different.jpg" }],
    external_urls: { spotify: album.spotifyLink || album.appleMusicLink || "#" },
    album_type: album.type
  });

  const localDbAlbums: SpotifyAlbum[] = dbAlbumEntries
    .filter(({ album }) => isReleased(album.releaseDate))
    .map(({ album, idx }) => toSpotifyAlbumShape(album, idx));

  const upcomingDbAlbums: SpotifyAlbum[] = dbAlbumEntries
    .filter(({ album }) => !isReleased(album.releaseDate))
    .map(({ album, idx }) => toSpotifyAlbumShape(album, idx));

  const upcomingAlbum = upcomingDbAlbums[0] || null;

  // Back catalog singles/EPs from catalogDb.singles — rendered as their own catalog
  // entries regardless of whether they're also advance tracks off an unreleased album
  // (e.g. Different / Rose / More Lonely are real standalone releases in their own right).
  const localSinglesAlbums: SpotifyAlbum[] = catalogDb.singles.map((single, idx) => ({
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

  useModalA11y(!!selectedAlbum, () => setSelectedAlbum(null));

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
          const merged = [...localDbAlbums, ...localSinglesAlbums];
          data.forEach((apiAlbum: SpotifyAlbum) => {
            if (!merged.some(ma => ma.name.toLowerCase() === apiAlbum.name.toLowerCase())) {
              merged.push(apiAlbum);
            }
          });
          setAlbums(sortByDateDesc(merged));
        } else {
          setAlbums(sortByDateDesc([...localDbAlbums, ...localSinglesAlbums]));
        }
      } catch (err) {
        console.warn('Spotify API fetch failed. Using local fallback catalog:', err);
        setAlbums(sortByDateDesc([...localDbAlbums, ...localSinglesAlbums]));
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  const getLyricsForAlbum = (albumName: string) => {
    // Garfield Park advance singles (Different, Rose, More Lonely, Guilty Conscience,
    // Holding On) carry their full lyrics on the album track entry, not in lyricsDb —
    // check there first so their standalone catalog cards still show real lyrics.
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

  /**
   * Resolve the best available Spotify + Apple Music links for a single track inside
   * a multi-track album entry (currently just Garfield Park). Unreleased tracks (e.g.
   * "Only Human") have empty spotifyLink/appleMusicLink of their own — fall back to the
   * parent album's link so clicking into them never dead-ends, and flag the fallback so
   * the UI can say "part of Garfield Park" instead of implying its own release.
   */
  const getTrackStreaming = (track: { spotifyLink?: string; appleMusicLink?: string }, album: typeof catalogDb.albums[number]) => {
    const spotifyLink = track.spotifyLink || album.spotifyLink || null;
    const appleMusicLink = track.appleMusicLink || album.appleMusicLink || null;
    const isOwnRelease = Boolean(track.spotifyLink || track.appleMusicLink);
    return { spotifyLink, appleMusicLink, isOwnRelease };
  };

  /**
   * Resolve the raw Spotify + Apple Music links for ANY selected catalog card,
   * regardless of source — a Garfield Park album track (local-db-), a standalone
   * single/EP from catalogDb.singles (local-single-), or a live Spotify-API result
   * (real Spotify id as the album id, Apple link unknown). Previously only Spotify
   * was ever resolved outside the Garfield Park case, so every other song in the
   * catalog (Different, Rose, Holding On, Guilty Conscience, More Lonely, and the
   * whole back catalog) showed a Spotify button with no Apple Music equivalent.
   */
  const getStreamingLinks = (album: SpotifyAlbum): { spotifyLink: string | null; appleLink: string | null } => {
    if (album.id.startsWith('local-db-')) {
      const dbIdx = parseInt(album.id.split('-').pop() || '0');
      const a = catalogDb.albums[dbIdx];
      return { spotifyLink: a?.spotifyLink || null, appleLink: a?.appleMusicLink || null };
    }
    if (album.id.startsWith('local-single-')) {
      const idx = parseInt(album.id.split('-').pop() || '0');
      const single = catalogDb.singles[idx];
      return { spotifyLink: single?.spotifyLink || null, appleLink: single?.appleMusicLink || null };
    }
    if (album.id.includes('local-fallback')) {
      return { spotifyLink: null, appleLink: null };
    }
    // Live Spotify-API-sourced entries have a genuine Spotify album id as their id.
    // Apple Music has no equivalent public search-by-Spotify-id API, so fall back to
    // the external_urls.spotify field for Spotify and leave Apple unset for these.
    const looksLikeSpotifyId = /^[a-zA-Z0-9]{16,}$/.test(album.id);
    return {
      spotifyLink: looksLikeSpotifyId ? (album.external_urls.spotify !== '#' ? album.external_urls.spotify : `https://open.spotify.com/album/${album.id}`) : null,
      appleLink: null,
    };
  };

  // Find if current selected album is in our database
  const dbAlbum = selectedAlbum ? catalogDb.albums.find(a => a.title.toLowerCase() === selectedAlbum.name.toLowerCase()) : null;

  const renderLyrics = (text: string) =>
    text.split(/\n\s*\n/).map((stanza, i) => (
      <p key={i} className="mb-5 last:mb-0">
        {stanza.split('\n').map((line, j) => (
          <span key={j}>
            {line}
            {j < stanza.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    ));

  return (
    <PageTransition>
      <Helmet>
        <title>Colin Cherry | Music Catalog & Lyrics</title>
        <meta name="description" content="Explore Colin Cherry's full discography. View official album artwork, listen to streaming music, and read high-fidelity song lyrics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thecolincherry.com/music" />
        <meta property="og:title" content="Colin Cherry — Music Catalog" />
        <meta property="og:description" content="Explore every Colin Cherry release — singles, albums, and lyrics." />
        <meta property="og:image" content="https://www.thecolincherry.com/garfield-park.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colin Cherry — Music Catalog" />
        <meta name="twitter:description" content="Explore every Colin Cherry release — singles, albums, and lyrics." />
        <meta name="twitter:image" content="https://www.thecolincherry.com/garfield-park.jpg" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-24 text-center max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-9xl font-display uppercase tracking-tighter mb-6 leading-none">Music</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/60">Official Streaming Catalog</p>
        </header>

        {/* Upcoming Release — the next album as a single featured entry, not its individual tracks */}
        {upcomingAlbum && (
          <section className="mb-32">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-12 flex items-center gap-4">
              Upcoming Release <span className="h-px flex-grow bg-white/5"></span>
            </h3>
            <button
              onClick={() => setSelectedAlbum(upcomingAlbum)}
              className="group relative w-full glass overflow-hidden border border-white/10 flex flex-col sm:flex-row items-stretch text-left"
            >
              <div className="relative w-full sm:w-64 aspect-square flex-shrink-0 overflow-hidden">
                <img
                  src={upcomingAlbum.images[0]?.url}
                  alt={upcomingAlbum.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.currentTarget.src = "/different.jpg"; }}
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Upcoming Album</span>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{upcomingAlbum.name}</h3>
                <p className="text-[11px] uppercase font-black tracking-[0.3em] text-white/60">
                  Out {new Date(upcomingAlbum.release_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white mt-4 group-hover:text-cyan-400 transition-colors w-fit border-b border-white group-hover:border-cyan-400 pb-1">
                  View Tracklist &amp; Lyrics
                </span>
              </div>
            </button>
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
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "200px" }}
                  transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="relative aspect-square glass overflow-hidden mb-6 shadow-2xl">
                    <img
                      src={album.images[0]?.url}
                      alt={album.name}
                      loading="lazy"
                      decoding="async"
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
              className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-0 md:p-6 bg-black/90 backdrop-blur-xl"
              onClick={() => setSelectedAlbum(null)}
            >
              <motion.div
                initial={{ scale: 0.98, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.98, opacity: 0, y: 20 }}
                // Single scroll container for the whole modal — no nested scrollboxes.
                // Art/streaming stays pinned at the top of its column on desktop via sticky,
                // everything else (track picker + lyrics) flows and scrolls together.
                className="glass w-full h-full md:h-auto md:max-w-6xl md:max-h-[88vh] overflow-y-auto p-6 sm:p-8 md:p-12 relative rounded-none md:rounded-2xl"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="fixed md:absolute top-4 right-4 md:top-8 md:right-8 z-10 text-white/60 hover:text-white transition-colors bg-black/40 md:bg-transparent rounded-full p-2 md:p-0"
                >
                  <X size={28} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_1fr] gap-10 lg:gap-16">
                  {/* Left: art + streaming — sticky on desktop so it stays visible while lyrics scroll */}
                  <div className="space-y-6 lg:sticky lg:top-0 lg:self-start">
                    <div className="aspect-square glass overflow-hidden rounded-xl">
                      <img
                        src={selectedAlbum.images[0]?.url}
                        alt={selectedAlbum.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = "/different.jpg"; }}
                      />
                    </div>

                    <div>
                      <h2
                        className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-1 leading-none transition-colors"
                        style={{ color: dbAlbum ? (dbAlbum.tracks[selectedTrackIndex]?.themeColor || "#FFFFFF") : getThemeColorForAlbum(selectedAlbum.name) }}
                      >
                        {selectedAlbum.name}
                      </h2>
                      <p className="text-[10px] uppercase font-black tracking-[0.4em] text-white/60">{selectedAlbum.album_type} &bull; {selectedAlbum.release_date}</p>
                    </div>

                    {/* Streaming: two uniform brand buttons, no embeds — Spotify's and
                        Apple's widgets have different chrome/sizing and load in at
                        different times, which reads as messy rather than official.
                        Works for every song: Garfield Park album tracks resolve through
                        getTrackStreaming (with album-level fallback for unreleased
                        tracks), everything else (standalone singles/EPs, live API
                        results) resolves through getStreamingLinks. */}
                    {(() => {
                      const trackStreaming = dbAlbum ? getTrackStreaming(dbAlbum.tracks[selectedTrackIndex] || {}, dbAlbum) : null;
                      const catalogLinks = !dbAlbum ? getStreamingLinks(selectedAlbum) : null;
                      const spotifyLink = trackStreaming ? trackStreaming.spotifyLink : catalogLinks?.spotifyLink || null;
                      const appleLink = trackStreaming ? trackStreaming.appleMusicLink : catalogLinks?.appleLink || null;
                      // Check the SELECTED TRACK's own release date, not the album's — Garfield
                      // Park doesn't drop until Aug 1, 2026, but 5 of its tracks (Different, Rose,
                      // Guilty Conscience, Holding On, More Lonely) already released as standalone
                      // singles ahead of the album, so they should read "Play on Spotify"/"Play on
                      // Apple Music" (already out), not "Pre-Save"/"Pre-Order" (not out yet).
                      const selectedTrackDate = dbAlbum ? dbAlbum.tracks[selectedTrackIndex]?.releaseDate : null;
                      const unreleased = dbAlbum
                        ? (selectedTrackDate ? !isReleased(selectedTrackDate) : !isReleased(dbAlbum.releaseDate))
                        : false;
                      const spotifyLabel = unreleased ? "Pre-Save" : "Play on Spotify";
                      const appleLabel = unreleased ? "Pre-Order" : "Play on Apple Music";

                      return (
                        <div className="space-y-3">
                          {!spotifyLink && !appleLink && (
                            <div className="p-6 glass rounded-xl text-center space-y-2 border border-white/10">
                              <Play size={24} className="mx-auto text-white/60" />
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                {unreleased ? "Streaming unlocks at release" : "No streaming link available"}
                              </p>
                            </div>
                          )}

                          {(spotifyLink || appleLink) && (
                            <div className="grid grid-cols-2 gap-3">
                              {spotifyLink && (
                                <a
                                  href={spotifyLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-2 h-12 text-[10px] font-black uppercase tracking-widest rounded-full bg-[#1DB954] text-black hover:bg-[#1ed760] hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                  <SpotifyIcon className="w-4 h-4 flex-shrink-0" />
                                  {spotifyLabel}
                                </a>
                              )}
                              {appleLink && (
                                <a
                                  href={appleLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-2 h-12 text-[10px] font-black uppercase tracking-widest rounded-full bg-[#FA243C] text-white hover:bg-[#fb4a5f] hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                  <AppleMusicIcon className="w-4 h-4 flex-shrink-0" />
                                  {appleLabel}
                                </a>
                              )}
                            </div>
                          )}

                          {dbAlbum && trackStreaming && !trackStreaming.isOwnRelease && (
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 text-center pt-1">
                              Part of {dbAlbum.title} — not yet released as its own single
                            </p>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Right: track picker (horizontal, scales to any track count) + lyrics */}
                  <div className="space-y-8 min-w-0">
                    {dbAlbum ? (
                      <>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 border-b border-white/5 pb-3 mb-4">
                            Tracklist &bull; {dbAlbum.tracks.length} songs
                          </h4>
                          {/* Horizontal chip strip instead of a cramped 1/3-width vertical
                              list — scales cleanly whether the album has 4 tracks or 14. */}
                          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
                            {dbAlbum.tracks.map((track, tIdx) => (
                              <button
                                key={track.title}
                                onClick={() => setSelectedTrackIndex(tIdx)}
                                className={`snap-start flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all whitespace-nowrap ${
                                  selectedTrackIndex === tIdx
                                    ? 'bg-white/15 border-white/20 text-white'
                                    : 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span className="text-[10px] font-mono text-white/40">{(tIdx + 1).toString().padStart(2, '0')}</span>
                                <span className="text-xs font-semibold uppercase tracking-wider">{track.title}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 border-b border-white/5 pb-3">
                            Lyrics &mdash; {dbAlbum.tracks[selectedTrackIndex]?.title}
                          </h4>
                          <div className="font-lyric text-base md:text-lg leading-loose tracking-wide text-white/90">
                            {renderLyrics(dbAlbum.tracks[selectedTrackIndex]?.lyrics || "Lyrics coming soon.")}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 border-b border-white/5 pb-3">Lyrics</h4>
                        <div className="font-lyric text-base md:text-lg leading-loose tracking-wide text-white/90">
                          {renderLyrics(getLyricsForAlbum(selectedAlbum.name))}
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
