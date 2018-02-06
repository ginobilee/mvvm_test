import { derecHandlers, isEventDirec, isDirec } from './derective'

class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    this.fragments = this.node2Fragments(el)
    this.compile(this.fragments)
    this.el.childnodes = this.fragments
  }
  node2Fragments(el) {
    let fragments = document.createDocumentFragment(),
      child
    while ((child = el.firstChild)) {
      fragments.appendChild(child)
    }
    return fragments
  }
  compile(fragment) {
    let childnodes = fragment.childnodes
    console.log(childnodes)
    Array.prototype.slice.apply(childnodes).forEach(node => {
      if (this.isElementNode(node)) {
        this.compileNode(node)
      } else if (this.isTextNode(node)) {
        this.compileTextNode(node)
      }
    })
  }
  compileNode(node) {
    // 首先解析其属性，查看是否有指令
    let attributes = node.attributes
    Array.prototype.slice.apply(attributes).forEach(attr => {
      this.compileAttr(node, attr)
    })
    this.compile(node)
    /* let childnodes = node.childnodes
    [].slice.apply(childnodes).forEach(cn => {
      this.compile(cn)
    })*/
  }
  compileAttr(node, attr) {
    let key = attr.name,
      exp = attr.value
    if (Derective.isEventDirec(key)) {
      let dir = key.split(':')[1] // 事件类型
      Derective.bindEvent(node, this.vm, exp, dir)
    } else if (Derective.isDirec(key)) {
      let dir = key.substring(2) // 指令名
      Derective.bindDirec(node, this.vm, exp, dir)
    }
    node.removeAttribute(key)
  }
  compileTextNode(node) {
    let text = node.textContent,
      reg = /\{\{(.*)\}\}/g,
      result
    while ((result = reg.exec(text) !== null)) {
      let key = this.parseKey(result[1])
      Derective.derecHandlers.bind(node, key, this.vm)
    }
  }
  isElementNode(node) {
    return node.nodeType && node.nodeType === 1
  }
}
export default Compiler
