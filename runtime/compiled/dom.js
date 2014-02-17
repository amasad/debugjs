(function () {

  if (typeof Event !== 'undefined') {
    var _stopProp = Event.prototype.stopPropagation;
    Event.prototype.stopPropagation = function () {
      this.__isPropagationStopped = true;
      _stopProp.apply(this, arguments);
    };
  }

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
