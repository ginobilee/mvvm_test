class Subscriber {
  constructor(node) {
    this.node = node
    this.pubIds = []
  }
  update(value) {}
  subscribe(pub) {
    pub.subs.push(this)
    this.pubIds.push(pub.id)
  }
}
export default Subscriber
