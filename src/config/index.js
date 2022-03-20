"use strict";

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE, PGDATABASE_TEST } =
  process.env;

/**
 * Global configuration, from env variables
 */
module.exports = {
  knex: {
    client: "pg",
    debug: false,
    connection: {
      host: PGHOST,
      user: PGUSER,
      password: PGPASSWORD,
      database: PGDATABASE,
      port: PGPORT,
    },
    pool: { min: 0, max: 10 },
  },
  knexTest: {
    client: "pg",
    debug: true,
    connection: {
      host: PGHOST,
      user: PGUSER,
      password: PGPASSWORD,
      database: PGDATABASE_TEST,
      port: PGPORT,
    },
    pool: { min: 0, max: 5 },
  },
};
