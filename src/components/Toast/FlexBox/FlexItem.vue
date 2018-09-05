<template>
    <div class="flex-item" :style="styles">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'flexItem',
  props: {
    width: [String],
    shrink: [Number, String],
    grow: [Number, String],
    order: [Number, String]
  },
  computed: {
    styles () {
      return {
        width: this.width,
        flexShrink: this.shrink,
        flexGrow: this.grow,
        order: this.order
      }
    }
  }
}
</script>

<style scoped>

</style>
