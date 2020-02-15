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
    if(this.$children.length === 0) {
      throw new Error(`tabs的子组件应该是f-tabs-head和f-tabs-body，但你的子组件不是这样的`)
    }
    // 此时能够保证所有子元素都在页面上了。
    this.$children.forEach( (vm) => {
      if (vm.$options.name === 'fTabsHead') {
        vm.$children.forEach( (item) => {
          if (item.$options.name === 'fTabsItem' && item.name === this.selected) {
            this.eventBus.$emit('update:selected',this.selected,item)
          }
        })
      }
    })
    this.eventBus.$on('update:selected',(name) => {
      //触发事件以更新外面的selectedTab值
      this.$emit('update:selected',name)
    })
  }
}
</script>

<style scoped lang="scss">
  .f-tabs{
    width: 800px;
  }
</style>
