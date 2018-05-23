const Result = require("folktale/result");
const Future = require("fluture");

const { client } = require("./spotify/auth");
const { getProp, resultToFuture, map } = require("./utils");

const findArtist = name =>
  client
    .chain(get => get(`/search?q=${name}&type=artist`))
    .map(res => res.data)
    .map(getProp("artists", "items", 0, "id"))
    .chain(resultToFuture);

const related = id =>
  client
    .chain(get => get(`/artists/${id}/related-artists`))
    .map(res => res.data)
    .map(getProp("artists"))
    .chain(resultToFuture)
    .map(artists => artists.map(({ name }) => name));

const relatedArtists = name => findArtist(name).chain(related);

module.exports = { relatedArtists };
