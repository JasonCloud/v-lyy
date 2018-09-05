<template>
  <div>
    <div class="content" :style="contentH">
      <div class="mask-jianbian top" :style="maskH"></div>
      <div class="borderTop"></div>
      <div v-for="(itemp, idx) in currentData" class="wrap" :key="idx" :style="{width: columnWidthCompute[idx]}">
        <ul class="ul" :ref="'picker' + idx" >
          <li v-for="(item, indexp) in itemp" :key="indexp">{{item | serizeItem}}</li>
        </ul>
      </div>
      <div class="mask-jianbian bottom" :style="maskH"></div>
    </div>
  </div>
</template>

<script>
import Scroller from './Scroller'
import InitData from './InitData'

export default {
  name: 'Picker',
  props: {
    value: Array, // 选择的数据
    showColumn: Number, // 展示的列数
    linkage: Number, // 联动的列数
    showRow: Number, // 展示的高度
    list: [Array], // 列表数据
    columnWidth: {
      type: Array,
      default: () => {
        return []
      }
    }, // 设置各列的宽度
    defaultData: [Array] // 默认显示的数据
  },
  data () {
    return {
      currentData: this.list,
      dataSelect: [],
      scroller: [],
      maskH: {
        height: 'auto'
      },
      contentH: {
        height: 'auto'
      }
    }
  },
  filters: {
    serizeItem: function (val) {
      if (!val && val !== 0) {
        return ''
      } else if (typeof val === 'string' || typeof val === 'number') {
        return val
      } else {
        return val.name || val.value || ''
      }
    }
  },
  computed: {
    columnWidthCompute () {
      let arr = []
      if (this.columnWidth.length === 0) {
        for (let i = 0; i < this.showColumn; i++) {
          arr.push('' + 100 / this.showColumn + '%')
        }
      } else {
        let sum = 0
        for (let i = 0; i < this.columnWidth.length; i++) {
          if (i < this.showColumn) {
            sum += this.columnWidth[i]
            arr.push(this.columnWidth[i] * 100 + '%')
          }
        }
        if (sum < 1 && this.columnWidth.length < this.showColumn) {
          let len = this.showColumn - this.columnWidth.length
          let div = 1 - sum
          for (let j = 0; j < len; j++) {
            arr.push(100 * div / len + '%')
          }
        }
      }
      return arr
    }
  },
  created () {
    if (this.linkage !== 0 && this.linkage) {
      const length = this.linkage
      this.store = new InitData(this.list, length, this.showColumn || this.linkage)
      this.currentData = this.store.getColumns(this.value)
      this.defaultData.forEach((v, i) => {
        let childData = this.store.getChildren(this.currentData[i][v]['value'])
        let cloumn = i
        this.dataSelect[i] = this.currentData[i][v]
        while (childData.length !== 0) {
          if ((this.showColumn - 1) === cloumn) {
            break
          }
          this.currentData.splice(++cloumn, 1, childData)
          childData = this.store.getChildren(childData[0]['value'])
        }
      })
    } else {
      this.defaultData.forEach((v, i) => {
        this.dataSelect[i] = this.currentData[i].length < v ? this.currentData[i][this.currentData.length - 1] : this.currentData[i][v]
      })
      if (this.defaultData.length < this.showColumn) {
        let j = this.defaultData.length
        for (j; j < this.showColumn; j++) {
          this.dataSelect[j] = this.currentData[j][0]
        }
      }
    }
    this.$emit('input', this.dataSelect)
  },
  mounted () {
    let parentEl = document.querySelectorAll('.ul')
    let childEl = parentEl[0].children && parentEl[0].children[0]
    console.log(childEl)
    console.log(childEl.offsetHeight)
    this.contentH.height = Math.round(childEl.offsetHeight * this.showRow) + 'px'
    this.maskH.height = Math.round(childEl.offsetHeight * (this.showRow - 1) / 2) + 'px'
    for (let i = 0; i < this.showColumn; i++) {
      this.scroller.push(new Scroller({
        el: parentEl[i],
        columnCount: i,
        showRow: this.showRow,
        W: childEl.offsetHeight,
        selectedCallback: (val) => {
          this.dataSelect[val[1]] = this.currentData[val[1]][val[0]]
          if (this.linkage && this.linkage !== 0) {
            let childData = this.store.getChildren(this.currentData[val[1]][val[0]]['value'])
            let cloumn = val[1]
            while (childData.length !== 0) {
              if ((this.showColumn - 1) === cloumn) {
                break
              }
              this.currentData.splice(++cloumn, 1, childData)
              this.scroller[cloumn].goto(0)
              this.dataSelect[cloumn] = childData[0]
              childData = this.store.getChildren(childData[0]['value'])
            }
          }
          this.$emit('input', this.dataSelect)
        }
      }).start())
    }
    this.defaultData.forEach((v, i) => {
      if (v) {
        if (typeof v === 'number') {
          this.scroller[i].goto(v)
        } else {
          this.scroller[i].goto(this.currentData[i].indexOf(v))
        }
      }
    })
  }
}
</script>

<style lang="less">
  @import "../../assets/css/minix.less";
  .vlyy-picker-title{
    display: -webkit-flex;
    display: flex;
    background-color: #eee;
    div{
      padding: 20px 0;
      .font-dpr(16px)
    }
    .title{
      flex-grow: 1;
      text-align: center;
    }
    .cancel,.sure{
      color: #e94643;
      padding-left: 16px;
      padding-right: 16px;
    }
  }
  .content{
    background-color: #fff;
    height: 350px;
    overflow: hidden;
    position: relative;
    display: flex;
    .wrap{
      /*flex-grow: 1;*/
      flex-shrink: 0;
      overflow: hidden;
    }
    .mask-jianbian{
      position: absolute;
      left: 0;
      height: 140px;
      width: 100%;
      z-index: 12;
      background: -webkit-linear-gradient(bottom, #fff, hsla(0, 0%, 100%, .38));
      pointer-events:none;
      background-position: top,bottom;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .mask-jianbian:after{
      content: " ";
      display: block;
      width: 100%;
      height: 2px;
      background: #ddd;
      position: absolute;
      left: 0;
    }
    .mask-jianbian.top:after{
      bottom: 0;
    }
    .mask-jianbian.top{
      top: 0;
      background: -webkit-linear-gradient(top, #fff, hsla(0, 50%, 100%, .38));
    }
    .mask-jianbian.bottom:after{
      top: 0;
    }
    .mask-jianbian.bottom{
      bottom: 0;
    }
  }
  .ul{
    z-index: 10;
    li{
      text-align: center;
      /*padding: 12px 0;*/
      .font-dpr(14px);
      height: 70px;
      line-height: 70px;
    }
  }
</style>
