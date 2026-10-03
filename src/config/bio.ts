// Official artist bio copy. Single source of truth for the About page, the EPK and
// structured data. Keep these free of em dashes (house style for public copy).

export const BIO_TAGLINE = 'Alternative pop and emo rap from Indianapolis, Indiana.';

/** ~90-word press blurb: EPK, press kits, playlist pitches, show listings. */
export const BIO_SHORT =
  "Colin Cherry is an alternative pop and emo rap artist from Indianapolis, Indiana. After coming up in hip-hop as August Elliott, he now releases under his own name, trading punchline-first rap for melodic, emotionally honest songwriting built around his baritone voice and heavy hooks. A choir-trained vocalist who has performed since his teens, Colin is self-taught in audio engineering and has recorded his own music since age 16. His 2026 releases, the album Garfield Park and the EP There's No Going Back, define his current sound. Influences include Mac Miller, tobi lou, Neck Deep, and Oliver Francis.";

/** Used for meta descriptions (keep under ~160 characters). */
export const BIO_META =
  "Colin Cherry is an alternative pop and emo rap artist from Indianapolis. Read his story and stream Garfield Park and There's No Going Back.";

export interface BioSection {
  heading: string;
  paragraphs: string[];
}

/** Full biography for the About page. */
export const BIO_FULL: BioSection[] = [
  {
    heading: 'The sound',
    paragraphs: [
      'Colin Cherry is an alternative pop and emo rap artist from Indianapolis, Indiana. His music is built on a rich baritone voice, tightly stacked internal rhymes, and writing that refuses to dress up how he actually feels.',
      'He draws from artists like Mac Miller, tobi lou, Neck Deep, and Oliver Francis, landing somewhere between melodic rap, pop-punk energy, and confessional pop.',
    ],
  },
  {
    heading: 'From CCher to Colin Cherry',
    paragraphs: [
      'He started out rapping as CCher, then spent several years as August Elliott, a name built from his middle name and the name his parents almost gave him instead of Colin. The August Elliott era was hip-hop first: clever wordplay, aggressive delivery, and bars written to prove a point.',
      'Over time the music grew more melodic and genre-fluid, and the goal shifted from impressing people to telling the truth. Releasing under his own name was the final step, and it came with a rule he still writes by: nothing goes on a record unless it is completely true to him.',
    ],
  },
  {
    heading: 'Built from the ground up',
    paragraphs: [
      'Colin taught himself audio engineering and has recorded his own music since he was 16. He sang in choir throughout school and has performed on stage since his teens, so the voice comes first. His focus is vocal performance, songwriting, and layered vocal arrangements grounded in a strong understanding of music theory.',
      'He also plays guitar, ukulele, and saxophone, but the instrument every song is built around is his voice.',
    ],
  },
  {
    heading: 'Now',
    paragraphs: [
      "That foundation drives the hooks on his 2026 releases: the full-length album Garfield Park and the EP There's No Going Back. Still based in his hometown of Indianapolis, Colin is focused on taking his sound further and carving out his own space in alternative music.",
    ],
  },
];

export const INFLUENCES = ['Mac Miller', 'tobi lou', 'Neck Deep', 'Oliver Francis'];
export const GENRES = ['Alternative Pop', 'Emo Rap', 'Melodic Rap'];
