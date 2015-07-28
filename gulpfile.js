/**
 * @author Bilal Cinarli
 */

'use strict';

// Include gulp
var gulp = require('gulp'),
    pkg = require('./package.json');

// Include Our Plugins
var sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

var paths = {
    "tranzit": "styles-sass/tranzit/**/*.scss",
    "page": ["styles-sass/**/*.scss", "!styles-sass/tranzit/**/*.scss"]
};

var fileNames = {
    "page"   : "page.css",
    "tranzit": "tranzit.css"
};

// Compile Transit Styles
gulp.task('tranzit', function() {
    return gulp.src(paths.tranzit)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('styles'))
        .pipe(sass())
        .pipe(rename(fileNames.tranzit))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('styles'));
});

// Compile Page Styles
gulp.task('page', function() {
    return gulp.src(paths.page)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('styles'))
        .pipe(sass())
        .pipe(rename(fileNames.page))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('styles'));
});

/*gulp.task('browser-sync', function() {
 browserSync.init({
 proxy    : 'http://os/htmlmag/',
 files    : ['app/assets/styles/*.css', 'app/assets/scripts/<%= pkg.name %>.min.js', 'app/assets/images/*'],
 watchTask: true
 });
 });*/

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.page, ["page"]);
    gulp.watch(paths.tranzit, ["tranzit"]);
});

// Default Task
gulp.task('default', ['watch', 'tranzit', "page"]);