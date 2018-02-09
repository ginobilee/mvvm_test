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
    let observer = new Observer(value)
    const publisher = new Publisher(value)

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        ActiveWatcher.length > 0 &&
          ActiveWatcher.forEach(w => publisher.addSub(w))
        return value
      },
      set: function(v) {
        if (value === v) {
          return
        }
        console.log('set')
        publisher.notify(v)
        observer = new Observer(v)
        value = v
      }
    })
  }
}
export default Observer
