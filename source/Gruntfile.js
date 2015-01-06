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
    },
    clean: ["../url2ql/", "../url2ql.crx", "../*.pem"],
    copy: {
      deploy: {
        files: [
          // includes files within path
          {expand: true, src: ['dist/**', 'icon.png', 'manifest.json', '*.html'], dest: '../url2qr/'}
        ],
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);
  grunt.registerTask('deploy', ['clean', 'copy:deploy']);
};
