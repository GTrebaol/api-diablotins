/**
 * color services
 *
 * @param models
 */
ColorService = function(models) {

  var color = {};

  /**
   *
   * @param color
   * @returns {*}
   */
  color.add = function(color) {
    return new models.color({
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
    return new models.color({color_id: parseInt(id)}).save({
      value: color.value
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  color.delete = function(id) {
    return new models.color({color_id: parseInt(id)}).destroy();
  };

  /**
   * Fetch all the colors
   * @returns A collection of colors
   */
  color.fetchAll = function() {
    return new models.color().fetchAll();
  };

  /**
   * find a color by its id
   *
   * @param id
   * @returns color model
   */
  color.findById = function(id) {
    return new models.color({color_id: parseInt(id)}).fetch();
  };


  /**
   * Fetch the amount of colors
   * @returns {*}
   */
  color.getAmount = function() {
    return new models.color().count();
  };

  return color;
};

module.exports = ColorService;