/**
 * Size services
 *
 * @param Size
 */
SizeService = function(SizeModel) {

  let sizeService = {};

  /**
   *
   * @param size
   * @returns {*}
   */
  sizeService.add = function(size) {
    return new SizeModel({
      value: size.value
    }).save();
  };

  /**
   *
   * @param id
   * @param size
   * @returns {*}
   */
  sizeService.update = function(id, size) {
    return new SizeModel({size_id: parseInt(id)}).save({
      value: size.value
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  sizeService.delete = function(id) {
    return new SizeModel({size_id: parseInt(id)}).destroy();
  };

  /**
   * Fetch all the sizes
   * @returns A collection of sizes
   */
  sizeService.fetchAll = function() {
    return new SizeModel().fetchAll();
  };

  /**
   * find a size by its id
   *
   * @param id
   * @returns size model
   */
  sizeService.findById = function(id) {
    return new SizeModel({size_id: parseInt(id)}).fetch();
  };


  /**
   * Fetch the amount of sizes
   * @returns {*}
   */
  sizeService.getAmount = function() {
    return new SizeModel().count();
  };

  return sizeService;
};

module.exports = SizeService;