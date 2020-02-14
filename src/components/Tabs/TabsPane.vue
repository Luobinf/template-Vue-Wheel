<template>
  <div class="f-tabs-pane" v-show="active" :class="classes">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'fTabsPane',
  data() {
    return {
      active: false
    }
  },
  props: {
    name: {
      type: [String,Number],
      required: true
    }
  },
  inject: ['eventBus'],
  computed: {
    classes() {
      return {
        'is-active': this.active
      }
    }
  },
  created() {
    this.eventBus.$on('update:selected',(name) => {
      this.active = this.name === name
    })
  }
}
</script>

<style scoped lang="scss">
  .f-tabs-pane{
    &.is-active{
      color: red;
    }
  }
</style>
