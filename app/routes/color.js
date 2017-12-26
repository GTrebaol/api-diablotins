module.exports.load = function(app) {
  let services = app.get('services');
  let logger = app.get('logger');
  let requiresAuth = app.get('auth');

  app.get('/api/leagues', function(req, res) {
    logger.info("Routes - League::findAll");
    services.league.fetchAll().then(function(data) {
      return res.json(data);
    }).catch(function(error) {
      logger.error(error);
      res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
    });
  });

  app.get('/api/leagues/:id', function(req, res) {
    logger.info("Routes -  League::findById");
    services.league.findById(req.params.id).then(function(data) {
      return res.json(data);
    }).catch(function(error) {
      logger.error(error);
      return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
    });
  });

  app.get('/api/leagues/:id/region', function(req, res) {
    logger.info("Routes -  League::findLeagueRegionById");
    services.league.findLeagueRegionById(req.params.id).then(function(data) {
      return res.json(data);
    }).catch(function(error) {
      logger.error(error);
      res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
    });
  });

  app.get('/api/leagues/:id/seasons', function(req, res) {
    logger.info("Routes -  League::findLeagueSeasonsById");
    services.league.findLeagueSeasonsById(req.params.id).then(function(data) {
      return res.json(data);
    }).catch(function(error) {
      logger.error(error);
      res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
    });
  });


  app.get('/api/leagues/:id/teams', function(req, res) {
    logger.info("Routes -  League::findLeagueTeamsById");
    services.league.findLeagueTeamsById(req.params.id).then(function(data) {
      return res.json(data);
    }).catch(function(error) {
      logger.error(error);
      res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
    });
  });

  app.post('/api/leagues', requiresAuth, function(req, res) {
    logger.info("Routes - League::createNewLeague");
    var league = req.body;
    validateLeague(league, true, function(err, data) {
      if (err) {
        return res.status(400).json({message: err});
      } else {
        services.league.add(league).then(function() {
          return res.status(200).json({message: 'Successfully saved League "' + league.name + ' ' + league.division + '"'});
        }).catch(function(error) {
          //TODO Handle error
          logger.error(error);
          return res.status(500).json({message: error.message});
        });
      }
    });
  });

  app.post('/api/leagues/:id', requiresAuth, function(req, res) {
    logger.info("Routes - League::updateLeague");
    var league = req.body;
    validateLeague(league, false, function(err, data) {
      if (err) {
        return res.status(400).json({message: err});
      } else {
        services.league.update(req.params.id, league).then(function() {
          return res.status(200).json({message: 'Successfully saved League "' + league.name + ' ' + league.division + '"'});
        }).catch(function(error) {
          //TODO Handle error
          logger.error(error);
          return res.status(500).json({message: error.message});
        });
      }
    });
  });

  app.delete('/api/leagues/:id', requiresAuth, function(req, res) {
    logger.info("Routes - League::deleteLeague");
    services.league.delete(req.params.id).then(function() {
      return res.status(200).json({message: 'Successfully deleted league'});
    }).catch(function(error) {
      //TODO Handle error
      logger.error(error);
      return res.status(500).json({message: error.message});
    });
  });

  var validateLeague = function(league, isCreateQuery, callback) {
    if (!league.name || league.name.length < 5) {
      callback('League names must contain at least 5 characters');
    } else if (league.division && league.division.length > 1) {
      callback('League divisions may only be 1 character');
    } else if (!league.region && isCreateQuery) {
      callback('Please provide a region for this league');
    } else {
      callback(null, league);
    }
  };
};