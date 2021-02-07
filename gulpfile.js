const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const browserSync = require('browser-sync').create()

gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream())
});

gulp.task('pug', () => {
    return gulp.src('./src/pug/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./public'))
});

gulp.task('default', () => {
    gulp.watch('src/pug/*.pug', gulp.series('pug'))
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('public/**/*.html').on('change', browserSync.reload)
    browserSync.init({
        server: {
            baseDir: './public'
        }
    })
});