/**
 * Loading and launching the endpoints tests
 * @param chai
 * @param assert
 * @param app
 * @param hippie
 * @returns {Function}
 * @constructor
 */
var EndPointTests = function (chai, assert, app, hippie) {

    return function () {
        describe('app', function () {

            before(function () {
                // we don't want to log INFO messages.
                app.get('logger').setLevel("WARN");
            });

            it('app should exist', function (done) {
                chai.should().exist(app);
                done();
            });

            it('should be listening at localhost:8080', function (done) {
                var path = '/';
                hippie(app)
                        .get(path)
                        .expectStatus(200)
                        .end(function (err, res, body) {
                            done();
                        });
            });

            describe('GET end point testing', function () {
                describe('player endpoints', function () {
                    require('./player.endpoint.test.js')(hippie, chai)();
                });
                describe('team endpoints', function () {
                    require('./team.endpoint.test.js')(hippie, chai)();
                });
                describe('league endpoints', function () {
                    require('./league.endpoint.test.js')(hippie, chai)();
                });
                describe('match endpoints', function () {
                    require('./match.endpoint.test.js')(hippie, chai)();
                });
                describe('news endpoints', function () {
                    require('./news.endpoint.test.js')(hippie, chai)();
                });
            });
        });

    };
};

module.exports = EndPointTests;

