<template>
  <div class="f-tabs-pane" v-show="active">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'fTabPane',
  data () {
    return {
      active: false
    }
  },
  inject: ['eventBus'],
  props: {
    label: {
      type: String
    },
    name: {
      type: [String,Number],
      required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
  },
  created() {
    this.eventBus.$on('update:selected',(item) => {
      this.active = item.name === this.name || item === this.name
    })
  },
  mounted() {
    this.eventBus.$emit('update:TabsItems',{
      label: this.label,
      name: this.name,
      disabled: this.disabled
    })
  }
}
</script>

<style scoped lang="scss">

</style>
