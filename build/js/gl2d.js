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

    p.assert = function( assertion, message ){

        if( assertion == false )
            throw new Error( "[Assertion ERROR]:" + message );
    };

    global.gl2d = p;

})( this );
/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var event = gl2d.import("event");

    function EventDispatcher() {
        this._listeners = {};
    }

    EventDispatcher.prototype = {
        constructor: EventDispatcher,

        addEventListener: function( type, listener ){

            if( !this._listeners[type] )
                this._listeners[ type ] = [];

            var l = this._listeners[ type ];
            var index = l.indexOf( listener );

            if( index != -1 ) return;

            l.push( listener );
        },

        removeEventListener: function (type, listener) {

            if( !this.hasEventListener(type) ) return;

            var l = this._listeners[type];
            var index = l.indexOf( listener );

            if( index == -1 ) return;

            l[ index ] = null;
        },

        hasEventListener: function (type) {

            if( !this._listeners[type] || this._listeners[type].length == 0 )
                return false;

            return true;
        },

        dispatchEvent: function (e) {

            if(!this._listeners[e.type]) return;

            e.currentTarget = this;

            var a = this._listeners[e.type];
            var n = 0;
            var listener;

            for (var i = 0, len = a.length; i < len; ++i) {

                if( a[i] == null ) continue;

                listener = a[i];
                listener(e);

                if( i != n ) a[n] = listener;

                ++n;
            }

            for ( len = a.length; i < len; ) {
                a[n++] = a[i++];
            }

            a.length = n;
        },
    };

    var p = EventDispatcher.prototype;

    p.on = p.addEventListener;
    p.off = p.removeEventListener;
    p.fire = p.dispatchEvent;

    event.EventDispatcher = EventDispatcher;

})();
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

    function DisplayObject() {

        this._transformChanged = true;

        this._x = 0;
        this._y = 0;
        this._scaleX = 1.0;
        this._scaleY = 1.0;
        this._radian = 0.0;
        this._parent = null;
        this._stage = null;

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
                }
            },
        });
    }

    var p = gl2d.extend( DisplayObject, EventDispatcher );

    p.render = function(){

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
        child._stage = this.stage;

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

        this._children = [];

        this.bindingUpdate = this.update.bind(this);
        this.update(0);
    }

    Ticker.prototype = {
        constructor: Ticker,

        update: function ( ms ) {
            this.id = requestAnimationFrame( this.bindingUpdate );

            var len = this._children.length;
            if( len == 0 ) return;

            var n = 0, o;

            for (var i = 0; i < len; ++i) {

                if( this._children[i] == null ) continue;

                o = this._children[i];
                if( i != n ) this._children[n] = o;

                ++n;
            }
        },
    };

    util.Ticker = Ticker;

})();