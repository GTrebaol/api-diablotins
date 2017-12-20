/**
 * color services
 *
 * @param ColorModel
 */
ColorService = function(ColorModel) {

  let color = {};

  /**
   *
   * @param color
   * @returns {*}
   */
  color.add = function(color) {
    return new ColorModel({
      value: color.value
    }).save();
  };

  /**
   *
   * @param id
   * @param color
   * @returns {*}
   */
  color.update = function(id, color) {
    return new ColorModel({color_id: parseInt(id)}).save({
      value: color.value
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  color.delete = function(id) {
    return new ColorModel({color_id: parseInt(id)}).destroy();
  };

  /**
   * Fetch all the colors
   * @returns A collection of colors
   */
  color.fetchAll = function() {
    return new ColorModel().fetchAll();
  };

  /**
   * find a color by its id
   *
   * @param id
   * @returns color model
   */
  color.findById = function(id) {
    return new ColorModel({color_id: parseInt(id)}).fetch();
  };


  /**
   * Fetch the amount of colors
   * @returns {*}
   */
  color.getAmount = function() {
    return new ColorModel().count();
  };

  return color;
};

module.exports = ColorService;