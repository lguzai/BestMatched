"use strict";

const config = require("../../src/config");

test("should get database properties with pg client", async () => {
  const databaseConfiguration = config.knex;
  expect(databaseConfiguration.client).toBe(`pg`);
});
