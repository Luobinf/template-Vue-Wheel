<template>
  <div class="f-collapse-item">
    <div class="title" @click="onClickHandler">
      {{title}}
    </div>
    <transition name="fade">
      <div class="content" v-show="showContent">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'fCollapseItem',
  data () {
    return {
      showContent: false
    }
  },
  inject: ['eventBus'],
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    onClickHandler() {
      if(this.showContent === true) {
        this.eventBus.$emit('removeSelectedCollapseItem',this.name)
      } else {
        this.eventBus.$emit('addSelectedCollapseItem',this.name)
      }
    }
  },
  created() {
   this.eventBus.$on('updateCollapseItem',(names) => {
     this.showContent = names.indexOf(this.name) >= 0
   })
  }
}
</script>

<style scoped lang="scss">
$color: #303133;
$font-size: 13px;
$font-weight: 500;
.f-collapse-item {
  border-top: 1px solid rgb(235, 238, 245);
  width: 600px;
  margin: 0 auto;
  &:last-child {
    border-bottom: 1px solid rgb(235, 238, 245);
  }
  .title {
    color: $color;
    font-size: $font-size;
    font-weight: $font-weight;
    height: 48px;
    line-height: 48px;
    cursor: pointer;
  }
  .content {
    color: $color;
    font-size: $font-size;
    font-weight: 400;
    padding: 0 0 1.5em 0;
    &.is-active {
      background-color: #f7f7f7;
    }
  }
}
</style>
