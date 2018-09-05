class Scroller {
  constructor (option) {
    this.el = option.el || null
    this.startY = null
    this.diffY = 0
    this.endY = 0
    this.columnCount = option.columnCount
    this.defaultIndex = option.defaultIndex || 0
    this.maxMove = null
    this.minMove = null
    this.activeIndex = null
    this.rowHeight = option.rowHeight
    this.elH = Math.round(option.rowHeight * option.primaryTotalRow)
    this.showRow = option.showRow || 5
    this.callback = option.selectedCallback
  }
  start () {
    let defaultMove = this.defaultIndex * this.rowHeight
    this.maxMove = this.rowHeight * (this.showRow - 1) / 2
    if (!this.defaultIndex) {
      this.el.style['transform'] = `translate3d(0,${this.maxMove}px,0)`
      this.endY = this.maxMove
    } else {
      this.el.style['transform'] = `translate3d(0,${this.maxMove - defaultMove}px,0)`
      this.endY = this.maxMove - defaultMove
    }
    this.minMove = this.maxMove - (this.el.offsetHeight || this.elH) + this.rowHeight
    this.el.ontouchstart = this.ontouchstart.bind(this)
    this.el.ontouchmove = this.ontouchmove.bind(this)
    this.el.ontouchend = this.ontouchend.bind(this)
    return this
  }
  ontouchstart (ev) {
    this.startY = ev.changedTouches[0].pageY
  }
  goto (idx) {
    if (idx < 0) return
    let distance = Math.round(this.maxMove - this.rowHeight * idx)
    if (distance > this.maxMove) {
      distance = this.maxMove
    } else if (distance < this.minMove) {
      distance = this.minMove
    }
    this.el.style['transform'] = `translate3d(0,${distance}px,0)`
  }
  ontouchmove (ev) {
    let y = ev.changedTouches[0].pageY
    this.diffY = y - this.startY
    this.el.style['transform'] = `translate3d(0,${this.diffY + this.endY}px,0)`
    this.el.style['transition'] = 'all 0s cubic-bezier(0.165, 0.84, 0.44, 1)'
  }
  ontouchend (ev) {
    let count = Math.round(this.diffY / this.rowHeight)
    this.endY += this.rowHeight * count
    this.activeIndex = Math.round((this.endY - this.rowHeight * (this.showRow - 1) / 2) / this.rowHeight)
    if (this.endY > this.maxMove) {
      this.endY = this.maxMove
      this.activeIndex = 0
    } else if (this.endY < this.minMove) {
      this.endY = this.minMove
      this.activeIndex = Math.round((this.el.offsetHeight || this.elH) / this.rowHeight) - 1
    }
    this.el.style['transform'] = `translate3d(0,${this.endY}px,0)`
    this.el.style['transition'] = 'all .3s cubic-bezier(0.165, 0.84, 0.44, 1)'
    this.callback(this.getActive(), this)
  }
  getActive () {
    return [Math.abs(this.activeIndex), this.columnCount]
  }
}
export default Scroller
