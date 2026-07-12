// Rotating pool for the homepage "Featured Single" card. Each entry pairs a released
// track with a short, independent summary of what the song is actually about — written
// as an outside description of the theme, not a rephrasing of the lyrics themselves.
// One is chosen at random on every page load, the same pattern as lyricQuotes.ts for
// the "Lyric Poetry" card.

export interface FeaturedSingle {
  title: string;
  synopsis: string;
  spotifyLink: string;
  appleMusicLink: string;
  themeColor: string;
}

export const featuredSingles: FeaturedSingle[] = [
  {
    title: "Different",
    synopsis:
      "About loving someone who won't let you all the way in — wanting them to change and open up, while knowing that changing them might mean losing the person you fell for in the first place.",
    spotifyLink: "https://open.spotify.com/album/7pnTJS5vf9YZygusVOb1qS",
    appleMusicLink: "https://music.apple.com/us/album/different-single/1895632562",
    themeColor: "#E4405F",
  },
  {
    title: "Rose",
    synopsis:
      "A breakup song that skips the bitterness — processing a real loss with gratitude instead of resentment, and choosing to hold onto what the relationship meant rather than erase it.",
    spotifyLink: "https://open.spotify.com/album/1oQfVTE5ixc2JiqJn2G2ZN",
    appleMusicLink: "https://music.apple.com/us/album/rose-single/1894950069",
    themeColor: "#D4AF37",
  },
  {
    title: "Guilty Conscience",
    synopsis:
      "A self-reckoning track — owning past mistakes and broken promises instead of dodging them, and sitting with the pressure to actually follow through on change this time.",
    spotifyLink: "https://open.spotify.com/album/3SMTqPigGXZfva4mQV3Hms",
    appleMusicLink: "https://music.apple.com/us/album/guilty-conscience-single/1895656258",
    themeColor: "#555555",
  },
  {
    title: "Holding On",
    synopsis:
      "About the exhausting work of looking fine on the outside while barely keeping it together underneath — and the discipline it takes to keep functioning when everything feels like it's slipping.",
    spotifyLink: "https://open.spotify.com/album/28Vv4avwyZH05DdKVG0zhC",
    appleMusicLink: "https://music.apple.com/us/album/holding-on-single/1894578939",
    themeColor: "#00f2ea",
  },
];
