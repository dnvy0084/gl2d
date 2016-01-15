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
/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var display = gl2d.import("display");

    var ANG = 180 / Math.PI;
    var RAD = Math.PI / 180;

    function DisplayObject() {

        this._transformChanged = true;

        this._x = 0;
        this._y = 0;
        this._scaleX = 1.0;
        this._scaleY = 1.0;
        this._radian = 0.0;

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
        });
    }

    DisplayObject.prototype = {
        constructor: DisplayObject,

    };

    display.DisplayObject = DisplayObject;

})();
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
/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var tex = gl2d.import( "texture" );

    function Node( x, y, w, h ) {

        this._setTo(x, y, w, h);
        this._occupied = false;
        this._parent = null;

        this.leftNode = null;
        this.rightNode = null;

        Object.defineProperties( this, {

            "x": {
                get: function () {
                    return this._x;
                }
            },

            "y": {
                get: function () {
                    return this._y;
                }
            },

            "width": {
                get: function () {
                    return this._w;
                }
            },

            "height": {
                get: function () {
                    return this._h;
                }
            },

            "parent": {
                get: function () {
                    return this._parent;
                }
            },

            "occupied": {
                get: function () {
                    return this._occupied;
                }
            },
        });
    }

    Node.prototype = {
        constructor: Node,

        _setTo: function (x, y, w, h) {
            this._x = x;
            this._y = y;
            this._w = w;
            this._h = h;
        },

        add: function ( w, h ) {

            if( w > this._w || h > this._h || this._occupied )
                return null;

            if( this.leftNode )
                return this.leftNode.add( w, h ) || this.rightNode.add( w, h );

            if( w == this._w && h == this._h )
            {
                this._occupied = true;
                return this;
            }

            if( this._w - w < this._h - h )
            {
                this.leftNode = new Node( this._x, this._y, this._w, h );
                this.rightNode = new Node( this._x, this._y + h, this._w, this._h - h );
            }
            else
            {
                this.leftNode = new Node( this._x, this._y, w, this._h );
                this.rightNode = new Node( this._x + w, this._y, this._w - w, this._h );
            }

            this.leftNode._parent =
            this.rightNode._parent = this;

            return this.leftNode.add( w, h );
        },

        remove: function (node) {

            if( node != this )
            {
                if( !this.leftNode ) return false;

                return this.leftNode.remove(node) || this.rightNode.remove(node);
            }

            this._clear();
            this._parent._clear();
            this._parent = null;

            return true;
        },

        _clear: function () {

            this._occupied = false;

            if( !this.leftNode ) return;

            if( !this.leftNode._occupied && !this.rightNode._occupied )
                this.leftNode = this.rightNode = null;
        },

        draw: function (context) {

            if( this.leftNode ){
                this.leftNode.draw( context );
                this.rightNode.draw( context );
            }

            if( !this._occupied ) return;

            var n = parseInt( 0xffffff * Math.random() ).toString(16);

            context.fillStyle = "#" + this.zfill( n, 6 );
            context.fillRect( this._x, this._y, this._w, this._h );
         },

        zfill: function (value, digit ) {

            if( value.toString().length >= digit )
                return value;

            return this.zfill( "0" + value, digit );
        },
    };

    tex.Node = Node;

})();
/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var util = gl2d.import("util");

    function Ticker() {

    }

    Ticker.prototype = {
        constructor: Ticker,
    };

    util.Ticker = Ticker;

})();