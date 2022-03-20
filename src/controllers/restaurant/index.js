"use strict";
const getFiveBestMatches = require("./getFiveBestMatches");

module.exports = class RestaurantController {
  constructor(log, { restaurants }) {
    const params = {
      log,
      restaurantsDataSource: restaurants,
    };

    this.getFiveBestMatches = getFiveBestMatches(params);
  }
};
