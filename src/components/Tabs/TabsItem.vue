<template>
  <div class="f-tabs-item" @click="handleClick" :class="classes">
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
    handleClick() {
      this.eventBus.$emit('update:selected',this.name,this)
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
    height: 100%;
    display: flex;
    align-items: center;
    &:hover {
      color: #1890ff;
    }
    &.is-active {
      color: #1890ff;
      font-weight: bold;
    }
  }
</style>
