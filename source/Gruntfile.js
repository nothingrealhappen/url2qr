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

    uglify: {
      options: {
        // sourceMap: 'main.min.map'
      },
      dist: {
        files: {
          'dist/main.min.js':
            [
              'src/js/*.js'
            ]
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
        tasks:['uglify']
      }
    } ,
    clean: {
      options: {
        force: true
      },
      files: ["../url2qr", "../url2qr.crx", "../url2qr.zip", "../url2qr.crx"]
    },
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['sass', 'uglify', 'watch']);
  grunt.registerTask('deploy', ['clean', "copy"]);
};
