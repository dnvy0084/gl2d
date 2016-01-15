/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var display = gl2d.import("display");
    var DisplayObjectContainer = display.DisplayObjectContainer;

    function Stage() {

        DisplayObjectContainer.call( this );
    }

    var p = gl2d.extend( Stage, DisplayObjectContainer );

    display.Stage = Stage;

})();