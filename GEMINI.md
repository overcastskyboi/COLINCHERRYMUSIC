# MISSION: The Colin Cherry Music Artist Hub

A high-end, minimalist digital experience for artist Colin Cherry. Built for atmospheric immersion, fan conversion, and professional industry pitching.

## 1. Core Architecture

- **Home:** Built around the current release (`CURRENT_RELEASE` in `src/config/releaseData.ts`): polaroid hero, EP story, tracklist with per-track lyric links, Spotify player, previous-album card, rotating lyric quote, back-catalog strip.
- **Music Catalog:** Driven entirely by the local `src/config/catalogDb.json` (projects with tracklists) and `src/config/lyricsDb.json` (standalone single lyrics). Cards open a modal with artwork, Spotify/Apple buttons, tracklist and section-labelled lyrics. Deep link: `/music?release=<title>&track=<n>`.
- **EPK (Industry Hub):** A professional, hidden route (`/epk`) designed for labels and press. Includes biography, downloadable high-res asset management, and a functional contact system.

## 2. Global Features & Aesthetic

- **Visual Identity:** Ultra-dark theme (#0a0a0a) with a global static noise/grain overlay and atmospheric 'fog' animations.
- **UI Components:** Strict glassmorphism panels, high-contrast bold typography, and a fixed header stack.
- **Marquee Banner:** A slow scrolling announcement for `CURRENT_RELEASE` ("Pre-Save" before release day, "Out Now" after), dismissible per release.
- **Mobile First:** Fully responsive navigation and bento-style layouts optimized for iOS and Android.

## 3. Tech Stack & Integrations

- **Frontend:** Vite + React (TypeScript) + Tailwind CSS.
- **Animation:** Framer Motion (page transitions and interactive states).
- **Icons:** Lucide-React + Official high-fidelity SVG brand paths.
- **Backend:** Vercel Serverless Functions (Node.js).
- **External APIs:**
  - **Resend:** Email routing for EPK inquiries (`api/contact.js`, needs `RESEND_API_KEY`).
- **Monitoring:** Vercel Analytics + Vercel Speed Insights.

## 4. Operational Guidelines

- **Zero Retail:** No references to TCG, cards, or retail shops. This is a strictly music-focused hub.
- **Case-Sensitivity:** Imports and file paths must strictly match the file system for Linux-based deployment compatibility.
- **Build Optimized:** The `npm run build` script is set to `vite build` to ensure deployment stability on Vercel.
- **Lyrics format:** Section markers are their own lines in square brackets (e.g. `[Verse 1]`, `[Chorus]`); consecutive repeated lines are collapsed to `(x2)`, `(x4)`. Homepage quotes in `src/config/lyricQuotes.ts` must be verbatim, contiguous excerpts.
- **Checks before pushing:** `npm run lint`, `npm run typecheck`, `npm run build`.
