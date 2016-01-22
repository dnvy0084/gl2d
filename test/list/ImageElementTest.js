/****************
 * ImageElementTest.js
 *****************/

(function () {

    "use strict";

    var c = gl2d.import("test.list");
    var asset = gl2d.import("asset");
    var ImageAsset = asset.ImageAsset;
    var tex = gl2d.import("texture");
    var Texture = tex.Texture;
    var context;

    function ImageElementTest() {
        c.BaseCase.call( this );
    }

    var p = gl2d.extend(ImageElementTest, c.BaseCase);

    p.start = function () {

        this.setTitle( 'Image element test' );

        var a = [];
        var tex = new Texture();

        for (var i = 1; i <= 13; i++) {
            if( i == 9 ) continue;
            a.push( "img/icons/" + i + ".png" );
        }

        ImageAsset.loadAssets(a, function( assets ){

            for (var i = 0; i < assets.length; i++) {

                if( assets[i].img.width == 0 || assets[i].img.height == 0 ) continue;

                tex.add( assets[i].src, assets[i].img );
            }

            document.body.appendChild(tex.canvas);

            var gl = this.stage.gl;

            var texture = gl.createTexture();

            gl.bindTexture( gl.TEXTURE_2D, texture );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
            gl.texImage2D(
                gl.TEXTURE_2D,
                1,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                tex.canvas
            );

        }.bind(this));
    };

    p.clear = function () {

    };

    c.ImageElementTest = ImageElementTest;

})();

