/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var display = gl2d.import("display");
    var DisplayObjectContainer = display.DisplayObjectContainer;

    function Stage() {
        DisplayObjectContainer.call( this );

        this._stage = this;
    }

    var p = gl2d.extend( Stage, DisplayObjectContainer );

    p.update = function ( ms ) {
        this.render();
    };

    display.Stage = Stage;

})();