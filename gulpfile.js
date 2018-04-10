var gulp=require('gulp'),
    browserSync= require('browser-sync'),
    uglify = require('gulp-uglify'),
    cleanCSS= require('gulp-clean-css'),
    imagemin= require('gulp-imagemin');




gulp.task('default',['browser','minJS','minify-css','imagenes']);



gulp.task('minJS', function(){
    return gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('js/app.min.js'))
});



gulp.task('minify-css', function(){
    return gulp.src('css/estilos.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('css/estilos.min.css'))
});



gulp.task('browser', function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});



gulp.task('imagenes', function(){
    return gulp.src('assets/images/**/*')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced:true }
        ))
        .pipe(gulp.dest('assets/images/img-min'));
});



gulp.watch('js/**/*.js').on('change',function(){
    return gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('js/app.min.js'))
});


gulp.watch(['index.html','js/app.js']).on('change',function(){
    browserSync.reload(
    );
})

gulp.watch('css/**/*.css').on('change',function(){
    return gulp.src('css/estilos.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('css/estilos.min.css'))
});

//gulp.watch('assets/images/**/*').on('change',function(){
//return gulp.src('assets/images/**/*')
//    .pipe(imagemin())
//    .pipe(gulp.dest('assets/images/img-min'))

//});
