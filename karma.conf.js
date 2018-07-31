(function () {
    'use strict';

module.exports = function (config) {

    var configuration = {

        singleRun: true,

        autoWatch: false,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        files: [

            'src/assets/lib/metronic/theme_rtl/assets/global/scripts/metronic.js',
            'src/assets/lib/metronic/theme_rtl/assets/admin/layout/scripts/layout.js',
            'src/assets/lib/metronic/theme_rtl/assets/admin/layout/scripts/quick-sidebar.js',

            // bower:js
            'src/assets/lib/bower_components/angular/angular.js',
            'src/assets/lib/bower_components/angular-animate/angular-animate.js',
            'src/assets/lib/bower_components/jquery/dist/jquery.js',
            'src/assets/lib/bower_components/angular-resource/angular-resource.js',
            'src/assets/lib/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
            'src/assets/lib/bower_components/angular-local-storage/dist/angular-local-storage.js',
            'src/assets/lib/bower_components/angular-gettext/dist/angular-gettext.js',
            'src/assets/lib/bower_components/ng-table/dist/ng-table.min.js',
            'src/assets/lib/bower_components/moment/moment.js',
            'src/assets/lib/bower_components/moment-jalaali/build/moment-jalaali.js',
            'src/assets/lib/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
            'src/assets/lib/bower_components/bootstrap/dist/js/bootstrap.js',
            'src/assets/lib/bower_components/bootstrap-switch/dist/js/bootstrap-switch.js',
            'src/assets/lib/bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.js',
            'src/assets/lib/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'src/assets/lib/bower_components/angular-input-masks/angular-input-masks-standalone.js',
            'src/assets/lib/bower_components/icheck/icheck.min.js',
            'src/assets/lib/bower_components/blockUI/jquery.blockUI.js',
            'src/assets/lib/bower_components/jquery-slimscroll/jquery.slimscroll.js',
            'src/assets/lib/bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
            'src/assets/lib/bower_components/angular-sanitize/angular-sanitize.js',
            'src/assets/lib/bower_components/angular-ui-router/release/angular-ui-router.js',
            'src/assets/lib/bower_components/Caret.js/dist/jquery.caret.min.js',
            'src/assets/lib/bower_components/jquery.atwho/dist/js/jquery.atwho.js',
            'src/assets/lib/bower_components/checklist-model/checklist-model.js',
            'src/assets/lib/bower_components/angular-ui-grid/ui-grid.js',
            'src/assets/lib/bower_components/jquery-ui/jquery-ui.js',
            'src/assets/lib/bower_components/angular-ui-sortable/sortable.js',
            'src/assets/lib/bower_components/angular-bootstrap-confirm/dist/angular-bootstrap-confirm.js',
            'src/assets/lib/bower_components/jquery.tagsinput/src/jquery.tagsinput.js',
            'src/assets/lib/bower_components/highcharts-ng/dist/highcharts-ng.js',
            'src/assets/lib/bower_components/highcharts/highcharts.js',
            'src/assets/lib/bower_components/highcharts/highcharts-more.js',
            'src/assets/lib/bower_components/highcharts/modules/exporting.js',
            'src/assets/lib/bower_components/flow.js/dist/flow.js',
            'src/assets/lib/bower_components/ng-flow/dist/ng-flow.js',
            'src/assets/lib/bower_components/angular-deckgrid/angular-deckgrid.js',
            'src/assets/lib/bower_components/angular-gravatar/build/angular-gravatar.js',
            'src/assets/lib/bower_components/angular-breadcrumb/release/angular-breadcrumb.js',
            'src/assets/lib/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
            'src/assets/lib/bower_components/angular-fcsa-number/src/fcsaNumber.js',
            'src/assets/lib/bower_components/angular-ui-select/dist/select.js',
            'src/assets/lib/bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
            'src/assets/lib/bower_components/angular-mocks/angular-mocks.js',
            // endbower

            'src/app/constants.js',
            'src/app/app.js',
            'src/app/**/*.js'
        ],

        preprocessors: {
            'src/apps/**/!(*.test|*.mock|*.spec)+(*.js)': ['coverage']
        },

        coverageReporter: {
            reporters: [
                { type: 'text-summary' },
                { type: 'html', dir: 'coverage' }
            ]
        },

        reporters: ['progress', 'coverage'],
        colors: true


    };

    config.set(configuration);
};

}());
