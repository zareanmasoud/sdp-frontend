'use strict';

module.exports = function (grunt) {
    grunt.initConfig({

        //Create jsResources and cssResources gateway properties
        jsResources: [],
        cssResources: [],

        nggettext_extract: {
            pot: {
                files: {
                    'src/assets/languages/template.pot': [
                        'src/app/**/*.html',
                        'src/app/**/*.js',
                    ]
                }
            }
        },
        shell: {
            po_update: {
                command: '/usr/bin/msgmerge -N src/assets/languages/po/fa.po src/assets/languages/template.pot -U'
            }
        },
        nggettext_compile: {
            all: {
                files: {
                    'src/assets/languages/js/translations.js': ['src/assets/languages/po/*.po']
                }
            }
        },
        uglify: {
            app: {
                files: [{
                    expand: true,
                    src: ['src/app/**/*.js', 'src/assets/languages/**/*.js'],
                    dest: 'dist'
                }]
            },
            lib: {
                files: [{
                    expand: true,
                    src: 'dist/src/assets/lib/lib.js'
                }]
            },
            config_dist: {
                files: [{
                    expand: true,
                    src: 'dist/src/app/constants.js'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/src/assets/css',
                    src: ['*.css'],
                    dest: 'dist/src'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true, // fixme: why doesn't remove comments
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/src/app',
                    src: '**/**.html',
                    dest: 'dist/src/app'
                }]
            }
        },
        wiredep: {
            app: {
                src: [
                    'src/index.html'
                ],
                exclude: [
                    'src/assets/lib/bower_components/jquery/dist/jquery.js',
                    'src/assets/lib/bower_components/bootstrap/dist/js/bootstrap.js'
                ],
                include: []
            },
            test: {
                devDependencies: true,
                src: 'karma.conf.js',
                ignorePath: /\.\.\//,
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            }
        },
        replace: {
            gather: {
                files: [
                    {
                        dest: 'dist',
                        expand: true,
                        src: ['src/index.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            //Grab the <!--build-js-start--> and <!--build-js-end--> comments and everything in-between
                            match: /\<\!\-\-build\-js\-start[\s\S]*build\-js\-end\-\-\>/,
                            replacement: function (matchedString) {
                                //Grab all of the src attributes from the <script> tags
                                var jsArray = matchedString.match(/(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g);
                                jsArray.forEach(function (element) {
                                    //Get just the value of the src attribute (the file path to the JS file)
                                    var resourceTarget = element.match(/(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/)[2];

                                    var targetConfig = grunt.config('jsResources');
                                    //Alter the path for use with the concat task
                                    targetConfig.push('src/' + resourceTarget);
                                    //Add the path to the JS file to the jsResources gateway property
                                    grunt.config('jsResources', targetConfig);
                                });

                                //Replace the entire build-js-start to build-js-end block with this <script> tag
                                return '';
                            }
                        },
                        {
                            //Grab the <!--build-css-start--> and <!--build-css-end--> comments and everything in-between
                            match: /\<\!\-\-build\-css\-start[\s\S]*build\-css\-end\-\-\>/,
                            replacement: function (matchedString) {
                                //Grab all of the href attributes from the <href> tags
                                var cssArray = matchedString.match(/(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g);
                                cssArray.forEach(function (element) {
                                    var resourceTarget = element.match(/(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/)[2];
                                    var targetConfig = grunt.config('cssResources');
                                    //Alter the path for use with the concat task
                                    targetConfig.push('src/' + resourceTarget);
                                    //Add the path to the CSS file to the cssResources gateway property
                                    grunt.config('cssResources', targetConfig);
                                });

                                //Replace the entire build-css-start to build-css-end block with this <link> tag
                                return '';
                            }
                        }
                    ]
                }
            }
        },
        concat: {
            js: {
                //Concatenate all of the files in the jsResources gateway property
                src: ['<%= jsResources %>'],
                dest: 'dist/src/assets/lib/lib.js',
                options: {
                    separator: ';'
                }
            },

            css: {
                //Concatenate all of the files in the cssResources gateway property
                src: ['<%= cssResources %>'],
                dest: 'dist/src/assets/lib/lib.css'
            }

        },
        copy: {
            config_development: {
                src: 'config/development.config',
                dest: 'src/app/constants.js',
                options: {
                    process: function (content, srcpath) {
                        var result = "angular.module('SdpApp.conf', [])";
                        var obj = JSON.parse(content);

                        Object.keys(obj).forEach(function (key) {
                            if (typeof obj[key] == 'string') {
                                result += "\n    .constant('" + key + "', '" + obj[key] + "')"
                            } else {
                                result += "\n    .constant('" + key + "', " + obj[key] + ")"
                            }
                        });
                        result += ";";
                        return result;
                    }
                }
            },
            config_test: {
                src: 'config/test.config',
                dest: 'src/app/constants.js',
                options: {
                    process: function (content, srcpath) {
                        var result = "angular.module('SdpApp.conf', [])";
                        var obj = JSON.parse(content);
                        Object.keys(obj).forEach(function (key) {
                            if (typeof obj[key] == 'string') {
                                result += "\n    .constant('" + key + "', '" + obj[key] + "')"
                            } else {
                                result += "\n    .constant('" + key + "', " + obj[key] + ")"
                            }
                        });
                        result += ";";
                        return result;
                    }
                }
            },
            config_staging: {
                src: 'config/staging.config',
                dest: 'dist/src/app/constants.js',
                options: {
                    process: function (content, srcpath) {
                        var result = "angular.module('SdpApp.conf', [])";
                        var obj = JSON.parse(content);

                        Object.keys(obj).forEach(function (key) {
                            if (typeof obj[key] == 'string') {
                                result += "\n    .constant('" + key + "', '" + obj[key] + "')"
                            } else {
                                result += "\n    .constant('" + key + "', " + obj[key] + ")"
                            }
                        });
                        result += ";";
                        return result;
                    }
                }
            },
            config_production: {
                src: 'config/production.config',
                dest: 'dist/src/app/constants.js',
                options: {
                    process: function (content, srcpath) {
                        var result = "angular.module('SdpApp.conf', [])";
                        var obj = JSON.parse(content);

                        Object.keys(obj).forEach(function (key) {
                            if (typeof obj[key] == 'string') {
                                result += "\n    .constant('" + key + "', '" + obj[key] + "')"
                            } else {
                                result += "\n    .constant('" + key + "', " + obj[key] + ")"
                            }
                        });
                        result += ";";
                        return result;
                    }
                }
            },
            app: {
                src: ['src/app/**/*.html', 'src/app/**/*.json'],
                dest: 'dist',
                expand: true
            },
            assets: {
                src: ['src/assets/fonts/**', 'src/assets/images/**', 'src/assets/json/**', 'src/assets/css/**'],
                dest: 'dist',
                expand: true
            },
            exceptions_fonts: {
                src: [
                    'src/assets/lib/bower_components/simple-line-icons/fonts/Simple-Line-Icons.ttf',
                    'src/assets/lib/bower_components/simple-line-icons/fonts/Simple-Line-Icons.woff2',
                    'src/assets/lib/bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2'
                ],
                dest: 'dist/src/assets/fonts/',
                expand: true,
                flatten: true
            },
            exception_icheck: {
                src: '**',
                cwd: 'src/assets/lib/bower_components/icheck/skins/',
                dest: 'dist/src/assets/lib/',
                expand: true
            },
            exception_icheck_img: {
                src: [
                    'src/assets/lib/bower_components/icheck/skins/minimal/grey.png',
                    'src/assets/lib/bower_components/icheck/skins/flat/aero.png'
                ],
                dest: 'dist/src/assets/lib/',
                expand: true,
                flatten: true
            },
            exception_uigrid: {
                src: 'src/assets/lib/bower_components/angular-ui-grid/ui-grid.woff',
                dest: 'dist/src/assets/lib/',
                expand: true,
                flatten: true
            },
            metronic: {
                src: [
                    // JS
                    'src/assets/lib/metronic/theme_rtl/assets/global/plugins/bootstrap/js/bootstrap.min.js',
                    'src/assets/lib/metronic/theme_rtl/assets/global/plugins/MdBootstrapPersianDateTimePicker/js/jalaali.js',
                    'src/assets/lib/metronic/theme_rtl/assets/global/plugins/MdBootstrapPersianDateTimePicker/js/jquery.Bootstrap-PersianDateTimePicker.js',
                    'src/assets/lib/metronic/theme_rtl/assets/global/scripts/metronic.js',
                    'src/assets/lib/metronic/theme_rtl/assets/admin/layout/scripts/layout.js',
                    'src/assets/lib/metronic/theme_rtl/assets/admin/layout/scripts/quick-sidebar.js',
                    'src/assets/lib/metronic/theme_rtl/assets/global/scripts/wordifyfa.js',

                    // CSS RTL
                    'src/assets/lib/metronic/theme_rtl/assets/global/css/components-rtl.min.new.css',
                    'src/assets/lib/metronic/theme_rtl/assets/global/plugins/bootstrap/css/bootstrap-rtl.min.css',
                    'src/assets/lib/metronic/theme_rtl/assets/global/css/components-rtl.css',
                    'src/assets/lib/metronic/theme_rtl/assets/global/css/plugins-rtl.css',
                    'src/assets/lib/metronic/theme_rtl/assets/admin/layout/css/layout-rtl.css',
                    'src/assets/lib/metronic/theme_rtl/assets/admin/layout/css/themes/default-rtl.css',
                    'src/assets/lib/metronic/theme_rtl/assets/admin/layout/css/custom-rtl.css',
                    'src/assets/lib/metronic/theme_rtl/assets/global/plugins/MdBootstrapPersianDateTimePicker/cs/jquery.Bootstrap-PersianDateTimePicker.css',
                    'src/assets/lib/metronic/theme_rtl/assets/global/plugins/dataTables.bootstrap-rtl.css',
                    'src/assets/lib/metronic/theme_rtl/assets/admin/pages/css/login3-rtl.css',
                    'src/assets/lib/metronic/theme_rtl/assets/admin/pages/css/profile-rtl.css',

                    // CSS
                    'src/assets/lib/metronic/theme/assets/global/css/components.min.css',
                    'src/assets/lib/metronic/theme/assets/global/plugins/bootstrap/css/bootstrap.min.css',
                    'src/assets/lib/metronic/theme/assets/global/css/components.css',
                    'src/assets/lib/metronic/theme/assets/global/css/plugins.css',
                    'src/assets/lib/metronic/theme/assets/admin/layout/css/layout.css',
                    'src/assets/lib/metronic/theme/assets/admin/layout/css/themes/default.css',
                    'src/assets/lib/metronic/theme/assets/admin/layout/css/custom.css',
                    'src/assets/lib/metronic/theme/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                    'src/assets/lib/metronic/theme/assets/admin/pages/css/login-3.css',
                    'src/assets/lib/metronic/theme/assets/admin/pages/css/profile.css',

                    // Images RTL
                    'src/assets/lib/metronic/theme_rtl/assets/admin/layout/img/sidebar_toggler_icon_default.png',
                    'src/assets/lib/metronic/theme_rtl/assets/global/img/portlet-collapse-icon.png',
                    'src/assets/lib/metronic/theme_rtl/assets/global/img/portlet-reload-icon.png',
                    'src/assets/lib/metronic/theme_rtl/assets/global/img/remove-icon-small.png',

                    // Image
                    'src/assets/lib/metronic/theme/assets/admin/layout/img/sidebar_toggler_icon_default.png',
                    'src/assets/lib/metronic/theme/assets/global/img/portlet-collapse-icon.png',
                    'src/assets/lib/metronic/theme/assets/global/img/portlet-reload-icon.png',
                    'src/assets/lib/metronic/theme/assets/global/img/remove-icon-small.png',

                    'src/assets/images/favicon.ico',

                    // Fonts
                    'src/assets/lib/metronic/theme_rtl/assets/global/plugins/bootstrap/fonts/glyphicons-halflings-regular.woff2',
                    'src/assets/lib/metronic/theme_rtl/assets/global/plugins/bootstrap/fonts/glyphicons-halflings-regular.woff',
                    'src/assets/lib/metronic/theme_rtl/assets/global/plugins/bootstrap/fonts/glyphicons-halflings-regular.ttf'
                ],
                dest: 'dist',
                expand: true
            }
        },
        htmlbuild: {
            app: {
                src: 'src/index.html',
                dest: 'src/',
                options: {
                    beautify: true,
                    relative: true,
                    keepTags: true,
                    scripts: {
                        app: 'src/app/!(*.test|*.mock|*.spec)+(*.js)',
                        languages: 'src/assets/languages/**/!(*.test|*.mock|*.spec)+(*.js)',
                        factories: 'src/app/core/factories/!(*.test|*.mock|*.spec)+(*.js)',
                        directives: 'src/app/core/directives/**/!(*.test|*.mock|*.spec)+(*.js)',
                        widgets: 'src/app/widgets/**/!(*.test|*.mock|*.spec)+(*.js)',
                        filters: 'src/app/core/filters/**/!(*.test|*.mock|*.spec)+(*.js)',
                        controllers: ['src/app/**/*.controller.js'],
                        services: ['src/app/**/*.service.js'],
                        routes: ['src/app/**/*.route.js'],
                        lib: 'src/assets/lib/lib.js',
                        metronic: [
                            'src/assets/lib/metronic/theme_rtl/assets/global/plugins/bootstrap/js/bootstrap.min.js',
                            'src/assets/lib/metronic/theme_rtl/assets/global/plugins/MdBootstrapPersianDateTimePicker/js/jalaali.js',
                            'src/assets/lib/metronic/theme_rtl/assets/global/plugins/MdBootstrapPersianDateTimePicker/js/jquery.Bootstrap-PersianDateTimePicker.js',
                            'src/assets/lib/metronic/theme_rtl/assets/global/scripts/metronic.js',
                            'src/assets/lib/metronic/theme_rtl/assets/admin/layout/scripts/layout.js',
                            'src/assets/lib/metronic/theme_rtl/assets/admin/layout/scripts/quick-sidebar.js',
                            'src/assets/lib/metronic/theme_rtl/assets/global/scripts/wordifyfa.js'
                        ]
                    },
                    styles: {
                        lib: 'src/assets/lib/lib.css',
                        metronic: [],
                        assets: 'src/assets/css/*.css'
                    }
                }
            },
            dist: {
                src: 'dist/src/index.html',
                dest: 'dist/src/',
                options: {
                    beautify: true,
                    relative: true,
                    scripts: {
                        app: 'dist/src/app/!(*.test|*.mock|*.spec)+(*.js)',
                        languages: 'dist/src/assets/languages/**/!(*.test|*.mock|*.spec)+(*.js)',
                        factories: 'dist/src/app/core/factories/!(*.test|*.mock|*.spec)+(*.js)',
                        directives: 'dist/src/app/core/directives/**/!(*.test|*.mock|*.spec)+(*.js)',
                        widgets: 'dist/src/app/widgets/**/!(*.test|*.mock|*.spec)+(*.js)',
                        filters: 'dist/src/app/core/filters/**/!(*.test|*.mock|*.spec)+(*.js)',
                        controllers: ['dist/src/app/**/*.controller.!(*.test|*.mock|*.spec)+(*.js)'],
                        services: ['dist/src/app/**/*.service.!(*.test|*.mock|*.spec)+(*.js)'],
                        routes: ['dist/src/app/**/*.route.!(*.test|*.mock|*.spec)+(*.js)'],
                        lib: 'dist/src/assets/lib/*.js',
                        metronic: [
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/plugins/bootstrap/js/bootstrap.min.js',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/plugins/MdBootstrapPersianDateTimePicker/js/jalaali.js',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/plugins/MdBootstrapPersianDateTimePicker/js/jquery.Bootstrap-PersianDateTimePicker.js',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/scripts/metronic.js',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/admin/layout/scripts/layout.js',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/admin/layout/scripts/quick-sidebar.js',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/scripts/wordifyfa.js'
                        ]
                    },
                    styles: {
                        assets: 'dist/src/assets/css/*.css',
                        lib: 'dist/src/assets/lib/*.css',
                        metronic: [
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/css/components-rtl.min.new.css',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/plugins/bootstrap/css/bootstrap-rtl.min.css',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/css/components-rtl.css',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/css/plugins-rtl.css',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/admin/layout/css/layout-rtl.css',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/admin/layout/css/themes/default-rtl.css',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/admin/layout/css/custom-rtl.css',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/plugins/MdBootstrapPersianDateTimePicker/cs/jquery.Bootstrap-PersianDateTimePicker.css',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/global/plugins/dataTables.bootstrap-rtl.css',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/admin/pages/css/login3-rtl.css',
                            'dist/src/assets/lib/metronic/theme_rtl/assets/admin/pages/css/profile-rtl.css',


                            'dist/src/assets/lib/metronic/theme/assets/global/css/components.min.css',
                            'dist/src/assets/lib/metronic/theme/assets/global/plugins/bootstrap/css/bootstrap.min.css',
                            'dist/src/assets/lib/metronic/theme/assets/global/css/components.css',
                            'dist/src/assets/lib/metronic/theme/assets/global/css/plugins.css',
                            'dist/src/assets/lib/metronic/theme/assets/admin/layout/css/layout.css',
                            'dist/src/assets/lib/metronic/theme/assets/admin/layout/css/themes/default.css',
                            'dist/src/assets/lib/metronic/theme/assets/admin/layout/css/custom.css',
                            'dist/src/assets/lib/metronic/theme/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            'dist/src/assets/lib/metronic/theme/assets/admin/pages/css/login-3.css',
                            'dist/src/assets/lib/metronic/theme/assets/admin/pages/css/profile.css'
                        ]
                    }
                }
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            files: {
                src: [
                    'dist/src/app/**/*.{js,css}',
                    'dist/src/assets/lib/*.{js,css}',
                    'dist/src/assets/css/*.css'
                    // 'dist/src/assets/lib/metronic/**/*.{js,css}'
                ]
            }
        },
        clean: {
            dist: 'dist'
        },
        rename: {
            config_development: {
                files: [
                    {
                        src: ['config/development.config.example'],
                        dest: 'config/development.config'
                    }
                ]
            },
            config_test: {
                files: [
                    {
                        src: ['config/test.config.example'],
                        dest: 'config/test.config'
                    }
                ]
            },
            config_staging: {
                files: [
                    {
                        src: ['config/staging.config.example'],
                        dest: 'config/staging.config'
                    }
                ]
            },
            config_production: {
                files: [
                    {
                        src: ['config/production.config.example'],
                        dest: 'config/production.config'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-rename');

    grunt.registerTask('default', []);
    grunt.registerTask('config-test', ['rename:config_test','copy:config_test']);
    grunt.registerTask('config-development', ['rename:config_development','copy:config_development']);
    grunt.registerTask('config-staging', ['rename:config_staging','copy:config_staging']);
    grunt.registerTask('config-production', ['rename:config_production','copy:config_production']);
    grunt.registerTask('text-extract', ['nggettext_extract']);
    grunt.registerTask('text-compile', ['nggettext_compile']);
    grunt.registerTask('text-merge', ['shell']);
    grunt.registerTask('inject', ['htmlbuild:app', 'wiredep:app']);
    grunt.registerTask('citest', ['rename:config_test', 'copy:config_test', 'wiredep:test']);
    grunt.registerTask('test', ['wiredep:test']);
    grunt.registerTask('pre-build', ['clean:dist', 'uglify:app']);
    grunt.registerTask('build', [
        'uglify:config_dist',
        'copy:app',
        'copy:assets',
        'copy:exceptions_fonts',
        'copy:exception_icheck',
        'copy:exception_icheck_img',
        'copy:exception_uigrid',
        'copy:metronic',
        'replace:gather',
        'concat:css',
        'concat:js',
        'uglify:lib',
        'cssmin',
        'filerev',
        'htmlbuild:dist',
        'htmlmin:dist'
    ]);
};
