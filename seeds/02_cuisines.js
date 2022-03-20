const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);
const copyFrom = require("pg-copy-streams").from;
const fs = require("fs");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cuisines").del();
  const knexClient = await knex.client;
  const pgClient = await knexClient.acquireConnection();
  const fileStream = fs.createReadStream("./seeds/cuisines.csv");

  await pipeline(
    fileStream,
    pgClient.query(
      copyFrom(
        `COPY cuisines FROM STDIN WITH (FORMAT csv, HEADER true, DELIMITER ',')`
      )
    )
  );
};
