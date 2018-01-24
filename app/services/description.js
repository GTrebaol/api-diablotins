/**
 * description services
 *
 * @param DescriptionModel
 */
DescriptionService = function(DescriptionModel) {

  let description = {};

  /**
   *
   * @param description
   * @returns {*}
   */
  description.add = function(description) {
    return new DescriptionModel({
      full_description: description
    }).save();
  };

  /**
   *
   * @param id
   * @param description
   * @returns {*}
   */
  description.update = function(id, description) {
    return new DescriptionModel({description_id: parseInt(id)}).save({
      full_description: description
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  description.delete = function(id) {
    return new DescriptionModel({description_id: parseInt(id)}).destroy();
  };

  /**
   * Fetch all the descriptions
   * @returns A description of descriptions
   */
  description.fetchAll = function() {
    return new DescriptionModel().fetchAll();
  };

  /**
   * find a description by its id
   *
   * @param id
   * @returns description model
   */
  description.findById = function(id) {
    return new DescriptionModel({description_id: parseInt(id)}).fetch();
  };


  /**
   * Fetch the amount of descriptions
   * @returns {*}
   */
  description.getAmount = function() {
    return new DescriptionModel().count();
  };

  return description;
};

module.exports = DescriptionService;