"use strict";
const fp = require("fastify-plugin");
const { RestaurantSource } = require("../datasources");

module.exports = fp(
  /**
   * DataSources management plugin: builds them once for all, when server starts.
   * Decorates Fastify server with property:
   * - `server.dataSources: Object`: returns object with `restaurants` properties
   *
   * @param {Fastify} server - fastify decorated instance
   * @param {Object} options - plugin options, containing keys required by DataSource constructors
   */
  async (fastify, opts) => {
    fastify.decorate("dataSources", {
      restaurants: new RestaurantSource(fastify.knex),
    });
  },
  {
    name: "datasources",
    dependencies: ["knex"],
  }
);
