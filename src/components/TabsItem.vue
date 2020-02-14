<template>
  <div class="f-tabs-item">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'fTabsItem',
    props: {
      name: {
        type: [String,Number],
        required: true
      }
    },
    created() {
      // console.log(`传递过来的name值为${this.name}`)
    }
  }
</script>

<style scoped lang="scss">
  .f-tabs-item{

  }
</style>

