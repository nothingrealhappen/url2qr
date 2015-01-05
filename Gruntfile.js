module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      style: {
        options: {
          style: 'expanded',
          bundleExec: true,
          sourcemap: 'none'
        },
        files: {
          'dist/style.css': 'src/css/style.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: '/tmp/main.js'
      }
    },
    uglify:{
      dist: {
        files: {
          'dist/main.min.js': '/tmp/main.js'
        }
      }
    },
    watch:{
      sass:{
        files: 'src/css/*.scss',
        tasks:['sass']
      },
      js:{
        files: 'src/js/*.js',
        tasks:['concat', 'uglify']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);
};
