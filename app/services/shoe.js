/**
 * shoe services
 *
 * @param Shoe model
 */
ShoeService = function(Shoe) {

  var shoeService = {};

  /**
   *
   * @param shoe
   * @returns {*}
   */
  shoeService.add = function(shoe) {
    return new Shoe({
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
  shoeService.update = function(id, shoe) {
    return new Shoe({shoe_id: parseInt(id)}).save({
      name: shoe.name,
      size_id: shoe.size_id,
      color_id: shoe.color_id
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  shoeService.delete = function(id) {
    return new Shoe({shoe_id: parseInt(id)}).destroy();
  };

  /**
   * Fetch all the shoes
   * @returns A collection of shoes
   */
  shoeService.findAll = function() {
    return new Shoe().fetchAll();
  };

  /**
   * find a shoe by its id
   *
   * @param id
   * @returns shoe model
   */
  shoeService.findByCategory = function(id) {
    return new Shoe({shoe_id: parseInt(id)}).fetch();
  };

  /**
   * find a shoe by its id
   *
   * @param id
   * @returns shoe model
   */
  shoeService.findById = function(id) {
    return new Shoe({shoe_id: parseInt(id)}).fetch();
  };

  /**
   * find a shoe by its id
   *
   * @param id
   * @returns shoe model
   */
  shoeService.findShoeCategoriesById = function(id) {
    return new Shoe({shoe_id: parseInt(id)}).fetch({
      columns: ['shoe_id'],
      withRelated: ['categories']
    });
  };


  /**
   * Fetch the amount of shoes
   * @returns {*}
   */
  shoeService.getAmount = function() {
    return new Shoe().count();
  };

  /**
   * find a shoe by its name
   *
   * @param id
   * @returns shoe model
   */
  shoeService.findByName = function(name) {
    return new Shoe({name: name}).fetch();
  };
  return shoeService;
};

module.exports = ShoeService;