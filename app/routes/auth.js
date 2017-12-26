module.exports.load = function(app) {

  let logger = app.get('logger');
  let services = app.get('services');
  let jwt = app.get('jwt');
  let bcrypt = app.get('bcrypt');
  let i18n = app.get('i18n');

  app.post('/api/auth', function(req, res) {
    logger.info("Routes - Auth::authUser");
    console.log(req.body);
    services.user.findByName(req.body.username).then(function(user) {
      if (!user) {
        return res.status(401).json({message: i18n.__('user.undefined')});
      } else {
        user.authenticate(req.body.password).then(function(user) {
          let token = jwt.sign(
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