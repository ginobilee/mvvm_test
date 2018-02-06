import MVVM from './mvvm/index.js'
document.addEventListener(
  'load',
  function() {
    console.log('index')
    console.log('test')
    var mvvm = new MVVM({
      el: '#app',
      state: {
        test: 'test'
      }
    })
  },
  false
)
console.log('index')
