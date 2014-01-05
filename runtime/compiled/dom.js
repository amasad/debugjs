(function () {

  if (typeof EventTarget !== 'undefined') {
    var _on = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener =
    function (type, listener, useCapture, wantsUntrusted) {
      return _on.call(
        this,
        type,
        __wrapListener(listener),
        useCapture,
        wantsUntrusted
      );
    };
  }

})();
