<template>
  <div class="f-tabs-item" @click="xxx" :class="classes">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'fTabsItem',
  data() {
    return{
      active: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
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
  },
  methods: {
    xxx() {
      this.eventBus.$emit('update:selected',this.name)
    }
  }
}
</script>

<style scoped lang="scss">
  .f-tabs-item{
    flex-shrink: 0;
    padding: 0 1em;
    transition: all 0.5s;
    cursor: pointer;
    &.is-active {
      color: #1890ff;
    }
    &:hover {
      color: #1890ff;
    }
  }
</style>
