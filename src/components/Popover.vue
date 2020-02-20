<template>
  <div class="f-popover" @click="onClick" ref="popover">
    <div class="content-wrapper" ref="contentWrapper" v-show="visible">
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
    }
  },
  methods: {
    eventHandler(e) {
      if(this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)) {
        return
      }
      // 当点击按钮时直接退出，应该由onCLick方法去关闭popover，不应该由document来关闭
      if(this.$refs.popover && this.$refs.popover.contains(e.target)) {
        return
      }
      this.close()
    },
    locateContent() {
      let contentWrapper = this.$refs.contentWrapper
      document.body.append(contentWrapper)
      let triggerWrapper = this.$refs.triggerWrapper
      let {top,left} = triggerWrapper.getBoundingClientRect() //获取元素相对于窗口的位置信息
      contentWrapper.style.left = left + window.pageXOffset +'px'
      contentWrapper.style.top = top + window.pageYOffset+ 'px'
    },
    open() {
      this.visible = true
      this.locateContent()
      setTimeout( () => {
        document.addEventListener('click',this.eventHandler)
      },0)
    },
    close() {
      this.visible = false
      document.removeEventListener('click',this.eventHandler)
    },
    onClick(e) {
      if(this.$refs.triggerWrapper.contains(e.target)) {
        if(this.visible === true) {
          this.close()
        } else {
          this.open()
        }
      }
    }
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
  width: 200px;
  transform: translateY(-100%);
  border: 1px solid skyblue;
}
</style>
