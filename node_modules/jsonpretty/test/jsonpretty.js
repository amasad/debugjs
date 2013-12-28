var expect = require('chai').expect,
    jsonPretty = require('..'),
    fs = require('fs'),
    path = require('path'),
    testData = require('json-testdata').data;

describe('jsonpretty', function() {
  it('should be able to pretty print some JSON', function(done) {
    var obj = testData;
    var result = jsonPretty(obj);
    var expected = fs.readFileSync(path.join(__dirname, 'fixtures', 'expected.json'), 'utf8');
    expect(result).to.equal(expected);
    done();
  });
});
