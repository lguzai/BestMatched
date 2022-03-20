/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurants", function (table) {
    table.increments();
    table.string("name", 255).notNullable();
    table.decimal("customer_rating");
    table.decimal("distance");
    table.decimal("price");
    table.integer("cuisine_id").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("restaurants");
};
