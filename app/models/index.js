module.exports = function(bookshelf) {
  var models = {};
  models.user = require('./user.js')(bookshelf);
  models.color = require('./color.js')(bookshelf);
  models.size = require('./size.js')(bookshelf);
  models.category = require('./category.js')(bookshelf);
  models.shoe = require('./shoe.js')(bookshelf);
  return models;
};
