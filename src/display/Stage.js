/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var display = gl2d.import("display");
    var DisplayObjectContainer = display.DisplayObjectContainer;
    var gl;

    function Stage( canvas ) {

        DisplayObjectContainer.call( this );

        Object.defineProperties( this, {

            "stageWidth": {
                get: function () {

                    if( !gl ) return 0;

                    return gl.canvas.width;
                }
            },

            "stageHeight": {
                get: function () {

                    if( !gl ) return 0;

                    return gl.canvas.height;
                }
            },

            "gl": {
                get: function () {
                    return gl;
                }
            },
        });

        if( typeof canvas == "string" )
            gl = document.getElementById( canvas ).getContext( "webgl" )
        else
            gl = canvas.getContext( "webgl" );

        gl2d.assert( gl, "Cannot find canvas element" );

        this._stage = this;
        this.bindingUpdate = this.update.bind(this);
        this.update();
    }

    var p = gl2d.extend( Stage, DisplayObjectContainer );

    p.update = function ( ms ) {

        requestAnimationFrame( this.bindingUpdate );
        this.render();
    };

    display.Stage = Stage;

})();