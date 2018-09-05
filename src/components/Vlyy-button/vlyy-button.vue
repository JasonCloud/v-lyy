<template>
  <button
    :style="vlyyButtonStyle"
    class="vlyy-btn primary"
    :class="classes"
    :disabled="disabled"
    :type="actionType"
    @click="onClick">
    <i class="vlyy-loading" v-if="showLoading"></i>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  name: 'vlyy-button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: Boolean,
    min: Boolean,
    plain: Boolean,
    actionType: String,
    showLoading: Boolean,
    text: String,
    vlyyButtonStyle: [String, Array]
  },
  computed: {
    classes () {
      return [
        {
          'vlyy-btn_disabled': !this.plain && this.disabled,
          'vlyy-btn_plain-disabled': this.plain && this.disabled,
          'vlyy-btn_min': this.min
        },
        !this.plain ? `vlyy-btn_${this.type}` : '',
        this.plain ? `vlyy-btn_plain-${this.type}` : '',
        this.showLoading ? `vlyy-btn_loading` : ''
      ]
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less">
  @import "../../assets/css/minix.less";
  button.vlyy-btn {
    width: 100%;
    border-width: 0;
    outline: 0;
    -webkit-appearance: none;
  }
  .vlyy-btn{
    /*margin-top: 15px;*/
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
    .setFontSize(18px,#fff);
    line-height: 2.33333333;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
  }
  .vlyy-btn_primary {
    background-color: #1AAD19;
  }
  .vlyy-btn_warn {
    background-color: #E64340;
  }
  button.vlyy-btn_default {
    color: #000000;
    background-color: #F8F8F8;
    border: 1px solid rgba(0,0,0,.2); /*no*/
  }
  button.vlyy-btn_plain-primary,
  button.vlyy-btn_plain-default,
  button.vlyy-btn_plain-warn{
    border-width: 1px;/*no*/
    background-color: transparent;
  }
  .vlyy-btn_plain-default {
    color: #353535;
    border: 1px solid #353535;/*no*/
  }
  .vlyy-btn_plain-primary {
    color: #1AAD19;
    border: 1px solid #1AAD19;/*no*/
  }
  .vlyy-btn_plain-warn {
    color: #E64340;
    border: 1px solid #E64340;/*no*/
  }
  button.vlyy-btn_disabled{
    color: rgba(255, 255, 255, 0.6);
  }
  button.vlyy-btn_plain-warn{

  }
  .vlyy-btn_warn.vlyy-btn_disabled{
    background-color: #EC8B89;
  }
  .vlyy-btn_primary.vlyy-btn_disabled{
    background-color: #9ED99D;
  }
  .vlyy-btn_disabled.vlyy-btn_default{
    color: rgba(0, 0, 0, 0.3);
    background-color: #F7F7F7;
  }
  .vlyy-btn_default:not(.vlyy-btn_disabled):active {
    color: rgba(0, 0, 0, 0.6);
    background-color: #DEDEDE;
  }
  .vlyy-btn_plain-default:not(.vlyy-btn_disabled):active {
    color: rgba(53, 53, 53, 0.6);
    border-color: rgba(53, 53, 53, 0.6);
  }
  .vlyy-btn_primary:not(.vlyy-btn_disabled):active {
    color: rgba(255, 255, 255, 0.6);
    background-color: #179B16;
  }
  .vlyy-btn_plain-primary:not(.vlyy-btn_disabled):active {
    color: rgba(26, 173, 25, 0.6);
    border-color: rgba(26, 173, 25, 0.6);
    background-color: transparent;
  }
  .vlyy-btn_warn:not(.vlyy-btn_disabled):active {
    color: rgba(255, 255, 255, 0.6);
    background-color: #CE3C39;
  }
  .vlyy-btn_plain-warn:not(.vlyy-btn_disabled):active {
    color: rgba(206, 60, 57, 0.6);
    border-color: rgba(206, 60, 57, 0.6);
  }
  button.vlyy-btn_min {
    display: inline-block;
    line-height: 2.3;
    .font-dpr(13px);
    width: auto;
  }
</style>
