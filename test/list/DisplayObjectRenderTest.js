/****************
 * DisplayObjectRenderTest.js
 *****************/

(function () {

    "use strict";

    var display = gl2d.import("display");
    var DisplayObject = display.DisplayObject;
    var list = gl2d.import("test.list");
    var BaseCase = list.BaseCase;

    function DisplayObjectRenderTest() {
        BaseCase.call(this);
    }

    var p = gl2d.extend( DisplayObjectRenderTest, BaseCase );

    p.start = function () {

        this.setTitle( "displayObject render test" );

        var o = new DisplayObject();
        o.name = "a";

        this.addChild(o);
    };

    p.clear = function () {

    };

    list.DisplayObjectRenderTest = DisplayObjectRenderTest;

})();

