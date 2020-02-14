<template>
  <div class="f-tabs-head">
    <slot></slot>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'fTabsHead',
  inject: ['eventBus']
}
</script>

<style scoped lang="scss">
  $tab-head-height: 40px;
  .f-tabs-head{
    display: flex;
    height: $tab-head-height;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid red;
    > .actions-wrapper{
      margin-left: auto;
      margin-right: 1em;
    }
  }
</style>
