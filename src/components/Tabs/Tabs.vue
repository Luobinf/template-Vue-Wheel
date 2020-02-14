<template>
  <div class="f-tabs">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
export default {
  name: 'fTabs',
  props: {
    selected: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal','vertical'].indexOf(val) >= 0
      }
    }
  },
  data() {
    return {
      eventBus: new Vue()
    }
  },
  provide() {
    return {
      eventBus: this.eventBus
    }
  },
  mounted() {
    // 此时能够保证所有子元素都在页面上了。
    this.eventBus.$emit('update:selected',this.selected)
  }
}
</script>

<style scoped lang="scss">
  .f-tabs{

  }
</style>
