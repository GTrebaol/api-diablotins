'use strict';

(function () {
    var chai = require('chai'),
            assert = require('assert'),
            app = require('../app.js'),
            hippie = require('hippie'),
            services = require('../app/services/index')({});


    var endPointTests = require('./rest')(chai, assert, app, hippie);
    var servicesTests = require('./services')(chai, services);

    endPointTests();
    servicesTests();
})();
