<template>
<div class="f-toast-wrapper" :class="toastClasses">
  <div class="f-toast" ref="toast">
    <div class="message">
      <slot>更新成功!!!!</slot>
    </div>
    <div class="line" ref="line" v-if="closeButton.show"></div>
    <span v-if="closeButton && closeButton.show" class="close" @click="onClickClose">
      {{closeButton.text}}
    </span>
  </div>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'fToa',
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    autoCloseDelay: {
      type: [String,Number],
      default: 5
    },
    closeButton: {
      type: Object,
      default() {
        return {
          text: '关闭',
          show: false,
          callback: undefined
        }
      }
    },
    position: {
      type: String,
      default: 'top',
      validator(val) {
        return ['top','middle','bottom'].indexOf(val) >= 0
      }
    }
  },
  computed: {
    toastClasses() {
      return {
        [`position-${this.position}`]: true
      }
    }
  },
  mounted() {
    this.updateStyles()
    this.execAutoClose()
  },
  methods: {
    close() {
      this.$el.remove()
      this.$emit('close')
      this.$destroy()
    },
    execAutoClose() {
      if(this.autoClose) {
        setTimeout( () => {
          //点击如何关闭? 将元素移除即可
          this.close()
        },1000 * this.autoCloseDelay)
      }
    },
    updateStyles() {
      this.$nextTick( () => {
        let height = `${this.$refs.toast.getBoundingClientRect().height}px`
        if(this.$refs.line) {
          this.$refs.line.style.height = height
        }
      })
    },
    onClickClose() {
      this.close()
      if(this.closeButton && typeof this.closeButton.callback === 'function') {
        this.closeButton.callback()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  $min-height: 40px;
  $animation-duration: 0.3s;
  @keyframes slide-down {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .f-toast-wrapper{
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    &.position-top{
      top: 0;
      .f-toast{
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        animation: slide-down $animation-duration;
      }
    }
    &.position-middle{
      top: 50%;
      transform: translate(-50%,-50%);
      .f-toast{
        animation: fade-in $animation-duration;
      }
    }
    &.position-bottom{
      bottom: 0;
      .f-toast{
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        animation: slide-up $animation-duration;
      }
    }
  }
  .f-toast{
    background-color: rgba(0,0,0,0.75);
    box-shadow: 0 0 3px 0 rgba(0,0,0,0.50);
    color: #ffffff;
    font-size: 14px;
    padding: 0 1em;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    min-height: $min-height;
    .line{
      border-left: 1px solid #dddddd;
      margin: 0 1em;
    }
    .close{
      white-space: nowrap;
    }
    .message{
      padding: 0.5em 0;
    }
  }
</style>
