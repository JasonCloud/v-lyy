<template>
  <div class="about">
    <flex-box direction="cloum" >
      <flex-item  width="200px" order=1>
        <vlyy-button type="primary">1 flex-item</vlyy-button>
      </flex-item>
      <flex-item grow=1 order=4 >
        <vlyy-button type="primary">2 flex-item</vlyy-button>
      </flex-item>
      <flex-item grow=1 order=3>
        <vlyy-button type="primary">3 flex-item</vlyy-button>
      </flex-item>
    </flex-box>
    <button class="btn" @click="topToast('top')">从上面显示toast</button>
    <button class="btn" @click="topToast('middle')">从中间显示toast</button>
    <button class="btn" @click="topToast('bottom')">从下面显示toast</button>
    <button class="btn" @click="toload('bottom')">loading</button>
    <Loading :loading="load"></Loading>
    <vlyy-button type="primary" v-on:click="clickButton">type:primary</vlyy-button>
    <div class="box" style="padding: 0 24px">
      <vlyy-button >type:default</vlyy-button>
      <vlyy-button type="primary">type:primary</vlyy-button>
      <vlyy-button type="warn">type:warn</vlyy-button>
      <vlyy-button  plain>type:plain</vlyy-button>
      <vlyy-button type="primary" plain>type:primary plain</vlyy-button>
      <vlyy-button type="warn" plain>type:warn plain</vlyy-button>
      <vlyy-button  disabled>disabled</vlyy-button>
      <vlyy-button  type="primary" disabled>primary</vlyy-button>
      <vlyy-button type="warn" disabled>warn</vlyy-button>
      <vlyy-button min>mini</vlyy-button>
      <vlyy-button type="primary" min>mini primary</vlyy-button>
      <vlyy-button type="warn" min>mini warn</vlyy-button>
      <p></p>
      <vlyy-button min disabled>min</vlyy-button>
      <vlyy-button type="primary" disabled min>min primary</vlyy-button>
      <vlyy-button type="warn" disabled min>min warn</vlyy-button>
      <p></p>
      <vlyy-button min plain @click="clickPicker">mini</vlyy-button>
      <vlyy-button type="primary" plain  min>mini primary</vlyy-button>
      <vlyy-button type="warn" plain min>mini warn</vlyy-button>
    </div>
    <vlyy-button v-on:click="onClick">弹出picker</vlyy-button>
    <Modal
      v-model="show"
      dialogTransition="vlyy-slide"
      top="auto"
      width="100%"
    >
      <div class="vlyy-picker-title" slot="title">
        <div class="cancel" @click="cancel">取消</div>
        <div class="title">请选择</div>
        <div class="sure" @click="sure">确定</div>
      </div>
      <div slot="content">
        <Picker v-model="pick" :defaultData="defaultData" :list="list"  :columnWidth="columnWidth" :linkage="3" :showColumn="3" :showRow="5"  v-on:change="selected"></Picker>
      </div>
      <p slot="foot"></p>
    </Modal>
    <Toast text="大都不会说的变化就是对巴萨" v-model="toast" :position="position"></Toast>
  </div>
</template>

<script>
  import FlexBox from '../../components/FlexBox/FlexBox'
  import FlexItem from '../../components/FlexBox/FlexItem'
  import Picker from '../../components/Picker/Picker'
  import Loading from '../../components/Loading/Loading'
  import Toast from '../../components/Toast/Toast'
  import VlyyButton from '../../components/Vlyy-button/vlyy-button'
  import Modal from '../../components/Modal/Modal'
  export default {
    name: 'about',
    data () {
      return {
        pick: [],
        show: false,
        load: false,
        toast: false,
        position: 'top',
        columnWidth: [0.3, 0.2],
        defaultData: [0, 1, 1],
        // list: [
        //   [1, 2, 3, 4, 5],
        //   ['a', 'b', 'c', 'd'],
        //   [12, 13, 14, 15, 16]
        // ]
        list: [{
          name: '中国',
          value: 'china',
          parent: '0' // 为一级时可以不写 parent，但是此时允许为数字 0、空字符串或者字符串 '0'
        }, {
          name: '美国',
          value: 'USA',
          parent: '0'
        }, {
          name: '广东',
          value: 'china001',
          parent: 'china'
        }, {
          name: '广西',
          value: 'china002',
          parent: 'china'
        }, {
          name: '美国001',
          value: 'usa001',
          parent: 'USA'
        }, {
          name: '美国002',
          value: 'usa002',
          parent: 'USA'
        }, {
          name: '广州',
          value: 'gz',
          parent: 'china001'
        }, {
          name: '深圳',
          value: 'sz',
          parent: 'china001'
        }, {
          name: '广西001',
          value: 'gx001',
          parent: 'china002'
        }, {
          name: '广西002',
          value: 'gx002',
          parent: 'china002'
        }, {
          name: '美国001_001',
          value: '0003',
          parent: 'usa001'
        }, {
          name: '美国001_002',
          value: '0004',
          parent: 'usa001'
        }, {
          name: '美国002_001',
          value: '0005',
          parent: 'usa002'
        }, {
          name: '美国002_002',
          value: '0006',
          parent: 'usa002'
        }]
      }
    },
    components: {
      FlexBox,
      FlexItem,
      Picker,
      VlyyButton,
      Loading,
      Modal,
      Toast
    },
    methods: {
      clickPicker () {
        console.log('ii')
      },
      selected (val) {
        console.log(val)
      },
      clickButton () {
        console.log('button')
      },
      topToast (par) {
        this.position = par
        this.toast = true
      },
      cancel () {
        console.log(this.pick)
        this.show = false
      },
      toload () {
        this.load = true
        setTimeout(() => {
          this.load = false
        }, 3000)
      },
      sure () {
        console.log(this.pick)
        this.show = false
      },
      onClick () {
        this.show = true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../src/styles/minix.scss";
  .btn{
    display: block;
    margin: 0px auto 20px;
    @include setFontSize(16px,#333);
    padding: 16px 20px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #333333;
  }
</style>
