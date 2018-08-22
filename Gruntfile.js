module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: false,
                plugins: [
                    ["transform-react-jsx", {
                        "pragma": "Component.createElement"
                    }]
                ],
                presets: ['env']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: './src/js',
                    src: ['**/*.js'],
                    dest: './lib'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './src/css/resource',
                    src: ['*/*'],
                    dest: './dist/resource'
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['./dist/<%= pkg.name %>.js']
                }
            }
        },
        less: {
            compile: {
                files: {
                    './dist/<%= pkg.name %>.css': './src/css/<%= pkg.name %>.less'
                }
            },
            compress: {
                options: {
                    compress: true
                },
                files: {
                    './dist/<%= pkg.name %>.min.css': './dist/<%= pkg.name %>.css'
                }
            }
        },
        // browserify: {
        //     dist: {
        //         options: {
        //             transform: [
        //                 ["babelify", {
        //                     presets: [ "es3", ["es2015", {"loose": true}]],
        //                     plugins: [
        //                         ["transform-react-jsx", {
        //                             "pragma": "Component.createElement"
        //                         }]
        //                     ]
        //                 }],
        //                 ["browserify-shim"]
        //             ],
        //             browserifyOptions: {
        //                 standalone: '<%= pkg.name %>'
        //             }
        //         },
        //         files: {
        //             './dist/<%= pkg.name %>.js': ['./src/js/<%= pkg.name %>.js']
        //         }
        //     }
        // }
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            presets: [ "es3", ["es2015", {"loose": true}]],
                            plugins: [
                                ["transform-react-jsx", {
                                    "pragma": "Component.createElement"
                                }]
                            ]
                        }]
                    ],
                    browserifyOptions: {
                        standalone: '<%= pkg.name %>'
                    },
                    external: ['larkplayer']
                },
                files: {
                    './dist/<%= pkg.name %>-external.js': ['./src/js/<%= pkg.name %>.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');
    // grunt.registerTask('default', ['less', 'browserify', 'uglify', 'copy']);
    grunt.registerTask('external', ['browserify']);
    grunt.registerTask('default', ['less', 'browserify', 'copy']);

    grunt.registerTask('generate-lib', ['babel'])
};