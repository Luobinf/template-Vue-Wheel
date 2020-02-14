<template>
  <div class="f-tabs-pane" v-show="tabName === selectedTab">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'fTabPane',
  data () {
    return {
      tabName: this.name,
      tab: ''
    }
  },
  computed: {
    selectedTab() {
      return this.tab
    }
  },
  inject: ['eventBus'],
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    }
  },
  created() {
    this.eventBus.$emit('update:headerTabsItems',this.label,this.name)
    this.eventBus.$on('initialSelected',(val) => {
      this.tab = val
    })
  },
  mounted() {
    this.eventBus.$on('update:selectedTab',(val) => {
      this.tab = val
    })
  }
}
</script>

<style scoped lang="scss">

</style>
