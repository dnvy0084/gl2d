/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var display = gl2d.import("display");
    var DisplayObject = display.DisplayObject;
    var $event = { type: "enterframe" };

    function DisplayObjectContainer() {
        DisplayObject.call( this );

        this._children = [];

        Object.defineProperties( this, {

            "numChildren": {
                get: function () {
                    return this._children.length;
                }
            },
        });
    }

    var p = gl2d.extend( DisplayObjectContainer, DisplayObject );


    p.render = function () {

        this.dispatchEvent( $event );

        for (var i = 0, l = this._children.length; i < l; i++) {

            this._children[i].render();
        }
    };
    

    p.addChild = function (child) {

        var index = this._children.indexOf( child );
        if(index != -1) return null;

        return this.addChildAt( child, this._children.length );
    };

    p.addChildAt = function ( child, index ) {

        gl2d.assert(
            index >= 0 || index <= this._children.length,
            "wrong index cannot addChildAt"
        );

        this._children.splice( index, 0, child );
        child._parent = this;
        child.stage = this.stage;

        return child;
    };


    p.removeChild = function (child) {

        var index = this._children.indexOf(child);

        if( index == -1 ) return null;

        return this.removeChildAt( index );
    };

    p.removeChildAt = function (index) {

        gl2d.assert(
            index >= 0 || index <= this._children.length,
            "wrong index, cannot removeChildAt"
        );

        var child = this._children.splice( index, 1 )[0]
        child._parent = null;
        child._stage = null;

        return child;
    };


    p.contains = function (child) {
        return this._children.indexOf( child ) != -1;
    };

    p.getChildAt = function ( index ) {

        return this._children[index];
    };

    p.getChildByName = function (name) {

        for (var i = 0; i < this._children.length; i++) {
            if( this._children[i].name == name )
                return this._children[i];
        }

        return null;
    };



    display.DisplayObjectContainer = DisplayObjectContainer;

})();