"use strict";

const Knex = require("knex");
const { attachPaginate } = require("knex-paginate");
const fp = require("fastify-plugin");

const config = require("../config");

/**
 * This plugin is helpful for query building
 *
 * @see https://github.com/nbalduzzi/fastify-knexjs
 */
function fastifyKnex(fastify, opts = {}, next) {
  if (!fastify.knex) {
    const db = Knex({
      ...config.knex,
    });
    attachPaginate();
    fastify.decorate("knex", db);
  }
  next();
}

module.exports = fp(fastifyKnex, { name: "knex" });
