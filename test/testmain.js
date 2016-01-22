/**
 * Created by dnvy0084 on 16. 1. 15..
 */

(function () {

    "use strict";

    var list = gl2d.import("test.list");
    var display = gl2d.import("display");
    var tex = gl2d.import("texture");
    var Texture = tex.Texture;
    var current;
    var stage;

    function init() {

        var o = list;
        var select = document.getElementById("combo");
        select.addEventListener( "change", onChange );

        for (var s in o) {
            if( o[s] == list.BaseCase ) continue;

            var option = document.createElement( "option" );
            option.innerHTML = o[s].name;

            select.appendChild( option );
        }

        stage = new display.Stage( "canvas" );
        list.BaseCase.title = document.getElementById( "title" );

        exec( select.selectedOptions[0].innerHTML );
    }

    function onChange(e) {
        exec(e.target.selectedOptions[0].innerHTML);
    }

    function exec(name) {

        if( current )
        {
            current.clear();
            stage.removeChild( current );
        }

        current = new list[name]();
        current.addEventListener( "enterframe", function(e){

        });

        stage.addChild( current );

        current.start();
    }
    
    window.onload = init;

})();