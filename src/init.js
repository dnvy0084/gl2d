/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function ( global ) {

    "use strict";

    var p = global.gl2d || {};

    p.extend = function ( child, parent ) {

        child.prototype = Object.create( parent.prototype );
        child.constructor = child;

        return child.prototype;
    };

    p.import = function ( path ) {
        return this._find( path.split("."), this );
    };

    p._find = function (a, o) {

        if(a.length <= 0 ) return o;

        var name = a.shift();

        if(!o[name]) o[name] = {};

        return this._find( a, o[name] );
    };

    global.gl2d = p;

})( this );