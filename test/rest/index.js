/**
 * Loading and launching the endpoints tests
 * @param chai
 * @param assert
 * @param app
 * @param hippie
 * @returns {Function}
 * @constructor
 */
let EndPointTests = function(chai, assert, app, hippie) {

  return function() {
    describe('app', function() {

      before(function() {
        // we don't want to log INFO messages.
        app.get('logger').setLevel("WARN");
      });

      it('app should exist', function(done) {
        chai.should().exist(app);
        done();
      });

      it('should be listening at localhost:8080', function(done) {
        let path = '/';
        hippie(app)
          .get(path)
          .expectStatus(200)
          .end(function(err, res, body) {
            done();
          });
      });

      describe('GET end point testing', function() {
        describe('shoes endpoints', function() {
          require('./shoe.endpoint.test.js')(hippie, chai)();
        });
      });
    });

  };
};

module.exports = EndPointTests;

