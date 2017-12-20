module.exports = function(bookshelf) {
  console.log("###############################################");
  console.log(bookshelf);
  console.log("###############################################");
  return bookshelf.Model.extend({
    tableName: 'shoe',
    idAttribute: 'shoe_id',
    size: function() {
      return this.hasMany(models.Size, 'shoe_id');
    },
    categories: function() {
      return this.hasMany(models.Category, 'shoe_id');
    },
    color: function() {
      return this.hasMany(models.Color, 'shoe_id');
    }
  });
};
