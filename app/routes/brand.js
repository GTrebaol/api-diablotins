module.exports.load = function(router) {
  let services = app.get('services');
  let logger = app.get('logger');
  let requiresAuth = app.get('auth');

  router.route('/brands/:id')
    .get(function(req, res) {
      logger.info("Routes - Brand::findBrandById");
      services.brand.findById(req.params.id).then(function(data) {
        return res.json(data);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    })
    .delete(requiresAuth, function(req, res) {
      logger.info("Routes - Brand::deleteBrand");
      if (req.decoded.is_admin) {
        services.brand.delete(req.params.id).then(function(data) {
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
      logger.info("Routes - Brand::updateBrand");
      if (req.decoded.is_admin) {
        services.brand.delete(req.params.id).then(function(data) {
          return res.json(data);
        }).catch(function(error) {
          logger.error(error);
          return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
        });
      } else {
        return res.status(401).json({message: 'Insufficient permissions!'});
      }
    });

  router.route('/brands')
    .get(function(req, res) {
      logger.info("Routes - Brand::fetchAll");
      services.brand.fetchAll().then(function(data) {
        return res.json(data);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    })
};