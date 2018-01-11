module.exports.load = function(router) {
  let services = app.get('services');
  let logger = app.get('logger');
  let requiresAuth = app.get('auth');

  router.route('/categories/:id')
    .get(function(req, res) {
      logger.info("Routes - Category::findCategoryById");
      services.category.findById(req.params.id).then(function(data) {
        return res.json(data);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    })
    .delete(requiresAuth, function(req, res) {
      logger.info("Routes - Category::deleteCategory");
      if (req.decoded.is_admin) {
        services.category.delete(req.params.id).then(function(data) {
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
      logger.info("Routes - Category::updateCategory");
      if (req.decoded.is_admin) {
        services.category.delete(req.params.id).then(function(data) {
          return res.json(data);
        }).catch(function(error) {
          logger.error(error);
          return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
        });
      } else {
        return res.status(401).json({message: 'Insufficient permissions!'});
      }
    });

  router.route('/categories')
    .get(function(req, res) {
      logger.info("Routes - Category::fetchAll");
      services.category.fetchAll().then(function(data) {
        return res.json(data);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    })
};