module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    apidoc: {
      myapp: {
        src: './routes',
        dest: '../docs/apidoc/',
      },
    },
  });

  grunt.loadNpmTasks('grunt-apidoc');
};
