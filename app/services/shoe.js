/**
 * shoe services
 *
 * @param ShoeModel
 */
ShoeService = function(ShoeModel) {

  let shoeService = {};
  let pagingLimit = 10;

  /**
   *
   * @param shoe
   * @returns {*}
   */
  shoeService.add = function(shoe) {
    console.log(shoe);
    return new ShoeModel({
      name: shoe.name,
      price: shoe.price,
      reference: shoe.reference,
      brand_id: shoe.brand,
      description_id: shoe.description
    }).save();
  };

  /**
   *
   * @param id
   * @param shoe
   * @returns {*}
   */
  shoeService.update = function(id, shoe) {
    return new ShoeModel({shoe_id: parseInt(id)}).save({
      name: shoe.name
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  shoeService.delete = function(id) {
    return this.findById(id).then(function(shoe) {
      if (shoe) {
        let sizes = shoe.related('sizes');
        let categories = shoe.related('categories');
        let colors = shoe.related('colors');
        let collections = shoe.related('collections');

        let brand = shoe.related('brand');
        let description = shoe.related('description');
        let pictures = shoe.related('pictures');

        return Promise.all([sizes.detach(),
          sizes.detach(),
          categories.detach(),
          colors.detach(),
          collections.detach(),
          pictures.invokeThen('detach'),
          pictures.invokeThen('destroy'),
          shoe.destroy(),
          description.destroy()
        ]);
      } else {
        return null;
      }
    })
  };

  /**
   * Fetch all the shoes
   * @returns A collection of shoes
   */
  shoeService.fetchAll = function(pageNumber) {
    return new ShoeModel().query(function(qb) {
      qb.limit(pagingLimit).offset((pageNumber - 1) * pagingLimit)
    }).fetchAll({withRelated: ['brand']});
  };


  /**
   * find a shoe by its id
   *
   * @param id
   * @returns shoe model
   */
  shoeService.findById = function(id) {
    return new ShoeModel({shoe_id: parseInt(id)}).fetch({
      withRelated: ['brand', 'sizes', 'colors', 'categories', 'description', 'collections', 'pictures']
    });
  };

  shoeService.findByIdWithSpecifiedRelation = function(id, relation) {
    return new ShoeModel({shoe_id: parseInt(id)}).fetch({
      withRelated: [relation]
    });
  };

  /**
   * find list of shoes by its category id
   *
   * @returns list of shoe model
   * @param id
   */
  shoeService.findByCategoryId = function(id) {
    return new ShoeModel().query(function() {
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
  shoeService.findByCollectionId = function(id) {
    return new ShoeModel().query(function() {
      this.innerJoin('shoe_collection', 'shoe_collection.shoe_id', 'shoe.shoe_id')
        .innerJoin('collection', 'shoe_collection.collection_id', 'collection.collection_id')
        .where('collection.collection_id', id);
    }).fetchAll({
      withRelated: ['pictures']
    });
  };

  shoeService.getPagingLimit = function() {
    return pagingLimit
  };


  /**
   * Fetch the amount of shoes
   * @returns {*}
   */
  shoeService.getAmount = function() {
    return new ShoeModel().count();
  };

  /**
   * find a shoe by its name
   *
   * @returns shoe model
   * @param searchTerm
   */
  shoeService.findByName = function(searchTerm) {
    return new ShoeModel().query(function(qb) {
      qb.where('name', 'like', '%' + searchTerm + '%');
    }).fetchAll({
      withRelated: ['brand', 'sizes', 'colors', 'categories']
    });
  };

  shoeService.attachCollections = function(collections, shoe) {
    console.log("coucou collections");
    console.log(collections);
    return shoe.collections().attach(collections);
  };

  shoeService.attachCategories = function(categories, shoe) {
    console.log("coucou categories");
    console.log(categories);
    return shoe.categories().attach(categories);
  };

  shoeService.attachSizes = function(sizes, shoe) {
    return shoe.sizes().attach(sizes);
  };

  shoeService.attachColors = function(colors, shoe) {
    return shoe.colors().attach(colors);
  };



  return shoeService;
}
;

module.exports = ShoeService;