var ServiceTests = function () {

    return function () {
        var knex = require('knex'),
                dbMock = require('mock-knex'),
                chai = require('chai'),
                expect = chai.expect,
                tracker, services;

        describe('Service Tests', function () {
            /**
             * Setup mock environment before testing
             */
            before(function beforeTracker(done) {
                dbMock.knex.use(knex);
                dbMock.knex.install('mysql');
                services = require('../../app/services')();
                tracker = dbMock.getTracker();
                done();
            });
            /**
             * Destroy mock environment
             */
            after(function afterTracker(done) {
                dbMock.knex.uninstall();
                done();
            });

            beforeEach(function beforeEachTracker(done) {
                tracker.install();
                done();
            });
            afterEach(function afterEachTracker(done) {
                tracker.uninstall();
                done();
            });

            describe('Player tests', function () {
                it('Should returns a player', function (done) {
                    var playerId = 1;
                    tracker.on('query', function sendResult(query) {
                        query.response({'id': playerId});
                    });
                    services.player.findById(playerId).then(function (model) {
                        expect(model).to.be.an.instanceOf(services.models.player);
                        expect(model.get('id')).to.be.equals(playerId);
                        done();
                    });
                });

                it('Should returns a team', function (done) {
                    var playerId = 1,
                            teamId = 2;
                    tracker.on('query', function sendResult(query, step) {
                        if (step > 1) { // response with a team
                            query.response({'id': teamId});
                        } else { // response with a player
                            query.response({'id': playerId, 'team_id': teamId});
                        }
                    });
                    services.player.findTeamByPlayerId(playerId).then(function (model) {
                        expect(model.relations.team).to.be.an.instanceOf(services.models.team);
                        done();
                    });
                });
            });

            describe('Team tests', function () {
                it('Should returns a player', function (done) {
                    var playerId = 1;
                    tracker.on('query', function sendResult(query) {
                        query.response({'id': playerId});
                    });
                    services.player.findById(playerId).then(function (model) {
                        expect(model).to.be.an.instanceOf(services.models.player);
                        expect(model.get('id')).to.be.equals(playerId);
                        done();
                    });
                });

                it('Should returns a team', function (done) {
                    var playerId = 1,
                            teamId = 2;
                    tracker.on('query', function sendResult(query, step) {
                        if (step > 1) { // response with a team
                            query.response({'id': teamId});
                        } else { // response with a player
                            query.response({'id': playerId, 'team_id': teamId});
                        }
                    });
                    services.player.findTeamByPlayerId(playerId).then(function (model) {
                        expect(model.relations.team).to.be.an.instanceOf(services.models.team);
                        done();
                    });
                });
            });

        });
    };
};

module.exports = ServiceTests;