module.exports = function(bookshelf, secret) {

  return bookshelf.Model.extend({
	tableName: 'user',
	idAttribute: 'user_id',
    hasSecurePassword:secret
  });
};
