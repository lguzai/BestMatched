"use strict";

module.exports = async function (fastify) {
  fastify.get("/", async function () {
    return `Access /restaurants/getBestMatch to see the best matched restaurants`;
  });
};
