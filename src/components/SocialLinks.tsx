// Single source of truth for every place the site links out to socials/streaming
// platforms (Footer, Home "Follow Along" bar, EPK, etc). Previously Footer.tsx and
// Home.tsx each hardcoded their own divergent inline SVGs for the same brands —
// this component replaces both so a path/color fix only has to happen once.

import {
  SpotifyIcon,
  AppleMusicIcon,
  InstagramIcon,
  TikTokIcon,
  SoundCloudIcon,
  FacebookIcon,
  YouTubeIcon,
} from './icons/BrandIcons';

export type SocialPlatform =
  | 'instagram'
  | 'tiktok'
  | 'soundcloud'
  | 'spotify'
  | 'appleMusic'
  | 'facebook'
  | 'youtube';

interface SocialDef {
  name: string;
  Icon: (props: { className?: string }) => JSX.Element;
  href: string;
  /** Tailwind hover color class using each platform's official brand color. */
  hoverClass: string;
  /** Override the icon's width class when its glyph isn't square (e.g. SoundCloud's
      wide cloud mark) — keeps the icon's own aspect ratio instead of squishing it
      into a square box that clips the artwork. */
  widthClass?: string;
}

// Canonical artist links. Update in one place and every consumer (Footer, Home, EPK)
// stays in sync. Handles differ by platform — not every platform could get
// "thecolincherry" (Facebook is "itscolincherry").
export const SOCIAL_LINKS: Record<SocialPlatform, SocialDef> = {
  instagram: {
    name: 'Instagram',
    Icon: InstagramIcon,
    href: 'https://instagram.com/thecolincherry',
    hoverClass: 'hover:text-[#E4405F]',
  },
  tiktok: {
    name: 'TikTok',
    Icon: TikTokIcon,
    href: 'https://tiktok.com/@thecolincherry',
    hoverClass: 'hover:text-[#00f2ea]',
  },
  soundcloud: {
    name: 'SoundCloud',
    Icon: SoundCloudIcon,
    href: 'https://soundcloud.com/thecolincherry',
    hoverClass: 'hover:text-[#FF7700]',
    // SoundCloud's mark is wider than tall (viewBox 0 0 32 24) — give it more width
    // instead of squishing it into the same w-5 square as the round icons.
    widthClass: 'w-7',
  },
  spotify: {
    name: 'Spotify',
    Icon: SpotifyIcon,
    href: 'https://open.spotify.com/artist/2lCz91g9DugcZhbtvMnaUN',
    hoverClass: 'hover:text-[#1DB954]',
  },
  appleMusic: {
    name: 'Apple Music',
    Icon: AppleMusicIcon,
    href: 'https://music.apple.com/us/artist/colin-cherry/1639040887',
    hoverClass: 'hover:text-[#FA243C]',
  },
  facebook: {
    name: 'Facebook',
    Icon: FacebookIcon,
    href: 'https://www.facebook.com/itscolincherry',
    hoverClass: 'hover:text-[#1877F2]',
  },
  youtube: {
    name: 'YouTube',
    Icon: YouTubeIcon,
    href: 'https://www.youtube.com/thecolincherry',
    hoverClass: 'hover:text-[#FF0000]',
  },
};

interface SocialLinksProps {
  /** Which platforms to render, in order. Defaults to the full set. */
  platforms?: SocialPlatform[];
  /** Icon size classes, e.g. "w-5 h-5" (default) or "w-6 h-6". Height is respected
      exactly; width is used as the fallback for icons without their own widthClass. */
  iconClassName?: string;
  /** Wrapper className for the row/list container. */
  className?: string;
  /** ClassName applied to each link's base (non-hover) state. */
  linkClassName?: string;
}

const DEFAULT_ORDER: SocialPlatform[] = [
  'instagram',
  'facebook',
  'youtube',
  'tiktok',
  'soundcloud',
  'spotify',
  'appleMusic',
];

const SocialLinks = ({
  platforms = DEFAULT_ORDER,
  iconClassName = 'w-5 h-5',
  className = 'flex items-center gap-8',
  linkClassName = 'text-white/70 transition-all hover:scale-110',
}: SocialLinksProps) => {
  // Height stays constant across all icons (keeps the row visually aligned); width
  // can be overridden per-platform for non-square glyphs like SoundCloud.
  const heightClass = iconClassName.split(' ').find((c) => c.startsWith('h-')) || 'h-5';

  return (
    <div className={className}>
      {platforms.map((key) => {
        const social = SOCIAL_LINKS[key];
        const { Icon } = social;
        const widthClass = social.widthClass || iconClassName.split(' ').find((c) => c.startsWith('w-')) || 'w-5';
        return (
          <a
            key={key}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            className={`${linkClassName} ${social.hoverClass} inline-flex items-center justify-center`}
          >
            <Icon className={`${widthClass} ${heightClass}`} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
