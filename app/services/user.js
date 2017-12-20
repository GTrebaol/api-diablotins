/**
 * User services
 *
 * @param models
 */
UserService = function() {
  const User = require('../models/user');
  var userService = {};

  /**
   *
   * @param user
   * @returns {*}
   */
  userService.add = function(user) {
    return new User({
      name: user.name,
      password: user.password,
      is_admin: user.is_admin
    }).save();
  };

  /**
   *
   * @param id
   * @param user
   * @returns {*}
   */
  userService.update = function(id, user) {
    if (user.password) {
      return new User({user_id: parseInt(id)}).save({
        name: user.name,
        password: user.password,
        is_admin: user.is_admin
      }, {patch: true});
    }
    return new User({user_id: parseInt(id)}).save({
      name: user.name,
      is_admin: user.is_admin
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @param user
   * @returns {*}
   */
  userService.updateSelf = function(id, user) {
    return new User({user_id: parseInt(id)}).save({
      password: user.encpassword
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  userService.delete = function(id) {
    return new User({user_id: parseInt(id)}).destroy();
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  userService.fetchUserById = function(id) {
    return new User({user_id: parseInt(id)}).fetch({columns: ['id', 'name', 'is_admin']});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  userService.fetchUserByName = function(name) {
    return new User({name: name}).fetch({columns: ['id', 'name', 'is_admin']});
  };

  /**
   *
   * @returns {*|A}
   */
  userService.fetchAll = function() {
    return new User().fetchAll({columns: ['id', 'name', 'is_admin']});
  };

  return userService;
};

module.exports = UserService;
