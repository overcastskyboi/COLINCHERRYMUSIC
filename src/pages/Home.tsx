import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { ArrowRight, Disc, FileText } from 'lucide-react';
import { CURRENT_RELEASE, PREVIOUS_RELEASE, recentReleases, resolveSong } from '../config/releaseData';
import { lyricQuotes } from '../config/lyricQuotes';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';
import SpotifyEmbed from '../components/SpotifyEmbed';
import { SpotifyIcon, AppleMusicIcon } from '../components/icons/BrandIcons';

const SITE = 'https://www.thecolincherry.com';

const toSeconds = (d: string) => {
  const [m, s] = d.split(':').map(Number);
  return (m || 0) * 60 + (s || 0);
};
const totalRuntime = (() => {
  const total = CURRENT_RELEASE.tracks.reduce((sum, t) => sum + toSeconds(t.duration || '0:00'), 0);
  return `${Math.floor(total / 60)} min`;
})();

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: 'easeOut' },
} as const;

const Home = () => {
  // Only rotate quotes whose song resolves to a release, so every quote can credit
  // its year and link straight to the song.
  const [quote] = useState(() => {
    const pool = lyricQuotes
      .map(q => ({ ...q, source: resolveSong(q.song) }))
      .filter((q): q is typeof q & { source: NonNullable<typeof q.source> } => q.source !== null);
    return pool[Math.floor(Math.random() * pool.length)];
  });
  const ep = CURRENT_RELEASE;
  const album = PREVIOUS_RELEASE;
  // Back catalog strip: everything except the two projects already featured above it.
  const moreReleases = recentReleases
    .filter(r => r.title !== ep.title && r.title !== album.title)
    .slice(0, 6);

  return (
    <PageTransition>
      <Helmet>
        <title>Colin Cherry | There's No Going Back (EP) Out Now</title>
        <meta name="description" content="Colin Cherry's new EP There's No Going Back is out now. Stream it on Spotify and Apple Music, plus the album Garfield Park and the full catalog." />
        <meta property="og:type" content="music.album" />
        <meta property="og:url" content={`${SITE}/`} />
        <meta property="og:title" content="Colin Cherry: There's No Going Back" />
        <meta property="og:description" content="The new EP. Out now everywhere." />
        <meta property="og:image" content={`${SITE}/og-theres-no-going-back.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colin Cherry: There's No Going Back" />
        <meta name="twitter:description" content="The new EP. Out now everywhere." />
        <meta name="twitter:image" content={`${SITE}/og-theres-no-going-back.jpg`} />
      </Helmet>

      <Hero release={ep} eyebrow="New EP · Out Now" />

      <div className="relative max-w-6xl mx-auto px-6 pb-32 space-y-28">

        {/* ---------- The EP: story, tracklist, player ---------- */}
        <section id="listen" className="scroll-mt-32 pt-8 space-y-16">
          <motion.div {...fadeUp} className="flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-3" style={{ color: ep.accent }}>The EP</p>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">{ep.tagline}</h2>
            </div>
            <p className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 whitespace-nowrap">
              {ep.tracks.length} tracks &middot; {totalRuntime}
            </p>
          </motion.div>

          {/* About the record */}
          <motion.div {...fadeUp} className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
            <div className="flex md:flex-col items-center md:items-start gap-4 md:pt-3">
              <span className="h-px w-10 md:w-12" style={{ backgroundColor: ep.accent }} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">About the record</span>
            </div>
            <div className="max-w-3xl space-y-6">
              <p className="font-editorial text-2xl md:text-[2rem] leading-snug text-white/90">
                <em className="font-lyric" style={{ color: ep.accent }}>There&rsquo;s No Going Back</em> is an unfiltered look at
                self-reliance, survival instincts, and the cost of building walls.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-white/65">
                Moving between sharp defensive armor, restless ambition, and unguarded acceptance, the EP tracks the
                exhaustion of outrunning the past and the quiet resolve to keep moving forward anyway.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-white/65">
                Written, produced, and performed entirely from the ground up, it leaves the bravado at the door to confront
                accountability, unfixable mistakes, and the reality that time only moves in one direction.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="grid lg:grid-cols-[1fr_minmax(0,400px)] gap-10 lg:gap-14 items-start">
            <ol className="divide-y divide-white/5 border-y border-white/5">
              {ep.tracks.map(track => (
                <li key={track.title} className="group flex items-center gap-4 sm:gap-6 py-4 sm:py-5">
                  <span className="w-6 text-[11px] font-mono text-white/35">
                    {String(track.trackNumber).padStart(2, '0')}
                  </span>
                  <a
                    href={ep.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow min-w-0 truncate text-lg sm:text-2xl font-black uppercase tracking-tight text-white/85 hover:text-white transition-colors"
                  >
                    {track.title}
                  </a>
                  <Link
                    to={`/music?release=${encodeURIComponent(ep.title)}&track=${track.trackNumber}`}
                    className="text-[9px] font-black uppercase tracking-[0.25em] text-white/40 hover:text-white border border-white/10 hover:border-white/40 rounded-full px-3 py-1.5 transition-colors"
                  >
                    Lyrics
                  </Link>
                  <span className="hidden sm:inline w-10 text-right text-[11px] font-mono text-white/35">{track.duration}</span>
                </li>
              ))}
            </ol>

            <div className="space-y-3 lg:sticky lg:top-40">
              <SpotifyEmbed albumId={ep.spotifyId} title={ep.title} coverArt={ep.coverArtSmall} href={ep.spotifyLink} />
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={ep.appleMusicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-11 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white hover:border-[#FA243C]/40 hover:bg-[#FA243C]/10 transition-all"
                >
                  <AppleMusicIcon className="w-3.5 h-3.5 text-[#FA243C]" />
                  Apple Music
                </a>
                <a
                  href={ep.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-11 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white hover:border-[#00A8E1]/40 hover:bg-[#00A8E1]/10 transition-all"
                >
                  Amazon Music
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ---------- Garfield Park + navigation bento ---------- */}
        <motion.section {...fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass overflow-hidden grid sm:grid-cols-[220px_1fr] bg-black/20 border border-white/5 hover:border-[#D4AF37]/25 transition-colors duration-500">
            <img
              src={album.coverArt}
              alt={`${album.title} cover art`}
              loading="lazy"
              decoding="async"
              className="w-full h-full aspect-[16/10] sm:aspect-square object-cover object-[50%_35%]"
            />
            <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">The Album &middot; Out Now</span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">{album.title}</h3>
                <p className="text-white/65 text-xs md:text-sm leading-relaxed max-w-md">
                  {album.tracks.length} songs, released August 1, 2026. {album.tagline}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <a href={album.spotifyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-[#1DB954] transition-colors border-b border-white/40 hover:border-[#1DB954] pb-1">
                  <SpotifyIcon className="w-3.5 h-3.5" /> Spotify
                </a>
                <a href={album.appleMusicLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-[#FA243C] transition-colors border-b border-white/40 hover:border-[#FA243C] pb-1">
                  <AppleMusicIcon className="w-3.5 h-3.5" /> Apple Music
                </a>
                <Link to="/music" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                  Lyrics <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6">
            <Link to="/music" className="glass p-6 flex flex-col justify-between group border border-white/5 hover:border-[#9DB0E3]/30 transition-all duration-500 bg-black/20">
              <div className="flex justify-between items-start text-white/60 group-hover:text-[#9DB0E3] transition-colors">
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Discography</span>
                <Disc size={18} className="group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Music</h3>
                <p className="text-white/60 text-xs">Every release, every lyric.</p>
              </div>
            </Link>
            <Link to="/epk" className="glass p-6 flex flex-col justify-between group border border-white/5 hover:border-white/20 transition-all duration-500 bg-black/20">
              <div className="flex justify-between items-start text-white/60 group-hover:text-white transition-colors">
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Industry</span>
                <FileText size={18} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Press Kit</h3>
                <p className="text-white/60 text-xs">Bio, assets, and booking.</p>
              </div>
            </Link>
          </div>
        </motion.section>

        {/* ---------- Lyric pull-quote ---------- */}
        <motion.section {...fadeUp} className="text-center max-w-4xl mx-auto">
          <div className="h-px w-10 bg-white/15 mx-auto mb-10" />
          <blockquote
            className="font-lyric text-[1.05rem] sm:text-xl md:text-[1.7rem] leading-snug md:leading-[1.45] tracking-wide space-y-2 md:space-y-1"
            style={{ color: quote.themeColor && quote.themeColor !== '#FFFFFF' ? quote.themeColor : 'rgba(255,255,255,0.92)' }}
          >
            {/* Each bar is its own block, so long bars that wrap on phones still read as one line of the song */}
            {quote.lines.map((line, i) => (
              <span key={i} className="block text-balance">
                {i === 0 && <span aria-hidden>&ldquo;</span>}
                {line}
                {i === quote.lines.length - 1 && <span aria-hidden>&rdquo;</span>}
              </span>
            ))}
          </blockquote>
          <a
            href={quote.source.spotifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 mt-8 text-[10px] font-black uppercase tracking-[0.35em] text-white/60 hover:text-white transition-colors"
          >
            <SpotifyIcon className="w-3.5 h-3.5 text-white/40 group-hover:text-[#1DB954] transition-colors" />
            <span className="border-b border-white/20 group-hover:border-white pb-0.5">{quote.song}</span>
            <span className="text-white/35 tracking-[0.2em]">{quote.source.year}</span>
          </a>
        </motion.section>

        {/* ---------- Back catalog strip ---------- */}
        {moreReleases.length > 0 && (
          <motion.section {...fadeUp}>
            <div className="flex items-center justify-between gap-6 mb-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">More Releases</h2>
              <Link to="/music" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                Full Catalog <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {moreReleases.map(r => (
                <a
                  key={r.title}
                  href={r.spotifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="aspect-square overflow-hidden rounded-lg bg-white/5 mb-3">
                    <img
                      src={r.coverArt}
                      alt={r.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <p className="text-xs font-black uppercase tracking-tight truncate">{r.title}</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/45">{r.date.slice(0, 4)} &middot; {r.type}</p>
                </a>
              ))}
            </div>
          </motion.section>
        )}

        {/* ---------- Follow ---------- */}
        <motion.section {...fadeUp} className="glass p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/5 bg-black/20">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">Follow Along</span>
          <SocialLinks className="flex items-center gap-6 sm:gap-8" linkClassName="text-white/60 transition-all hover:scale-110" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">@thecolincherry</span>
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default Home;
