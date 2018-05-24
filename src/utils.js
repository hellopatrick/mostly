const Result = require("folktale/result");
const Future = require("fluture");

const resultToFuture = res => res.fold(Future.reject, Future.of);

const getProp = (...path) => obj => {
  return Result.fromNullable(
    path.reduce((obj, key) => (obj ? obj[key] : null), obj),
    `path ${path} empty`
  );
};

const inspect = x => {
  console.log(x);
  return x;
};

module.exports = { getProp, resultToFuture, inspect };
