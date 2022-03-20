"use strict";

module.exports =
  ({ log, restaurantsDataSource }) =>
  async ({ filter }) => {
    log.info(
      `New search for five best matches filter: ${JSON.stringify(filter)}`
    );

    //Currently only 5 results per time are allowed
    const pageSize = 5;
    const page = 1;
    let result;

    try {
      result = await restaurantsDataSource.findBestMatches({
        pageSize,
        page,
        filter,
      });
    } catch (err) {
      log.error(`Error trying to fetch five best matches restaurants, ${err}`);
    }

    return {
      ...result,
    };
  };
