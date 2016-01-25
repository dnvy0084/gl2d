/****************
 * Texture.js
 *****************/

(function () {

    "use strict";

    var tex = gl2d.import("texture");
    var gl;


    /************************************************************
     *
     * @Texture Class
     *
     ************************************************************/

    function Texture() {

    }

    Texture.prototype = {
        constructor: Texture,


    };




    /************************************************************
     *
     * @TextureMap static methods
     *
     ************************************************************/

    var textures = [];

    TextureMap.init = function (webglRenderingContext) {
        gl = webglRenderingContext;
    };

    TextureMap.add = function( key, img ){

        var node;

        for (var i = 0; !node; i++) {

            textures[i] = textures[i] || new TextureMap();

            node = textures[i].add( key, img );
            node.map = textures[i];
        }

        return node;
    };

    TextureMap.getMapArray = function(){
        return textures;
    };

    TextureMap.getMapAt = function (index) {
        return textures[i];
    };

    TextureMap.getNumMaps = function () {
        return textures.length;
    };



    /************************************************************
     *
     * @TextureMap Class
     *
     ************************************************************/

    function TextureMap( w/*=2048*/, h/*=2048*/ ) {

        w = w || 2048;
        h = h || 2048;

        gl2d.assert( w >= 32 && ( w & ( w - 1 ) ) == 0, "width value is not pow of 2" );
        gl2d.assert( h >= 32 && ( h & ( h - 1 ) ) == 0, "height value is not pow of 2" );

        this._root = new tex.Node( 0, 0, w, h );
        this._context = document.createElement( "canvas" ).getContext( "2d" );
        this._context.canvas.width = w;
        this._context.canvas.height = h;
        this._nodeMap = {};

        this.nodeClear = this.onNodeClear.bind(this);

        Object.defineProperties( this, {
            "width": {
                get: function () {
                    return w;
                }
            },

            "height": {
                get: function () {
                    return h;
                }
            },

            "root": {
                get: function () {
                    return this._root;
                }
            },

            "context": {
                get: function () {
                    return this._context;
                }
            },

            "canvas": {
                get: function () {
                    return this._context.canvas;
                }
            },
        });
    }

    TextureMap.prototype = {
        constructor: TextureMap,

        add: function ( key, img ) {

            if( this.contains(key) )
                return this._nodeMap[key];

            var node = this._root.add( img.width, img.height );

            if( node )
            {
                node.key = key;
                node.onClear = this.nodeClear;
                this.draw( node, img );

                this._nodeMap[key] = node;
            }

            return node;
        },

        draw: function (node, img) {

            this._context.drawImage(
                img,
                0, 0, img.width, img.height,
                node.x, node.y, node.width, node.height
            );
        },

        onNodeClear: function ( node ) {

        },

        contains: function (key) {
            return !!this._nodeMap[key];
        },
    };

    tex.Texture = Texture;
    tex.TextureMap = TextureMap;

})();

