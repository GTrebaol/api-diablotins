/**
 * category services
 *
 * @param models
 */
CategoryService = function(CategoryModel) {

  let category = {};

  /**
   *
   * @param category
   * @returns {*}
   */
  category.add = function(category) {
    return new CategoryModel({
      name: category.name
    }).save();
  };

  /**
   *
   * @param id
   * @param category
   * @returns {*}
   */
  category.update = function(id, category) {
    return new CategoryModel({category_id: parseInt(id)}).save({
      name: category.name
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  category.delete = function(id) {
    return new CategoryModel({category_id: parseInt(id)}).destroy();
  };

  /**
   * Fetch all the categorys
   * @returns A collection of categorys
   */
  category.fetchAll = function() {
    return new CategoryModel().fetchAll();
  };

  /**
   * find a category by its id
   *
   * @param id
   * @returns category model
   */
  category.findById = function(id) {
    return new CategoryModel({category_id: parseInt(id)}).fetch();
  };

  /**
   * find a category by its name
   *
   * @param searchTerm
   * @returns category model
   */
  category.findByName = function(searchTerm) {
    return new CategoryModel().query(function(qb) {
      qb.whereRaw('MATCH (name) AGAINST ("+' + searchTerm + '*" IN BOOLEAN MODE)');
    }).fetchAll();
  };


  /**
   * Fetch the amount of categorys
   * @returns {*}
   */
  category.getAmount = function() {
    return new CategoryModel().count();
  };

  return category;
};

module.exports = CategoryService;