module.exports = function(bookshelf) {

  return bookshelf.Model.extend({
	tableName: 'size',
	idAttribute: 'size_id'
  });
};
