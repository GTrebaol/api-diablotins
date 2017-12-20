/**
 * League endpoint tests
 * @param hippie
 * @param chai
 * @returns {Function}
 * @constructor
 */
LeagueEndPointTest = function(hippie, chai) {

  var expect = chai.expect;

  return function() {
    it('should return code 200 with json containing an object', function(done) {
      hippie(app)
        .json()
        .get("/api/leagues/1")
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res, body) {
          expect(body).to.be.an('object');
          done();
        });
    });

    it('should return code 200 with json containing an array', function(done) {
      hippie(app)
        .json()
        .get("/api/leagues")
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res, body) {
          expect(body).to.be.an('array');
          done();
        });
    });

    it('should return code 200 with json containing an array', function(done) {
      hippie(app)
        .json()
        .get("/api/leagues/1/teams")
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res, body) {
          expect(body).to.be.an('array');
          done();
        });
    });

    it('should return code 200 with json containing an array', function(done) {
      hippie(app)
        .json()
        .get("/api/leagues/1/players")
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res, body) {
          expect(body).to.be.an('array');
          done();
        });
    });

    it('should return code 200 with an empty json', function(done) {
      hippie(app)
        .json()
        .get("/api/leagues/-650")
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res, body) {
          expect(body).to.be.null;
          done();
        });
    });
  };
};

module.exports = LeagueEndPointTest;