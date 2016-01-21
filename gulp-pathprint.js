/****************
 * gulp-pathprint.js
 *****************/

var through = require( "through2" );
var gutil = require( "gulp-util" );
var PluginError = gutil.PluginError;

const PLUGIN_NAME = "gulp-pathprint";

function print(){

    var stream = through.obj( function( file, enc, cb ){

        console.log( file.history[0].replace( /\\/g, "\/" ) );

        cb();
    });

    return stream;
}

module.exports = print;