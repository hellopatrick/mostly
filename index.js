require("dotenv").config();

const Future = require("fluture");
const { List, Set } = require("immutable-ext");

const { relatedArtists } = require("./src/related");
const { inspect } = require("./src/utils");

const argv = Future.attempt(() => process.argv);
const names = argv.map(args => args.slice(2));

const commonRelatedArtists = artists =>
  artists.map(Set).reduce((acc, cur) => acc.intersect(cur));

const main = names => {
  return List.of(...names)
    .traverse(Future.of, relatedArtists)
    .map(commonRelatedArtists);
};

names
  .map(inspect)
  .chain(main)
  .fork(console.error, console.log);
