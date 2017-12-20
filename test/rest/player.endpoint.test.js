/**
 * Player endpoint tests
 * @param hippie
 * @param chai
 * @returns {Function}
 * @constructor
 */
PlayerEndPointTest = function(hippie, chai){

    var expect = chai.expect;


    return function(){
        it('should return code 200 with json containing an object', function (done) {
            hippie(app)
                    .json()
                    .get("/api/players/1")
                    .expectStatus(200)
                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
                    .end(function (err, res, body) {
                        expect(body).to.be.an('object');
                        done();
                    });
        });

        it('should return code 200 with json containing an object', function (done) {
            hippie(app)
                    .json()
                    .get("/api/players/1/team")
                    .expectStatus(200)
                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
                    .end(function (err, res, body) {
                        expect(body).to.be.an('object');
                        done();
                    });
        });

        it('should return code 200 with json containing an array', function (done) {
            hippie(app)
                    .json()
                    .get("/api/players/1/matches")
                    .expectStatus(200)
                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
                    .end(function (err, res, body) {
                        expect(body).to.be.an('array');
                        done();
                    });
        });

        it('should return code 200 with json containing an object', function (done) {
            hippie(app)
                    .json()
                    .get("/api/players/1/league")
                    .expectStatus(200)
                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
                    .end(function (err, res, body) {
                        expect(body).to.be.an('object');
                        done();
                    });
        });

        it('should return code 200 with an empty json', function (done) {
            hippie(app)
                    .json()
                    .get("/api/players/-650")
                    .expectStatus(200)
                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
                    .end(function (err, res, body) {
                        expect(body).to.be.null;
                        done();
                    });
        });
    };
};

module.exports = PlayerEndPointTest;