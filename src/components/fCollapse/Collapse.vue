
<template>
  <div class="f-collapse">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
export default {
  name: 'fCollapse',
  data () {
    return {
      eventBus: new Vue()
    }
  },
  provide() {
    return {
      eventBus: this.eventBus
    }
  },
  props: {
    activeName: {
      type: Array,
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.eventBus.$emit('updateCollapseItem',this.activeName)

    this.eventBus.$on('removeSelectedCollapseItem',(name) => {
      let copyActiveNames = JSON.parse(JSON.stringify(this.activeName))
      let index = this.activeName.indexOf(name)
      copyActiveNames.splice(index,1)
      this.eventBus.$emit('updateCollapseItem',copyActiveNames)
      this.$emit('update:active-name',copyActiveNames) //更新外界的值
    })

    this.eventBus.$on('addSelectedCollapseItem',(name) => {
      let copyActiveNames = JSON.parse(JSON.stringify(this.activeName))
      if(this.accordion) {
        copyActiveNames = [name]  //如果是手风琴模式，则折叠面板只能打开一个
      } else {
        copyActiveNames.push(name)
      }
      this.eventBus.$emit('updateCollapseItem',copyActiveNames)
      this.$emit('update:active-name',copyActiveNames)
    })
  }
}
</script>

<style scoped lang="scss">
.f-collapse {
  margin-bottom: 20px;
}
</style>
