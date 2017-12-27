module.exports.load = function (app) {
    let services = app.get('services');
    let logger = app.get('logger');

    app.get('/api/categories/:id', function (req, res) {
        logger.info("Routes - Category::findCategoryById");
        services.category.findCategoryById(req.params.id).then(function (data) {
            return res.json(data);
        }).catch(function (error) {
            logger.error(error);
            return res.status(500).json({ code: 500, message: 'An internal error occurred while processing your request' });
        });
    });

    app.get('/api/categories/:name', function (req, res) {
        logger.info("Routes - Category::findCategoryByName");
        services.category.findCategoryLogoById(req.params.id).then(function (data) {
            if (data && data.attributes.logo) {
                data = data.toJSON()s;
                res.set('Content-Type', 'image/png');
                return res.send(data.logo);
            }
            return res.status(404).json({ code: 404, message: 'No image found' })
        }).catch(function (error) {
            logger.error(error);
            return res.status(500).json({ code: 500, message: 'An internal error occurred while processing your request' });
        });
    });

    app.get('/api/categories/:id/members', function (req, res) {
        logger.info("Routes - Category::findCategoryMembersById");
        services.category.findCategoryMembersById(req.params.id).then(function (data) {
            return res.json(data);
        }).catch(function (error) {
            logger.error(error);
            return res.status(500).json({ code: 500, message: 'An internal error occurred while processing your request' });
        });
    });

    app.get('/api/categories/:id/stats', function (req, res) {
        logger.info("Routes - Category::findCategoryStatsById");
        services.category.findCategoryStatsById(req.params.id).then(function (data) {
            return res.json(data);
        }).catch(function (error) {
            logger.error(error);
            return res.status(500).json({ code: 500, message: 'An internal error occurred while processing your request' });
        });
    });

    /*    app.get('/api/categorys/:id/matches', function (req, res) {
            logger.info("Routes - Category::getMatches");
            services.category.getMatches(req.params.id).then(function (data) {
                return res.json(data.relations.matches);
            }).catch(function (error) {
                logger.error(error);
                //TODO implement error handler;
            });
        });*/
};