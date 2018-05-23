const Future = require("fluture");
const Result = require("folktale/result");
const axios = require("axios");

const get = Future.encaseP(axios.get);
const http = Future.encaseP(axios);

const credentials = Future((reject, resolve) => {
  if (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) {
    resolve({
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
  } else {
    reject("need SPOTIFY_CLIENT_ID & SPOTIFY_CLIENT_SECRET as env. variables");
  }

  return () => {};
});

const spotifyAuth = ({ clientID, clientSecret }) => {
  const token = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");

  return http({
    method: "POST",
    headers: { Authorization: `Basic ${token}` },
    data: "grant_type=client_credentials",
    url: "https://accounts.spotify.com/api/token",
  });
};

const spotify = () =>
  credentials
    .chain(spotifyAuth)
    .map(res => res.data)
    .map(({ access_token }) => {
      const instance = axios.create({
        baseURL: "https://api.spotify.com/v1/",
        timeout: 1000,
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return Future.encaseP(instance.get);
    });

const client = Future.cache(spotify());

module.exports = { client };
