// Official brand mark SVGs — single source of truth for every streaming/social icon
// used across Footer, Home, Hero, and Discography. Keep these geometrically accurate
// to each platform's real logo (not hand-drawn approximations) so the site reads as
// legitimate/official. Each icon accepts standard SVG props (size via width/height or
// className) and defaults to currentColor so it can be recolored via text color utilities.

import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** Spotify — official circular wave-bars mark. Brand green: #1DB954. */
export const SpotifyIcon = (props: IconProps) => (
  <svg viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.744-83.738l.001-.004Zm38.404 120.78a5.222 5.222 0 0 1-7.187 1.732c-19.685-12.031-44.488-14.755-73.688-8.084a5.219 5.219 0 0 1-6.251-3.925 5.221 5.221 0 0 1 3.926-6.25c31.9-7.291 59.263-4.153 81.47 9.34a5.225 5.225 0 0 1 1.73 7.187Zm10.25-22.805a6.531 6.531 0 0 1-8.988 2.152c-22.526-13.845-56.876-17.848-83.53-9.764a6.53 6.53 0 0 1-8.14-4.35 6.535 6.535 0 0 1 4.354-8.136c30.448-9.239 68.34-4.763 94.253 11.14a6.53 6.53 0 0 1 2.151 8.988v-.03Zm.88-23.744c-27.02-16.05-71.593-17.53-97.4-9.696a7.834 7.834 0 0 1-9.783-5.222 7.834 7.834 0 0 1 5.221-9.783c29.628-8.996 78.867-7.259 109.964 11.223a7.828 7.828 0 0 1 2.756 10.732 7.834 7.834 0 0 1-10.758 2.746Z"
    />
  </svg>
);

/** Apple Music — official note mark, redrawn on a 0-24 grid (matching every other icon
    in this file) so it sizes identically in a shared row instead of looking squeezed.
    Brand red: #FA243C / gradient #FA233B→#FB5C74. */
export const AppleMusicIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M16.5 3.4a1 1 0 0 1 .5 1v11.7c0 .5-.06 1-.2 1.5-.2.7-.65 1.3-1.3 1.7-.44.27-.92.43-1.42.5-.52.08-1.04.07-1.55-.08-.87-.25-1.5-.82-1.85-1.65-.28-.63-.34-1.29-.22-1.96.16-.9.66-1.57 1.46-2.01.4-.23.85-.36 1.32-.44.5-.09 1.01-.17 1.51-.28.36-.08.68-.23.92-.52.18-.22.28-.48.29-.77.02-.15.02-.3.02-.46V6.55L7 7.65v9.55c0 .48-.07.95-.2 1.4-.22.72-.68 1.28-1.32 1.7-.44.28-.93.45-1.44.51-.53.07-1.06.04-1.57-.13-.87-.29-1.47-.87-1.79-1.72-.27-.7-.3-1.42-.11-2.15.22-.85.75-1.47 1.55-1.88.4-.2.83-.32 1.28-.4.5-.09 1.01-.17 1.51-.28.4-.09.7-.31.9-.68.1-.19.14-.4.14-.62V5.3c0-.6.42-1.1 1.02-1.22l9.55-1.87a1 1 0 0 1 .98.19Z"
    />
  </svg>
);

/** Instagram — official glyph (camera + gradient dot), simplified to a clean single-path outline mark. */
export const InstagramIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2c-2.716 0-3.056.012-4.123.06-1.064.05-1.79.218-2.427.465a4.902 4.902 0 0 0-1.772 1.153A4.902 4.902 0 0 0 2.525 5.45c-.247.637-.415 1.363-.465 2.427C2.012 8.944 2 9.284 2 12s.012 3.056.06 4.123c.05 1.064.218 1.79.465 2.427a4.902 4.902 0 0 0 1.153 1.772 4.902 4.902 0 0 0 1.772 1.153c.637.247 1.363.415 2.427.465C8.944 21.988 9.284 22 12 22s3.056-.012 4.123-.06c1.064-.05 1.79-.218 2.427-.465a4.902 4.902 0 0 0 1.772-1.153 4.902 4.902 0 0 0 1.153-1.772c.247-.637.415-1.363.465-2.427C21.988 15.056 22 14.716 22 12s-.012-3.056-.06-4.123c-.05-1.064-.218-1.79-.465-2.427a4.902 4.902 0 0 0-1.153-1.772 4.902 4.902 0 0 0-1.772-1.153c-.637-.247-1.363-.415-2.427-.465C15.056 2.012 14.716 2 12 2Zm0 1.802c2.67 0 2.987.01 4.042.059.975.045 1.504.207 1.857.344.466.181.8.399 1.15.748.35.35.567.684.748 1.15.137.353.3.882.344 1.857.048 1.055.058 1.372.058 4.042 0 2.67-.01 2.987-.058 4.042-.045.975-.207 1.504-.344 1.857a3.1 3.1 0 0 1-.748 1.15 3.1 3.1 0 0 1-1.15.748c-.353.137-.882.3-1.857.344-1.054.048-1.371.058-4.042.058-2.67 0-2.987-.01-4.042-.058-.975-.045-1.504-.207-1.857-.344a3.1 3.1 0 0 1-1.15-.748 3.1 3.1 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.372-.058-4.042 0-2.67.01-2.987.058-4.042.045-.975.207-1.504.344-1.857.181-.466.399-.8.748-1.15.35-.35.684-.567 1.15-.748.353-.137.882-.3 1.857-.344 1.055-.048 1.372-.059 4.042-.059ZM12 6.865A5.135 5.135 0 1 0 12 17.135 5.135 5.135 0 0 0 12 6.865Zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666Zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"
    />
  </svg>
);

/** TikTok — official musical-note mark. */
export const TikTokIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M16.6 5.82c-1.006-.983-1.56-2.328-1.56-3.82h-3.4v13.44c0 1.83-1.483 3.32-3.31 3.32a3.31 3.31 0 0 1-3.31-3.32 3.31 3.31 0 0 1 3.31-3.32c.31 0 .61.05.9.13V8.4a6.87 6.87 0 0 0-.9-.06A6.72 6.72 0 0 0 1.6 15.06a6.72 6.72 0 0 0 6.73 6.72 6.72 6.72 0 0 0 6.73-6.72V8.9a8.14 8.14 0 0 0 4.75 1.52V7.02c-1.06 0-2.04-.34-2.83-.9a5.1 5.1 0 0 1-.38-.3Z"
    />
  </svg>
);

/** SoundCloud — official cloud + waveform mark, simplified to a clean single glyph
    that sits fully inside its viewBox (the previous multi-bar path overflowed the
    24x24 box slightly on both edges and clipped against neighboring icons in a row). */
export const SoundCloudIcon = (props: IconProps) => (
  <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M2.4 13.2a.4.4 0 0 0-.4.4v4.2a.4.4 0 1 0 .8 0v-4.2a.4.4 0 0 0-.4-.4Zm2.1-1a.4.4 0 0 0-.4.4v6.1a.4.4 0 1 0 .8 0v-6.1a.4.4 0 0 0-.4-.4Zm2.1-.5a.4.4 0 0 0-.4.4v7a.4.4 0 1 0 .8 0v-7a.4.4 0 0 0-.4-.4Zm2.15.1a.4.4 0 0 0-.4.4v6.8a.4.4 0 1 0 .8 0v-6.8a.4.4 0 0 0-.4-.4Zm2.2-1.5a.45.45 0 0 0-.45.44v8.3a.45.45 0 1 0 .9 0v-8.3a.45.45 0 0 0-.45-.44Zm2.3-1.1a.45.45 0 0 0-.45.44v9.4a.45.45 0 1 0 .9 0v-9.4a.45.45 0 0 0-.45-.44Zm14.3 3.6c-.44-2.9-2.96-5.1-5.99-5.1-1.5 0-2.87.55-3.92 1.46a.5.5 0 0 0-.17.38v10.06c0 .27.21.49.48.5h9.2c2.03 0 3.68-1.63 3.68-3.65 0-1.87-1.4-3.42-3.28-3.65Z"
    />
  </svg>
);

/** Facebook — official "f" glyph. */
export const FacebookIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M22 12.06C22 6.507 17.523 2 12 2S2 6.507 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.46h-1.26c-1.243 0-1.63.772-1.63 1.563v1.876h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z"
    />
  </svg>
);

/** YouTube — official rounded-rect play mark. */
export const YouTubeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"
    />
  </svg>
);
