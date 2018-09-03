<template>
  <Modal
    v-model="value"
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
      <div v-for="(itemp, idx) in list" class="wrap">
        <ul class="ul" :ref="'picker' + idx" >
          <li v-for="item in itemp">{{item}}</li>
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
  class Picker {
    constructor (option) {
      this.el = option.el || null
      this.startY = null
      this.diffY = 0
      this.endY = 0
      this.defaultIndex = option.defaultIndex || 0
      this.maxMove = null
      this.minMove = null
      this.activeIndex = null
      this.W = option.W || 70
      this.showCount = option.showCount || 5
      this.callback = option.selectedCallback
    }
    start () {
      let defaultMove = this.defaultIndex * this.W
      this.maxMove = this.W * (this.showCount - 1) / 2
      if (!this.defaultIndex) {
        this.el.style['transform'] = `translate3d(0,${this.maxMove}px,0)`
        this.endY = this.maxMove
      } else {
        this.el.style['transform'] = `translate3d(0,${this.maxMove - defaultMove}px,0)`
        this.endY = this.maxMove - defaultMove
      }
      this.minMove = this.maxMove - this.el.offsetHeight + this.W
      this.el.ontouchstart = this.ontouchstart.bind(this)
      this.el.ontouchmove = this.ontouchmove.bind(this)
      this.el.ontouchend = this.ontouchend.bind(this)
    }
    ontouchstart (ev) {
      this.startY = ev.changedTouches[0].pageY
    }
    ontouchmove (ev) {
      let y = ev.changedTouches[0].pageY
      this.diffY = y - this.startY
      this.el.style['transform'] = `translate3d(0,${this.diffY + this.endY}px,0)`
      this.el.style['transition'] = 'all 0s cubic-bezier(0.165, 0.84, 0.44, 1)'
    }
    ontouchend (ev) {
      let count = Math.round(this.diffY / this.W)
      this.endY += this.W * count
      this.activeIndex = parseInt((this.endY - this.W * (this.showCount - 1) / 2) / this.W)
      if (this.endY > this.maxMove) {
        this.endY = this.maxMove
        this.activeIndex = 1
      } else if (this.endY < this.minMove) {
        this.endY = this.minMove
        this.activeIndex = parseInt(this.el.offsetHeight / this.W) - 1
      }
      this.el.style['transform'] = `translate3d(0,${this.endY}px,0)`
      this.el.style['transition'] = 'all .3s cubic-bezier(0.165, 0.84, 0.44, 1)'
      this.callback(this.getActive())
    }
    getActive () {
      return Math.abs(this.activeIndex)
    }
  }
  export default {
    name: 'Picker',
    props: {
      value: Boolean,
      list: [Array],
      showCount: [String, Array],
      title: {
        type: String,
        default: '请选择'
      }
    },
    components: {
      FlexBox,
      FlexItem,
      Modal
    },
    mounted () {
      let childEl = this.$refs['picker0'][0] && this.$refs['picker0'][0].children && this.$refs['picker0'][0].children[0]
      let picker = new Picker({
        el: this.$refs['picker0'][0],
        W: childEl.offsetHeight,
        defaultIndex: 6,
        selectedCallback: (val) => {
          this.$emit('change', val)
        }
      })
      let picker1 = new Picker({
        el: this.$refs['picker1'][0],
        W: childEl.offsetHeight,
        selectedCallback: (val) => {
          this.$emit('change', val)
        }
      })
      let picker2 = new Picker({
        el: this.$refs['picker2'][0],
        W: childEl.offsetHeight,
        selectedCallback: (val) => {
          this.$emit('change', val)
        }
      })
      this.$nextTick(() => {
        picker.start()
        picker1.start()
        picker2.start()
      })
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
