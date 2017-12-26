module.exports.load = function(app) {
  let services = app.get('services');
  let logger = app.get('logger');
  let async = app.get('async');


  app.get('/api/shoes/name/:name', function(req, res) {
    logger.info("Routes - shoe::findByName");
    services.shoe.findByName(req.params.name).then(function(data) {
      return res.json(data);
    }).catch(function(error) {
      logger.error(error);
      return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
    });
  });

  app.get('/api/shoes/category/:id', function(req, res) {
    logger.info("Routes - shoe::findByCategory");
    services.shoe.findByCategoryId(req.params.id).then(function(data) {
      return res.json(data);
    }).catch(function(error) {
      logger.error(error);
      return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
    });
  });

  app.get('/api/shoes/collection/:id', function(req, res) {
    logger.info("Routes - shoe::findByCollection");
    services.shoe.findByCollectionId(req.params.id).then(function(data) {
      return res.json(data);
    }).catch(function(error) {
      logger.error(error);
      return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
    });
  });


  app.get('/api/shoes/:id', function(req, res) {
    logger.info("Routes - shoe::findById");
    services.shoe.findById(req.params.id).then(function(data) {
      return res.json(data);
    }).catch(function(error) {
      logger.error(error);
      return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
    });
  });

  app.get('/api/shoes', function(req, res) {
    logger.info("Routes - shoe::fetchAll");
    services.shoe.fetchAll().then(function(data) {
      return res.json(data);
    }).catch(function(error) {
      logger.error(error);
      return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
    });
  });


};
