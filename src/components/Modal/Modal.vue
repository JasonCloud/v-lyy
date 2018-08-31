<template>
  <div class="Modal vlyy-modal-open">
    <transition name="vlyy-mask">
      <div class="vlyy-mask"
           v-show="value"
           :style="{zIndex: maskZIndex}"></div>
    </transition>
    <transition :name="dialogTransition">
      <div class="vlyy-dialog"
           v-show="value"
           :style="{zIndex: dialogZIndex}">
        <slot name="title">
          <div class="vlyy-dialog-title">{{title}}</div>
        </slot>
        <slot name="content">
          <div class="vlyy-dialog-body" >{{content}}</div>
        </slot>
        <slot name="foot">
          <div class="vlyy-dialog-foot">
            <button @click="sure" v-if="buttonOkText">{{buttonOkText}}</button>
            <button @click="close">{{buttonCloseText}}</button>
          </div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    value: Boolean,
    title: {
      type: String,
      default: '我是标题'
    },
    content: {
      type: String,
      default: '我是内容'
    },
    buttonCloseText: {
      type: String,
      default: '关闭'
    },
    buttonOkText: {
      type: String,
      default: ''
    },
    dialogTransition: {
      type: String,
      default: 'vlyy-dialog'
    },
    maskZIndex: {
      type: Number,
      default: null
    },
    dialogZIndex: {
      type: Number,
      default: null
    }
  },
  methods: {
    sure () {
      this.$emit('sure')
      this.$emit('input', false)
    },
    close () {
      this.$emit('close')
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="less">
  @import "../../styles/minix.less";
  @import "../../styles/lyy.animated.less";
  .vlyy-modal-open {
    overflow: hidden;
    position: fixed;
    width: 100%
  }
  .vlyy-dialog-title{
    padding: .5em 1em .5em;
    .font-dpr(16px);
    text-align: center;
    font-family: "PingFangSC-Medium","Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }
  .vlyy-dialog-body{
    font-family: "PingFangSC-Regular", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    padding: 0 1.6em .8em;
    min-height: 40px;
    .font-dpr(14px);
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: #999;
  }
  .vlyy-x-dialog-absolute{
    position: absolute
  }
  .vlyy-mask {
    background: rgba(0,0,0,.3);
  }
  .vlyy-mask{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0
  }
  .vlyy-dialog {
    position: fixed;
    display: table;
    z-index: 5000;
    width: 80%;
    max-width: 92%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: #fff;
    text-align: center;
    border-radius: 8px;
    overflow: hidden;
  }
  .vlyy-dialog-foot{
    border-top: 1px solid #eeeeee;
    .flex();
    button{
      background-color: #fff;
      flex-grow: 1;
      display: block;
      .setFontSize(16px,#4e89ee);
      padding: 14px 0;
      border: none;
      outline: none;
    }
    button + button {
      border-left: 1px solid #d5d5d6;
    }
  }
</style>
