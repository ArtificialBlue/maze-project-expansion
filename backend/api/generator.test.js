const random_id = require("./generator");

test("Returns random ID hex string with length of nbytes * 2", () => {
  expect(random_id(50)).toHaveLength(100);
});
