import Derective from './derective'
const { direcUtil, isEventDirec, isDirec } = Derective

class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    this.fragments = this.node2Fragments(this.el)
    this.compile(this.fragments)
    this.el.appendChild(this.fragments)
  }
  node2Fragments(el) {
    let fragments = document.createDocumentFragment(),
      child
    while ((child = el.firstChild)) {
      // notice 'appendChild' will remove the existing node from dom.
      fragments.appendChild(child)
    }
    return fragments
  }
  compile(fragment) {
    let childnodes = fragment.childNodes
    childnodes &&
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
    console.log(attributes)
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
    console.log(key, exp)
    if (isEventDirec(key)) {
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
      result = reg.exec(text)
    if (result !== null) {
      let keys = result[1]
      direcUtil.bind(node, this.vm, keys)
    }
  }
  isElementNode(node) {
    return node.nodeType && node.nodeType === 1
  }
  isTextNode(node) {
    return node.nodeType && node.nodeType === 3
  }
}
export default Compiler
