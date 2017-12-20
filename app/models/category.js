module.exports = function(bookshelf) {

  return bookshelf.Model.extend({
	tableName: 'category',
	idAttribute: 'category_id'
  });
};
