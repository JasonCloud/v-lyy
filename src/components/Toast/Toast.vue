<template>
      <div class="vlyy-toast-wrap" :class="totastClass">
        <div class="vlyy-mask"
             v-show="show && isShowMask"></div>
        <transition :name="Transition">
          <div class="vlyy-toast" v-show="show">
            {{text}}
          </div>
        </transition>
      </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      timer: null,
      show: false
    }
  },
  props: {
    value: Boolean,
    isShowMask: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '我是 toast'
    },
    toastTransition: String,
    position: String,
    timeNum: {
      type: Number,
      default: 2000
    }
  },
  created () {
    if (this.value) {
      this.show = true
    }
  },
  watch: {
    show (newVal) {
      clearTimeout(this.timer)
      if (newVal) {
        this.timer = setTimeout(() => {
          this.show = false
          this.$emit('input', false)
          this.close()
          clearTimeout(this.timer)
        }, this.timeNum)
      }
    },
    value (newVal) {
      this.show = newVal
    }
  },
  computed: {
    Transition () {
      if (this.toastTransition) {
        return this.toastTransition
      } else if (this.position === 'bottom') {
        return 'vlyy-slide-from-bottom'
      } else if (this.position === 'top') {
        return 'vlyy-slide-from-top'
      } else if (this.position === 'middle') {
        return 'vlyy-dialog'
      } else {
        return 'vlyy-fade'
      }
    },
    totastClass () {
      return {
        'vlyy-toast-top': this.position === 'top',
        'vlyy-toast-bottom': this.position === 'bottom',
        'vlyy-toast-middle': this.position === 'middle',
        'vlyy-toast-default': !this.position
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/minix.scss";
  @import "../../styles/lyy.animated.scss";
  .vlyy-toast-wrap {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    .vlyy-mask{
      position: fixed;
      z-index: 100;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: transparent;
    }
    .vlyy-toast {
      @include setFontSize(15px, #fff);
      line-height: 150%;
      background-color: rgba(0, 0, 0, .7);
      max-width: 90%;
      padding: 16px 26px;
      border-radius: 10px;
      z-index: 102;
    }
    .vlyy-slide-from-top-enter-active,
    .vlyy-slide-from-top-leave-active,
    .vlyy-slide-from-bottom-enter-active,
    .vlyy-slide-from-bottom-leave-active{
      transition: all 400ms cubic-bezier(.36,.66,.04,1);
    }
    .vlyy-slide-from-top-leave-to,
    .vlyy-slide-from-bottom-leave-to,
    .vlyy-slide-from-top-enter,
    .vlyy-slide-from-bottom-enter{
      opacity: 0;
    }
    .vlyy-slide-from-top-leave-to,
    .vlyy-slide-from-top-enter{
      transform:  translateY(-100%)!important;
    }
    .vlyy-slide-from-bottom-leave-to,
    .vlyy-slide-from-bottom-enter{
      transform:  translateY(100%)!important;
    }
  }
  .vlyy-toast-top {
    top: 0;
    @include center-hor();
    .vlyy-toast{
      opacity: 1;
      transform: translateY(50%);
    }
  }
  .vlyy-toast-bottom{
    bottom: 0;
    @include center-hor();
    .vlyy-toast{
      opacity: 1;
      transform: translateY(-50%);
    }
  }
 .vlyy-toast-default{
    @include center-center();
    .vlyy-toast{
      opacity: 1;
      transform: translateY(-50%);
    }
  }
  .vlyy-toast-middle{
    @include center-center();
  }
</style>
