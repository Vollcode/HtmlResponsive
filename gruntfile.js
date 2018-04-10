module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        hello_world:{
            world:{
                name:"world"
            },
            other:{
                name:"xavi"
            }
        },
        connect:{
            meta: {
                port:1338,
                base: 'tasks'
            }
        },
        uglify:{
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            my_target:{
                files:{
                    'dest/output.min.js': ['src/input.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options:{

                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-hello-world');
    grunt.loadNpmTasks('grunt-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['hello_world','connect:meta','uglify']);
}