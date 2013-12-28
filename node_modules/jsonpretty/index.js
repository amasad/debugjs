module.exports = prettyPrint;
function prettyPrint(o, indent) {
  indent = indent || '';
  var ret = '';
  if (typeof o === 'object' && o instanceof Array) {
    ret += printArray(o, indent);
  } else if (o && typeof o === 'object' && o.constructor.name === 'Object') {
    ret += printObj(o, indent);
  } else {
    ret += printVal(o, indent);
  }
  return ret;
}

function escapeString(s) {
  return JSON.stringify(s);
}

function printArray(o, indent) {
  var ret = '';
  ret += '[' + '\n';
  var a = o.filter(function (value) { return value !== undefined; });
  a.forEach(function (value, i) {
    if (value !== undefined) {
      ret += '  ' + indent + prettyPrint(value, indent + '  ') +
             ((i === a.length - 1) ? '' : ',') + '\n';
    }
  });
  ret += indent + ']';
  return ret;
}

function printObj(o, indent) {
  var ret = '';
  ret += '{' + '\n';
  var keys = Object.keys(o).filter(function (key) {
    return o[key] !== undefined;
  });
  keys.forEach(function (key, i) {
    var value = o[key];
    ret += '  ' + indent + escapeString(key) + ': ' +
           prettyPrint(value, indent + '  ') +
           ((i === keys.length - 1) ? '' : ',') + '\n';
  });
  ret += indent + '}';
  return ret;
}

function printVal(o, indent) {
  var ret = '';
  if (o === null) {
    ret += 'null';
  } else if (typeof o === 'number' || typeof o === 'boolean') {
    ret += o.toString();
  } else {
    ret += escapeString(o.toString());
  }
  return ret;
}
