/**
 * category services
 *
 * @param models
 */
CategoryService = function(models) {

  var category = {};

  /**
   *
   * @param category
   * @returns {*}
   */
  category.add = function(category) {
    return new models.category({
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
    return new models.category({category_id: parseInt(id)}).save({
      name: category.name
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  category.delete = function(id) {
    return new models.category({category_id: parseInt(id)}).destroy();
  };

  /**
   * Fetch all the categorys
   * @returns A collection of categorys
   */
  category.fetchAll = function() {
    return new models.category().fetchAll();
  };

  /**
   * find a category by its id
   *
   * @param id
   * @returns category model
   */
  category.findById = function(id) {
    return new models.category({category_id: parseInt(id)}).fetch();
  };


  /**
   * Fetch the amount of categorys
   * @returns {*}
   */
  category.getAmount = function() {
    return new models.category().count();
  };

  return category;
};

module.exports = CategoryService;