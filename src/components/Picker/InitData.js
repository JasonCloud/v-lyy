const filter = function (array, callback) {
  if (!Array.isArray(array)) {
    return false
  }
  return array.filter(callback)
}
const InitData = class {
  constructor (data, count, showColumn) {
    this.data = data
    this.count = count
    if (showColumn) {
      this.showColumn = showColumn
    }
  }

  getChildren (value) {
    return filter(this.data, one => {
      return one.parent === value
    })
  }

  getFirstColumn () {
    return filter(this.data, one => {
      return !one.parent || one.parent === 0 || one.parent === '0'
    })
  }

  copyData (obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  getColumns (value) {
    if (value.length > 0) {
      const matchCount = this.copyData(this.data).filter((item) => {
        return this.copyData(value).indexOf(item.value) > -1
      }).length
      console.log(matchCount)
      if (matchCount < this.copyData(value).length) {
        value = []
      }
    }
    var datas = []
    const max = this.showColumn || 8
    for (var i = 0; i < max; i++) {
      if (i === 0) {
        datas.push(this.getFirstColumn())
        // console.log(datas)
      } else {
        if (!value[i]) {
          if (typeof datas[i - 1][0] === 'undefined') {
            break
          } else {
            const topValue = datas[i - 1][0].value
            datas.push(this.getChildren(topValue))
          }
        } else {
          datas.push(this.getChildren(value[i - 1]))
        }
      }
    }
    const list = datas.filter((item) => {
      return item.length > 0
    })
    this.count = list.length
    return list
  }
}
export default InitData
