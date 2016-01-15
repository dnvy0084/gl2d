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