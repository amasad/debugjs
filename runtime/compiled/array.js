// Shortcut to an often accessed properties, in order to avoid multiple
// dereference that costs universally.
// _Please note: Shortcuts are defined after `Function.prototype.bind` as we
// us it in defining shortcuts.
wrapGenerator.mark(__top);

function __top() {
    var call, prototypeOfObject, _toString, toObject, boxedString, splitString;

    return wrapGenerator(function __top$($ctx) {
        while (1) switch ($ctx.next) {
        case 0:
            $ctx.next = 2;

            return {
                "start": {
                    "line": 5,
                    "column": 0
                },

                "end": {
                    "line": 5,
                    "column": 35
                }
            }
        case 2:
            call = Function.prototype.call;
            $ctx.next = 5;

            return {
                "start": {
                    "line": 6,
                    "column": 0
                },

                "end": {
                    "line": 6,
                    "column": 41
                }
            }
        case 5:
            prototypeOfObject = Object.prototype;
            $ctx.next = 8;

            return {
                "start": {
                    "line": 8,
                    "column": 0
                },

                "end": {
                    "line": 8,
                    "column": 54
                }
            }
        case 8:
            $ctx.next = 10;

            return __thunk(wrapGenerator.mark(function thunk() {
                return wrapGenerator(function thunk$($ctx) {
                    while (1) switch ($ctx.next) {
                    case 0:
                        $ctx.rval = call.bind(prototypeOfObject.toString);
                        delete $ctx.thrown;
                        $ctx.next = 4;
                        break;
                    case 4:
                    case "end":
                        return $ctx.stop();
                    }
                }, this);
            }), this);
        case 10:
            _toString = $ctx.sent;
            $ctx.next = 13;

            return {
                "start": {
                    "line": 9,
                    "column": 0
                },

                "end": {
                    "line": 14,
                    "column": 2
                }
            }
        case 13:
            toObject = wrapGenerator.mark(function(o) {
                return wrapGenerator(function($ctx) {
                    while (1) switch ($ctx.next) {
                    case 0:
                        $ctx.next = 2;

                        return {
                            "start": {
                                "line": 10,
                                "column": 4
                            },

                            "end": {
                                "line": 12,
                                "column": 5
                            }
                        }
                    case 2:
                        if (!(o == null)) {
                            $ctx.next = 6;
                            break;
                        }

                        $ctx.next = 5;

                        return {
                            "start": {
                                "line": 11,
                                "column": 8
                            },

                            "end": {
                                "line": 11,
                                "column": 61
                            }
                        }
                    case 5:
                        throw new TypeError("can't convert "+o+" to object");
                    case 6:
                        $ctx.next = 8;

                        return {
                            "start": {
                                "line": 13,
                                "column": 4
                            },

                            "end": {
                                "line": 13,
                                "column": 21
                            }
                        }
                    case 8:
                        $ctx.next = 10;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = Object(o);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 10:
                        $ctx.rval = $ctx.sent;
                        delete $ctx.thrown;
                        $ctx.next = 14;
                        break;
                    case 14:
                    case "end":
                        return $ctx.stop();
                    }
                }, this);
            });

            $ctx.next = 16;

            return {
                "start": {
                    "line": 17,
                    "column": 0
                },

                "end": {
                    "line": 18,
                    "column": 63
                }
            }
        case 16:
            $ctx.next = 18;

            return __thunk(wrapGenerator.mark(function thunk() {
                return wrapGenerator(function thunk$($ctx) {
                    while (1) switch ($ctx.next) {
                    case 0:
                        $ctx.rval = Object("a");
                        delete $ctx.thrown;
                        $ctx.next = 4;
                        break;
                    case 4:
                    case "end":
                        return $ctx.stop();
                    }
                }, this);
            }), this);
        case 18:
            boxedString = $ctx.sent;
            splitString = boxedString[0] != "a" || !(0 in boxedString);
            $ctx.next = 22;

            return {
                "start": {
                    "line": 19,
                    "column": 0
                },

                "end": {
                    "line": 41,
                    "column": 2
                }
            }
        case 22:
            Array.prototype.forEach = wrapGenerator.mark(function forEach(fun /*, thisp*/) {
                var object, self, thisp, i, length, $args = arguments;

                return wrapGenerator(function forEach$($ctx) {
                    while (1) switch ($ctx.next) {
                    case 0:
                        $ctx.next = 2;

                        return {
                            "start": {
                                "line": 20,
                                "column": 4
                            },

                            "end": {
                                "line": 26,
                                "column": 35
                            }
                        }
                    case 2:
                        $ctx.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = toObject(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx.sent;
                        $ctx.t0 = splitString;

                        if (!$ctx.t0) {
                            $ctx.next = 11;
                            break;
                        }

                        $ctx.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx.t1 = $ctx.sent;
                        $ctx.t0 = $ctx.t1 == "[object String]";
                    case 11:
                        if (!$ctx.t0) {
                            $ctx.next = 17;
                            break;
                        }

                        $ctx.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = this.split("");
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx.t2 = $ctx.sent;
                        $ctx.next = 18;
                        break;
                    case 17:
                        $ctx.t2 = object;
                    case 18:
                        self = $ctx.t2;
                        thisp = $args[1];
                        i = -1;
                        length = self.length >>> 0;
                        $ctx.next = 24;

                        return {
                            "start": {
                                "line": 29,
                                "column": 4
                            },

                            "end": {
                                "line": 31,
                                "column": 5
                            }
                        }
                    case 24:
                        $ctx.next = 26;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(fun);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 26:
                        $ctx.t3 = $ctx.sent;

                        if (!($ctx.t3 != "[object Function]")) {
                            $ctx.next = 31;
                            break;
                        }

                        $ctx.next = 30;

                        return {
                            "start": {
                                "line": 30,
                                "column": 8
                            },

                            "end": {
                                "line": 30,
                                "column": 30
                            }
                        }
                    case 30:
                        throw new TypeError();
                    case 31:
                        $ctx.next = 33;

                        return {
                            "start": {
                                "line": 33,
                                "column": 4
                            },

                            "end": {
                                "line": 40,
                                "column": 5
                            }
                        }
                    case 33:
                        if (!(++i < length)) {
                            $ctx.next = 43;
                            break;
                        }

                        $ctx.next = 36;

                        return {
                            "start": {
                                "line": 34,
                                "column": 8
                            },

                            "end": {
                                "line": 39,
                                "column": 9
                            }
                        }
                    case 36:
                        if (!(i in self)) {
                            $ctx.next = 41;
                            break;
                        }

                        $ctx.next = 39;

                        return {
                            "start": {
                                "line": 38,
                                "column": 12
                            },

                            "end": {
                                "line": 38,
                                "column": 48
                            }
                        }
                    case 39:
                        $ctx.next = 41;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = fun.call(thisp, self[i], i, object);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 41:
                        $ctx.next = 33;
                        break;
                    case 43:
                    case "end":
                        return $ctx.stop();
                    }
                }, this);
            });

            $ctx.next = 25;

            return {
                "start": {
                    "line": 44,
                    "column": 0
                },

                "end": {
                    "line": 63,
                    "column": 2
                }
            }
        case 25:
            Array.prototype.map = wrapGenerator.mark(function map(fun /*, thisp*/) {
                var object, self, length, result, thisp, i, $args = arguments;

                return wrapGenerator(function map$($ctx) {
                    while (1) switch ($ctx.next) {
                    case 0:
                        $ctx.next = 2;

                        return {
                            "start": {
                                "line": 45,
                                "column": 4
                            },

                            "end": {
                                "line": 51,
                                "column": 29
                            }
                        }
                    case 2:
                        $ctx.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = toObject(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx.sent;
                        $ctx.t4 = splitString;

                        if (!$ctx.t4) {
                            $ctx.next = 11;
                            break;
                        }

                        $ctx.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx.t5 = $ctx.sent;
                        $ctx.t4 = $ctx.t5 == "[object String]";
                    case 11:
                        if (!$ctx.t4) {
                            $ctx.next = 17;
                            break;
                        }

                        $ctx.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = this.split("");
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx.t6 = $ctx.sent;
                        $ctx.next = 18;
                        break;
                    case 17:
                        $ctx.t6 = object;
                    case 18:
                        self = $ctx.t6;
                        length = self.length >>> 0;
                        $ctx.next = 22;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = Array(length);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 22:
                        result = $ctx.sent;
                        thisp = $args[1];
                        $ctx.next = 26;

                        return {
                            "start": {
                                "line": 54,
                                "column": 4
                            },

                            "end": {
                                "line": 56,
                                "column": 5
                            }
                        }
                    case 26:
                        $ctx.next = 28;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(fun);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 28:
                        $ctx.t7 = $ctx.sent;

                        if (!($ctx.t7 != "[object Function]")) {
                            $ctx.next = 33;
                            break;
                        }

                        $ctx.next = 32;

                        return {
                            "start": {
                                "line": 55,
                                "column": 8
                            },

                            "end": {
                                "line": 55,
                                "column": 56
                            }
                        }
                    case 32:
                        throw new TypeError(fun + " is not a function");
                    case 33:
                        $ctx.next = 35;

                        return {
                            "start": {
                                "line": 58,
                                "column": 4
                            },

                            "end": {
                                "line": 61,
                                "column": 5
                            }
                        }
                    case 35:
                        i = 0;
                    case 36:
                        if (!(i < length)) {
                            $ctx.next = 48;
                            break;
                        }

                        $ctx.next = 39;

                        return {
                            "start": {
                                "line": 59,
                                "column": 8
                            },

                            "end": {
                                "line": 60,
                                "column": 60
                            }
                        }
                    case 39:
                        if (!(i in self)) {
                            $ctx.next = 45;
                            break;
                        }

                        $ctx.next = 42;

                        return {
                            "start": {
                                "line": 60,
                                "column": 12
                            },

                            "end": {
                                "line": 60,
                                "column": 60
                            }
                        }
                    case 42:
                        $ctx.next = 44;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = fun.call(thisp, self[i], i, object);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 44:
                        result[i] = $ctx.sent;
                    case 45:
                        i++;
                        $ctx.next = 36;
                        break;
                    case 48:
                        $ctx.next = 50;

                        return {
                            "start": {
                                "line": 62,
                                "column": 4
                            },

                            "end": {
                                "line": 62,
                                "column": 18
                            }
                        }
                    case 50:
                        $ctx.rval = result;
                        delete $ctx.thrown;
                        $ctx.next = 54;
                        break;
                    case 54:
                    case "end":
                        return $ctx.stop();
                    }
                }, this);
            });

            $ctx.next = 28;

            return {
                "start": {
                    "line": 65,
                    "column": 0
                },

                "end": {
                    "line": 89,
                    "column": 2
                }
            }
        case 28:
            Array.prototype.filter = wrapGenerator.mark(function filter(fun /*, thisp */) {
                var object, self, length, result, value, thisp, i, $args = arguments;

                return wrapGenerator(function filter$($ctx) {
                    while (1) switch ($ctx.next) {
                    case 0:
                        $ctx.next = 2;

                        return {
                            "start": {
                                "line": 66,
                                "column": 4
                            },

                            "end": {
                                "line": 73,
                                "column": 29
                            }
                        }
                    case 2:
                        $ctx.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = toObject(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx.sent;
                        $ctx.t8 = splitString;

                        if (!$ctx.t8) {
                            $ctx.next = 11;
                            break;
                        }

                        $ctx.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx.t9 = $ctx.sent;
                        $ctx.t8 = $ctx.t9 == "[object String]";
                    case 11:
                        if (!$ctx.t8) {
                            $ctx.next = 17;
                            break;
                        }

                        $ctx.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = this.split("");
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx.t10 = $ctx.sent;
                        $ctx.next = 18;
                        break;
                    case 17:
                        $ctx.t10 = object;
                    case 18:
                        self = $ctx.t10;
                        length = self.length >>> 0;
                        result = [];
                        thisp = $args[1];
                        $ctx.next = 24;

                        return {
                            "start": {
                                "line": 76,
                                "column": 4
                            },

                            "end": {
                                "line": 78,
                                "column": 5
                            }
                        }
                    case 24:
                        $ctx.next = 26;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(fun);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 26:
                        $ctx.t11 = $ctx.sent;

                        if (!($ctx.t11 != "[object Function]")) {
                            $ctx.next = 31;
                            break;
                        }

                        $ctx.next = 30;

                        return {
                            "start": {
                                "line": 77,
                                "column": 8
                            },

                            "end": {
                                "line": 77,
                                "column": 56
                            }
                        }
                    case 30:
                        throw new TypeError(fun + " is not a function");
                    case 31:
                        $ctx.next = 33;

                        return {
                            "start": {
                                "line": 80,
                                "column": 4
                            },

                            "end": {
                                "line": 87,
                                "column": 5
                            }
                        }
                    case 33:
                        i = 0;
                    case 34:
                        if (!(i < length)) {
                            $ctx.next = 53;
                            break;
                        }

                        $ctx.next = 37;

                        return {
                            "start": {
                                "line": 81,
                                "column": 8
                            },

                            "end": {
                                "line": 86,
                                "column": 9
                            }
                        }
                    case 37:
                        if (!(i in self)) {
                            $ctx.next = 50;
                            break;
                        }

                        $ctx.next = 40;

                        return {
                            "start": {
                                "line": 82,
                                "column": 12
                            },

                            "end": {
                                "line": 82,
                                "column": 28
                            }
                        }
                    case 40:
                        value = self[i];
                        $ctx.next = 43;

                        return {
                            "start": {
                                "line": 83,
                                "column": 12
                            },

                            "end": {
                                "line": 85,
                                "column": 13
                            }
                        }
                    case 43:
                        $ctx.next = 45;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = fun.call(thisp, value, i, object);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 45:
                        if (!$ctx.sent) {
                            $ctx.next = 50;
                            break;
                        }

                        $ctx.next = 48;

                        return {
                            "start": {
                                "line": 84,
                                "column": 16
                            },

                            "end": {
                                "line": 84,
                                "column": 35
                            }
                        }
                    case 48:
                        $ctx.next = 50;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = result.push(value);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 50:
                        i++;
                        $ctx.next = 34;
                        break;
                    case 53:
                        $ctx.next = 55;

                        return {
                            "start": {
                                "line": 88,
                                "column": 4
                            },

                            "end": {
                                "line": 88,
                                "column": 18
                            }
                        }
                    case 55:
                        $ctx.rval = result;
                        delete $ctx.thrown;
                        $ctx.next = 59;
                        break;
                    case 59:
                    case "end":
                        return $ctx.stop();
                    }
                }, this);
            });

            $ctx.next = 31;

            return {
                "start": {
                    "line": 93,
                    "column": 0
                },

                "end": {
                    "line": 112,
                    "column": 2
                }
            }
        case 31:
            Array.prototype.every = wrapGenerator.mark(function every(fun /*, thisp */) {
                var object, self, length, thisp, i, $args = arguments;

                return wrapGenerator(function every$($ctx) {
                    while (1) switch ($ctx.next) {
                    case 0:
                        $ctx.next = 2;

                        return {
                            "start": {
                                "line": 94,
                                "column": 4
                            },

                            "end": {
                                "line": 99,
                                "column": 29
                            }
                        }
                    case 2:
                        $ctx.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = toObject(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx.sent;
                        $ctx.t12 = splitString;

                        if (!$ctx.t12) {
                            $ctx.next = 11;
                            break;
                        }

                        $ctx.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx.t13 = $ctx.sent;
                        $ctx.t12 = $ctx.t13 == "[object String]";
                    case 11:
                        if (!$ctx.t12) {
                            $ctx.next = 17;
                            break;
                        }

                        $ctx.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = this.split("");
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx.t14 = $ctx.sent;
                        $ctx.next = 18;
                        break;
                    case 17:
                        $ctx.t14 = object;
                    case 18:
                        self = $ctx.t14;
                        length = self.length >>> 0;
                        thisp = $args[1];
                        $ctx.next = 23;

                        return {
                            "start": {
                                "line": 102,
                                "column": 4
                            },

                            "end": {
                                "line": 104,
                                "column": 5
                            }
                        }
                    case 23:
                        $ctx.next = 25;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(fun);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 25:
                        $ctx.t15 = $ctx.sent;

                        if (!($ctx.t15 != "[object Function]")) {
                            $ctx.next = 30;
                            break;
                        }

                        $ctx.next = 29;

                        return {
                            "start": {
                                "line": 103,
                                "column": 8
                            },

                            "end": {
                                "line": 103,
                                "column": 56
                            }
                        }
                    case 29:
                        throw new TypeError(fun + " is not a function");
                    case 30:
                        $ctx.next = 32;

                        return {
                            "start": {
                                "line": 106,
                                "column": 4
                            },

                            "end": {
                                "line": 110,
                                "column": 5
                            }
                        }
                    case 32:
                        i = 0;
                    case 33:
                        if (!(i < length)) {
                            $ctx.next = 51;
                            break;
                        }

                        $ctx.next = 36;

                        return {
                            "start": {
                                "line": 107,
                                "column": 8
                            },

                            "end": {
                                "line": 109,
                                "column": 9
                            }
                        }
                    case 36:
                        $ctx.t16 = i in self;

                        if (!$ctx.t16) {
                            $ctx.next = 41;
                            break;
                        }

                        $ctx.next = 40;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = fun.call(thisp, self[i], i, object);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 40:
                        $ctx.t16 = !$ctx.sent;
                    case 41:
                        if (!$ctx.t16) {
                            $ctx.next = 48;
                            break;
                        }

                        $ctx.next = 44;

                        return {
                            "start": {
                                "line": 108,
                                "column": 12
                            },

                            "end": {
                                "line": 108,
                                "column": 25
                            }
                        }
                    case 44:
                        $ctx.rval = false;
                        delete $ctx.thrown;
                        $ctx.next = 57;
                        break;
                    case 48:
                        i++;
                        $ctx.next = 33;
                        break;
                    case 51:
                        $ctx.next = 53;

                        return {
                            "start": {
                                "line": 111,
                                "column": 4
                            },

                            "end": {
                                "line": 111,
                                "column": 16
                            }
                        }
                    case 53:
                        $ctx.rval = true;
                        delete $ctx.thrown;
                        $ctx.next = 57;
                        break;
                    case 57:
                    case "end":
                        return $ctx.stop();
                    }
                }, this);
            });

            $ctx.next = 34;

            return {
                "start": {
                    "line": 115,
                    "column": 0
                },

                "end": {
                    "line": 134,
                    "column": 2
                }
            }
        case 34:
            Array.prototype.some = wrapGenerator.mark(function some(fun /*, thisp */) {
                var object, self, length, thisp, i, $args = arguments;

                return wrapGenerator(function some$($ctx) {
                    while (1) switch ($ctx.next) {
                    case 0:
                        $ctx.next = 2;

                        return {
                            "start": {
                                "line": 116,
                                "column": 4
                            },

                            "end": {
                                "line": 121,
                                "column": 29
                            }
                        }
                    case 2:
                        $ctx.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = toObject(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx.sent;
                        $ctx.t17 = splitString;

                        if (!$ctx.t17) {
                            $ctx.next = 11;
                            break;
                        }

                        $ctx.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx.t18 = $ctx.sent;
                        $ctx.t17 = $ctx.t18 == "[object String]";
                    case 11:
                        if (!$ctx.t17) {
                            $ctx.next = 17;
                            break;
                        }

                        $ctx.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = this.split("");
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx.t19 = $ctx.sent;
                        $ctx.next = 18;
                        break;
                    case 17:
                        $ctx.t19 = object;
                    case 18:
                        self = $ctx.t19;
                        length = self.length >>> 0;
                        thisp = $args[1];
                        $ctx.next = 23;

                        return {
                            "start": {
                                "line": 124,
                                "column": 4
                            },

                            "end": {
                                "line": 126,
                                "column": 5
                            }
                        }
                    case 23:
                        $ctx.next = 25;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(fun);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 25:
                        $ctx.t20 = $ctx.sent;

                        if (!($ctx.t20 != "[object Function]")) {
                            $ctx.next = 30;
                            break;
                        }

                        $ctx.next = 29;

                        return {
                            "start": {
                                "line": 125,
                                "column": 8
                            },

                            "end": {
                                "line": 125,
                                "column": 56
                            }
                        }
                    case 29:
                        throw new TypeError(fun + " is not a function");
                    case 30:
                        $ctx.next = 32;

                        return {
                            "start": {
                                "line": 128,
                                "column": 4
                            },

                            "end": {
                                "line": 132,
                                "column": 5
                            }
                        }
                    case 32:
                        i = 0;
                    case 33:
                        if (!(i < length)) {
                            $ctx.next = 51;
                            break;
                        }

                        $ctx.next = 36;

                        return {
                            "start": {
                                "line": 129,
                                "column": 8
                            },

                            "end": {
                                "line": 131,
                                "column": 9
                            }
                        }
                    case 36:
                        $ctx.t21 = i in self;

                        if (!$ctx.t21) {
                            $ctx.next = 41;
                            break;
                        }

                        $ctx.next = 40;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = fun.call(thisp, self[i], i, object);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 40:
                        $ctx.t21 = $ctx.sent;
                    case 41:
                        if (!$ctx.t21) {
                            $ctx.next = 48;
                            break;
                        }

                        $ctx.next = 44;

                        return {
                            "start": {
                                "line": 130,
                                "column": 12
                            },

                            "end": {
                                "line": 130,
                                "column": 24
                            }
                        }
                    case 44:
                        $ctx.rval = true;
                        delete $ctx.thrown;
                        $ctx.next = 57;
                        break;
                    case 48:
                        i++;
                        $ctx.next = 33;
                        break;
                    case 51:
                        $ctx.next = 53;

                        return {
                            "start": {
                                "line": 133,
                                "column": 4
                            },

                            "end": {
                                "line": 133,
                                "column": 17
                            }
                        }
                    case 53:
                        $ctx.rval = false;
                        delete $ctx.thrown;
                        $ctx.next = 57;
                        break;
                    case 57:
                    case "end":
                        return $ctx.stop();
                    }
                }, this);
            });

            $ctx.next = 37;

            return {
                "start": {
                    "line": 136,
                    "column": 0
                },

                "end": {
                    "line": 178,
                    "column": 2
                }
            }
        case 37:
            Array.prototype.reduce = wrapGenerator.mark(function reduce(fun /*, initial*/) {
                var object, self, length, i, result, $args = arguments;

                return wrapGenerator(function reduce$($ctx) {
                    while (1) switch ($ctx.next) {
                    case 0:
                        $ctx.next = 2;

                        return {
                            "start": {
                                "line": 137,
                                "column": 4
                            },

                            "end": {
                                "line": 141,
                                "column": 35
                            }
                        }
                    case 2:
                        $ctx.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = toObject(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx.sent;
                        $ctx.t22 = splitString;

                        if (!$ctx.t22) {
                            $ctx.next = 11;
                            break;
                        }

                        $ctx.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx.t23 = $ctx.sent;
                        $ctx.t22 = $ctx.t23 == "[object String]";
                    case 11:
                        if (!$ctx.t22) {
                            $ctx.next = 17;
                            break;
                        }

                        $ctx.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = this.split("");
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx.t24 = $ctx.sent;
                        $ctx.next = 18;
                        break;
                    case 17:
                        $ctx.t24 = object;
                    case 18:
                        self = $ctx.t24;
                        length = self.length >>> 0;
                        $ctx.next = 22;

                        return {
                            "start": {
                                "line": 144,
                                "column": 4
                            },

                            "end": {
                                "line": 146,
                                "column": 5
                            }
                        }
                    case 22:
                        $ctx.next = 24;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(fun);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 24:
                        $ctx.t25 = $ctx.sent;

                        if (!($ctx.t25 != "[object Function]")) {
                            $ctx.next = 29;
                            break;
                        }

                        $ctx.next = 28;

                        return {
                            "start": {
                                "line": 145,
                                "column": 8
                            },

                            "end": {
                                "line": 145,
                                "column": 56
                            }
                        }
                    case 28:
                        throw new TypeError(fun + " is not a function");
                    case 29:
                        $ctx.next = 31;

                        return {
                            "start": {
                                "line": 149,
                                "column": 4
                            },

                            "end": {
                                "line": 151,
                                "column": 5
                            }
                        }
                    case 31:
                        if (!(!length && $args.length == 1)) {
                            $ctx.next = 35;
                            break;
                        }

                        $ctx.next = 34;

                        return {
                            "start": {
                                "line": 150,
                                "column": 8
                            },

                            "end": {
                                "line": 150,
                                "column": 75
                            }
                        }
                    case 34:
                        throw new TypeError("reduce of empty array with no initial value");
                    case 35:
                        $ctx.next = 37;

                        return {
                            "start": {
                                "line": 153,
                                "column": 4
                            },

                            "end": {
                                "line": 153,
                                "column": 14
                            }
                        }
                    case 37:
                        i = 0;
                        $ctx.next = 40;

                        return {
                            "start": {
                                "line": 154,
                                "column": 4
                            },

                            "end": {
                                "line": 154,
                                "column": 15
                            }
                        }
                    case 40:
                        $ctx.next = 42;

                        return {
                            "start": {
                                "line": 155,
                                "column": 4
                            },

                            "end": {
                                "line": 169,
                                "column": 5
                            }
                        }
                    case 42:
                        if (!($args.length >= 2)) {
                            $ctx.next = 48;
                            break;
                        }

                        $ctx.next = 45;

                        return {
                            "start": {
                                "line": 156,
                                "column": 8
                            },

                            "end": {
                                "line": 156,
                                "column": 30
                            }
                        }
                    case 45:
                        result = $args[1];
                        $ctx.next = 68;
                        break;
                    case 48:
                        $ctx.next = 50;

                        return {
                            "start": {
                                "line": 158,
                                "column": 8
                            },

                            "end": {
                                "line": 168,
                                "column": 23
                            }
                        }
                    case 50:
                        $ctx.next = 52;

                        return {
                            "start": {
                                "line": 159,
                                "column": 12
                            },

                            "end": {
                                "line": 162,
                                "column": 13
                            }
                        }
                    case 52:
                        if (!(i in self)) {
                            $ctx.next = 61;
                            break;
                        }

                        $ctx.next = 55;

                        return {
                            "start": {
                                "line": 160,
                                "column": 16
                            },

                            "end": {
                                "line": 160,
                                "column": 35
                            }
                        }
                    case 55:
                        result = self[i++];
                        $ctx.next = 58;

                        return {
                            "start": {
                                "line": 161,
                                "column": 16
                            },

                            "end": {
                                "line": 161,
                                "column": 22
                            }
                        }
                    case 58:
                        delete $ctx.thrown;
                        $ctx.next = 68;
                        break;
                    case 61:
                        $ctx.next = 63;

                        return {
                            "start": {
                                "line": 165,
                                "column": 12
                            },

                            "end": {
                                "line": 167,
                                "column": 13
                            }
                        }
                    case 63:
                        if (!(++i >= length)) {
                            $ctx.next = 67;
                            break;
                        }

                        $ctx.next = 66;

                        return {
                            "start": {
                                "line": 166,
                                "column": 16
                            },

                            "end": {
                                "line": 166,
                                "column": 83
                            }
                        }
                    case 66:
                        throw new TypeError("reduce of empty array with no initial value");
                    case 67:
                        if (true) {
                            $ctx.next = 50;
                            break;
                        }
                    case 68:
                        $ctx.next = 70;

                        return {
                            "start": {
                                "line": 171,
                                "column": 4
                            },

                            "end": {
                                "line": 175,
                                "column": 5
                            }
                        }
                    case 70:
                        if (!(i < length)) {
                            $ctx.next = 82;
                            break;
                        }

                        $ctx.next = 73;

                        return {
                            "start": {
                                "line": 172,
                                "column": 8
                            },

                            "end": {
                                "line": 174,
                                "column": 9
                            }
                        }
                    case 73:
                        if (!(i in self)) {
                            $ctx.next = 79;
                            break;
                        }

                        $ctx.next = 76;

                        return {
                            "start": {
                                "line": 173,
                                "column": 12
                            },

                            "end": {
                                "line": 173,
                                "column": 66
                            }
                        }
                    case 76:
                        $ctx.next = 78;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = fun.call(void 0, result, self[i], i, object);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 78:
                        result = $ctx.sent;
                    case 79:
                        i++;
                        $ctx.next = 70;
                        break;
                    case 82:
                        $ctx.next = 84;

                        return {
                            "start": {
                                "line": 177,
                                "column": 4
                            },

                            "end": {
                                "line": 177,
                                "column": 18
                            }
                        }
                    case 84:
                        $ctx.rval = result;
                        delete $ctx.thrown;
                        $ctx.next = 88;
                        break;
                    case 88:
                    case "end":
                        return $ctx.stop();
                    }
                }, this);
            });

            $ctx.next = 40;

            return {
                "start": {
                    "line": 181,
                    "column": 0
                },

                "end": {
                    "line": 226,
                    "column": 2
                }
            }
        case 40:
            Array.prototype.reduceRight = wrapGenerator.mark(function reduceRight(fun /*, initial*/) {
                var object, self, length, result, i, $args = arguments;

                return wrapGenerator(function reduceRight$($ctx) {
                    while (1) switch ($ctx.next) {
                    case 0:
                        $ctx.next = 2;

                        return {
                            "start": {
                                "line": 182,
                                "column": 4
                            },

                            "end": {
                                "line": 186,
                                "column": 35
                            }
                        }
                    case 2:
                        $ctx.next = 4;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = toObject(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 4:
                        object = $ctx.sent;
                        $ctx.t26 = splitString;

                        if (!$ctx.t26) {
                            $ctx.next = 11;
                            break;
                        }

                        $ctx.next = 9;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(this);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 9:
                        $ctx.t27 = $ctx.sent;
                        $ctx.t26 = $ctx.t27 == "[object String]";
                    case 11:
                        if (!$ctx.t26) {
                            $ctx.next = 17;
                            break;
                        }

                        $ctx.next = 14;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = this.split("");
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 14:
                        $ctx.t28 = $ctx.sent;
                        $ctx.next = 18;
                        break;
                    case 17:
                        $ctx.t28 = object;
                    case 18:
                        self = $ctx.t28;
                        length = self.length >>> 0;
                        $ctx.next = 22;

                        return {
                            "start": {
                                "line": 189,
                                "column": 4
                            },

                            "end": {
                                "line": 191,
                                "column": 5
                            }
                        }
                    case 22:
                        $ctx.next = 24;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = _toString(fun);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 24:
                        $ctx.t29 = $ctx.sent;

                        if (!($ctx.t29 != "[object Function]")) {
                            $ctx.next = 29;
                            break;
                        }

                        $ctx.next = 28;

                        return {
                            "start": {
                                "line": 190,
                                "column": 8
                            },

                            "end": {
                                "line": 190,
                                "column": 56
                            }
                        }
                    case 28:
                        throw new TypeError(fun + " is not a function");
                    case 29:
                        $ctx.next = 31;

                        return {
                            "start": {
                                "line": 194,
                                "column": 4
                            },

                            "end": {
                                "line": 196,
                                "column": 5
                            }
                        }
                    case 31:
                        if (!(!length && $args.length == 1)) {
                            $ctx.next = 35;
                            break;
                        }

                        $ctx.next = 34;

                        return {
                            "start": {
                                "line": 195,
                                "column": 8
                            },

                            "end": {
                                "line": 195,
                                "column": 80
                            }
                        }
                    case 34:
                        throw new TypeError("reduceRight of empty array with no initial value");
                    case 35:
                        $ctx.next = 37;

                        return {
                            "start": {
                                "line": 198,
                                "column": 4
                            },

                            "end": {
                                "line": 198,
                                "column": 31
                            }
                        }
                    case 37:
                        i = length - 1;
                        $ctx.next = 40;

                        return {
                            "start": {
                                "line": 199,
                                "column": 4
                            },

                            "end": {
                                "line": 213,
                                "column": 5
                            }
                        }
                    case 40:
                        if (!($args.length >= 2)) {
                            $ctx.next = 46;
                            break;
                        }

                        $ctx.next = 43;

                        return {
                            "start": {
                                "line": 200,
                                "column": 8
                            },

                            "end": {
                                "line": 200,
                                "column": 30
                            }
                        }
                    case 43:
                        result = $args[1];
                        $ctx.next = 66;
                        break;
                    case 46:
                        $ctx.next = 48;

                        return {
                            "start": {
                                "line": 202,
                                "column": 8
                            },

                            "end": {
                                "line": 212,
                                "column": 23
                            }
                        }
                    case 48:
                        $ctx.next = 50;

                        return {
                            "start": {
                                "line": 203,
                                "column": 12
                            },

                            "end": {
                                "line": 206,
                                "column": 13
                            }
                        }
                    case 50:
                        if (!(i in self)) {
                            $ctx.next = 59;
                            break;
                        }

                        $ctx.next = 53;

                        return {
                            "start": {
                                "line": 204,
                                "column": 16
                            },

                            "end": {
                                "line": 204,
                                "column": 35
                            }
                        }
                    case 53:
                        result = self[i--];
                        $ctx.next = 56;

                        return {
                            "start": {
                                "line": 205,
                                "column": 16
                            },

                            "end": {
                                "line": 205,
                                "column": 22
                            }
                        }
                    case 56:
                        delete $ctx.thrown;
                        $ctx.next = 66;
                        break;
                    case 59:
                        $ctx.next = 61;

                        return {
                            "start": {
                                "line": 209,
                                "column": 12
                            },

                            "end": {
                                "line": 211,
                                "column": 13
                            }
                        }
                    case 61:
                        if (!(--i < 0)) {
                            $ctx.next = 65;
                            break;
                        }

                        $ctx.next = 64;

                        return {
                            "start": {
                                "line": 210,
                                "column": 16
                            },

                            "end": {
                                "line": 210,
                                "column": 88
                            }
                        }
                    case 64:
                        throw new TypeError("reduceRight of empty array with no initial value");
                    case 65:
                        if (true) {
                            $ctx.next = 48;
                            break;
                        }
                    case 66:
                        $ctx.next = 68;

                        return {
                            "start": {
                                "line": 215,
                                "column": 4
                            },

                            "end": {
                                "line": 217,
                                "column": 5
                            }
                        }
                    case 68:
                        if (!(i < 0)) {
                            $ctx.next = 75;
                            break;
                        }

                        $ctx.next = 71;

                        return {
                            "start": {
                                "line": 216,
                                "column": 8
                            },

                            "end": {
                                "line": 216,
                                "column": 22
                            }
                        }
                    case 71:
                        $ctx.rval = result;
                        delete $ctx.thrown;
                        $ctx.next = 92;
                        break;
                    case 75:
                        $ctx.next = 77;

                        return {
                            "start": {
                                "line": 219,
                                "column": 4
                            },

                            "end": {
                                "line": 223,
                                "column": 18
                            }
                        }
                    case 77:
                        $ctx.next = 79;

                        return {
                            "start": {
                                "line": 220,
                                "column": 8
                            },

                            "end": {
                                "line": 222,
                                "column": 9
                            }
                        }
                    case 79:
                        if (!(i in this)) {
                            $ctx.next = 85;
                            break;
                        }

                        $ctx.next = 82;

                        return {
                            "start": {
                                "line": 221,
                                "column": 12
                            },

                            "end": {
                                "line": 221,
                                "column": 66
                            }
                        }
                    case 82:
                        $ctx.next = 84;

                        return __thunk(wrapGenerator.mark(function thunk() {
                            return wrapGenerator(function thunk$($ctx) {
                                while (1) switch ($ctx.next) {
                                case 0:
                                    $ctx.rval = fun.call(void 0, result, self[i], i, object);
                                    delete $ctx.thrown;
                                    $ctx.next = 4;
                                    break;
                                case 4:
                                case "end":
                                    return $ctx.stop();
                                }
                            }, this);
                        }), this);
                    case 84:
                        result = $ctx.sent;
                    case 85:
                        if (i--) {
                            $ctx.next = 77;
                            break;
                        }
                    case 86:
                        $ctx.next = 88;

                        return {
                            "start": {
                                "line": 225,
                                "column": 4
                            },

                            "end": {
                                "line": 225,
                                "column": 18
                            }
                        }
                    case 88:
                        $ctx.rval = result;
                        delete $ctx.thrown;
                        $ctx.next = 92;
                        break;
                    case 92:
                    case "end":
                        return $ctx.stop();
                    }
                }, this);
            });
        case 41:
        case "end":
            return $ctx.stop();
        }
    }, this);
}
