/**
 * image services
 *
 * @param ImageModel
 */
ImageService = function(ImageModel) {

  let image = {};

  /**
   *
   * @param image
   * @param color
   * @param shoe
   * @returns {*}
   */
  image.add = function(image, color, shoe) {
    let newImage = new ImageModel({name: image.name});
    newImage.related('color').attach(color);
    newImage.related('shoe').attach(shoe);
    return newImage.save();
  };

  /**
   *
   * @returns {*}
   * @param images
   */
  image.addCollection = function(images, shoe) {
    let promises = [];
    for (let image in images) {
      let color = image.color;
      promises.push(this.add(image, color, shoe));
    }
    return Promise.all(promises);
  };

  /**
   *
   * @param id
   * @param image
   * @returns {*}
   */
  image.update = function(id, image) {
    return new ImageModel({image_id: parseInt(id)}).save({
      name: image.name
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  image.delete = function(id) {
    return new ImageModel({image_id: parseInt(id)}).destroy();
  };

  /**
   * Fetch all the images
   * @returns A image of images
   */
  image.fetchAll = function() {
    return new ImageModel().fetchAll();
  };

  /**
   * find a image by its id
   *
   * @param id
   * @returns image model
   */
  image.findById = function(id) {
    return new ImageModel({image_id: parseInt(id)}).fetch();
  };

  /**
   * find a image by its name
   *
   * @param searchTerm
   * @returns image model
   */
  image.findByName = function(searchTerm) {
    return new ImageModel().query(function(qb) {
      qb.whereRaw('MATCH (name) AGAINST ("+' + searchTerm + '*" IN BOOLEAN MODE)');
    }).fetchAll();
  };


  /**
   * Fetch the amount of images
   * @returns {*}
   */
  image.getAmount = function() {
    return new ImageModel().count();
  };

  return image;
};

module.exports = ImageService;