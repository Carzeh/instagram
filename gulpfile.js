var gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    es = require('event-stream');

var paths = {
    sass: [
        './bower_components/foundation/scss/**/*.scss',
        './app/public/stylesheets/style.scss'
    ]
};

gulp.task('default', ['watch']);

gulp.task('build', ['css']);

gulp.task('css', function() {
    var appFiles = gulp.src(paths.sass)
        .pipe(sass({ style: 'compressed' }).on('error', gutil.log));

    return es.concat(appFiles)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./app/public/stylesheets/'))
        .on('error', gutil.log);
});

//gulp.task('clean-css', function() {
//    return gulp.src('./public/css', { read: false })
//        .pipe(clean());
//});
//
//gulp.task('clean', function() {
//    return gulp.src('./public/', { read: false })
//        .pipe(clean({ force: true }));
//});

//gulp.task('watch', ['build'], function() {
//    gulp.watch(paths.sassDir, ['css']);
//});
