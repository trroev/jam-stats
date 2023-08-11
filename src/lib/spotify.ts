// can update scopes as needed
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-modify-playback-state",
  "user-follow-read",
  "user-library-read",
  "user-read-currently-playing",
  "user-read-email",
  "user-read-playback-state",
  "user-read-private",
  "user-read-recently-played",
  "user-top-read",
].join(",")

const params = {
  scope: scopes,
}

const queryParamString = new URLSearchParams(params).toString()

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`
