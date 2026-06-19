import catalogDb from './catalogDb.json';

const garfieldPark = catalogDb.albums[0];

// Dynamic calculation for the current single (Different is track 2)
const differentTrack = garfieldPark.tracks.find(t => t.title === "Different");
const moreLonelyTrack = garfieldPark.tracks.find(t => t.title === "More Lonely");

export const RELEASE_DATA = {
  currentSingle: {
    title: differentTrack ? differentTrack.title : "Different",
    artworkUrl: differentTrack && differentTrack.coverArt ? differentTrack.coverArt : "/different.png",
    streamLink: differentTrack && differentTrack.hyperfollowLink ? differentTrack.hyperfollowLink : "https://distrokid.com/hyperfollow/colincherry/different-3",
    spotifyTrackId: differentTrack && differentTrack.spotifyLink ? differentTrack.spotifyLink.split('/').pop() : "7pnTJS5vf9YZygusVOb1qS",
    spotifyLink: differentTrack && differentTrack.spotifyLink ? differentTrack.spotifyLink : "https://open.spotify.com/album/7pnTJS5vf9YZygusVOb1qS"
  },
  nextUp: {
    title: moreLonelyTrack ? moreLonelyTrack.title : "More Lonely",
    releaseDate: "June 19",
    preSaveLink: moreLonelyTrack && moreLonelyTrack.hyperfollowLink ? moreLonelyTrack.hyperfollowLink : "https://distrokid.com/hyperfollow/colincherry/more-lonely"
  },
  rollout: {
    albumTitle: garfieldPark.title,
    targetMonth: "August 2026",
    showTeaser: true,
    countdownTarget: "2026-08-01T00:00:00-04:00",
    coverArt: "/Garfield Park.png",
    spotifyPreSaveLink: garfieldPark.spotifyLink || "https://distrokid.com/hyperfollow/colincherry/garfield-park",
    appleMusicPreOrderLink: garfieldPark.appleMusicLink || "https://music.apple.com/us/album/garfield-park/6777408712?uo=4&app=itunes&at=1001lry3&ct=dashboard"
  }
};

// Map tracks to the flat structure expected by the pages
export const upcomingReleases = garfieldPark.tracks.map(track => {
  // Parse month and day from releaseDate (e.g. "June 5, 2026" -> "JUNE 5")
  let displayDate = "PAST RELEASE";
  
  if (track.releaseDate) {
    const parts = track.releaseDate.split(',');
    if (parts.length > 0) {
      const datePart = parts[0].trim().toUpperCase(); // e.g. "JUNE 5"
      // If it's a future date, set it to that date.
      // Wait, is it future? Let's check:
      const year = parts[1] ? parseInt(parts[1].trim()) : 2026;
      const releaseTime = Date.parse(`${parts[0]}, ${year}`);
      if (!isNaN(releaseTime) && releaseTime > Date.now()) {
        displayDate = datePart;
      }
    }
  }

  return {
    title: track.title,
    date: displayDate,
    link: track.hyperfollowLink || track.spotifyLink || track.appleMusicLink || garfieldPark.appleMusicLink,
    art: track.coverArt || garfieldPark.coverArt || "/different.png",
    themeColor: track.themeColor || "#FFFFFF",
    lyrics: track.lyrics
  };
});
