"use strict";
const sortOrder = [
  {
    field: `restaurants.distance`,
    type: `ASC`,
  },
  {
    field: `restaurants.customer_rating`,
    type: `DESC`,
  },
  {
    field: `restaurants.price`,
    type: `ASC`,
  },
];

const addOrderBy = () =>
  sortOrder
    .map(function (elem) {
      return `${elem.field} ${elem.type}`;
    })
    .join(", ");

module.exports = addOrderBy;
