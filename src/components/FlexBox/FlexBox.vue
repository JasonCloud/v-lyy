<template>
    <div class="vlyy-flex-box"
         :class="classes"
         :style="styles">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'FlexBox',
  props: {
    gapping: {
      type: Number,
      default: 10
    },
    inline: Boolean,
    justify: String,
    align: String,
    wrap: String,
    direction: String
  },
  computed: {
    classes () {
      return {
        'inlineFlex': this.inline,
        'flexBox': !this.inline
      }
    },
    styles () {
      return {
        'align-items': this.align,
        'justify-content': this.justify,
        '-webkit-align-items': this.align,
        '-webkit-justify-content': this.justify,
        'flex-direction': this.direction,
        'flex-wrap': this.wrap,
        '-webkit-flex-wrap': this.wrap,
        '-webkit-flex-direction': this.direction
      }
    }
  }
}
</script>

<style lang="less">
  .inlineFlex{
    display: inline-flex;
    display: -webkit-inline-flex;
    width: 100%;
  }
  .flexBox{
    display: flex;
    display: -webkit-flex;
    width: 100%;
  }
</style>
