var assert = require("assert");
var Path = require("../lib/path").Path;

describe("Path", function() {
  it("should have correct children", function() {
    var path = new Path({
      a: "asdf",
      b: {
        foo: 42,
        list: [1, 2, 3, 4, 5]
      },
    });

    var aPath = path.get("a");
    var fooPath = path.get("b", "foo");

    assert.strictEqual(aPath.value, "asdf");
    assert.strictEqual(fooPath.value, 42);
    assert.strictEqual(path.get("b"), fooPath.parentPath);

    var odds = path.get("b", "list").filter(function(childPath) {
      return childPath.value % 2 === 1;
    });

    assert.strictEqual(odds.length, 3);
    assert.deepEqual(odds.map(function(childPath) {
      return childPath.value;
    }), [1, 3, 5]);
  });
});

describe("replace method", function() {
  it("should work with single replacements", function() {
    var path = new Path({
      foo: 42
    });

    var foo = path.get("foo");
    assert.strictEqual(foo.value, 42);

    foo.replace("asdf");
    var newFoo = path.get("foo");
    assert.notStrictEqual(path.get("foo"), foo);
    assert.strictEqual(newFoo.value, "asdf");
    assert.strictEqual(newFoo.name, "foo");
  });

  it("should fail at the root", function() {
    assert.throws(function() {
      new Path(1).replace();
    }, assert.AssertionError);
  });

  it("should work with arrays", function() {
    var array = [1, 2, 3];
    var path = new Path(array);
    var second = path.get(1);
    var third = path.get(2);

    second.replace("a", "b", "c");

    assert.strictEqual(third.name, 4);
    assert.strictEqual(third.value, 3);
    assert.strictEqual(third, path.get(4));
    assert.strictEqual(array.length, 5);
    assert.deepEqual(array, [1, "a", "b", "c", 3]);
    assert.strictEqual(path.get(1).value, "a");
    assert.strictEqual(path.get(2).value, "b");
    assert.strictEqual(path.get(3).value, "c");

    path.get(2).replace();
    assert.deepEqual(array, [1, "a", "c", 3]);

    path = new Path([1, 2, 3, 4, 5]);

    path.get(0).replace();
    assert.deepEqual(path.value, [2, 3, 4, 5]);

    path.get(2).replace();
    assert.deepEqual(path.value, [2, 3, 5]);

    path.get(1).replace();
    assert.deepEqual(path.value, [2, 5]);

    path.get(1).replace();
    assert.deepEqual(path.value, [2]);

    path.get(0).replace();
    assert.deepEqual(path.value, []);

    path.get(0).replace(1, 2, 3);
    assert.deepEqual(path.value, [1, 2, 3]);

    path.get(10).replace(4, 5);
    assert.deepEqual(path.value, [1, 2, 3, 4, 5]);
  });

  var desc = "should support multiple replacements only for array elements";
  it(desc, function() {
    assert.throws(function() {
      new Path({ foo: 42 }).get("foo").replace(2, 3);
    });

    var path = new Path({ foo: 42 });
    assert.strictEqual("foo" in path.value, true);
    path.get("foo").replace();
    assert.strictEqual("foo" in path.value, false);
  });

  it("should return an array of new paths", function() {
    var path = new Path({ foo: 42 });

    var newPaths = path.get("foo").replace(43);
    assert.strictEqual(newPaths.length, 1);
    assert.strictEqual(newPaths[0].value, 43);
    assert.strictEqual(newPaths[0].parentPath, path);
    assert.deepEqual(path.value, { foo: 43 });

    newPaths = path.get("foo").replace();
    assert.deepEqual(newPaths, []);
    assert.deepEqual(path.value, {});

    newPaths = path.get("foo").replace(44);
    assert.strictEqual(newPaths.length, 1);
    assert.strictEqual(newPaths[0].value, 44);
    assert.strictEqual(newPaths[0].parentPath, path);
    assert.deepEqual(path.value, { foo: 44 });

    path = new Path({ list: [2, 4, 6, 8] });
    var four = path.get("list", 1);
    assert.strictEqual(four.value, 4);
    newPaths = four.replace(3, 4, 5);
    assert.deepEqual(path.value.list, [2, 3, 4, 5, 6, 8]);
    assert.deepEqual(newPaths.map(function(newPath) {
      assert.strictEqual(newPath.parentPath, four.parentPath);
      return newPath.value;
    }), [3, 4, 5]);

    var list = path.get("list");
    assert.deepEqual(list.map(function(childPath) {
      assert.strictEqual(list.value[childPath.name], childPath.value);
      return childPath.value;
    }), list.value);
  });
});

describe("Path iteration methods", function() {
  it("should skip holes", function() {
    var path = new Path([1,,3,,5]);
    var values = [];
    path.each(function(childPath) {
      values.push(childPath.value);
    });
    assert.deepEqual(values, [1, 3, 5]);
  });

  it("each should be aware of .replace", function() {
    var path = new Path([1, 2, "x", 5, 6]);
    var values = [];

    path.each(function(childPath) {
      values.push(childPath.value);
    });

    assert.deepEqual(values, path.value);
    values.length = 0;

    path.each(function(childPath) {
      if (childPath.value === "x") {
        childPath.replace(3, 4);
      } else {
        values.push(childPath.value);
      }
    });

    assert.deepEqual(values, [1, 2, 5, 6]);
    assert.deepEqual(path.value, [1, 2, 3, 4, 5, 6]);
  });

  it("map should be aware of .replace", function() {
    var path = new Path([1, 2, "x", 5, 6]);

    var values = path.map(function(childPath) {
      if (childPath.name === 0) {
        path.get(3).replace("y", "z");
      } else if (childPath.name === 2) {
        childPath.replace();
      }
      return childPath.value;
    });

    assert.deepEqual(values, [1, 2, "x", 5, 6]);
    assert.deepEqual(path.value, [1, 2, "y", "z", 6]);
  });

  it("filter should be aware of .replace", function() {
    var path = new Path([1, 2, "x", 5, 6]);

    var values = path.filter(function(childPath) {
      if (childPath.name === 0) {
        path.get(3).replace("y", "z");
      } else if (childPath.name === 2) {
        childPath.replace();
      }
      return typeof childPath.value === "number";
    }).map(function(childPath) {
      return childPath.value;
    });

    assert.deepEqual(values, [1, 2, 5, 6]);
    assert.deepEqual(path.value, [1, 2, "y", "z", 6]);
  });
});
