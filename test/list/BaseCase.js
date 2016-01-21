/****************
 * BaseCase.js
 *****************/

(function () {

    "use strict";

    var event = gl2d.import("event");
    var EventDispatcher = event.EventDispatcher;
    var display = gl2d.import("display");
    var DisplayObjectContainer = display.DisplayObjectContainer;
    var list = gl2d.import("test.list");

    BaseCase.title = null;
    BaseCase.MISSING_TITLE = "missingTitleElement";

    function BaseCase() {

        DisplayObjectContainer.call( this );
    }

    var p = gl2d.extend( BaseCase, DisplayObjectContainer );

    p.start = function () {

        console.log( "call start, must be overwritten" );
    };

    p.clear = function () {

        console.log( "call clear, must be overwritten" );
    };

    p.setTitle = function (title) {

        if( BaseCase.title == null )
        {
            this.dispatchEvent( { type: BaseCase.MISSING_TITLE } );
            return;
        }

        BaseCase.title.innerHTML = title;
    };

    list.BaseCase = BaseCase;

})();

