module.exports = function(bookshelf) {

  return bookshelf.Model.extend({
	tableName: 'color',
	idAttribute: 'color_id'
  });
};
