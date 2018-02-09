import ActiveWatcher from './activeWatcher'
import Subscriber from './subscriber'

// 普通命令的绑定
const direcUtil = {
  bind: (node, vm, keys) => {
    // v-bind, 或如{{data}}的处理函数
    let text = node.textContent
    let sub = new Subscriber(node)
    ActiveWatcher.push(sub)
    let keyArr = keys.split('.')
    let dataInStore = keyArr.reduce((acc, prop) => {
      return acc[prop]
    }, vm.state)

    // let dataInStore = vm.state[keys]
    if (!dataInStore) {
      // if not found in stroe, return
      return
    }
    // here to differentiate 'v-bind' and {{}}.
    let nextText = text.includes(`{{${keys}}}`)
      ? text.replace(`{{${keys}}}`, dataInStore)
      : dataInStore
    ActiveWatcher.pop()
    node.textContent = nextText
    sub.update = v => {
      // user 'nextText' and dataInStore as free var to update only needed text.
      nextText = nextText.replace(dataInStore, v)
      dataInStore = v
      node.textContent = nextText
    }
  },
  model: (node, vm, keys) => {
    console.log('model', vm.state[keys])
    let sub = new Subscriber(node)
    ActiveWatcher.push(sub)
    node.value = vm.state[keys]
    ActiveWatcher.pop(sub)
    sub.update = v => {
      node.value = v
    }

    // dom -> store.
    node.addEventListener('input', e => {
      e.preventDefault()
      vm.state[keys] = e.target.value
    })
  }
}
const Derective = {
  isEventDirec: function(der) {
    return /^v-on/.test(der)
  },
  isDirec: function(der) {
    return /^v-/.test(der)
  },
  bindDirec: function(node, vm, exp, dir) {
    // 节点属性中普通命令的处理, 如'bind', 'model'
    console.log(node, vm, exp, dir)
    let cb = direcUtil[dir]
    cb && cb(node, vm, exp)
  },
  bindEvent: function(node, vm, exp, dir) {
    // 节点属性中事件的处理，如'v-on:click'的处理
    var eventType = dir.split(':')[1],
      fn = vm.$options.methods && vm.$options.methods[exp]

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false)
    }
  },
  direcUtil: direcUtil
}
export default Derective
