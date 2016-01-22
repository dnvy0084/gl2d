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
        this._refCount = 0;

        this.leftNode = null;
        this.rightNode = null;
        this.onClear = null;

        this.key = "";

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


            "refCount": {
                get: function () {
                    return this._refCount;
                },
                set: function (value) {
                    this._refCount = value;

                    if( this._refCount <= 0 ) {
                        this._refCount = 0;
                        this._clear();
                    }
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

            if( this.onClear ) this.onClear( this );
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