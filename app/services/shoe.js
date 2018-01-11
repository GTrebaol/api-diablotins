/**
 * shoe services
 *
 * @param ShoeModel
 * @param CategoryModel
 */
ShoeService = function (ShoeModel) {

  let shoeService = {};

  /**
   *
   * @param shoe
   * @returns {*}
   */
  shoeService.add = function (shoe) {
    return new ShoeModel({
      name: shoe.name,
      size_id: shoe.size_id,
      color_id: shoe.color_id
    }).save();
  };

  /**
   *
   * @param id
   * @param shoe
   * @returns {*}
   */
  shoeService.update = function (id, shoe) {
    return new ShoeModel({ shoe_id: parseInt(id) }).save({
      name: shoe.name,
      size_id: shoe.size_id,
      color_id: shoe.color_id
    }, { patch: true });
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  shoeService.delete = function (id) {
    return new ShoeModel({ shoe_id: parseInt(id) }).destroy();
  };

  /**
   * Fetch all the shoes
   * @returns A collection of shoes
   */
  shoeService.findAll = function () {
    return new ShoeModel().fetchAll();
  };


  /**
   * find a shoe by its id
   *
   * @param id
   * @returns shoe model
   */
  shoeService.findById = function (id) {
    return new ShoeModel({ shoe_id: parseInt(id) }).fetch({
      withRelated: ['brand', 'sizes', 'colors', 'categories', 'description', 'collections', 'pictures']
    });
  };

  /**
   * find list of shoes by its category id
   *
   * @returns list of shoe model
   * @param id
   */
  shoeService.findByCategoryId = function (id) {
    return new ShoeModel().query(function () {
      this.innerJoin('shoe_categories', 'shoe_categories.shoe_id', 'shoe.shoe_id')
        .innerJoin('category', 'shoe_categories.category_id', 'category.category_id')
        .where('category.category_id', id);
    }).fetchAll();
  };

  /**
   * find a list of shoes from its collection id
   *
   * @returns list of shoe model
   * @param id
   */
  shoeService.findByCollectionId = function (id) {
    return new ShoeModel().query(function () {
      this.innerJoin('shoe_collection', 'shoe_collection.shoe_id', 'shoe.shoe_id')
        .innerJoin('collection', 'shoe_collection.collection_id', 'collection.collection_id')
        .where('collection.collection_id', id);
    }).fetchAll({
      withRelated: ['pictures']
    });
  };


  /**
   * Fetch the amount of shoes
   * @returns {*}
   */
  shoeService.getAmount = function () {
    return new ShoeModel().count();
  };

  /**
   * find a shoe by its name
   *
   * @returns shoe model
   * @param searchTerm
   */
  shoeService.findByName = function (searchTerm) {
    return new ShoeModel().query(function (qb) {
      qb.where('name', 'like', '%' + searchTerm + '%');
    }).fetchAll({
      withRelated: ['brand', 'sizes', 'colors', 'categories']
    });
  };


  return shoeService;
};

module.exports = ShoeService;