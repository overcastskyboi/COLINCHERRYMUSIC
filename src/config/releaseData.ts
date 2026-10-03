import catalogDb from './catalogDb.json';

export type CatalogAlbum = (typeof catalogDb.albums)[number];
export type CatalogTrack = CatalogAlbum['tracks'][number];

const findAlbum = (title: string): CatalogAlbum => {
  const album = catalogDb.albums.find(a => a.title === title);
  if (!album) throw new Error(`catalogDb is missing "${title}"`);
  return album;
};

const theresNoGoingBack = findAlbum("There's No Going Back");
const garfieldPark = findAlbum('Garfield Park');

/** "October 2, 2026" -> "2026-10-02" without UTC drift (toISOString shifts the day east of UTC). */
export const toISODate = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const isReleased = (dateStr: string) => {
  const t = new Date(dateStr).getTime();
  return !isNaN(t) && t <= Date.now();
};

export interface FeaturedRelease {
  title: string;
  kind: string;
  releaseDate: string;
  releaseDateISO: string;
  coverArt: string;
  coverArtSmall: string;
  accent: string;
  tagline: string;
  spotifyLink: string;
  spotifyId: string;
  appleMusicLink: string;
  amazonLink: string;
  tracks: CatalogTrack[];
}

// The release the whole site is built around right now. To roll the site forward
// to a new era, add the release to catalogDb.json and point CURRENT_RELEASE at it.
export const CURRENT_RELEASE: FeaturedRelease = {
  title: theresNoGoingBack.title,
  kind: 'EP',
  releaseDate: theresNoGoingBack.releaseDate,
  releaseDateISO: '2026-10-02T00:00:00-04:00',
  coverArt: theresNoGoingBack.coverArt,
  coverArtSmall: '/theres-no-going-back-600.jpg',
  accent: '#9DB0E3',
  tagline: 'Six songs. One direction.',
  spotifyLink: theresNoGoingBack.spotifyLink,
  spotifyId: theresNoGoingBack.spotifyLink.split('/').pop() || '',
  appleMusicLink: theresNoGoingBack.appleMusicLink,
  amazonLink: theresNoGoingBack.amazonLink,
  tracks: theresNoGoingBack.tracks,
};

export const PREVIOUS_RELEASE: FeaturedRelease = {
  title: garfieldPark.title,
  kind: 'Album',
  releaseDate: garfieldPark.releaseDate,
  releaseDateISO: '2026-08-01T00:00:00-04:00',
  coverArt: garfieldPark.coverArt,
  coverArtSmall: garfieldPark.coverArt,
  accent: '#D4AF37',
  tagline: 'A gritty, groove-heavy dissection of routine and ambition.',
  spotifyLink: garfieldPark.spotifyLink,
  spotifyId: garfieldPark.spotifyLink.split('/').pop() || '',
  appleMusicLink: garfieldPark.appleMusicLink,
  amazonLink: garfieldPark.amazonLink,
  tracks: garfieldPark.tracks,
};

/** Every track that lives on a multi-track project, flattened (used for lyric/theme lookups). */
export const allProjectTracks = catalogDb.albums.flatMap(album =>
  album.tracks.map(track => ({ ...track, album: album.title }))
);

/** Newest-first list of every release (projects + standalone singles) for "recent releases" strips. */
export const recentReleases = [
  ...catalogDb.albums.map(a => ({
    title: a.title,
    type: a.type,
    date: toISODate(a.releaseDate),
    coverArt: a.coverArt,
    spotifyLink: a.spotifyLink,
  })),
  ...catalogDb.singles.map(s => ({
    title: s.title,
    type: s.type,
    date: s.releaseDate,
    coverArt: s.coverArt,
    spotifyLink: s.spotifyLink,
  })),
]
  .filter(r => isReleased(r.date))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export interface SongSource {
  year: string;
  spotifyLink: string;
}

/**
 * Where a song can be heard and when it came out. Project tracks link to their own single
 * when they have one, otherwise to the project. Returns null for songs that aren't in the
 * catalog yet, so callers can skip them instead of showing a dead link.
 */
export const resolveSong = (title: string): SongSource | null => {
  const key = title.trim().toLowerCase();
  const single = catalogDb.singles.find(s => s.title.toLowerCase() === key);
  if (single?.spotifyLink) {
    return { year: single.releaseDate.slice(0, 4), spotifyLink: single.spotifyLink };
  }
  for (const album of catalogDb.albums) {
    const track = album.tracks.find(t => t.title.toLowerCase() === key);
    if (track) {
      const link = track.spotifyLink || album.spotifyLink;
      if (!link) return null;
      return { year: toISODate(track.releaseDate || album.releaseDate).slice(0, 4), spotifyLink: link };
    }
  }
  return null;
};
