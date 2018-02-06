'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _publisher = require('./publisher');

var _publisher2 = _interopRequireDefault(_publisher);

var _activeWatcher = require('./activeWatcher');

var _activeWatcher2 = _interopRequireDefault(_activeWatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Observer {
  constructor(state) {
    this.data = state;
    this.observe(this.data);
  }
  observe(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach(key => {
      this.defineObservable(data, key, data[key]);
    });
  }
  defineObservable(data, key, value) {
    var observer = new Observer(value),
        publisher = new _publisher2.default(value);

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function () {
        _activeWatcher2.default.length > 0 && publisher.addSub;
        return value;
      },
      set: function (v) {
        if (val === v) {
          return;
        }
        publisher.notify(v);
        observer = new Observer(v);
        value = v;
      }
    });
  }
}
exports.default = Observer;