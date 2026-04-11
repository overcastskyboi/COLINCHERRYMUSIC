export default async function handler(req, res) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const artist_id = '2lCz91g9DugcZhbtvMnaUN';

  try {
    // 1. Get Access Token
    const authResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials'
      })
    });

    const authData = await authResponse.json();
    if (!authData.access_token) {
      throw new Error('Failed to obtain access token');
    }

    const access_token = authData.access_token;

    // 2. Get Artist's Albums/Singles
    const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artist_id}/albums?include_groups=album,single&market=US&limit=50`, {
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    });

    const albumsData = await albumsResponse.json();

    // Set Cache-Control for performance
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(albumsData.items);
  } catch (error) {
    console.error('Spotify API Error:', error);
    res.status(500).json({ error: 'Failed to fetch music data' });
  }
}
