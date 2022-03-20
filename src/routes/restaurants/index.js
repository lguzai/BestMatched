"use strict";

const { RestaurantController } = require("../../controllers");

module.exports = async function (fastify) {
  fastify.route({
    method: "GET",
    url: "/getBestMatch",
    schema: {
      querystring: {
        name: { type: "string" },
        cuisine: { type: "string" },
        rating: { type: "integer", minimum: 1, maximum: 5 },
        distance: { type: "number", minimum: 1, maximum: 10 },
        price: { type: "number", minimum: 10, maximum: 50 },
      },
      response: {
        200: {
          type: "object",
          properties: {
            rows: { type: "array" },
            pagination: {
              type: "object",
              properties: {
                total: { type: "integer" },
                lastPage: { type: "integer" },
                perPage: { type: "integer" },
                currentPage: { type: "integer" },
                from: { type: "integer" },
                to: { type: "integer" },
              },
            },
          },
        },
      },
    },
    handler: async ({ query, log }) => {
      return await new RestaurantController(
        log,
        fastify.dataSources
      ).getFiveBestMatches({
        filter: query,
      });
    },
  });
};
