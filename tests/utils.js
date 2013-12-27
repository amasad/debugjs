
exports.fnString = function fnString(fn) {
  return fn
    .toString()
    .split('\n')
    .slice(1, -1)
    .map(function (s) { return s.replace(/^\s+/, ''); })
    .join('\n');
};
