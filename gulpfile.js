const gulp = require('gulp');

/* --- compress --- */
const gulpClean = require('gulp-clean');
const gulpHtmlmin = require('gulp-htmlmin');
const gulpCleanCss = require('gulp-clean-css');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
gulp.task('clean', () => {      
    return gulp.src('public/*', { read: false })
        .pipe(gulpClean());      
});
gulp.task('minify-html', () => {
    return gulp
    .src('src/html/*.html')
    // .pipe(gulpHtmlmin())
    .pipe(gulpHtmlmin({
        collapseWhitespace: true,
        removeComments: true,
    }))
    .pipe(gulpRename({
        // dirname: 'dirname',
        // basename: 'basename',
        // prefix: 'prefix.',
        suffix: '.min',
        // extname: '.extname'
    }))
    .pipe(gulp.dest('public/html'));
});
gulp.task('minify-css', () => {
    return gulp
    .src('src/css/*.css')
    // .pipe(gulpCleanCss())
    .pipe(gulpCleanCss({
        // compatibility: 'ie8', 
        level: 2,
    }))
    .pipe(gulpRename({
        // dirname: 'dirname',
        // basename: 'basename',
        // prefix: 'prefix.',
        suffix: '.min',
        // extname: '.extname'
    }))
    .pipe(gulp.dest('public/css'));
});
gulp.task('minify-js', () => {
    return gulp
    .src('src/js/*.js')
    // .pipe(gulpUglify())
    .pipe(gulpUglify({
        compress: {
            drop_console: true,
        },
    }))
    .pipe(gulpRename({
        // dirname: 'dirname',
        // basename: 'basename',
        // prefix: 'prefix.',
        suffix: '.min',
        // extname: '.extname'
    }))
    .pipe(gulp.dest('public/js'));
});
gulp.task('clean', gulp.parallel('clean'));
gulp.task('minify', gulp.parallel('minify-html', 'minify-css', 'minify-js'));

/* --- scss --- */
const gulpSass = require('gulp-sass')(require('sass'));
gulp.task('minify-scss', () => {
    return gulp
    .src('src/scss/*.scss')
    .pipe(gulpSass.sync().on('error', gulpSass.logError))
    .pipe(gulpCleanCss())
    .pipe(gulpRename({
        // dirname: 'dirname',
        // basename: 'basename',
        // prefix: 'prefix.',
        suffix: '.min',
        // extname: '.extname'
    }))
    .pipe(gulp.dest('public/scss'));
});
gulp.task('scss', gulp.parallel('minify-scss'));

/* --- connect --- */
const connect = require('gulp-connect');
gulp.task('connect', () => {
    connect.server({
        root: 'src/app', 
        livereload: true,
        port: 3000,
        index: 'index.html',
        // index: 'channel.html',
    });
});
gulp.task('html', function (done) {
    console.log('gulp.task(html)');
    gulp.src('src/app/*.html')
        .pipe(connect.reload());
    done();
});
// gulp.task('watch', function () {
//     gulp.watch('src/app/*.html', gulp.series('html'));
// });