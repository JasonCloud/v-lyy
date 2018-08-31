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
      <ul class="ul" ref="picker">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
      </ul>
    </div>
    <div slot="foot"></div>
  </Modal>
</template>

<script>
  import FlexBox from '../FlexBox/FlexBox'
  import FlexItem from '../FlexBox/FlexItem'
  import Modal from '../Modal/Modal'
  class Picker {
    constructor (el) {
      this.el = el
      this.startY = null
      this.diffY = 0
      this.endY = 0
      this.activeIndex = null
    }
    start () {
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
      this.el.style['transition'] = 'all 0s ease 0s'
    }
    ontouchend (ev) {
      this.endY = this.diffY
      console.log(this.diffY)
      // this.el.style['transform'] = `translate3d(0,${this.startY}px,0)`
      this.el.style['transition'] = 'all .3s ease 0s'
      console.log('end')
    }
    getActive () {
      console.log(333)
      console.log(this.el)
    }
  }
  export default {
    name: 'Picker',
    props: {
      value: Boolean,
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
      let picker = new Picker(this.$refs.picker)
      picker.start()
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
    height: 280px;
    overflow: hidden;
  }
  .ul{
    li{
      text-align: center;
      /*padding: 12px 0;*/
      .font-dpr(14px);
      height: 70px;
      line-height: 70px;
    }
  }
</style>
