// Shortcut to an often accessed properties, in order to avoid multiple
// dereference that costs universally.
// _Please note: Shortcuts are defined after `Function.prototype.bind` as we
// us it in defining shortcuts.
wrapGenerator.mark(__top);

function __top() {
    var call, prototypeOfObject, _toString, toObject, boxedString, splitString;

    return wrapGenerator(function __top$($ctx1) {
        while (1) switch ($ctx1.next) {
        case 0:
            $ctx1.next = 2;

            return {
                "type": "stackFrame",
                "filename": "array.js",
                "name": "Global Scope",

                "scope": [{
                    "name": "call",

                    "locs": [{
                        "start": {
                            "line": 5,
                            "column": 4
                        },

                        "end": {
                            "line": 5,
                            "column": 8
                        }
                    }]
                }, {
                    "name": "prototypeOfObject",

                    "locs": [{
                        "start": {
                            "line": 6,
                            "column": 4
                        },

                        "end": {
                            "line": 6,
                            "column": 21
                        }
                    }]
                }, {
                    "name": "_toString",

                    "locs": [{
                        "start": {
                            "line": 8,
                            "column": 4
                        },

                        "end": {
                            "line": 8,
                            "column": 13
                        }
                    }]
                }, {
                    "name": "toObject",

                    "locs": [{
                        "start": {
                            "line": 9,
                            "column": 4
                        },

                        "end": {
                            "line": 9,
                            "column": 12
                        }
                    }]
                }, {
                    "name": "boxedString",

                    "locs": [{
                        "start": {
                            "line": 17,
                            "column": 4
                        },

                        "end": {
                            "line": 17,
                            "column": 15
                        }
                    }]
                }, {
                    "name": "splitString",

                    "locs": [{
                        "start": {
                            "line": 18,
                            "column": 4
                        },

                        "end": {
                            "line": 18,
                            "column": 15
                        }
                    }]
                }],

                "evalInScope": function(expr) {
                    return eval(expr);
                }
            }
        case 2:
            call = Function.prototype.call;
            prototypeOfObject = Object.prototype;
            $ctx1.next = 6;

            return __thunk(wrapGenerator.mark(function thunk() {
                return wrapGenerator(function thunk$($ctx2) {
                    while (1) switch ($ctx2.next) {
                    case 0:
                        $ctx2.rval = call.bind(prototypeOfObject.toString);
                        delete $ctx2.thrown;
                        $ctx2.next = 4;
                        break;
                    case 4:
                    case "end":
                        return $ctx2.stop();
                    }
                }, this);
            }), this);
        case 6:
            _toString = $ctx1.sent;

            toObject = wrapGenerator.mark(function(o) {
                return wrapGenerator(function($ctx3) {
                    while (1) switch ($ctx3.next) {
                    case 0:
                        $ctx3.next = 2;

                        return {
                            "type": "stackFrame",
                            "filename": "array.js",
                            "name": "anonymous function",

                            "scope": [{
                                "name": "o",

                                "locs": [{
                                    "start": {
                                        "line": 9,
                                        "column": 25
                                    },

                                    "end": {
                                        "line": 9,
                                        "column": 26
                                    }
                                }]
                            }],

                            "evalInScope": function(expr) {
                                return eval(expr);
                            }
                        }
                    case 2:
                        if (!(o == null)) {
                            $ctx3.next = 4;
                            break;
                        }

                        throw new TypeError("can't convert "+o+" to object");
                    case 4:
                        $ctx3.next = 6;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx4) {
                                while (1) switch ($ctx4.next) {
                                case 0:
                                    $ctx4.rval = Object(o);
                                    delete $ctx4.thrown;
                                    $ctx4.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx4.stop();
                                }
                            }, this);
                        }), this);
                    case 6:
                        $ctx3.rval = $ctx3.sent;
                        delete $ctx3.thrown;
                        $ctx3.next = 10;
                        break;
                    case 10:
                    case "end":
                        return $ctx3.stop();
                    }
                }, this);
            });

            $ctx1.next = 10;

            return __thunk(wrapGenerator.mark(function thunk() {
                return wrapGenerator(function thunk$($ctx5) {
                    while (1) switch ($ctx5.next) {
                    case 0:
                        $ctx5.rval = Object("a");
                        delete $ctx5.thrown;
                        $ctx5.next = 4;
                        break;
                    case 4:
                    case "end":
                        return $ctx5.stop();
                    }
                }, this);
            }), this);
        case 10:
            boxedString = $ctx1.sent;
            splitString = boxedString[0] != "a" || !(0 in boxedString);

            Array.prototype.forEach = wrapGenerator.mark(function forEach(fun /*, thisp*/) {
                var object, self, thisp, i, length, $args = arguments;

                return wrapGenerator(function forEach$($ctx6) {
                    while (1) switch ($ctx6.next) {
                    case 0:
                        $ctx6.next = 2;

                        return {
                            "type": "stackFrame",
                            "filename": "array.js",
                            "name": "forEach",

                            "scope": [{
                                "name": "fun",

                                "locs": [{
                                    "start": {
                                        "line": 19,
                                        "column": 43
                                    },

                                    "end": {
                                        "line": 19,
                                        "column": 46
                                    }
                                }]
                            }, {
                                "name": "object",

                                "locs": [{
                                    "start": {
                                        "line": 20,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 20,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "self",

                                "locs": [{
                                    "start": {
                                        "line": 21,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 21,
                                        "column": 12
                                    }
                                }]
                            }, {
                                "name": "thisp",

                                "locs": [{
                                    "start": {
                                        "line": 24,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 24,
                                        "column": 13
                                    }
                                }]
                            }, {
                                "name": "i",

                                "locs": [{
                                    "start": {
                                        "line": 25,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 25,
                                        "column": 9
                                    }
                                }]
                            }, {
                                "name": "length",

                                "locs": [{
                                    "start": {
                                        "line": 26,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 26,
                                        "column": 14
                                    }
                                }]
                            }],

                            "evalInScope": function(expr) {
                                return eval(expr);
                            }
                        }
                    case 2:
                        $ctx6.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx7) {
                                while (1) switch ($ctx7.next) {
                                case 0:
                                    $ctx7.rval = toObject(this);
                                    delete $ctx7.thrown;
                                    $ctx7.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx7.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx6.sent;
                        $ctx6.t0 = splitString;

                        if (!$ctx6.t0) {
                            $ctx6.next = 11;
                            break;
                        }

                        $ctx6.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx8) {
                                while (1) switch ($ctx8.next) {
                                case 0:
                                    $ctx8.rval = _toString(this);
                                    delete $ctx8.thrown;
                                    $ctx8.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx8.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx6.t1 = $ctx6.sent;
                        $ctx6.t0 = $ctx6.t1 == "[object String]";
                    case 11:
                        if (!$ctx6.t0) {
                            $ctx6.next = 17;
                            break;
                        }

                        $ctx6.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx9) {
                                while (1) switch ($ctx9.next) {
                                case 0:
                                    $ctx9.rval = this.split("");
                                    delete $ctx9.thrown;
                                    $ctx9.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx9.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx6.t2 = $ctx6.sent;
                        $ctx6.next = 18;
                        break;
                    case 17:
                        $ctx6.t2 = object;
                    case 18:
                        self = $ctx6.t2;
                        thisp = $args[1];
                        i = -1;
                        length = self.length >>> 0;
                        $ctx6.next = 24;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx10) {
                                while (1) switch ($ctx10.next) {
                                case 0:
                                    $ctx10.rval = _toString(fun);
                                    delete $ctx10.thrown;
                                    $ctx10.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx10.stop();
                                }
                            }, this);
                        }), this);
                    case 24:
                        $ctx6.t3 = $ctx6.sent;

                        if (!($ctx6.t3 != "[object Function]")) {
                            $ctx6.next = 27;
                            break;
                        }

                        throw new TypeError();
                    case 27:
                        if (!(++i < length)) {
                            $ctx6.next = 33;
                            break;
                        }

                        if (!(i in self)) {
                            $ctx6.next = 31;
                            break;
                        }

                        $ctx6.next = 31;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx11) {
                                while (1) switch ($ctx11.next) {
                                case 0:
                                    $ctx11.rval = fun.call(thisp, self[i], i, object);
                                    delete $ctx11.thrown;
                                    $ctx11.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx11.stop();
                                }
                            }, this);
                        }), this);
                    case 31:
                        $ctx6.next = 27;
                        break;
                    case 33:
                    case "end":
                        return $ctx6.stop();
                    }
                }, this);
            });

            Array.prototype.map = wrapGenerator.mark(function map(fun /*, thisp*/) {
                var object, self, length, result, thisp, i, $args = arguments;

                return wrapGenerator(function map$($ctx12) {
                    while (1) switch ($ctx12.next) {
                    case 0:
                        $ctx12.next = 2;

                        return {
                            "type": "stackFrame",
                            "filename": "array.js",
                            "name": "map",

                            "scope": [{
                                "name": "fun",

                                "locs": [{
                                    "start": {
                                        "line": 44,
                                        "column": 35
                                    },

                                    "end": {
                                        "line": 44,
                                        "column": 38
                                    }
                                }]
                            }, {
                                "name": "object",

                                "locs": [{
                                    "start": {
                                        "line": 45,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 45,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "self",

                                "locs": [{
                                    "start": {
                                        "line": 46,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 46,
                                        "column": 12
                                    }
                                }]
                            }, {
                                "name": "length",

                                "locs": [{
                                    "start": {
                                        "line": 49,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 49,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "result",

                                "locs": [{
                                    "start": {
                                        "line": 50,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 50,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "thisp",

                                "locs": [{
                                    "start": {
                                        "line": 51,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 51,
                                        "column": 13
                                    }
                                }]
                            }, {
                                "name": "i",

                                "locs": [{
                                    "start": {
                                        "line": 58,
                                        "column": 13
                                    },

                                    "end": {
                                        "line": 58,
                                        "column": 14
                                    }
                                }]
                            }],

                            "evalInScope": function(expr) {
                                return eval(expr);
                            }
                        }
                    case 2:
                        $ctx12.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx13) {
                                while (1) switch ($ctx13.next) {
                                case 0:
                                    $ctx13.rval = toObject(this);
                                    delete $ctx13.thrown;
                                    $ctx13.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx13.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx12.sent;
                        $ctx12.t4 = splitString;

                        if (!$ctx12.t4) {
                            $ctx12.next = 11;
                            break;
                        }

                        $ctx12.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx14) {
                                while (1) switch ($ctx14.next) {
                                case 0:
                                    $ctx14.rval = _toString(this);
                                    delete $ctx14.thrown;
                                    $ctx14.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx14.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx12.t5 = $ctx12.sent;
                        $ctx12.t4 = $ctx12.t5 == "[object String]";
                    case 11:
                        if (!$ctx12.t4) {
                            $ctx12.next = 17;
                            break;
                        }

                        $ctx12.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx15) {
                                while (1) switch ($ctx15.next) {
                                case 0:
                                    $ctx15.rval = this.split("");
                                    delete $ctx15.thrown;
                                    $ctx15.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx15.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx12.t6 = $ctx12.sent;
                        $ctx12.next = 18;
                        break;
                    case 17:
                        $ctx12.t6 = object;
                    case 18:
                        self = $ctx12.t6;
                        length = self.length >>> 0;
                        $ctx12.next = 22;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx16) {
                                while (1) switch ($ctx16.next) {
                                case 0:
                                    $ctx16.rval = Array(length);
                                    delete $ctx16.thrown;
                                    $ctx16.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx16.stop();
                                }
                            }, this);
                        }), this);
                    case 22:
                        result = $ctx12.sent;
                        thisp = $args[1];
                        $ctx12.next = 26;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx17) {
                                while (1) switch ($ctx17.next) {
                                case 0:
                                    $ctx17.rval = _toString(fun);
                                    delete $ctx17.thrown;
                                    $ctx17.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx17.stop();
                                }
                            }, this);
                        }), this);
                    case 26:
                        $ctx12.t7 = $ctx12.sent;

                        if (!($ctx12.t7 != "[object Function]")) {
                            $ctx12.next = 29;
                            break;
                        }

                        throw new TypeError(fun + " is not a function");
                    case 29:
                        i = 0;
                    case 30:
                        if (!(i < length)) {
                            $ctx12.next = 38;
                            break;
                        }

                        if (!(i in self)) {
                            $ctx12.next = 35;
                            break;
                        }

                        $ctx12.next = 34;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx18) {
                                while (1) switch ($ctx18.next) {
                                case 0:
                                    $ctx18.rval = fun.call(thisp, self[i], i, object);
                                    delete $ctx18.thrown;
                                    $ctx18.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx18.stop();
                                }
                            }, this);
                        }), this);
                    case 34:
                        result[i] = $ctx12.sent;
                    case 35:
                        i++;
                        $ctx12.next = 30;
                        break;
                    case 38:
                        $ctx12.rval = result;
                        delete $ctx12.thrown;
                        $ctx12.next = 42;
                        break;
                    case 42:
                    case "end":
                        return $ctx12.stop();
                    }
                }, this);
            });

            Array.prototype.filter = wrapGenerator.mark(function filter(fun /*, thisp */) {
                var object, self, length, result, value, thisp, i, $args = arguments;

                return wrapGenerator(function filter$($ctx19) {
                    while (1) switch ($ctx19.next) {
                    case 0:
                        $ctx19.next = 2;

                        return {
                            "type": "stackFrame",
                            "filename": "array.js",
                            "name": "filter",

                            "scope": [{
                                "name": "fun",

                                "locs": [{
                                    "start": {
                                        "line": 65,
                                        "column": 41
                                    },

                                    "end": {
                                        "line": 65,
                                        "column": 44
                                    }
                                }]
                            }, {
                                "name": "object",

                                "locs": [{
                                    "start": {
                                        "line": 66,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 66,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "self",

                                "locs": [{
                                    "start": {
                                        "line": 67,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 67,
                                        "column": 12
                                    }
                                }]
                            }, {
                                "name": "length",

                                "locs": [{
                                    "start": {
                                        "line": 70,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 70,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "result",

                                "locs": [{
                                    "start": {
                                        "line": 71,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 71,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "value",

                                "locs": [{
                                    "start": {
                                        "line": 72,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 72,
                                        "column": 13
                                    }
                                }]
                            }, {
                                "name": "thisp",

                                "locs": [{
                                    "start": {
                                        "line": 73,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 73,
                                        "column": 13
                                    }
                                }]
                            }, {
                                "name": "i",

                                "locs": [{
                                    "start": {
                                        "line": 80,
                                        "column": 13
                                    },

                                    "end": {
                                        "line": 80,
                                        "column": 14
                                    }
                                }]
                            }],

                            "evalInScope": function(expr) {
                                return eval(expr);
                            }
                        }
                    case 2:
                        $ctx19.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx20) {
                                while (1) switch ($ctx20.next) {
                                case 0:
                                    $ctx20.rval = toObject(this);
                                    delete $ctx20.thrown;
                                    $ctx20.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx20.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx19.sent;
                        $ctx19.t8 = splitString;

                        if (!$ctx19.t8) {
                            $ctx19.next = 11;
                            break;
                        }

                        $ctx19.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx21) {
                                while (1) switch ($ctx21.next) {
                                case 0:
                                    $ctx21.rval = _toString(this);
                                    delete $ctx21.thrown;
                                    $ctx21.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx21.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx19.t9 = $ctx19.sent;
                        $ctx19.t8 = $ctx19.t9 == "[object String]";
                    case 11:
                        if (!$ctx19.t8) {
                            $ctx19.next = 17;
                            break;
                        }

                        $ctx19.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx22) {
                                while (1) switch ($ctx22.next) {
                                case 0:
                                    $ctx22.rval = this.split("");
                                    delete $ctx22.thrown;
                                    $ctx22.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx22.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx19.t10 = $ctx19.sent;
                        $ctx19.next = 18;
                        break;
                    case 17:
                        $ctx19.t10 = object;
                    case 18:
                        self = $ctx19.t10;
                        length = self.length >>> 0;
                        result = [];
                        thisp = $args[1];
                        $ctx19.next = 24;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx23) {
                                while (1) switch ($ctx23.next) {
                                case 0:
                                    $ctx23.rval = _toString(fun);
                                    delete $ctx23.thrown;
                                    $ctx23.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx23.stop();
                                }
                            }, this);
                        }), this);
                    case 24:
                        $ctx19.t11 = $ctx19.sent;

                        if (!($ctx19.t11 != "[object Function]")) {
                            $ctx19.next = 27;
                            break;
                        }

                        throw new TypeError(fun + " is not a function");
                    case 27:
                        i = 0;
                    case 28:
                        if (!(i < length)) {
                            $ctx19.next = 39;
                            break;
                        }

                        if (!(i in self)) {
                            $ctx19.next = 36;
                            break;
                        }

                        value = self[i];
                        $ctx19.next = 33;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx24) {
                                while (1) switch ($ctx24.next) {
                                case 0:
                                    $ctx24.rval = fun.call(thisp, value, i, object);
                                    delete $ctx24.thrown;
                                    $ctx24.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx24.stop();
                                }
                            }, this);
                        }), this);
                    case 33:
                        if (!$ctx19.sent) {
                            $ctx19.next = 36;
                            break;
                        }

                        $ctx19.next = 36;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx25) {
                                while (1) switch ($ctx25.next) {
                                case 0:
                                    $ctx25.rval = result.push(value);
                                    delete $ctx25.thrown;
                                    $ctx25.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx25.stop();
                                }
                            }, this);
                        }), this);
                    case 36:
                        i++;
                        $ctx19.next = 28;
                        break;
                    case 39:
                        $ctx19.rval = result;
                        delete $ctx19.thrown;
                        $ctx19.next = 43;
                        break;
                    case 43:
                    case "end":
                        return $ctx19.stop();
                    }
                }, this);
            });

            Array.prototype.every = wrapGenerator.mark(function every(fun /*, thisp */) {
                var object, self, length, thisp, i, $args = arguments;

                return wrapGenerator(function every$($ctx26) {
                    while (1) switch ($ctx26.next) {
                    case 0:
                        $ctx26.next = 2;

                        return {
                            "type": "stackFrame",
                            "filename": "array.js",
                            "name": "every",

                            "scope": [{
                                "name": "fun",

                                "locs": [{
                                    "start": {
                                        "line": 93,
                                        "column": 39
                                    },

                                    "end": {
                                        "line": 93,
                                        "column": 42
                                    }
                                }]
                            }, {
                                "name": "object",

                                "locs": [{
                                    "start": {
                                        "line": 94,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 94,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "self",

                                "locs": [{
                                    "start": {
                                        "line": 95,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 95,
                                        "column": 12
                                    }
                                }]
                            }, {
                                "name": "length",

                                "locs": [{
                                    "start": {
                                        "line": 98,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 98,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "thisp",

                                "locs": [{
                                    "start": {
                                        "line": 99,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 99,
                                        "column": 13
                                    }
                                }]
                            }, {
                                "name": "i",

                                "locs": [{
                                    "start": {
                                        "line": 106,
                                        "column": 13
                                    },

                                    "end": {
                                        "line": 106,
                                        "column": 14
                                    }
                                }]
                            }],

                            "evalInScope": function(expr) {
                                return eval(expr);
                            }
                        }
                    case 2:
                        $ctx26.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx27) {
                                while (1) switch ($ctx27.next) {
                                case 0:
                                    $ctx27.rval = toObject(this);
                                    delete $ctx27.thrown;
                                    $ctx27.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx27.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx26.sent;
                        $ctx26.t12 = splitString;

                        if (!$ctx26.t12) {
                            $ctx26.next = 11;
                            break;
                        }

                        $ctx26.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx28) {
                                while (1) switch ($ctx28.next) {
                                case 0:
                                    $ctx28.rval = _toString(this);
                                    delete $ctx28.thrown;
                                    $ctx28.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx28.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx26.t13 = $ctx26.sent;
                        $ctx26.t12 = $ctx26.t13 == "[object String]";
                    case 11:
                        if (!$ctx26.t12) {
                            $ctx26.next = 17;
                            break;
                        }

                        $ctx26.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx29) {
                                while (1) switch ($ctx29.next) {
                                case 0:
                                    $ctx29.rval = this.split("");
                                    delete $ctx29.thrown;
                                    $ctx29.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx29.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx26.t14 = $ctx26.sent;
                        $ctx26.next = 18;
                        break;
                    case 17:
                        $ctx26.t14 = object;
                    case 18:
                        self = $ctx26.t14;
                        length = self.length >>> 0;
                        thisp = $args[1];
                        $ctx26.next = 23;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx30) {
                                while (1) switch ($ctx30.next) {
                                case 0:
                                    $ctx30.rval = _toString(fun);
                                    delete $ctx30.thrown;
                                    $ctx30.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx30.stop();
                                }
                            }, this);
                        }), this);
                    case 23:
                        $ctx26.t15 = $ctx26.sent;

                        if (!($ctx26.t15 != "[object Function]")) {
                            $ctx26.next = 26;
                            break;
                        }

                        throw new TypeError(fun + " is not a function");
                    case 26:
                        i = 0;
                    case 27:
                        if (!(i < length)) {
                            $ctx26.next = 41;
                            break;
                        }

                        $ctx26.t16 = i in self;

                        if (!$ctx26.t16) {
                            $ctx26.next = 33;
                            break;
                        }

                        $ctx26.next = 32;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx31) {
                                while (1) switch ($ctx31.next) {
                                case 0:
                                    $ctx31.rval = fun.call(thisp, self[i], i, object);
                                    delete $ctx31.thrown;
                                    $ctx31.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx31.stop();
                                }
                            }, this);
                        }), this);
                    case 32:
                        $ctx26.t16 = !$ctx26.sent;
                    case 33:
                        if (!$ctx26.t16) {
                            $ctx26.next = 38;
                            break;
                        }

                        $ctx26.rval = false;
                        delete $ctx26.thrown;
                        $ctx26.next = 45;
                        break;
                    case 38:
                        i++;
                        $ctx26.next = 27;
                        break;
                    case 41:
                        $ctx26.rval = true;
                        delete $ctx26.thrown;
                        $ctx26.next = 45;
                        break;
                    case 45:
                    case "end":
                        return $ctx26.stop();
                    }
                }, this);
            });

            Array.prototype.some = wrapGenerator.mark(function some(fun /*, thisp */) {
                var object, self, length, thisp, i, $args = arguments;

                return wrapGenerator(function some$($ctx32) {
                    while (1) switch ($ctx32.next) {
                    case 0:
                        $ctx32.next = 2;

                        return {
                            "type": "stackFrame",
                            "filename": "array.js",
                            "name": "some",

                            "scope": [{
                                "name": "fun",

                                "locs": [{
                                    "start": {
                                        "line": 115,
                                        "column": 37
                                    },

                                    "end": {
                                        "line": 115,
                                        "column": 40
                                    }
                                }]
                            }, {
                                "name": "object",

                                "locs": [{
                                    "start": {
                                        "line": 116,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 116,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "self",

                                "locs": [{
                                    "start": {
                                        "line": 117,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 117,
                                        "column": 12
                                    }
                                }]
                            }, {
                                "name": "length",

                                "locs": [{
                                    "start": {
                                        "line": 120,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 120,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "thisp",

                                "locs": [{
                                    "start": {
                                        "line": 121,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 121,
                                        "column": 13
                                    }
                                }]
                            }, {
                                "name": "i",

                                "locs": [{
                                    "start": {
                                        "line": 128,
                                        "column": 13
                                    },

                                    "end": {
                                        "line": 128,
                                        "column": 14
                                    }
                                }]
                            }],

                            "evalInScope": function(expr) {
                                return eval(expr);
                            }
                        }
                    case 2:
                        $ctx32.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx33) {
                                while (1) switch ($ctx33.next) {
                                case 0:
                                    $ctx33.rval = toObject(this);
                                    delete $ctx33.thrown;
                                    $ctx33.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx33.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx32.sent;
                        $ctx32.t17 = splitString;

                        if (!$ctx32.t17) {
                            $ctx32.next = 11;
                            break;
                        }

                        $ctx32.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx34) {
                                while (1) switch ($ctx34.next) {
                                case 0:
                                    $ctx34.rval = _toString(this);
                                    delete $ctx34.thrown;
                                    $ctx34.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx34.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx32.t18 = $ctx32.sent;
                        $ctx32.t17 = $ctx32.t18 == "[object String]";
                    case 11:
                        if (!$ctx32.t17) {
                            $ctx32.next = 17;
                            break;
                        }

                        $ctx32.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx35) {
                                while (1) switch ($ctx35.next) {
                                case 0:
                                    $ctx35.rval = this.split("");
                                    delete $ctx35.thrown;
                                    $ctx35.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx35.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx32.t19 = $ctx32.sent;
                        $ctx32.next = 18;
                        break;
                    case 17:
                        $ctx32.t19 = object;
                    case 18:
                        self = $ctx32.t19;
                        length = self.length >>> 0;
                        thisp = $args[1];
                        $ctx32.next = 23;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx36) {
                                while (1) switch ($ctx36.next) {
                                case 0:
                                    $ctx36.rval = _toString(fun);
                                    delete $ctx36.thrown;
                                    $ctx36.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx36.stop();
                                }
                            }, this);
                        }), this);
                    case 23:
                        $ctx32.t20 = $ctx32.sent;

                        if (!($ctx32.t20 != "[object Function]")) {
                            $ctx32.next = 26;
                            break;
                        }

                        throw new TypeError(fun + " is not a function");
                    case 26:
                        i = 0;
                    case 27:
                        if (!(i < length)) {
                            $ctx32.next = 41;
                            break;
                        }

                        $ctx32.t21 = i in self;

                        if (!$ctx32.t21) {
                            $ctx32.next = 33;
                            break;
                        }

                        $ctx32.next = 32;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx37) {
                                while (1) switch ($ctx37.next) {
                                case 0:
                                    $ctx37.rval = fun.call(thisp, self[i], i, object);
                                    delete $ctx37.thrown;
                                    $ctx37.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx37.stop();
                                }
                            }, this);
                        }), this);
                    case 32:
                        $ctx32.t21 = $ctx32.sent;
                    case 33:
                        if (!$ctx32.t21) {
                            $ctx32.next = 38;
                            break;
                        }

                        $ctx32.rval = true;
                        delete $ctx32.thrown;
                        $ctx32.next = 45;
                        break;
                    case 38:
                        i++;
                        $ctx32.next = 27;
                        break;
                    case 41:
                        $ctx32.rval = false;
                        delete $ctx32.thrown;
                        $ctx32.next = 45;
                        break;
                    case 45:
                    case "end":
                        return $ctx32.stop();
                    }
                }, this);
            });

            Array.prototype.reduce = wrapGenerator.mark(function reduce(fun /*, initial*/) {
                var object, self, length, i, result, $args = arguments;

                return wrapGenerator(function reduce$($ctx38) {
                    while (1) switch ($ctx38.next) {
                    case 0:
                        $ctx38.next = 2;

                        return {
                            "type": "stackFrame",
                            "filename": "array.js",
                            "name": "reduce",

                            "scope": [{
                                "name": "fun",

                                "locs": [{
                                    "start": {
                                        "line": 136,
                                        "column": 41
                                    },

                                    "end": {
                                        "line": 136,
                                        "column": 44
                                    }
                                }]
                            }, {
                                "name": "object",

                                "locs": [{
                                    "start": {
                                        "line": 137,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 137,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "self",

                                "locs": [{
                                    "start": {
                                        "line": 138,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 138,
                                        "column": 12
                                    }
                                }]
                            }, {
                                "name": "length",

                                "locs": [{
                                    "start": {
                                        "line": 141,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 141,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "i",

                                "locs": [{
                                    "start": {
                                        "line": 153,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 153,
                                        "column": 9
                                    }
                                }]
                            }, {
                                "name": "result",

                                "locs": [{
                                    "start": {
                                        "line": 154,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 154,
                                        "column": 14
                                    }
                                }]
                            }],

                            "evalInScope": function(expr) {
                                return eval(expr);
                            }
                        }
                    case 2:
                        $ctx38.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx39) {
                                while (1) switch ($ctx39.next) {
                                case 0:
                                    $ctx39.rval = toObject(this);
                                    delete $ctx39.thrown;
                                    $ctx39.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx39.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx38.sent;
                        $ctx38.t22 = splitString;

                        if (!$ctx38.t22) {
                            $ctx38.next = 11;
                            break;
                        }

                        $ctx38.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx40) {
                                while (1) switch ($ctx40.next) {
                                case 0:
                                    $ctx40.rval = _toString(this);
                                    delete $ctx40.thrown;
                                    $ctx40.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx40.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx38.t23 = $ctx38.sent;
                        $ctx38.t22 = $ctx38.t23 == "[object String]";
                    case 11:
                        if (!$ctx38.t22) {
                            $ctx38.next = 17;
                            break;
                        }

                        $ctx38.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx41) {
                                while (1) switch ($ctx41.next) {
                                case 0:
                                    $ctx41.rval = this.split("");
                                    delete $ctx41.thrown;
                                    $ctx41.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx41.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx38.t24 = $ctx38.sent;
                        $ctx38.next = 18;
                        break;
                    case 17:
                        $ctx38.t24 = object;
                    case 18:
                        self = $ctx38.t24;
                        length = self.length >>> 0;
                        $ctx38.next = 22;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx42) {
                                while (1) switch ($ctx42.next) {
                                case 0:
                                    $ctx42.rval = _toString(fun);
                                    delete $ctx42.thrown;
                                    $ctx42.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx42.stop();
                                }
                            }, this);
                        }), this);
                    case 22:
                        $ctx38.t25 = $ctx38.sent;

                        if (!($ctx38.t25 != "[object Function]")) {
                            $ctx38.next = 25;
                            break;
                        }

                        throw new TypeError(fun + " is not a function");
                    case 25:
                        if (!(!length && $args.length == 1)) {
                            $ctx38.next = 27;
                            break;
                        }

                        throw new TypeError("reduce of empty array with no initial value");
                    case 27:
                        i = 0;

                        if (!($args.length >= 2)) {
                            $ctx38.next = 32;
                            break;
                        }

                        result = $args[1];
                        $ctx38.next = 40;
                        break;
                    case 32:
                        if (!(i in self)) {
                            $ctx38.next = 37;
                            break;
                        }

                        result = self[i++];
                        delete $ctx38.thrown;
                        $ctx38.next = 40;
                        break;
                    case 37:
                        if (!(++i >= length)) {
                            $ctx38.next = 39;
                            break;
                        }

                        throw new TypeError("reduce of empty array with no initial value");
                    case 39:
                        if (true) {
                            $ctx38.next = 32;
                            break;
                        }
                    case 40:
                        if (!(i < length)) {
                            $ctx38.next = 48;
                            break;
                        }

                        if (!(i in self)) {
                            $ctx38.next = 45;
                            break;
                        }

                        $ctx38.next = 44;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx43) {
                                while (1) switch ($ctx43.next) {
                                case 0:
                                    $ctx43.rval = fun.call(void 0, result, self[i], i, object);
                                    delete $ctx43.thrown;
                                    $ctx43.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx43.stop();
                                }
                            }, this);
                        }), this);
                    case 44:
                        result = $ctx38.sent;
                    case 45:
                        i++;
                        $ctx38.next = 40;
                        break;
                    case 48:
                        $ctx38.rval = result;
                        delete $ctx38.thrown;
                        $ctx38.next = 52;
                        break;
                    case 52:
                    case "end":
                        return $ctx38.stop();
                    }
                }, this);
            });

            Array.prototype.reduceRight = wrapGenerator.mark(function reduceRight(fun /*, initial*/) {
                var object, self, length, result, i, $args = arguments;

                return wrapGenerator(function reduceRight$($ctx44) {
                    while (1) switch ($ctx44.next) {
                    case 0:
                        $ctx44.next = 2;

                        return {
                            "type": "stackFrame",
                            "filename": "array.js",
                            "name": "reduceRight",

                            "scope": [{
                                "name": "fun",

                                "locs": [{
                                    "start": {
                                        "line": 181,
                                        "column": 51
                                    },

                                    "end": {
                                        "line": 181,
                                        "column": 54
                                    }
                                }]
                            }, {
                                "name": "object",

                                "locs": [{
                                    "start": {
                                        "line": 182,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 182,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "self",

                                "locs": [{
                                    "start": {
                                        "line": 183,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 183,
                                        "column": 12
                                    }
                                }]
                            }, {
                                "name": "length",

                                "locs": [{
                                    "start": {
                                        "line": 186,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 186,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "result",

                                "locs": [{
                                    "start": {
                                        "line": 198,
                                        "column": 8
                                    },

                                    "end": {
                                        "line": 198,
                                        "column": 14
                                    }
                                }]
                            }, {
                                "name": "i",

                                "locs": [{
                                    "start": {
                                        "line": 198,
                                        "column": 16
                                    },

                                    "end": {
                                        "line": 198,
                                        "column": 17
                                    }
                                }]
                            }],

                            "evalInScope": function(expr) {
                                return eval(expr);
                            }
                        }
                    case 2:
                        $ctx44.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx45) {
                                while (1) switch ($ctx45.next) {
                                case 0:
                                    $ctx45.rval = toObject(this);
                                    delete $ctx45.thrown;
                                    $ctx45.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx45.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx44.sent;
                        $ctx44.t26 = splitString;

                        if (!$ctx44.t26) {
                            $ctx44.next = 11;
                            break;
                        }

                        $ctx44.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx46) {
                                while (1) switch ($ctx46.next) {
                                case 0:
                                    $ctx46.rval = _toString(this);
                                    delete $ctx46.thrown;
                                    $ctx46.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx46.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx44.t27 = $ctx44.sent;
                        $ctx44.t26 = $ctx44.t27 == "[object String]";
                    case 11:
                        if (!$ctx44.t26) {
                            $ctx44.next = 17;
                            break;
                        }

                        $ctx44.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx47) {
                                while (1) switch ($ctx47.next) {
                                case 0:
                                    $ctx47.rval = this.split("");
                                    delete $ctx47.thrown;
                                    $ctx47.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx47.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx44.t28 = $ctx44.sent;
                        $ctx44.next = 18;
                        break;
                    case 17:
                        $ctx44.t28 = object;
                    case 18:
                        self = $ctx44.t28;
                        length = self.length >>> 0;
                        $ctx44.next = 22;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx48) {
                                while (1) switch ($ctx48.next) {
                                case 0:
                                    $ctx48.rval = _toString(fun);
                                    delete $ctx48.thrown;
                                    $ctx48.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx48.stop();
                                }
                            }, this);
                        }), this);
                    case 22:
                        $ctx44.t29 = $ctx44.sent;

                        if (!($ctx44.t29 != "[object Function]")) {
                            $ctx44.next = 25;
                            break;
                        }

                        throw new TypeError(fun + " is not a function");
                    case 25:
                        if (!(!length && $args.length == 1)) {
                            $ctx44.next = 27;
                            break;
                        }

                        throw new TypeError("reduceRight of empty array with no initial value");
                    case 27:
                        i = length - 1;

                        if (!($args.length >= 2)) {
                            $ctx44.next = 32;
                            break;
                        }

                        result = $args[1];
                        $ctx44.next = 40;
                        break;
                    case 32:
                        if (!(i in self)) {
                            $ctx44.next = 37;
                            break;
                        }

                        result = self[i--];
                        delete $ctx44.thrown;
                        $ctx44.next = 40;
                        break;
                    case 37:
                        if (!(--i < 0)) {
                            $ctx44.next = 39;
                            break;
                        }

                        throw new TypeError("reduceRight of empty array with no initial value");
                    case 39:
                        if (true) {
                            $ctx44.next = 32;
                            break;
                        }
                    case 40:
                        if (!(i < 0)) {
                            $ctx44.next = 45;
                            break;
                        }

                        $ctx44.rval = result;
                        delete $ctx44.thrown;
                        $ctx44.next = 54;
                        break;
                    case 45:
                        if (!(i in this)) {
                            $ctx44.next = 49;
                            break;
                        }

                        $ctx44.next = 48;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx49) {
                                while (1) switch ($ctx49.next) {
                                case 0:
                                    $ctx49.rval = fun.call(void 0, result, self[i], i, object);
                                    delete $ctx49.thrown;
                                    $ctx49.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx49.stop();
                                }
                            }, this);
                        }), this);
                    case 48:
                        result = $ctx44.sent;
                    case 49:
                        if (i--) {
                            $ctx44.next = 45;
                            break;
                        }
                    case 50:
                        $ctx44.rval = result;
                        delete $ctx44.thrown;
                        $ctx44.next = 54;
                        break;
                    case 54:
                    case "end":
                        return $ctx44.stop();
                    }
                }, this);
            });
        case 19:
        case "end":
            return $ctx1.stop();
        }
    }, this);
}
