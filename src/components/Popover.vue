<template>
  <div class="f-popover" @click="xxx">
    <div v-show="visible" class="content-wrapper">
      <slot name="content"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'f-popover',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    xxx() {
      this.visible = !this.visible
    }
  }
}
</script>

<style scoped lang="scss">
  .f-popover {
    display: inline-block;
    vertical-align: top;
    position: relative;
    .content-wrapper {
      position: absolute;
      left: 0;
      bottom: 100%;
      border: 1px solid red;
    }
  }
</style>
