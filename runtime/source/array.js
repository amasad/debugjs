// Shortcut to an often accessed properties, in order to avoid multiple
// dereference that costs universally.
// _Please note: Shortcuts are defined after `Function.prototype.bind` as we
// us it in defining shortcuts.
var call = Function.prototype.call;
var prototypeOfObject = Object.prototype;
// Having a toString local variable name breaks in Opera so use _toString.
var _toString = call.bind(prototypeOfObject.toString);
var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert "+o+" to object");
    }
    return Object(o);
};


var boxedString = Object("a"),
    splitString = boxedString[0] != "a" || !(0 in boxedString);
Array.prototype.forEach = function forEach(fun /*, thisp*/) {
    var object = toObject(this),
        self = splitString && _toString(this) == "[object String]" ?
            this.split("") :
            object,
        thisp = arguments[1],
        i = -1,
        length = self.length >>> 0;

    // If no callback function or if callback is not a callable function
    if (_toString(fun) != "[object Function]") {
        throw new TypeError(); // TODO message
    }

    while (++i < length) {
        if (i in self) {
            // Invoke the callback function with call, passing arguments:
            // context, property value, property key, thisArg object
            // context
            fun.call(thisp, self[i], i, object);
        }
    }
};


Array.prototype.map = function map(fun /*, thisp*/) {
    var object = toObject(this),
        self = splitString && _toString(this) == "[object String]" ?
            this.split("") :
            object,
        length = self.length >>> 0,
        result = Array(length),
        thisp = arguments[1];

    // If no callback function or if callback is not a callable function
    if (_toString(fun) != "[object Function]") {
        throw new TypeError(fun + " is not a function");
    }

    for (var i = 0; i < length; i++) {
        if (i in self)
            result[i] = fun.call(thisp, self[i], i, object);
    }
    return result;
};

Array.prototype.filter = function filter(fun /*, thisp */) {
    var object = toObject(this),
        self = splitString && _toString(this) == "[object String]" ?
            this.split("") :
                object,
        length = self.length >>> 0,
        result = [],
        value,
        thisp = arguments[1];

    // If no callback function or if callback is not a callable function
    if (_toString(fun) != "[object Function]") {
        throw new TypeError(fun + " is not a function");
    }

    for (var i = 0; i < length; i++) {
        if (i in self) {
            value = self[i];
            if (fun.call(thisp, value, i, object)) {
                result.push(value);
            }
        }
    }
    return result;
};



Array.prototype.every = function every(fun /*, thisp */) {
    var object = toObject(this),
        self = splitString && _toString(this) == "[object String]" ?
            this.split("") :
            object,
        length = self.length >>> 0,
        thisp = arguments[1];

    // If no callback function or if callback is not a callable function
    if (_toString(fun) != "[object Function]") {
        throw new TypeError(fun + " is not a function");
    }

    for (var i = 0; i < length; i++) {
        if (i in self && !fun.call(thisp, self[i], i, object)) {
            return false;
        }
    }
    return true;
};


Array.prototype.some = function some(fun /*, thisp */) {
    var object = toObject(this),
        self = splitString && _toString(this) == "[object String]" ?
            this.split("") :
            object,
        length = self.length >>> 0,
        thisp = arguments[1];

    // If no callback function or if callback is not a callable function
    if (_toString(fun) != "[object Function]") {
        throw new TypeError(fun + " is not a function");
    }

    for (var i = 0; i < length; i++) {
        if (i in self && fun.call(thisp, self[i], i, object)) {
            return true;
        }
    }
    return false;
};

Array.prototype.reduce = function reduce(fun /*, initial*/) {
    var object = toObject(this),
        self = splitString && _toString(this) == "[object String]" ?
            this.split("") :
            object,
        length = self.length >>> 0;

    // If no callback function or if callback is not a callable function
    if (_toString(fun) != "[object Function]") {
        throw new TypeError(fun + " is not a function");
    }

    // no value to return if no initial value and an empty array
    if (!length && arguments.length == 1) {
        throw new TypeError("reduce of empty array with no initial value");
    }

    var i = 0;
    var result;
    if (arguments.length >= 2) {
        result = arguments[1];
    } else {
        do {
            if (i in self) {
                result = self[i++];
                break;
            }

            // if array contains no values, no initial value to return
            if (++i >= length) {
                throw new TypeError("reduce of empty array with no initial value");
            }
        } while (true);
    }

    for (; i < length; i++) {
        if (i in self) {
            result = fun.call(void 0, result, self[i], i, object);
        }
    }

    return result;
};


Array.prototype.reduceRight = function reduceRight(fun /*, initial*/) {
    var object = toObject(this),
        self = splitString && _toString(this) == "[object String]" ?
            this.split("") :
            object,
        length = self.length >>> 0;

    // If no callback function or if callback is not a callable function
    if (_toString(fun) != "[object Function]") {
        throw new TypeError(fun + " is not a function");
    }

    // no value to return if no initial value, empty array
    if (!length && arguments.length == 1) {
        throw new TypeError("reduceRight of empty array with no initial value");
    }

    var result, i = length - 1;
    if (arguments.length >= 2) {
        result = arguments[1];
    } else {
        do {
            if (i in self) {
                result = self[i--];
                break;
            }

            // if array contains no values, no initial value to return
            if (--i < 0) {
                throw new TypeError("reduceRight of empty array with no initial value");
            }
        } while (true);
    }

    if (i < 0) {
        return result;
    }

    do {
        if (i in this) {
            result = fun.call(void 0, result, self[i], i, object);
        }
    } while (i--);

    return result;
};
