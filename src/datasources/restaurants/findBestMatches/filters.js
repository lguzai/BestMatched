"use strict";

const contains = {
  name: (val) => `restaurants.name ILIKE '%${val}%'`,
  cuisine: (val) => `cuisines.name ILIKE '%${val}%'`,
};

const isBiggerOrEqualThan = {
  rating: (val) => `restaurants.customer_rating >= ${val}`,
};

const isSmallerOrEqualThan = {
  distance: (val) => `restaurants.distance <= ${val}`,
  price: (val) => `restaurants.price <= ${val}`,
};

const filterMap = {
  ...contains,
  ...isBiggerOrEqualThan,
  ...isSmallerOrEqualThan,
};

const addFilters = (knexBuilder, filters) => {
  if (filters) {
    Object.entries(filters).forEach(([key, val]) => {
      if (filterMap[key]) {
        knexBuilder.whereRaw(filterMap[key](val));
      }
    });
  }
};

module.exports = addFilters;
