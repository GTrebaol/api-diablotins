/**
 * News endpoint tests
 * @param hippie
 * @param chai
 * @returns {Function}
 * @constructor
 */
NewsEndPointTest = function (hippie, chai) {

    var expect = chai.expect;


    return function () {
        it('should return code 200 with json containing an array', function (done) {
            hippie(app)
                    .json()
                    .get("/api/news")
                    .expectStatus(200)
                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
                    .send({'limit': 1, 'offset': 0})
                    .end(function (err, res, body) {
                        done();
                    });
        });

        it('should return code 200 with json containing an object', function (done) {
            hippie(app)
                    .json()
                    .get("/api/news/metadata")
                    .expectStatus(200)
                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
                    .end(function (err, res, body) {
                        expect(body).to.be.an('array');
                        done();
                    });
        });

        it('should return code 200 with json containing an array', function (done) {
            hippie(app)
                    .json()
                    .get("/api/news/first-news-post")
                    .expectStatus(200)
                    .expectHeader('Content-Type', 'application/json; charset=utf-8')
                    .end(function (err, res, body) {
                        expect(body).to.be.an('object');
                        done();
                    });
        });
    };
};

module.exports = NewsEndPointTest;