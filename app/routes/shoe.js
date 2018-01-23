module.exports.load = function(router) {
  let services = app.get('services');
  let logger = app.get('logger');
  let async = app.get('async');
  let requiresAuth = app.get('auth');

  /**
   * Get all the shoes with name like {name}
   */
  router.route('/shoes/name/:name')
    .get(function(req, res) {
      logger.info("Routes - shoe::findByName");
      services.shoe.findByName(req.params.name).then(function(data) {
        return res.json(data);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    });


  /**
   * Get all the shoes of the category {id}
   */
  router.route('/shoes/category/:id')
    .get(function(req, res) {
      logger.info("Routes - shoe::findByCategory");
      services.shoe.findByCategoryId(req.params.id).then(function(data) {
        return res.json(data);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    });

  /**
   * Get all the shoes belonging to the collection {id}
   */
  router.route('/shoes/collection/:id')
    .get(function(req, res) {
      logger.info("Routes - shoe::findByCollection");
      services.shoe.findByCollectionId(req.params.id).then(function(data) {
        return res.json(data);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    });

  /**
   * Get / update / delete a shoe with the id {id}
   */
  router.route('/shoes/:id')
    .get(function(req, res) {
      logger.info("Routes - Shoe::findById");
      services.shoe.findById(req.params.id).then(function(data) {
        return res.json(data);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    })
    .put(requiresAuth, function(req, res) {
      logger.info("Routes - Shoe::updateShoe");
      if (req.decoded.is_admin) {
        let shoe = req.body;
        services.shoe.update(shoe).then(function() {
          return res.status(200).json({message: 'Successfully updated shoe'});
        }).catch(function(error) {
          logger.error(error);
          return res.status(500).json({message: error.message});
        });
      } else {
        return res.status(401).json({message: 'Insufficient permissions!'});
      }
    })
    .delete(requiresAuth, function(req, res) {
      logger.info("Routes - Shoe::deleteShoe");
      if (req.decoded.is_admin) {
        services.shoe.delete(req.params.id).then(function() {
          return res.status(200).json({message: 'Successfully deleted shoe'});
        }).catch(function(error) {
          logger.error(error);
          return res.status(500).json({message: error.message});
        });
      } else {
        return res.status(401).json({message: 'Insufficient permissions!'});
      }
    });

  /**
   * Fetch all the shoes of the database
   */
  router.route('/shoes')
    .get(function(req, res) {
      logger.info("Routes - shoe::fetchAll");
      let pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
      let response = {};
      services.shoe.fetchAll(pageNumber).then(function(data) {
        response.shoes = data;
        services.shoe.getAmount().then(function(amount) {
          response.shoesQuantity = amount;
          response.pageAsked = pageNumber;
          response.pageSize = services.shoe.getPagingLimit();
          return res.json(response);
        });
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    });

  /**
   * Get the relationship of the shoe {id}
   */
  router.route('/shoes/:id/:relationship')
    .get(function(req, res) {
      logger.info("Routes - shoe::findCategoriesFromShoeId");
      let relationship = req.params.relationship;
      let shoeId = req.params.id;
      services.shoe.findByIdWithSpecifiedRelation(shoeId, relationship).then(function(data) {
        return res.json(data.relations[relationship]);
      }).catch(function(error) {
        logger.error(error);
        return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
      });
    });

};
