"use strict";

const { build: buildApplication } = require("fastify-cli/helper");
const Fastify = require("fastify");
const fp = require("fastify-plugin");
const App = require("../app");
const { knexTest } = require("../src/config");
const Knex = require("knex");
const { attachPaginate } = require("knex-paginate");

function config() {
  return {};
}

function build() {
  const app = Fastify();

  beforeAll(async () => {
    void app.register(fp(App));
    await app.ready();
  });

  afterAll(() => app.close());

  return app;
}

const buildKnexTestInstance = () => {
  const knex = Knex(knexTest);
  attachPaginate();
  return knex;
};

module.exports = {
  config,
  build,
  buildKnexTestInstance,
};
