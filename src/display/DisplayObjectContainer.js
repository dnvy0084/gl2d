/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var display = gl2d.import("display");
    var DisplayObject = display.DisplayObject;

    function DisplayObjectContainer() {
        DisplayObject.call( this );

        this._children = [];
    }

    var p = gl2d.extend( DisplayObjectContainer, DisplayObject );

    p.addChild = function (child) {

        var index = this._children.indexOf( child );
        if(index != -1) return null;


    };

    p.addChildAt = function ( child, index ) {

    };

    display.DisplayObjectContainer = DisplayObjectContainer;

})();