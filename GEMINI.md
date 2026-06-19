# MISSION: The Colin Cherry Music Artist Hub

A high-end, minimalist digital experience for artist Colin Cherry. Built for atmospheric immersion, fan conversion, and professional industry pitching.

## 1. Core Architecture

- **Home:** Abstract minimalist hero section with front-and-center Spotify/Apple Music embeds. Includes a mobile-optimized 'Bento Grid' for navigation and a dynamic 'Release Schedule' with artwork and pre-save links.
- **Music Catalog:** Dynamic discography powered by a Vercel Serverless / Spotify API integration. Features clickable release artwork that opens high-fidelity modals containing lyrics, streaming embeds, and platform links.
- **EPK (Industry Hub):** A professional, hidden route (`/epk`) designed for labels and press. Includes biography, downloadable high-res asset management, and a functional contact system.

## 2. Global Features & Aesthetic

- **Visual Identity:** Ultra-dark theme (#0a0a0a) with a global static noise/grain overlay and atmospheric 'fog' animations.
- **UI Components:** Strict glassmorphism panels, high-contrast bold typography, and a fixed header stack.
- **Marquee Banner:** An automated, continuously scrolling CSS marquee at the top of the viewport that dynamically displays the next upcoming release based on the current date.
- **Mobile First:** Fully responsive navigation and bento-style layouts optimized for iOS and Android.

## 3. Tech Stack & Integrations

- **Frontend:** Vite + React (TypeScript) + Tailwind CSS.
- **Animation:** Framer Motion (page transitions and interactive states).
- **Icons:** Lucide-React + Official high-fidelity SVG brand paths.
- **Backend:** Vercel Serverless Functions (Node.js).
- **External APIs:** 
  - **Spotify API:** Dynamic catalog fetching via Client Credentials flow.
  - **Resend:** Secure email routing for EPK inquiries.
- **Monitoring:** Vercel Analytics + Vercel Speed Insights.

## 4. Operational Guidelines

- **Zero Retail:** No references to TCG, cards, or retail shops. This is a strictly music-focused hub.
- **Case-Sensitivity:** Imports and file paths must strictly match the file system for Linux-based deployment compatibility.
- **Build Optimized:** The `npm run build` script is set to `vite build` to ensure deployment stability on Vercel.
