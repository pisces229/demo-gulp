const gulp = require('gulp');

/* --- compress --- */
const gulpClean = require('gulp-clean');
const gulpHtmlmin = require('gulp-htmlmin');
const gulpCleanCss = require('gulp-clean-css');
const gulpUglify = require('gulp-uglify');
gulp.task('clean', () => {      
    return gulp.src('public/*', { read: false })
        .pipe(gulpClean());      
});
gulp.task('minify-html', () => {
    return gulp
    .src('src/html/*.html')
    .pipe(gulpHtmlmin())
    // .pipe(gulpHtmlmin({ 
    //     collapseWhitespace: true, 
    //     removeComments: true 
    // }))
    .pipe(gulp.dest('public/html'));
});
gulp.task('minify-css', () => {
    return gulp
    .src('src/css/*.css')
    .pipe(gulpCleanCss())
    // .pipe(gulpCleanCss({ 
    //     compatibility: 'ie8', 
    //     level: 2 
    // }))
    .pipe(gulp.dest('public/css'));
});
gulp.task('minify-js', () => {
    return gulp
    .src('src/js/*.js')
    .pipe(gulpUglify())
    // .pipe(gulpUglify({
    //     compress: {
    //         drop_console: true,
    //     },
    // }))
    .pipe(gulp.dest('public/js'));
});
gulp.task('clean', gulp.parallel('clean'));
gulp.task('minify', gulp.parallel('minify-html', 'minify-css', 'minify-js'));

/* --- connect --- */
const connect = require('gulp-connect');
gulp.task('connect', () => {
    connect.server({
        root: 'src/app', 
        livereload: true,
        port: 3000,
        // index: 'index.html',
        index: 'channel.html',
    });
});
gulp.task('html', () => {
    gulp.src('./src/app/*.html')
        .pipe(gulp.dest('./src/app'))
        .pipe(connect.reload());
});
gulp.task('watch', () => {
    // gulp.watch(['./src/app/*.html'], gulp.parallel('html'));
    gulp.watch(['./src/app/*.html'], gulp.series('html'));
});