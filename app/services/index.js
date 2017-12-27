/**
 * Supraball services module fetch information from database
 *
 */
let Services = function () {
  return Services.initialize.apply(null, arguments);
};

// Constructor for a new `Services` object, it accepts
// an active SqlConnection and initializes the appropriate
// services for the many supraball models.
Services.initialize = function (configuration) {
  let services = {
    VERSION: '0.0.1'
  },
    knex = require('knex')({ client: 'mysql', connection: configuration.db, debug: false });

  const securePassword = require('bookshelf-secure-password');
  services.knex = knex;
  services.bookshelf = require('bookshelf')(knex);
  services.bookshelf.plugin(securePassword);
  services.models = require('./models')(configuration.secret, services.bookshelf);

  // Register all services
  services.utils = require('./utils.js');
  services.color = require('./color.js')(services.models.color);
  services.size = require('./size.js')(services.models.size);
  services.category = require('./category.js')(services.models.category);
  services.shoe = require('./shoe.js')(services.models.shoe);
  services.user = require('./user.js')(services.models.user);

  return services;
};

module.exports = Services;
