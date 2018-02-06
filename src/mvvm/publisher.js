var pubId = 0
class Publisher {
  constructor(value) {
    this.value = value
    this.subs = []
    this.id = ++pubId
  }
  addSub(sub) {
    this.subs.push(sub)
    sub.pubIds.push(this.id)
  }
  notify(v) {
    this.subs.forEach(s => s.update(v))
  }
}

export default Publisher
