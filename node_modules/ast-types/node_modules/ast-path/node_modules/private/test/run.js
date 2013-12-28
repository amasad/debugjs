var assert = require("assert");
var makeAccessor = require("../private").makeAccessor;
var acc1 = makeAccessor();
var obj = {};

acc1(obj).foo = 42;
assert.deepEqual(obj, {});
assert.deepEqual(acc1(obj), { foo: 42 });
assert.deepEqual(acc1(acc1(obj)), {});
assert.deepEqual(acc1(obj), { foo: 42 });
assert.deepEqual(Object.keys(acc1(obj)), ["foo"]);
assert.strictEqual(Object.getOwnPropertyNames(acc1(obj)).length, 2);
assert.strictEqual(Object.getOwnPropertyNames(acc1(acc1(obj))).length, 0);
acc1(obj).bar = "baz";
assert.deepEqual(acc1(obj), { foo: 42, bar: "baz" });
delete acc1(obj).foo;
assert.deepEqual(acc1(obj), { bar: "baz" });

try {
    acc1(42);
    assert.ok(false, "should have thrown");
} catch (err) {
    assert.ok(err);
}

var acc2 = makeAccessor();
assert.notStrictEqual(acc1, acc2);
assert.notStrictEqual(acc1(obj), acc2(obj));
assert.deepEqual(acc2(obj), {});
assert.strictEqual(Object.getOwnPropertyNames(obj).length, 2);
assert.strictEqual(Object.keys(obj).length, 0);
acc2(obj).bar = "asdf";
assert.deepEqual(acc2(obj), { bar: "asdf" });

var green = "\033[32m";
var reset = "\033[0m";
console.log(green + "ALL PASS" + reset);
