/**
 * Created by dnvy0084 on 16. 1. 15..
 */

var gulp = require( "gulp" );
var del = require( "del" );
var concat = require( "gulp-concat" );

var paths = {
    src: [
        "src/init.js",
        "src/geom/*.js",
        "src/display/*.js",
        "src/**/*.js"
    ]
};

gulp.task( "del", function(){
    return del( [ "build/js" ] );
});

gulp.task( "concat", function(){
    return gulp.src(paths.src)
        .pipe( concat( "gl2d.js" ))
        .pipe( gulp.dest("build/js") );
});

gulp.task("watch", function(){
    gulp.watch( paths.src, [ "del", "concat"] );
});

gulp.task( "default", ["del", "concat"]);