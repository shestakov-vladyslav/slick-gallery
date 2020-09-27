let gulp = require('gulp');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let terser = require('gulp-terser');
let autoprefixer = require('gulp-autoprefixer');
let watch = require('gulp-watch');
let browserSync = require('browser-sync').create();
let stripCssComments = require('gulp-strip-css-comments');

gulp.task('style', function () {
    return gulp.src('*.scss')
        .pipe(stripCssComments())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src('slick-gallery.js')
    .pipe(terser({
        mangle: false,
        safari10: true
    }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('.'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    browserSync.init();
    gulp.watch('./**/*.scss', gulp.series('style'));
    gulp.watch("slick-gallery.js").on('change', gulp.series('js'));
});

gulp.task('default', gulp.parallel('watch', 'style', 'js'));