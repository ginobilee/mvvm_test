'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _observer = require('./observer');

var _observer2 = _interopRequireDefault(_observer);

var _compiler = require('./compiler');

var _compiler2 = _interopRequireDefault(_compiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MVVM {
  constructor(options) {
    this.el = options.el || document.body;
    this.state = options.state;
    var me = this;

    this.observer = new _observer2.default(this.state);
    // proxy data to this.
    // this.compiler = new Compiler(this.el, me)
  }
}
exports.default = MVVM;