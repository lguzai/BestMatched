"use strict";
const pino = require("pino");

describe("restaurant controller", () => {
  const restaurants = {
    findBestMatches: jest.fn(),
  };
  const log = pino({ level: "silent", prettyPrint: true });
  const RestaurantController = require("../../src/controllers/restaurant");

  const controller = new RestaurantController(log, {
    restaurants,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getFiveBestMatches()", () => {
    it("should get five best matches", async () => {
      const data = {
        rows: [
          {
            name: "Deliciouszilla",
            customer_rating: "4.00",
            distance: "1.00",
            price: "15.00",
            cuisine: "Chinese",
          },
        ],
        pagination: {
          total: 1,
          lastPage: 1,
          perPage: 5,
          currentPage: 1,
          from: 0,
          to: 1,
        },
      };
      restaurants.findBestMatches.mockResolvedValueOnce(data);
      expect(await controller.getFiveBestMatches({})).toEqual(data);
    });

    it("should get empty result if a exception is throw", async () => {
      const data = {
        rows: [
          {
            name: "Deliciouszilla",
            customer_rating: "4.00",
            distance: "1.00",
            price: "15.00",
            cuisine: "Chinese",
          },
        ],
        pagination: {
          total: 1,
          lastPage: 1,
          perPage: 5,
          currentPage: 1,
          from: 0,
          to: 1,
        },
      };
      restaurants.findBestMatches.mockImplementation(() => {
        throw new Error();
      });
      expect(await controller.getFiveBestMatches({})).toEqual({});
    });
  });
});
