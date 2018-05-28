const { Ok, Error } = require("folktale/result");

const utils = require("./utils");

test("getProp returns Ok value when path exists.", () => {
  const obj = {
    a: {
      key: [{ ok: true }],
    },
  };

  const res = utils.getProp("a", "key", 0, "ok")(obj);

  expect(Ok.hasInstance(res)).toBeTruthy();
  expect(Error.hasInstance(res)).toBeFalsy();
});

test("getProp returns Error when path fails", () => {
  const obj = {
    a: {
      key: [{ ok: true }],
    },
  };

  const res = utils.getProp("a", "key", 0, "nope")(obj);

  expect(Ok.hasInstance(res)).toBeFalsy();
  expect(Error.hasInstance(res)).toBeTruthy();
});
