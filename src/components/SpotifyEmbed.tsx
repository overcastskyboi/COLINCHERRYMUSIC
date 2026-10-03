import { useEffect, useState } from 'react';
import { SpotifyIcon } from './icons/BrandIcons';

interface SpotifyEmbedProps {
  albumId: string;
  title: string;
  coverArt: string;
  href: string;
}

/**
 * Spotify's compact (152px) album player, wrapped so it never shows a half-loaded state.
 * - Fixed 152px height: Spotify picks its layout from the iframe height, and the 352px
 *   layout renders inconsistently (compact player + empty white box) depending on load timing.
 * - color-scheme: normal on the iframe: the site runs `color-scheme: dark`, and a mismatched
 *   scheme makes browsers paint an opaque white backdrop behind cross-origin iframes.
 * - A dark placeholder (cover + title, itself a Spotify link) sits underneath until the
 *   player reports loaded, so there is no white flash and still a working link if the
 *   embed is blocked by a privacy extension.
 */
const SpotifyEmbed = ({ albumId, title, coverArt, href }: SpotifyEmbedProps) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [holder, setHolder] = useState<HTMLDivElement | null>(null);

  // Only mount the iframe near the viewport (native lazy-loading is unreliable inside
  // animated containers), then keep it mounted.
  useEffect(() => {
    if (!holder || inView) return;
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) setInView(true);
      },
      { rootMargin: '300px' }
    );
    io.observe(holder);
    return () => io.disconnect();
  }, [holder, inView]);

  return (
    <div ref={setHolder} className="relative h-[152px] w-full rounded-[12px] overflow-hidden bg-[#141821] border border-white/5">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute inset-0 flex items-center gap-4 p-4 transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <img src={coverArt} alt="" className="h-full aspect-square object-cover rounded-md" />
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm font-bold truncate">{title}</p>
          <p className="text-xs text-white/50">Colin Cherry</p>
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
            <SpotifyIcon className="w-3.5 h-3.5 text-[#1DB954]" /> Play on Spotify
          </span>
        </div>
      </a>
      {inView && (
        <iframe
          title={`${title} on Spotify`}
          src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          onLoad={() => setLoaded(true)}
          style={{ colorScheme: 'normal', border: 0 }}
          className={`absolute inset-0 w-full h-[152px] transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

export default SpotifyEmbed;
