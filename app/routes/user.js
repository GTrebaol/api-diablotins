module.exports.load = function(app) {
  let services = app.get('services');
  let logger = app.get('logger');
  let async = app.get('async');
  let bcrypt = app.get('bcrypt');
  let requiresAuth = app.get('auth');
  let i18n = app.get('i18n');

  app.get('/api/user', requiresAuth, function(req, res) {
    logger.info("Routes - User::getUser");
    services.user.findById(req.id).then(function(user) {
      return res.json(user);
    }).catch(function(error) {
      //TODO Handle error
      logger.error(error);
      return res.status(500).json({message: 'A server error occurred while processing your request! Please try again later'});
    });
  });

  app.get('/api/users', requiresAuth, function(req, res) {
    logger.info("Routes - User::getUserList");
    if (req.decoded.is_admin) {
      services.user.fetchAll().then(function(users) {
        return res.json(users);
      }).catch(function(error) {
        //TODO Handle error
        logger.error(error);
        return res.status(500).json({message: 'A server error occurred while processing your request! Please try again later'});
      });
    } else {
      return res.status(401).json({message: 'Insufficient permissions! Only super admins may view and edit users'});
    }
  });

  app.post('/api/user', function(req, res) {
    logger.info("Routes - User::createNewUser");
    if (true) {
      let user = req.body;
      validateUser(user, function(err, user) {
        if (err) {
          return res.status(400).json({message: err});
        } else if (!err && user) {
          services.user.add(user).then(function() {
            return res.status(200).json({message: 'Successfully saved User' + user.name});
          }).catch(function(error) {
            logger.error(error);
            return res.status(500).json({message: error.message});
          });

        }
      });
    } else {
      return res.status(401).json({message: 'Insufficient permissions!'});
    }
  });

  app.delete('/api/user/:id', requiresAuth, function(req, res) {
    logger.info("Routes - User::deleteUser");
    if (req.decoded.is_admin) {
      services.user.delete(req.params.id).then(function() {
        return res.status(200).json({message: 'Successfully deleted user'});
      }).catch(function(error) {
        //TODO Handle error
        logger.error(error);
        return res.status(500).json({message: error.message});
      });
    } else {
      return res.status(401).json({message: 'Insufficient permissions!'});
    }
  });

  app.post('/api/user/:id', requiresAuth, function(req, res) {
    logger.info("Routes - User::updateUser");
    let user = req.body;
    if (req.decoded.is_admin) {
      validateUser(user, function(err, data) {
        if (err) {
          return res.status(400).json({message: err});
        } else if (!err && user.password) {
          async.waterfall([
              async.apply(generateSalt, user.password),
              generateHash,
              function(hash, callback) {
                user.encpassword = hash;
                services.user.update(req.params.id, user).then(function() {
                  callback(null, 'Successfully saved User "' + user.name + '"');
                }).catch(function(error) {
                  callback(error);
                });
              }
            ],
            function(err, result) {
              if (!err) {
                return res.status(200).json({message: result});
              }
              logger.error(err); //Error needs to be logged later on
              return res.status(400).json({message: err});
            });
        } else if (!err) {
          services.user.update(req.params.id, user).then(function() {
            return res.status(200).json({message: 'Successfully saved User "' + user.name + '"'});
          }).catch(function(error) {
            //TODO Handle error
            logger.error(error);
            return res.status(500).json({message: error.message});
          });
        }
      });

    } else if (parseInt(req.decoded.id) === parseInt(req.params.id)) {
      validateUser(user, function(err, data) {
        if (err) {
          return res.status(400).json({message: err});
        } else {
          services.auth.authenticateUserViaID(req.params.id).then(function(qUser) {
            if (!qUser) {
              return res.status(401).json({message: i18n.__('user.undefined')});
            } else {
              bcrypt.compare(user.oldPass, qUser.attributes.pass, function(err, result) {
                if (result === true) {
                  async.waterfall([
                      async.apply(generateSalt, user.password),
                      generateHash,
                      function(hash, callback) {
                        user.encpassword = hash;
                        services.user.updateSelf(req.params.id, user).then(function() {
                          callback(null, 'Successfully updated your profile "' + qUser.attributes.name + '"');
                        }).catch(function(error) {
                          callback(error);
                        });
                      }
                    ],
                    function(err, result) {
                      if (!err) {
                        return res.status(200).json({message: result});
                      }
                      logger.error(err); //Error needs to be logged later on
                      return res.status(400).json({message: err});
                    });
                } else {
                  return res.status(401).json({message: 'The old password seems to be wrong! Please try again'});
                }
              });
            }
          }).catch(function(error) {
            logger.error(error);
            return res.status(500).json({message: i18n.__('server.error')});
          });
        }
      });
    } else {
      return res.status(401).json({message: 'Insufficient permissions!'});
    }
  });

  var generateSalt = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      if (!err) {
        callback(null, salt, password);
      } else {
        callback(err);
      }
    });
  };

  var generateHash = function(salt, password, callback) {
    bcrypt.hash(password, salt, null, function(err, hash) {
      if (!err) {
        callback(null, hash);
      } else {
        callback(err);
      }
    });
  };

  var validateUser = function(user, callback) {
    if (user.name && user.name.length < 3) {
      callback('User names must contain at least 3 characters');
    } else if (user.password && user.password.length > 0 && user.password.length < 8) {
      callback('User passwords must contain at least 8 characters');
    } else {
      callback(null, user);
    }
  };
};