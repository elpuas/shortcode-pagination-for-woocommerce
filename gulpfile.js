// $ sudo npm install gulp gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-notify gulp-zip
// $ gulp

// Project Specific

var plugin_filename = 'jck-woo-shortcode-pagination',
    plugin_zip_name = plugin_filename+'.zip',
    plugin_main_file = plugin_filename+'.php';


// load plugins

var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    jshint          = require('gulp-jshint'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    zip             = require('gulp-zip');

var paths = {
    frontend_scripts: ['source/frontend/js/**/*.js'],
    frontend_styles: ['source/frontend/scss/**/*.scss'],
    admin_scripts: ['source/admin/js/**/*.js'],
    admin_styles: ['source/admin/scss/**/*.scss'],
    src: ['inc/**/*', 'templates/**/*', 'assets/**/*', 'languages/**/*', 'ReadMe.txt', plugin_main_file],
    cc_src: ['**/*']
};

var deps = {
    // 'src' : 'dest'

    'vendor/jamesckemp/iconic-dashboard/class-dashboard.php' : 'inc/admin/vendor'

};

/**	=============================
    *
    * Tasks
    *
    ============================= */

	gulp.task('frontend_scripts', function() {

        return gulp.src(paths.frontend_scripts)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('main.js'))
            .pipe(gulp.dest('assets/frontend/js'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('assets/frontend/js'))
            .pipe(notify({ message: 'Frontend scripts task complete' }));

	});

	gulp.task('frontend_styles', function() {

        return gulp.src(paths.frontend_styles)
            .pipe(sass({outputStyle: 'expanded'}))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest('assets/frontend/css'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifycss())
            .pipe(gulp.dest('assets/frontend/css'))
            .pipe(notify({ message: 'Frontend styles task complete' }));

	});

	gulp.task('admin_scripts', function() {

        return gulp.src(paths.admin_scripts)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('main.js'))
            .pipe(gulp.dest('assets/admin/js'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('assets/admin/js'))
            .pipe(notify({ message: 'Frontend scripts task complete' }));

	});

	gulp.task('admin_styles', function() {

        return gulp.src(paths.admin_styles)
            .pipe(sass({outputStyle: 'expanded'}))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest('assets/admin/css'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifycss())
            .pipe(gulp.dest('assets/admin/css'))
            .pipe(notify({ message: 'Admin styles task complete' }));

	});

	// Rerun the task when a file changes
	gulp.task('watch', function () {

        gulp.watch(paths.frontend_scripts, ['frontend_scripts']);
        gulp.watch(paths.frontend_styles, ['frontend_styles']);
        gulp.watch(paths.admin_scripts, ['admin_scripts']);
        gulp.watch(paths.admin_styles, ['admin_styles']);

	});

	/**
     * Move components
     */
    gulp.task('deps', function() {

        for (var key in deps) {
            gulp.src( key )
                .pipe( gulp.dest( deps[key] ) );
        }

    });

	// The default task (called when you run `gulp` from cli)
	gulp.task('default', ['watch']);

/**	=============================
    *
    * Compile for CodeCanyon
    *
    ============================= */

    // Run to compile plugin zip
    gulp.task('move_to_trunk', function () {

        return gulp.src(paths.src, {base: "."})
            .pipe( gulp.dest('svn/trunk') )
            .pipe( notify({ message: 'Plugin moved to trunk' }) );

    });

	// RUN THIS TO COMPILE FOR CC (gulp compile)
	gulp.task('compile', ['deps', 'move_to_trunk']);