/**
 * User services
 *
 * @param UserModel
 */
UserService = function(UserModel) {
  let userService = {};

  /**
   *
   * @param user
   * @returns {*}
   */
  userService.add = function(user) {
    console.log(user);
    return new UserModel({
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
      return new UserModel({user_id: parseInt(id)}).save({
        name: user.name,
        password: user.password,
        is_admin: user.is_admin
      }, {patch: true});
    }
    return new UserModel({user_id: parseInt(id)}).save({
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
    return new UserModel({user_id: parseInt(id)}).save({
      password: user.encpassword
    }, {patch: true});
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  userService.delete = function(id) {
    return new UserModel({user_id: parseInt(id)}).destroy();
  };

  /**
   *
   * @param id
   * @returns {*}
   */
  userService.findById = function(id) {
    return new UserModel({user_id: parseInt(id)}).fetch({columns: ['id', 'name', 'is_admin']});
  };

  /**
   *
   * @returns {*}
   * @param name
   */
  userService.findByName = function(name) {
    return new UserModel({name: name}).fetch({columns: ['id', 'name', 'is_admin']});
  };

  /**
   *
   * @returns {*|A}
   */
  userService.findAll = function() {
    return new UserModel().fetchAll({columns: ['id', 'name', 'is_admin']});
  };

  return userService;
};

module.exports = UserService;
