import Publisher from './publisher'
import ActiveWatcher from './activeWatcher'

class Observer {
  constructor(state) {
    this.data = state
    this.observe(this.data)
  }
  observe(data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineObservable(data, key, data[key])
    })
  }
  defineObservable(data, key, value) {
    var observer = new Observer(value),
      publisher = new Publisher(value)

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        ActiveWatcher.length > 0 && publisher.addSub
        return value
      },
      set: function(v) {
        if (val === v) {
          return
        }
        publisher.notify(v)
        observer = new Observer(v)
        value = v
      }
    })
  }
}
export default Observer
