/****************
 * ImageAsset.js
 *****************/

(function () {

    "use strict";

    var asset = gl2d.import("asset");
    var event = gl2d.import("event");
    var EventDispatcher = event.EventDispatcher;

    ImageAsset.COMPLETE = "complete";
    ImageAsset.FAIL = "fail";

    ImageAsset.loadAssets = function( srcVector, cb ){

        var a = [], img, n = 0;

        function complete(e){
            if( ++n >= srcVector.length ) cb(a);
        }

        for (var i = 0; i < srcVector.length; i++) {

            img = new ImageAsset();
            a.push( img );

            img.addEventListener( "complete", complete );
            img.addEventListener( "fail", complete );
        }

        for (i = 0; i < a.length; i++) {
            a[i].src = srcVector[i];
        }
    }

    function ImageAsset( src /* = null*/ ) {
        EventDispatcher.call( this );

        this._src = null;

        this.bindEvents();

        Object.defineProperties( this, {

            "src": {
                get: function () {
                    return this._src;
                },
                set: function (value) {
                    this._src = value;

                    if( this._img )
                        this.disposeImage();

                    this._img = document.createElement( "img" );
                    this._img.addEventListener( "load", this.imageComplete );
                    this._img.addEventListener( "error", this.imageError );
                    this._img.src = this._src;
                }
            },

            "img": {
                get: function () {
                    return this._img;
                }
            },
        });

        if( src ) this.src = src;
    }

    var p = gl2d.extend( ImageAsset, EventDispatcher );


    p.disposeImage = function () {

        if( !this._img ) return;

        this._img.removeEventListener( "complete", this.imageComplete );
    };
    

    p.bindEvents = function () {
        this.imageComplete = this.onImageComplete.bind(this);
        this.imageError = this.onImageError.bind(this);
    };

    p.onImageComplete = function (e) {
        this.complete = true;
        this.dispatchEvent( { type: ImageAsset.COMPLETE } );
    };

    p.onImageError = function (e) {
        this.complete = false;
        this.dispatchEvent( { type: ImageAsset.FAIL } );
    };

    asset.ImageAsset = ImageAsset;

})();

