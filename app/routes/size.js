module.exports.load = function(router) {
  let services = app.get('services');
  let logger = app.get('logger');
  let async = app.get('async');
  let requiresAuth = app.get('auth');


  router.route('/sizes/:id')
    .get(function(req, res) {
      logger.info("Routes - Size::findSizeById");
      services.size.findById(req.params.id).then(function(data) {
        return res.json(data);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    })
    .delete(requiresAuth, function(req, res) {
      logger.info("Routes - Size::deleteSize");
      if (req.decoded.is_admin) {
        services.size.delete(req.params.id).then(function(data) {
          return res.json(data);
        }).catch(function(error) {
          logger.error(error);
          return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
        });
      } else {
        return res.status(401).json({message: 'Insufficient permissions!'});
      }
    })
    .put(requiresAuth, function(req, res) {
      logger.info("Routes - Size::updateSize");
      if (req.decoded.is_admin) {
        services.size.delete(req.params.id).then(function(data) {
          return res.json(data);
        }).catch(function(error) {
          logger.error(error);
          return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
        });
      } else {
        return res.status(401).json({message: 'Insufficient permissions!'});
      }
    });

  router.route('/sizes')
    .get(function(req, res) {
      logger.info("Routes - Size::fetchAll");
      services.size.fetchAll().then(function(data) {
        return res.json(data);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    })
};
