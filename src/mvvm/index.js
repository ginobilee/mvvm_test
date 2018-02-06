import Observer from './observer'
import Compiler from './compiler'
class MVVM {
  constructor(options) {
    console.log('mvvm')
    this.el = options.el || document.body
    this.state = options.state
    var me = this

    this.observer = new Observer(this.state)
    // proxy data to this.
    this.compiler = new Compiler(this.el, me)
  }
}
export default MVVM
