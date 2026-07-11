// Rotating pool for the homepage "Featured Single" card. Each entry pairs a released
// track with a short poetic synopsis of what the song is actually about — written from
// the lyrics, not just a mood tag. One is chosen at random on every page load, the same
// pattern as lyricQuotes.ts for the "Lyric Poetry" card.

export interface FeaturedSingle {
  title: string;
  synopsis: string;
  spotifyLink: string;
  themeColor: string;
}

export const featuredSingles: FeaturedSingle[] = [
  {
    title: "Different",
    synopsis:
      "A haunting exploration of emotional distance and half-confessions — loving someone fluent in deflection, and wanting them to change while being terrified that changing them means losing them.",
    spotifyLink: "https://open.spotify.com/album/7pnTJS5vf9YZygusVOb1qS",
    themeColor: "#E4405F",
  },
  {
    title: "Rose",
    synopsis:
      "A slow goodbye to someone irreplaceable — grateful for the time it lasted, honest about the ache of watching them go, and unwilling to pretend the love wasn't real.",
    spotifyLink: "https://open.spotify.com/album/1oQfVTE5ixc2JiqJn2G2ZN",
    themeColor: "#D4AF37",
  },
  {
    title: "Guilty Conscience",
    synopsis:
      "A confrontation with every burned bridge and broken promise — the weight of knowing exactly who you let down, and the quiet vow to change before it's too late to matter.",
    spotifyLink: "https://open.spotify.com/album/3SMTqPigGXZfva4mQV3Hms",
    themeColor: "#555555",
  },
  {
    title: "Holding On",
    synopsis:
      "The exhausting work of keeping it together in public while something underneath keeps moving like waves — routines built to look steady, panic hidden just under the skin.",
    spotifyLink: "https://open.spotify.com/album/28Vv4avwyZH05DdKVG0zhC",
    themeColor: "#00f2ea",
  },
];
