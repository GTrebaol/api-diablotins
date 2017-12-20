module.exports.load = function (app) {
    var services = app.get('services');
    var logger = app.get('logger');
	
    app.get('/api/teams/:id', function (req, res) {
        logger.info("Routes - Team::findTeamById");
        services.team.findTeamById(req.params.id).then(function (data) {
            return res.json(data);
        }).catch(function (error) {
            logger.error(error);
            return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
        });
    });
    
    app.get('/api/teams/:id/logo', function (req, res) {
        logger.info("Routes - Team::findTeamLogoById");
        services.team.findTeamLogoById(req.params.id).then(function (data) {
            if (data && data.attributes.logo) {
                data = data.toJSON();
                res.set('Content-Type', 'image/png');
                return res.send(data.logo);
            }
            return res.status(404).json({code: 404, message: 'No image found'})
        }).catch(function (error) {
            logger.error(error);
            return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
        });
    });

    app.get('/api/teams/:id/members', function (req, res) {
        logger.info("Routes - Team::findTeamMembersById");
        services.team.findTeamMembersById(req.params.id).then(function (data) {
            return res.json(data);
        }).catch(function (error) {
            logger.error(error);
            return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
        });
    });
    
    app.get('/api/teams/:id/stats', function (req, res) {
        logger.info("Routes - Team::findTeamStatsById");
        services.team.findTeamStatsById(req.params.id).then(function (data) {
            return res.json(data);
        }).catch(function (error) {
            logger.error(error);
            return res.status(500).json({code: 500, message: 'An internal error occurred while processing your request'});
        });
    });

/*    app.get('/api/teams/:id/matches', function (req, res) {
        logger.info("Routes - Team::getMatches");
        services.team.getMatches(req.params.id).then(function (data) {
            return res.json(data.relations.matches);
        }).catch(function (error) {
            logger.error(error);
            //TODO implement error handler;
        });
    });*/
};