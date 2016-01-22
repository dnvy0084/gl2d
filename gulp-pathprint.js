/****************
 * gulp-pathprint.js
 *****************/

var through = require( "through2" );
var gutil = require( "gulp-util" );
var PluginError = gutil.PluginError;

const PLUGIN_NAME = "gulp-pathprint";

function print(){

    var stream = through.obj( function( file, enc, cb ){

        var path = file.history[0];
        var match = path.match( /[^\\]+/g);
        var index = match.indexOf( "_workspace(gl2d)") + 1;
        var src = match.splice( index, match.length - index ).join( "/" );

        console.log( '<script type="text/javascript" src="../' + src + '"></script>' );

        cb();
    });

    return stream;
}

module.exports = print;