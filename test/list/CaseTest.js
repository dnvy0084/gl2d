/****************
 * CaseTest.js
 *****************/

(function () {

    "use strict";

    var c = gl2d.import("test.list");

    function CaseTest() {
        c.BaseCase.call( this );
    }

    var p = gl2d.extend(CaseTest, c.BaseCase);

    p.start = function () {

        this.setTitle( "case test" );
    };

    p.clear = function () {

    };

    c.CaseTest = CaseTest;

})();

