"use strict";
const addFilters = require("./filters");
const addOrderBy = require("./orderBy");

const withinIntervalNotArchived = (knexBuilder) =>
  knexBuilder.whereRaw("coalesce(restaurants.name, '') <> ''");

const findBestMatches =
  (knex) =>
  async ({ pageSize, page, filter = {} }) => {
    const results = await knex("restaurants")
      .join("cuisines", "restaurants.cuisine_id", "=", "cuisines.id")
      .select(
        knex.raw("restaurants.name"),
        knex.raw("(restaurants.customer_rating)::INT as rating"),
        knex.raw("restaurants.distance"),
        knex.raw("restaurants.price as price"),
        knex.raw("cuisines.name as cuisine")
      )
      .where((builder) => addFilters(builder, filter))
      .where((builder) => withinIntervalNotArchived(builder))
      .orderByRaw(addOrderBy())
      .paginate({
        isLengthAware: true,
        perPage: pageSize,
        currentPage: page,
      });

    return {
      rows: results.data,
      pagination: results.pagination,
    };
  };

module.exports = findBestMatches;
