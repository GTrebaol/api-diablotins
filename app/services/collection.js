/**
 * collection services
 *
 * @param CollectionModel
 */
CollectionService = function(CollectionModel) {

  let collection = {};

  /**
   *
   * @param collection
   * @returns {*}
   */
  collection.add = function(collection) {
    return new CollectionModel({
      name: collection.name
    }).save();
  };

  /**
   *
   * @param id
   * @param collection
   * @returns {*}
   */
  collection.update = function(id, collection) {
    return new CollectionModel({collection_id: parseInt(id)}).save({
      name: collection.name
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  collection.delete = function(id) {
    return new CollectionModel({collection_id: parseInt(id)}).destroy();
  };

  /**
   * Fetch all the collections
   * @returns A collection of collections
   */
  collection.fetchAll = function() {
    return new CollectionModel().fetchAll();
  };

  /**
   * find a collection by its id
   *
   * @param id
   * @returns collection model
   */
  collection.findById = function(id) {
    return new CollectionModel({collection_id: parseInt(id)}).fetch();
  };

  /**
   * find a collection by its name
   *
   * @param searchTerm
   * @returns collection model
   */
  collection.findByName = function(searchTerm) {
    return new CollectionModel().query(function(qb) {
      qb.whereRaw('MATCH (name) AGAINST ("+' + searchTerm + '*" IN BOOLEAN MODE)');
    }).fetchAll();
  };


  /**
   * Fetch the amount of collections
   * @returns {*}
   */
  collection.getAmount = function() {
    return new CollectionModel().count();
  };

  return collection;
};

module.exports = CollectionService;