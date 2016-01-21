/****************
 * CaseTest.js
 *****************/

(function () {

    "use strict";

    var c = test.require("case");

    function CaseTest() {

    }

    var p = test.extends(CaseTest, c.BaseCase);

    p.start = function () {

    };

    p.clear = function () {

    };

    c.CaseTest = CaseTest;

})();

