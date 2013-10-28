var ObjectElement = require('object-element');
var delegate = require('delegate');
var events = require('event');

ObjectElement.prototype.addEventListener = function (eventType, callback, capture) {
  var host = this;

  this.element.addEventListener(eventType, function () {
    callback.apply(host, arguments);
  }, capture);
}

ObjectElement.prototype.removeEventListener = function (eventType, callback, capture) {
  var host = this;

  this.element.removeEventListener(eventType, function () {
    callback.apply(host, arguments);
  }, capture);
}

ObjectElement.prototype.bind = function (eventType, callback, capture) {
  var host = this;

  events.bind(this.element, eventType, function () {
    callback.apply(host, arguments);
  }, capture);
}

ObjectElement.prototype.unbind = function (eventType, callback, capture) {
  var host = this;

  events.unbind(this.element, eventType, function () {
    callback.apply(host, arguments);
  }, capture);
}

ObjectElement.prototype.delegate = function (selector, eventType, callback, capture) {
  delegate.bind(this.element, selector, eventType, function (ev) {
    callback.apply(ObjectElement.wrapElement(ev.target), arguments);
  }, capture);
}

ObjectElement.prototype.undelegate = function (selector, eventType, callback, capture) {
  delegate.unbind(this.element, eventType, callback, capture);
}

ObjectElement.prototype._on = ObjectElement.prototype.on;
ObjectElement.prototype._off = ObjectElement.prototype.off;

ObjectElement.prototype.on = function (eventname) {
  var selector, callback, capture;

  if (arguments.length === 2) {
    // .on('click', onClick)
    callback = arguments[1];
    // console.log('proto.on', proto.on)
    this._on(eventname, callback);

    return this.bind(eventname, callback, false);
  }

  if (arguments.length === 3) {
    if (typeof arguments[1] === 'function') {
      // .on('click', onClick, true)
      callback = arguments[1];
      capture = arguments[2];

      return this.bind(eventname, callback, capture);
    } else {
      // .on('click', '.child', onClick)
      selector = arguments[1];
      callback = arguments[2];

      return this.delegate(selector, eventname, callback, false);
    }
  }

  if (arguments.length === 4) {
    // .on('click', '.child', onClick, capture)
    selector = arguments[1];
    callback = arguments[2];
    capture = arguments[3];

    return this.delegate(selector, eventname, callback, capture);
  }
}

ObjectElement.prototype.off = function (eventname) {
  var selector, callback, capture;

  if (arguments.length === 2) {
    // .off('click', onClick)
    callback = arguments[1];
    this._off(eventname, callback);

    return this.unbind(eventname, callback, false);
  }

  if (arguments.length === 3) {
    if (typeof arguments[1] === 'function') {
      // .off('click', onClick, true)
      callback = arguments[1];
      capture = arguments[2];

      return this.unbind(eventname, callback, capture);
    } else {
      // .off('click', '.child', onClick)
      selector = arguments[1];
      callback = arguments[2];

      return this.undelegate(selector, eventname, callback, false);
    }
  }

  if (arguments.length === 4) {
    // .off('click', '.child', onClick, capture)
    selector = arguments[1];
    callback = arguments[2];
    capture = arguments[3];

    return this.undelegate(selector, eventname, callback, capture);
  }
}
