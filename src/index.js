import MVVM from './mvvm'
window.addEventListener(
  'load',
  function() {
    new MVVM({
      el: '#app',
      state: {
        test: 'test'
      }
    })
  },
  false
)
console.log('begin in index')
