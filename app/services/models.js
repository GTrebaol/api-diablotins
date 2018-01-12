/**
 *  Instanciate the models based on the database schema.
 *  We need to describe the relationships between the entities
 *
 * @param secret
 * @param bookshelf
 * @returns {{}}
 */
module.exports = function(secret, bookshelf) {

  let models = {};

  let Category = bookshelf.Model.extend({
    tableName: 'category',
    idAttribute: 'category_id'
  });

  let Color = bookshelf.Model.extend({
    tableName: 'color',
    idAttribute: 'color_id'
  });

  let Collection = bookshelf.Model.extend({
    tableName: 'collection',
    idAttribute: 'collection_id'
  });

  let Description = bookshelf.Model.extend({
    tableName: 'description',
    idAttribute: 'description_id'
  });

  let Image = bookshelf.Model.extend({
    tableName: 'image',
    idAttribute: 'image_id',
    color: function() {
      return this.belongsTo(Color, 'color_id');
    },
    shoe: function() {
      return this.belongsTo(Shoe, 'shoe_id');
    }
  });


  let Shoe = bookshelf.Model.extend({
    tableName: 'shoe',
    idAttribute: 'shoe_id',
    sizes: function() {
      return this.belongsToMany(Size, 'shoe_sizes', 'shoe_id', 'size_id');
    },
    categories: function() {
      return this.belongsToMany(Category, 'shoe_categories', 'shoe_id', 'category_id');
    },
    colors: function() {
      return this.belongsToMany(Color, 'shoe_colors', 'shoe_id', 'color_id');
    },
    brand: function() {
      return this.belongsTo(Brand, 'brand_id')
    },
    collections: function() {
      return this.belongsToMany(Collection, 'shoe_collection', 'shoe_id', 'collection_id')
    },
    description: function() {
      return this.belongsTo(Description, 'description_id');
    },
    pictures: function() {
      return this.hasMany(Image, 'shoe_id')
    }
  });

  let Brand = bookshelf.Model.extend({
    tableName: 'brand',
    idAttribute: 'brand_id',
    shoes: function() {
      return this.hasMany(Shoe);
    },
  });

  let User = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'user_id',
    hasSecurePassword: true,
    parse: function(attrs) {
      attrs['is_admin'] = !!attrs['is_admin']
      return attrs;
    }
  });

  let Size = bookshelf.Model.extend({
    tableName: 'size',
    idAttribute: 'size_id'
  });

  models.shoe = Shoe;
  models.size = Size;
  models.category = Category;
  models.color = Color;
  models.user = User;
  models.brand = Brand;
  models.collection = Collection;

  return models;

};