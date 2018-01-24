/**
 * brand services
 *
 * @param BrandModel
 */
BrandService = function(BrandModel) {

  let brand = {};

  /**
   *
   * @param brand
   * @returns {*}
   */
  brand.add = function(brand) {
    return new BrandModel({
      name: brand.name
    }).save();
  };

  /**
   *
   * @param id
   * @param brand
   * @returns {*}
   */
  brand.update = function(id, brand) {
    return new BrandModel({brand_id: parseInt(id)}).save({
      name: brand.name
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  brand.delete = function(id) {
    return new BrandModel({brand_id: parseInt(id)}).destroy();
  };

  /**
   * Fetch all the brands
   * @returns A collection of brands
   */
  brand.fetchAll = function() {
    return new BrandModel().fetchAll();
  };

  /**
   * find a brand by its id
   *
   * @param id
   * @returns brand model
   */
  brand.findById = function(id) {
    return new BrandModel({brand_id: parseInt(id)}).fetch();
  };

  /**
   * find a brand by its name
   *
   * @param searchTerm
   * @returns brand model
   */
  brand.findByName = function(searchTerm) {
    return new BrandModel().query(function(qb) {
      qb.whereRaw('MATCH (name) AGAINST ("+' + searchTerm + '*" IN BOOLEAN MODE)');
    }).fetchAll();
  };


  /**
   * Fetch the amount of brands
   * @returns {*}
   */
  brand.getAmount = function() {
    return new BrandModel().count();
  };

  return brand;
};

module.exports = BrandService;