<template>
  <Modal
         v-model="show"
         dialogTransition="vlyy-slide"
         top="auto"
         width="100%">
    <div class="vlyy-picker-title" slot="title">
      <div class="cancel" @click="cancel">取消</div>
      <div class="title">{{title}}</div>
      <div class="sure" @click="sure">确定</div>
    </div>
    <div class="content" slot="content" >
      <div class="mask-jianbian top"></div>
      <div class="borderTop"></div>
      <div v-for="(itemp, idx) in currentData" class="wrap" :key="idx">
        <ul class="ul" :ref="'picker' + idx" >
          <li v-for="(item, indexp) in itemp" :key="indexp">{{item.name}}</li>
        </ul>
      </div>
      <div class="mask-jianbian bottom"></div>
    </div>
    <div slot="foot"></div>
  </Modal>
</template>

<script>
import FlexBox from '../FlexBox/FlexBox'
import FlexItem from '../FlexBox/FlexItem'
import Modal from '../Modal/Modal'
import Scroller from './Pick'
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
      if (matchCount < this.copyData(value).length) {
        value = []
      }
    }
    var datas = []
    const max = this.showColumn || 8
    for (var i = 0; i < max; i++) {
      if (i === 0) {
        datas.push(this.getFirstColumn())
        console.log(datas)
      } else {
        // 没有数据时，取得上一级的第一个
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
    // correct the column  SDS
    this.count = list.length
    return list
  }
}
export default {
  name: 'Picker',
  props: {
    value: Array,
    show: Boolean,
    showColumn: Number,
    linkage: Number,
    list: [Array],
    showCount: [Array],
    title: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      currentData: this.list,
      scroller: []
    }
  },
  components: {
    FlexBox,
    FlexItem,
    Modal
  },
  created () {
    if (this.linkage !== 0) {
      const length = this.linkage
      this.store = new InitData(this.list, length, this.showColumn || this.linkage)
      this.currentData = this.store.getColumns(this.value)
      // console.log(this.currentData)
    }
  },
  mounted () {
    let parentEl = document.querySelectorAll('.ul')
    // console.log(parentEl[0])
    // console.log(parentEl[0].children[0])
    let childEl = parentEl[0].children && parentEl[0].children[0]
    // console.log(childEl)
    for (var i = 0; i < this.showColumn; i++) {
      new Scroller({
        el: parentEl[i],
        columnCount: i,
        W: childEl.offsetHeight,
        selectedCallback: (val) => {
          this.$emit('change', val)
          let childData = this.store.getChildren(this.currentData[val[1]][val[0]]['value'])
          let cloumn = val[1]
          while (childData.length !== 0) {
            this.currentData.splice(++cloumn, 1, childData)
            // console.log(childData[0])
            childData = this.store.getChildren(childData[0]['value'])
          }
        }
      }).start()
    }
  },
  methods: {
    cancel () {
      this.$emit('input', false)
    },
    sure () {
      this.$emit('input', false)
    }
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
      flex-grow: 1;
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
