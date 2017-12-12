
const client_id = 'cec02db15b4240bc9dd01c8f3a7d4065';
const redirect_uri ='http://localhost:3000/callback#';

let access_token = '';

const spotify = {

  getAccessToken(){
    if(access_token){
      return access_token;
    }

    const getParamToken = window.location.href.match(/access_token=([^&]*)/);
    const getExpire= window.location.href.match(/expires_in=([^&]*)/);

    if(getParamToken && getExpire){
      access_token = getParamToken[1];
      const expiresIn = Number(getExpire[1]);
      window.setTimeout(() => access_token = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return access_token;
    }
    else {
      const SpotifyUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
      window.location = SpotifyUrl;
    }
  },
  search(value){
    const token = spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${value}`,{headers: {Authorization: `Bearer ${token}`}
  }).then(response => {
    return response.json();
  }).then(jsonResponse =>{
    if(!jsonResponse.tracks){
      return [];
    }
    return jsonResponse.tracks.items.map(track =>
      ({ name: track.name,
         artist: track.artists[0].name,
         album: track.album.name,
         id: track.id,
         uri: track.uri
      }));
    })
  },

  savePlaylist(playlistName, Uris){
  if(!playlistName || !Uris){
    return;
  }
  const accessToken = spotify.getAccessToken();
  const headers = {Authorization: `Bearer ${accessToken}`};
  let userId = '';
  let playlistID ='';

  return fetch('https://api.spotify.com/v1/me',{
    headers: headers}
  ).then (response =>
    response.json()
).then (jsonResponse => {
    userId = jsonResponse.id;
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      {headers: headers,
       method: 'POST',
       body: JSON.stringify({name: playlistName})
    }).then (response =>
       response.json()
    ).then (jsonResponse => {
        playlistID = jsonResponse.id;
       return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
       {headers: headers,
        method: 'POST',
        body: JSON.stringify({uris: Uris})
    }).then (response =>
    response.json()
  ).then(jsonResponse => {
     playlistID = jsonResponse.id;
  })
    })
  });
}

}
export default spotify;
