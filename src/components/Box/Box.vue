<template>
    <div class="lyy-box" :style="{marginLeft: gutter + 'px'}">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    gutter: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>
