/**
 * Search services
 *
 * @param models
 */
SearchService = function(models) {

  let searchService = {};
  const ShoeModel = models.shoe;
  const CategoryModel = models.category;


  searchService.findShoeByName = function(searchTerm) {
    return new ShoeModel().query(function(qb) {
      qb.whereRaw('MATCH (name) AGAINST ("+' + searchTerm + '*" IN BOOLEAN MODE)');
    }).fetchAll({withRelated: ['category']});
  };


  searchService.findCategoryByName = function(searchTerm) {
    return new CategoryModel().query(function(qb) {
      qb.whereRaw('MATCH (name) AGAINST ("+' + searchTerm + '*" IN BOOLEAN MODE)');
    }).fetchAll();
  };

  return searchService;
};

module.exports = SearchService;
