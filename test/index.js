'use strict';

(function () {
  let chai = require('chai'),
            assert = require('assert'),
            app = require('../app.js'),
            hippie = require('hippie'),
            services = require('../app/services/index')({});

  let endPointTests = require('./rest')(chai, assert, app, hippie);
  let servicesTests = require('./services')(chai, services);

    endPointTests();
    servicesTests();
})();
