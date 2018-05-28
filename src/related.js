const { client } = require("./spotify/auth");
const { getProp, resultToFuture } = require("./utils");

const findArtist = name =>
  client
    .chain(get => get(`/search?q=${name}&type=artist`))
    .map(getProp("data", "artists", "items", 0, "id"))
    .chain(resultToFuture);

const related = id =>
  client
    .chain(get => get(`/artists/${id}/related-artists`))
    .map(getProp("data", "artists"))
    .chain(resultToFuture)
    .map(artists => artists.map(({ name }) => name));

const relatedArtists = name => findArtist(name).chain(related);

module.exports = { relatedArtists };
