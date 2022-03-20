"use strict";
const findBestMatches = require("./findBestMatches");

module.exports = class RestaurantSource {
  constructor(knex) {
    this.findBestMatches = findBestMatches(knex);
  }
};
