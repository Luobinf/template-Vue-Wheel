<template>
  <div class="f-popover" @click.stop="xxx">
    <div v-if="visible" class="content-wrapper" ref="contentWrapper">
      <slot name="content"></slot>
    </div>
    <span class="trigger" ref="triggerWrapper">
      <slot></slot>
    </span>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "f-popover",
  data() {
    return {
      visible: false
    };
  },
  methods: {
    xxx() {
      this.visible = !this.visible
      if (this.visible) {
        setTimeout(() => {
          let contentWrapper = this.$refs.contentWrapper
          document.body.append(contentWrapper)
          let {left,top,width,height} = this.$refs.triggerWrapper.getBoundingClientRect()
          contentWrapper.style.top = top + window.pageYOffset + 'px'
          contentWrapper.style.left = left + window.pageXOffset + `px`
          let eventHandler = () => {
            this.visible = false
            console.log(`document 隐藏 popover`)
            document.removeEventListener('click',eventHandler)
          }
          document.addEventListener("click", eventHandler)
        }, 0)
      } else {
        console.log(`vm 隐藏 popover`)
      }
    }
  },
  mounted() {
    console.log(this.$refs.triggerWrapper)
  }
};
</script>

<style scoped lang="scss">
.f-popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
  .trigger {
    display: inline-block;
  }
}
.content-wrapper {
  position: absolute;
  border: 1px solid red;
  width: 200px;
  height: 100px;
  transform: translateY(-100%);
}
</style>
