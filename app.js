"use strict";

const path = require("path");
const AutoLoad = require("fastify-autoload");

module.exports = async function (fastify, opts) {
  // This loads all plugins defined in plugins
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "/src/plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "/src/routes"),
    options: Object.assign({}, opts),
  });
};
