"use strict";

const { build } = require("../helper");
const app = build();

test("default root route", async () => {
  const res = await app.inject({
    url: "/",
  });
  expect(res.payload).toBe(
    `Access /restaurants/getBestMatch to see the best matched restaurants`
  );
});
