<template>
  <div class="f-popover" @click="onClick" ref="popover">
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
    positionContent() {
      let contentWrapper = this.$refs.contentWrapper
      document.body.append(contentWrapper)
      let {left,top} = this.$refs.triggerWrapper.getBoundingClientRect()
      contentWrapper.style.top = top + window.pageYOffset + 'px'
      contentWrapper.style.left = left + window.pageXOffset + `px`
    },
    listenToDocument() {
      let eventHandler = (e) => {
        if (this.$refs.contentWrapper && 
                this.$refs.contentWrapper.contains(e.target)) {
          return
        }
        this.visible = false
        console.log('关闭')
        document.removeEventListener('click', eventHandler)
      }
      document.addEventListener("click", eventHandler)
    },
    onShow() {
      setTimeout(() => {
        this.positionContent()
        this.listenToDocument()
      }, 0)
    },
    onClick(event) {
      if(this.$refs.triggerWrapper.contains(event.target)) {
        this.visible = !this.visible
        if (this.visible) {
          this.onShow()
        } else {
          console.log(`被关闭了`)
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
  border: 1px solid red;
  width: 200px;
  height: 100px;
  transform: translateY(-100%);
}
</style>
