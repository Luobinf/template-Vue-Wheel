<template>
  <div class="f-tabs-body">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'fTabsBody',
  inject: ['eventBus']
}
</script>

<style scoped lang="scss">
  .f-tabs-body{

  }
</style>
