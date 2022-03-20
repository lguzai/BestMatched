"use strict";

const findBestMatches = require("../../../src/datasources/restaurants/findBestMatches");
const { buildKnexTestInstance } = require("../../helper");

describe("findBestMatches", () => {
  const knex = buildKnexTestInstance();

  beforeAll(async () => {
    return knex.migrate.latest();
  });

  afterAll(async () => {
    return knex.migrate.rollback().then(() => knex.destroy());
  });

  it("should return 0 restaurants on the first page", async () => {
    const result = await findBestMatches(knex)({});
    expect(result.rows.length).toBe(0);
    expect(result.pagination.currentPage).toBe(1);
  });

  it("should return 5 restaurants on the first page", async () => {
    await knex("cuisines").insert({ id: 1, name: `American` });
    await knex("cuisines").insert({ id: 2, name: `Chinese` });
    await knex("restaurants").insert({
      name: `abcde`,
      customer_rating: 1,
      distance: 1,
      price: 10,
      cuisine_id: 1,
    });
    await knex("restaurants").insert({
      name: `fghij`,
      customer_rating: 2,
      distance: 2,
      price: 20,
      cuisine_id: 1,
    });
    await knex("restaurants").insert({
      name: `lmnop`,
      customer_rating: 3,
      distance: 3,
      price: 30,
      cuisine_id: 1,
    });
    await knex("restaurants").insert({
      name: `qrtst`,
      customer_rating: 4,
      distance: 4,
      price: 40,
      cuisine_id: 1,
    });
    await knex("restaurants").insert({
      name: `uvxz`,
      customer_rating: 5,
      distance: 5,
      price: 50,
      cuisine_id: 1,
    });
    await knex("restaurants").insert({
      name: `lmnop`,
      customer_rating: 5,
      distance: 5,
      price: 20,
      cuisine_id: 2,
    });

    const result = await findBestMatches(knex)({ pageSize: 5, page: 1 });
    expect(result.rows.length).toBe(5);
    expect(result.pagination.currentPage).toBe(1);
    expect(result.pagination.lastPage).toBe(2);
  });

  it("should filter by name and return 2 restaurants on the first page", async () => {
    const filter = {
      name: `nop`,
    };
    const result = await findBestMatches(knex)({
      pageSize: 5,
      page: 1,
      filter,
    });
    expect(result.rows.length).toBe(2);
    expect(result.pagination.currentPage).toBe(1);
  });

  it("should filter by customer_rating and return 2 restaurants on the first page", async () => {
    const filter = {
      rating: 5,
    };
    const result = await findBestMatches(knex)({
      pageSize: 5,
      page: 1,
      filter,
    });
    expect(result.rows.length).toBe(2);
    expect(result.pagination.currentPage).toBe(1);
  });

  it("should filter by price and return 5 restaurants on the first page", async () => {
    const filter = {
      price: 45,
    };
    const result = await findBestMatches(knex)({
      pageSize: 5,
      page: 1,
      filter,
    });
    expect(result.rows.length).toBe(5);
    expect(result.pagination.currentPage).toBe(1);
  });

  it("should filter by distance and return 2 restaurants on the first page", async () => {
    const filter = {
      distance: 2,
    };
    const result = await findBestMatches(knex)({
      pageSize: 5,
      page: 1,
      filter,
    });
    expect(result.rows.length).toBe(2);
    expect(result.pagination.currentPage).toBe(1);
  });

  it("should filter by cousine and return 1 restaurants on the first page", async () => {
    const filter = {
      cuisine: `Chin`,
    };
    const result = await findBestMatches(knex)({
      pageSize: 5,
      page: 1,
      filter,
    });
    expect(result.rows.length).toBe(1);
    expect(result.pagination.currentPage).toBe(1);
  });

  it("should filter by all filters and return 1 restaurants on the first page", async () => {
    const filter = {
      cuisine: `Chin`,
      name: `lmnop`,
      rating: 5,
      distance: 5,
      price: 20,
    };
    const result = await findBestMatches(knex)({
      pageSize: 5,
      page: 1,
      filter,
    });
    expect(result.rows.length).toBe(1);
    expect(result.pagination.currentPage).toBe(1);
  });

  it("should not return restaurant without name", async () => {
    await knex("cuisines").insert({ id: 3, name: `Thai` });
    await knex("restaurants").insert({
      name: ``,
      customer_rating: 5,
      distance: 1,
      price: 10,
      cuisine_id: 3,
    });
    const filter = {
      cuisine: `Thai`,
    };
    const result = await findBestMatches(knex)({
      pageSize: 5,
      page: 1,
      filter,
    });
    expect(result.rows.length).toBe(0);
    expect(result.pagination.currentPage).toBe(1);
  });

  it("should return all non system information", async () => {
    const filter = {
      cuisine: `Chin`,
      name: `lmnop`,
      rating: 5,
      distance: 5,
      price: 20,
    };
    const result = await findBestMatches(knex)({
      pageSize: 5,
      page: 1,
      filter,
    });

    const restaurant = result.rows[0];
    expect(restaurant.cuisine).toBe(`Chinese`);
    expect(restaurant.name).toBe(`lmnop`);
    expect(restaurant.rating).toBe(5);
    expect(restaurant.distance).toBe("5.00");
    expect(restaurant.price).toBe("20.00");
  });

  it("should return restaurants in the order distance asc, rating desc and price asc", async () => {
    await knex("cuisines").insert({ id: 4, name: `Italian` });
    await knex("restaurants").insert({
      name: `order1`,
      customer_rating: 5,
      distance: 1,
      price: 10,
      cuisine_id: 4,
    });
    await knex("restaurants").insert({
      name: `order2`,
      customer_rating: 5,
      distance: 2,
      price: 10,
      cuisine_id: 4,
    });
    await knex("restaurants").insert({
      name: `order3`,
      customer_rating: 4,
      distance: 2,
      price: 10,
      cuisine_id: 4,
    });
    await knex("restaurants").insert({
      name: `order4`,
      customer_rating: 4,
      distance: 2,
      price: 20,
      cuisine_id: 4,
    });
    await knex("restaurants").insert({
      name: `order5`,
      customer_rating: 4,
      distance: 2,
      price: 30,
      cuisine_id: 4,
    });

    const filter = {
      cuisine: `Italian`,
    };

    const result = await findBestMatches(knex)({
      pageSize: 5,
      page: 1,
      filter,
    });

    expect(result.rows[0].name).toBe(`order1`);
    expect(result.rows[1].name).toBe(`order2`);
    expect(result.rows[2].name).toBe(`order3`);
    expect(result.rows[3].name).toBe(`order4`);
    expect(result.rows[4].name).toBe(`order5`);
  });
});
