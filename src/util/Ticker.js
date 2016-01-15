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