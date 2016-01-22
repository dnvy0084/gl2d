/****************
 * Texture.js
 *****************/

(function () {

    "use strict";

    var tex = gl2d.import("texture");

    function Texture( w/*=2048*/, h/*=2048*/ ) {

        w = w || 2048;
        h = h || 2048;

        gl2d.assert( w >= 32 && ( w & ( w - 1 ) ) == 0, "width value is not pow of 2" );
        gl2d.assert( h >= 32 && ( h & ( h - 1 ) ) == 0, "height value is not pow of 2" );

        this._root = new tex.Node( 0, 0, w, h );

        Object.defineProperties( this, {
            "width": {
                get: function () {
                    return w;
                }
            },

            "height": {
                get: function () {
                    return h;
                }
            },

            "root": {
                get: function () {
                    return this._root;
                }
            },
        });
    }

    Texture.prototype = {
        constructor: Texture,

        add: function () {

        },
    };

    tex.Texture = Texture;

})();

