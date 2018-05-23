require("dotenv").config();

const Future = require("fluture");

const { relatedArtists } = require("./src/spotify");

const argv = Future.attempt(() => process.argv);
const names = argv.map(args => args.slice(2));

const commonRelatedArtists = artists => others =>
  artists.filter(artist => others.includes(artist));

const main = ([fst, snd]) => {
  return Future.of(commonRelatedArtists)
    .ap(relatedArtists(fst))
    .ap(relatedArtists(snd));
};

names.chain(main).fork(console.error, console.log);
