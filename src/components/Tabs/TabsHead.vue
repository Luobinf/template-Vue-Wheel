<template>
  <div class="f-tabs-head">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'fTabsHead',
  inject: ['eventBus'],
  mounted() {
    this.eventBus.$on('update:selected',(item,vm) => {
      let {width,left} = vm.$el.getBoundingClientRect()
      this.$refs.line.style.width = `${width}px`
      this.$refs.line.style.left = `${left}px`
    })
  }
}
</script>

<style scoped lang="scss">
  $tab-head-height: 40px;
  .f-tabs-head{
    display: flex;
    height: $tab-head-height;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid gray;
    position: relative;
    > .actions-wrapper{
      margin-left: auto;
      padding: 0 1em;
    }
    > .line {
      position: absolute;
      bottom: 0;
      height: 0;
      border-bottom: 1px solid blue;
      transition: all 0.5s;
    }
  }
</style>
