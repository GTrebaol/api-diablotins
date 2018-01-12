/**
 *
 * Utility services
 *
 * @param app Node app
 */
UtilityService = function(app) {

  let utils = {};
  let bigInt = app.get('bigInt');
  let fs = require('fs');
  let logger = app.get('logger');


  /**
   * Get the table records limit or return the default limit
   *
   * @param params Passed query parameters
   * @returns limit
   */
  utils.getLimit = function(params) {
    let limit;
    if (params.limit) {
      limit = parseInt(params.limit);
    }
    if (isNaN(limit) || limit > 25 || limit < 0) {
      limit = 25;
    }
    return limit;
  };

  /**
   * Get the table records offset or return the default offset
   *
   * @param params Passed query parameters
   * @returns offset
   */
  utils.getOffset = function(params) {
    let offset;
    if (params.offset) {
      offset = parseInt(params.offset);
    }
    if (isNaN(offset) || offset < 0) {
      offset = 0;
    }
    return offset;
  };

  /**
   * Get the table records order_by or return default order_by
   *
   * @param params Passed query parameters
   * @returns array containing ordering column [0] and ordering direction [1]
   */
  utils.getOrderBy = function(params) {
    let orderBy = [];
    if (!params.order_by) {
      orderBy = ['name', 'asc'];
    } else if (!Array.isArray(params.order_by)) {
      orderBy = [params.order_by.toString(), 'asc'];
    } else if (params.order_by.length != 2) {
      orderBy = ['name', 'asc'];
    } else {
      if (!/^([a-zA-Z_]+)$/.test(params.order_by[0])) {
        orderBy.push('name');
      } else {
        orderBy.push(params.order_by[0]);
      }
      if (!(params.order_by[1].toLowerCase() == 'asc' || params.order_by[1].toLowerCase() == 'desc')) {
        orderBy.push('asc');
      } else {
        orderBy.push(params.order_by[1]);
      }
    }
    return orderBy;
  };

  /**
   * Get the raw table ordering statement
   *
   * @param params Passed query parameters
   * @returns raw order_by statement
   */
  utils.getOrderByRaw = function(params) {
    let orderBy;
    if (!params.order_by[0]) {
      orderBy = '`name`';
    } else {
      orderBy = '`' + params.order_by[0] + '`';
    }
    switch (params.order_by[1].toLowerCase()) {
      case 'asc':
      case 'desc':
        orderBy += ' ' + params.order_by[1].toLowerCase();
        break;
      default:
        orderBy += ' asc';
    }
    return orderBy;
  };

  /**
   * Get a table's primary id
   *
   * @param params Passed query parameters
   * @returns id
   */
  utils.getPrimaryTableColumn = function(params) {
    return params.entity_type + '_id'
  };

  return utils;
};

module.exports = UtilityService;