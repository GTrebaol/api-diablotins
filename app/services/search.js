/**
 * Search services
 *
 * @param models
 */
SearchService = function() {

  var searchService = {};
  const Shoe = require('../models/shoe');
  const Category = require('../models/category');


  searchService.findShoeByName = function(searchTerm) {
    return new Shoe().query(function(qb) {
      qb.whereRaw('MATCH (name) AGAINST ("+' + searchTerm + '*" IN BOOLEAN MODE)');
    }).fetchAll({withRelated: ['category']});
  };


  searchService.findCategoryByName = function(searchTerm) {
    return new Category().query(function(qb) {
      qb.whereRaw('MATCH (name) AGAINST ("+' + searchTerm + '*" IN BOOLEAN MODE)');
    }).fetchAll();
  };

  return searchService;
};

module.exports = SearchService;
