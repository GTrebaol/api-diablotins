module.exports.load = function(app) {

  var logger = app.get('logger');
  var services = app.get('services');
  var jwt = app.get('jwt');
  var bcrypt = app.get('bcrypt');
  var i18n = app.get('i18n');

  app.post('/api/auth', function(req, res) {
    logger.info("Routes - Auth::authUser");
    services.user.fetchUserByName(req.body.username).then(function(user) {
      if (!user) {
        return res.status(401).json({message: i18n.__('user.undefined')});
      } else {
        user.authenticate(req.body.password).then(function(user) {
          var token = jwt.sign(
            {id: user.id, is_admin: user.attributes.is_admin},
            app.get('secret'), {
              expiresInMinutes: 120
            });
          res.json({
            token: token
          });
        }, function(err) {
          logger.error(err);
          return res.status(401).json({message: i18n.__('password.wrong')});
        });
      }
    }, function(err) {
      logger.error(err);
      return res.status(500).json({message: i18n.__('server.error')});
    })
  });
};