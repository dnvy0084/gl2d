/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var display = gl2d.import("display");
    var event = gl2d.import("event");
    var EventDispatcher = event.EventDispatcher;

    var ANG = 180 / Math.PI;
    var RAD = Math.PI / 180;
    var instanceCount = 0;
    var $event = { type: "enterframe" };
    var gl;

    function DisplayObject() {

        EventDispatcher.call( this );

        this._vertices = new Float32Array(4);
        this._transformChanged = true;

        this._x = 0;
        this._y = 0;
        this._scaleX = 1.0;
        this._scaleY = 1.0;
        this._radian = 0.0;
        this._parent = null;
        this._stage = null;
        this._node = null;

        this.name = "Instance" + (instanceCount++);

        Object.defineProperties( this, {
            "x": {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    if(this._x == value) return;
                    this._x = value;
                    this._transformChanged = true;
                }
            },

            "y": {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    if( this._y == value ) return;
                    this._y = value;
                    this._transformChanged = true;
                }
            },

            "scaleX": {
                get: function () {
                    return this._scaleX;
                },
                set: function (value) {
                    if(this._scaleX == value) return;
                    this._scaleX = value;
                    this._transformChanged = true;
                }
            },

            "scaleY": {
                get: function () {
                    return this._scaleY;
                },
                set: function (value) {
                    if(this._scaleY == value) return;
                    this._scaleY = value;
                    this._transformChanged = true;
                }
            },

            "radian": {
                get: function () {
                    return this._radian
                },
                set: function (value) {
                    if(this._radian == value) return;
                    this._radian = value;
                    this._transformChanged = true;
                }
            },

            "rotation": {
                get: function () {
                    return this.radian * ANG;
                },
                set: function (value) {
                    this.radian = value * RAD;
                }
            },

            "parent": {
                get: function () {
                    return this._parent;
                }
            },

            "stage": {
                get: function () {
                    return this._stage;
                },
                set: function( value ){
                    if( value == null ) return;

                    this._stage = value;
                    gl = this._stage.gl;
                }
            },

            "vertices": {
                get: function () {
                    return this._vertices;
                }
            },

            "image": {
                get: function () {
                    return this._image;
                },
                set: function (value) {

                    if( this._node )
                        --this._node.refCount;

                    this._image = value;
                }
            },
        });
    }

    var p = gl2d.extend( DisplayObject, EventDispatcher );

    p.render = function(){
        this.dispatchEvent( $event );


    };

    display.DisplayObject = DisplayObject;

})();