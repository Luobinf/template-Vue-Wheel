<template>
  <div class="f-popover" @click="onClick" ref="popover">
    <div class="content-wrapper" ref="contentWrapper" v-show="visible" :class="[`position-${position}`]">
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
  props: {
    position: {
      type: String,
      default: 'top',
      validator(val) {
        return ['top','bottom','left','right'].indexOf(val) >= 0
      }
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
      let {top,left,bottom,right,height} = triggerWrapper.getBoundingClientRect() //获取元素相对于窗口的位置信息
      let  differenceHeight = contentWrapper.getBoundingClientRect().height - height

      if(this.position === 'top') {
        contentWrapper.style.left = left + window.pageXOffset + 'px'
        contentWrapper.style.top = top + window.pageYOffset + 'px'
      } else if(this.position === 'bottom') {
        contentWrapper.style.left = left + window.pageXOffset + 'px'
        contentWrapper.style.top = bottom + window.pageYOffset + 'px'
      } else if(this.position === 'left') {
        contentWrapper.style.left = left + window.pageXOffset + 'px'
        contentWrapper.style.top = top + window.pageYOffset - differenceHeight/2 + 'px'
      } else if(this.position === 'right') {
        contentWrapper.style.left = right + window.pageXOffset + 'px'
        contentWrapper.style.top = top + window.pageYOffset - differenceHeight/2 + 'px'
      }
    },
    open() {
      this.visible = true
      setTimeout( () => {
        this.locateContent()
        document.addEventListener('click',this.eventHandler)
      },0)
      // 下面出了一个问题，为什么document的监听不是在下一个事件循环中
      // this.$nextTick( () => {
      //   this.locateContent()
      //   document.addEventListener('click',this.eventHandler)
      // })
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
$border-radius: 4px;
$border-color: #333;
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
  border: 1px solid $border-color;
  border-radius: $border-radius;
  /*box-shadow: 0 0 3px rgba(0,0,0,0.5);*/
  filter: drop-shadow(0 0 3px rgba(0,0,0,0.5));
  background-color: white;
  padding: 0.5em 1em;
  max-width: 20em;
  word-break: break-all;
  &::before,&::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    position: absolute;
  }

  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before,&::after {
      border-top-color: black;
      left: 20%;
      top: 100%;
    }
    &::after {
      border-top-color: white;
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before,&::after {
      left: 20%;
      bottom: 100%;
      border-bottom-color: black;
    }
    &::after {
      border-bottom-color: white;
      bottom: calc(100% - 1px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before,&::after {
      top: calc(50% - 5px);
      left: 100%;
      border-left-color: black;
    }
    &::after {
      border-left-color: white;
      left: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before,&::after {
      top: calc(50% - 5px);
      right: 100%;
      border-right-color: black;
    }
    &::after {
      border-right-color: white;
      right: calc(100% - 1px);
    }
  }
}
</style>
