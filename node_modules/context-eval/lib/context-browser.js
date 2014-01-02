function Context(sandbox, parentElement) {
  this.iframe = document.createElement('iframe');
  this.iframe.style.display = 'none';
  parentElement = parentElement || document.body;
  parentElement.appendChild(this.iframe);
  var win = this.iframe.contentWindow;
  sandbox = sandbox || {};
  Object.keys(sandbox).forEach(function (key) {
    win[key] = sandbox[key];
  });
}

Context.prototype.evaluate = function (code) {
  return this.iframe.contentWindow.eval(code);
};

Context.prototype.destroy = function () {
  if (this.iframe) {
    this.iframe.parentNode.removeChild(this.iframe);
    this.iframe = null;
  }
};

module.exports = Context;