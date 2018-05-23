require("dotenv").config();

const Future = require("fluture");

const { relatedArtist } = require("./src/spotify");

const argv = Future.attempt(() => process.argv);
const names = argv.map(args => args.slice(2));

const related = relatedArtist;

const similar = one => two => [one, two];

const main = ([one, two]) => {
  return Future.of(similar)
    .ap(related(one))
    .ap(related(two));
};

names.chain(main).fork(console.error, console.log);
