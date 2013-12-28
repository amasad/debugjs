// breakable.js
// MIT licensed, see LICENSE file
// Copyright (c) 2013 Olov Lassus <olov.lassus@gmail.com>

var breakable = (function() {
    "use strict";

    function Val(val) {
        this.val = val;
    }

    function brk(val) {
        throw new Val(val);
    }

    function breakable(fn) {
        try {
            return fn(brk);
        } catch (e) {
            if (e instanceof Val) {
                return e.val;
            }
            throw e;
        }
    }

    breakable.fn = function breakablefn(fn) {
        return breakable.bind(null, fn);
    };

    return breakable;
})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = breakable;
}
