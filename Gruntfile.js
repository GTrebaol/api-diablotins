module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'mocha-chai-sinon': {
            build: {
                src: ['./tests/index.js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-mocha-chai-sinon');
    grunt.registerTask('test', ['mocha-chai-sinon']);
};