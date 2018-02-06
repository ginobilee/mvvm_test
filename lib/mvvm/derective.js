'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _activeWatcher = require('./activeWatcher');

var _activeWatcher2 = _interopRequireDefault(_activeWatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 普通命令的绑定
const direcUtil = {
  bind: (node, vm, key) => {
    // v-bind, 或如{{data}}的处理函数
    let text = node.textContent;
    let sub = new Subscriber(node);
    _activeWatcher2.default.push(sub);
    text.replace(`{{${key}}}`, vm.key);
    _activeWatcher2.default.pop();
    node.textContent = text;
    sub.update = v => {
      node.textContent = text;
    };
  },
  model: (node, vm, key) => {
    node.value = vm[key];
  }
};
const Derective = {
  isEventDirec: function (der) {
    return (/^v-on/.test(der)
    );
  },
  isDirec: function (der) {
    return (/^v-/.test(der)
    );
  },
  bindDirec: function (node, vm, exp, dir) {
    // 节点属性中普通命令的处理, 如'bind', 'model'
    let cb = direcUtil[dir];
    cb && cb(node, vm, exp);
  },
  bindEvent: function (node, vm, exp, dir) {
    // 节点属性中事件的处理，如'v-on:click'的处理
    var eventType = dir.split(':')[1],
        fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  }
};
exports.default = Derective;