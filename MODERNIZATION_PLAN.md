# Colin Cherry — Website Modernization Plan

_Prepared June 18, 2026. Scope: fix what's broken, push the Garfield Park release to the front, and build out a complete, streamable music catalog._

---

## 0. The headline issue (read this first)

**The site is not actually broken. The code builds and the latest Vercel deploy (June 14, commit `dd86640`) is live and healthy.** The problem is two separate things that look like an outage:

1. **`www.colincherrymusic.com` is not attached to the Vercel project.** The project (`thecolincherry`) only serves `www.thecolincherry.com` and the `*.vercel.app` URLs. That's why `colincherrymusic.com` throws a browser error — its DNS/domain was never wired to the deployment. **Decision made: use `thecolincherry.com` as the canonical site.**
2. **All recent work is unpushed.** You're 3 commits ahead of GitHub plus a large pile of uncommitted edits. Vercel only deploys what's on `main`, so even the working domain shows the June 14 version, not your latest catalog-driven rebuild.

Everything below assumes we (a) commit/push your local work safely, and (b) treat `thecolincherry.com` as home.

---

## Phase 1 — Get current work safely live

**Goal: deploy the modernization you've already done, without breaking the build.**

1. **Commit the untracked data files together with the code.** `src/config/catalogDb.json` and `api/catalogDb.json` are new and untracked, but `releaseData.ts` and `Discography.tsx` import them. Commit them in the same push or the Vercel build fails on an unresolved import.
2. **Resolve the image renames.** `public/Garfield Park.jpg` and `public/press-photo.jpg` are deleted; `Garfield Park.png` and `press-photo.png` are their untracked replacements. Make sure the new ones are committed and every reference points at `.png`.
3. **Fix two stale image references:**
   - `EPK.tsx` line 51 → `/press-photo.jpg` should be `/press-photo.png`.
   - `Hero.tsx` line 15 default → `/lonely.png` should be `/more-lonely.png` (currently masked because Home passes an override, but it's a latent bug).
4. **Push to `main`, confirm the Vercel deploy goes READY**, then smoke-test `thecolincherry.com`.

---

## Phase 2 — Fix what's broken or fake

**Deep-link 404s (real bug).** The site uses React Router (`/music`, `/epk`, `/store`) but has no `vercel.json`. Direct visits or refreshes on those routes 404 on Vercel. Add an SPA rewrite:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Massive images (the #1 perf problem).** Cover/photo PNGs are enormous and will make the site crawl on mobile:

| File | Size |
|---|---|
| `Garfield Park.png` | **28 MB** |
| `guilty-conscience.png` | 16 MB |
| `different.png` | 13 MB |
| `holding-on.png` | 12 MB |
| `more-lonely.png` | 7 MB |
| `CC_00004_.png`, `CC_00008_.png` | ~3 MB each |

Action: resize covers to ~1200×1200 max, convert to WebP/optimized JPG, target <300 KB each. This alone is the biggest single UX win.

**Fake newsletter signup.** The "Archive" email capture on the homepage just flips a state flag — nothing is stored or sent. Either wire it to a real provider (Resend, Mailchimp, ConvertKit, Beehiiv) or relabel it honestly until it's connected.

**Leftover placeholder data.** `Discography.tsx` still has a `LYRICS_CACHE` for "Dark Ether" and "Neon Nights" — generic cyberpunk filler that isn't your music. Remove it.

**Spotify API returns empty in production.** `/api/spotify` came back blank, which means `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` are likely unset in Vercel env vars, so the Discography silently falls back to the local catalog. Set those env vars (or accept the local catalog as the source of truth and simplify — see Phase 3).

**Store checkout** is an intentional "Coming Soon" mock — fine to leave until the Garfield Park physical run is real.

---

## Phase 3 — Build out the full catalog (the core ask)

**Goal: every song in the database, every cover present, and every release linking straight to Spotify and Apple Music.**

### The data-model problem

Right now `catalogDb.json` models Garfield Park as one 9-track album — but 5 of those "tracks" are actually standalone singles you've already released, each with its own Spotify/Apple album ID. The schema conflates "album track" with "released single," so released songs carry their links while unreleased ones point at a `/different.png` placeholder cover.

**Recommended fix:** restructure into a flat `releases` list where every entry — single or album — is a first-class object:

```json
{
  "title": "Holding On",
  "type": "single",
  "releaseDate": "2026-05-08",
  "coverArt": "/covers/holding-on.webp",
  "spotifyUrl": "https://open.spotify.com/album/28Vv4avwyZH05DdKVG0zhC",
  "appleMusicUrl": "https://music.apple.com/us/album/holding-on-single/1894578939",
  "isReleased": true,
  "lyrics": "…"
}
```

The Garfield Park album becomes its own entry that references its tracklist. This makes "link each song to Spotify + Apple" trivial and removes the empty-link special-casing.

### Current catalog status (what's done vs. missing)

| Release | Date | Cover | Spotify | Apple Music |
|---|---|---|---|---|
| Rose | Apr 24, 2026 | ✅ | ✅ | ✅ |
| Holding On | May 8, 2026 | ✅ | ✅ | ✅ |
| Guilty Conscience | May 22, 2026 | ✅ | ✅ | ✅ |
| Different | Jun 5, 2026 | ✅ | ✅ | ✅ |
| More Lonely | Jun 19, 2026 | ✅ | ⏳ pre-save | ⏳ pre-save |
| **Garfield Park (album)** | **Aug 1, 2026** | ✅ | ⏳ pre-save | ⏳ pre-order |
| ↳ Only Human | Aug 1, 2026 | ❌ placeholder | — | — |
| ↳ Alone | Aug 1, 2026 | ❌ placeholder | — | — |
| ↳ Nothing to Prove | Aug 1, 2026 | ❌ placeholder | — | — |
| ↳ Thnks Fr Frgtting Me | Aug 1, 2026 | ❌ placeholder | — | — |

### To-do for a complete catalog

1. **Confirm the full discography.** Your DistroKid shows Garfield Park + the singles above. Verify there are no older releases missing from the database (check "Show all releases" in DistroKid and your Spotify artist page). Anything found gets added as a release entry.
2. **Add real cover art** for the 4 unreleased Garfield Park tracks (or, if they're album-only and never get single art, have them inherit the album cover instead of `/different.png`).
3. **Backfill Spotify + Apple links** on each single as it goes live — More Lonely on **June 19 (tomorrow)**, then the album and its tracks on **Aug 1**.
4. **Add a "Listen on" row** to every catalog card and the detail modal: Spotify + Apple buttons, consistent with the Hero. Right now the detail modal only shows a generic "View on Platform" link.
5. **Optional but recommended:** since the Spotify API is flaky in prod, make the local `catalogDb.json` the single source of truth and drop the live API dependency. Simpler, faster, and you control exactly what shows.

---

## Phase 4 — Make Garfield Park the centerpiece

The homepage already leans into the album (countdown to Aug 1, June 19 → Aug 1 timeline, pre-save spotlight). Sharpen it:

1. **Hero = Garfield Park, always**, until release: album art, dual Spotify pre-save / Apple pre-order buttons (already built), countdown.
2. **Dedicated Garfield Park section/page:** tracklist with lyrics, the story behind the record, and per-track pre-save as singles roll out.
3. **Rolling single spotlight:** auto-feature the next single (More Lonely now) with its own pre-save, then swap to "out now" + embedded player on release day.
4. **Physical pre-orders:** wire the Store's vinyl/cassette to go live with the album instead of the current mock checkout.
5. **Release-day automation:** on Aug 1, flip the Hero from "pre-save" to "stream now" with an embedded album player.

---

## Phase 5 — Modernization & polish

- **SEO / social sharing:** add Open Graph + Twitter card meta with the Garfield Park cover so links unfurl with art. Currently missing — shared links look bare.
- **Analytics:** Vercel Analytics + Speed Insights are already wired in; add basic conversion goals (pre-save clicks).
- **Accessibility:** alt text on all covers, focus states on the modals, keyboard-closable lightboxes.
- **Consistent streaming icons** (Spotify, Apple, plus optionally YouTube Music, Amazon, SoundCloud) across Hero, catalog, and footer.
- **Domain housekeeping:** with `thecolincherry.com` canonical, either point `colincherrymusic.com` to redirect there (so the old name still works) or let it lapse. Don't leave it half-configured.

---

## Suggested order of execution

1. **Phase 1** — commit + push safely, confirm live. _(fast, unblocks everything)_
2. **Phase 2** — `vercel.json` rewrite, image compression, kill placeholder data. _(biggest stability + speed wins)_
3. **Phase 3** — restructure catalog, backfill covers/links. _(the core ask)_
4. **Phase 4** — Garfield Park centerpiece + single rollout. _(the highlight)_
5. **Phase 5** — SEO, a11y, domain cleanup. _(polish)_

Immediate near-term beats: **More Lonely drops June 19 (tomorrow)** and the **album lands Aug 1** — Phases 1–2 should happen before tomorrow's single so the site is fast and current when traffic comes.
