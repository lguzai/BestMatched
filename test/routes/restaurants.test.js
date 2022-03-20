"use strict";

const { build } = require("../helper");

describe("getBestMatch endpoint test", () => {
  const app = build();

  test("should return pagination and rows when it is successful", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch",
    });
    const payload = JSON.parse(res.payload);

    expect(Object.keys(payload)).toContain("pagination");
    expect(Object.keys(payload)).toContain("rows");
    expect(Object.keys(payload.pagination)).toContain("total");
    expect(Object.keys(payload.pagination)).toContain("lastPage");
    expect(Object.keys(payload.pagination)).toContain("perPage");
    expect(Object.keys(payload.pagination)).toContain("currentPage");
    expect(Object.keys(payload.pagination)).toContain("from");
    expect(Object.keys(payload.pagination)).toContain("to");
  });

  test("should accept name queryString param", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?name=chi",
    });

    expect(res.statusCode).toBe(200);
  });

  test("should accept cuisine queryString param", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?name=chi",
    });

    expect(res.statusCode).toBe(200);
  });

  test("should accept rating queryString param", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?rating=2",
    });

    expect(res.statusCode).toBe(200);
  });

  test("should accept distance queryString param", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?distance=5",
    });

    expect(res.statusCode).toBe(200);
  });

  test("should accept price queryString param", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?price=20",
    });

    expect(res.statusCode).toBe(200);
  });

  test("should return error if rating queryString param is not a integer", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?rating=abc",
    });
    const payload = JSON.parse(res.payload);

    expect(res.statusCode).toBe(400);
    expect(payload.message).toBe("querystring.rating should be integer");
  });

  test("should return error if rating queryString param is smaller than 1", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?rating=0",
    });
    const payload = JSON.parse(res.payload);

    expect(res.statusCode).toBe(400);
    expect(payload.message).toBe("querystring.rating should be >= 1");
  });

  test("should return error if rating queryString param is bigger than 5", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?rating=6",
    });
    const payload = JSON.parse(res.payload);

    expect(res.statusCode).toBe(400);
    expect(payload.message).toBe("querystring.rating should be <= 5");
  });

  test("should return error if distance queryString param is not a number", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?distance=abc",
    });
    const payload = JSON.parse(res.payload);

    expect(res.statusCode).toBe(400);
    expect(payload.message).toBe("querystring.distance should be number");
  });

  test("should return error if distance queryString param is smaller than 1", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?distance=0",
    });
    const payload = JSON.parse(res.payload);

    expect(res.statusCode).toBe(400);
    expect(payload.message).toBe("querystring.distance should be >= 1");
  });

  test("should return error if distance queryString param is bigger than 10", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?distance=16",
    });
    const payload = JSON.parse(res.payload);

    expect(res.statusCode).toBe(400);
    expect(payload.message).toBe("querystring.distance should be <= 10");
  });

  test("should return error if price queryString param is not a number", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?price=abc",
    });
    const payload = JSON.parse(res.payload);

    expect(res.statusCode).toBe(400);
    expect(payload.message).toBe("querystring.price should be number");
  });

  test("should return error if price queryString param is smaller than 10", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?price=9",
    });
    const payload = JSON.parse(res.payload);

    expect(res.statusCode).toBe(400);
    expect(payload.message).toBe("querystring.price should be >= 10");
  });

  test("should return error if price queryString param is bigger than 50", async () => {
    const res = await app.inject({
      url: "/restaurants/getBestMatch?price=750",
    });
    const payload = JSON.parse(res.payload);

    expect(res.statusCode).toBe(400);
    expect(payload.message).toBe("querystring.price should be <= 50");
  });
});
