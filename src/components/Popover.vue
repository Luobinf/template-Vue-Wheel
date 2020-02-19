<template>
  <div class="f-popover" @click.stop="xxx">
    <div v-show="visible" class="content-wrapper" @click.stop>
      <slot name="content"></slot>
    </div>
    <slot></slot>
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
          let x = () => {
            this.visible = false
            console.log(`document 隐藏 popover`)
            document.removeEventListener('click',x)
          }
          document.addEventListener("click", x)
        }, 0)
      } else {
        console.log(`vm 隐藏 popover`)
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
  .content-wrapper {
    position: absolute;
    left: 0;
    bottom: 100%;
    border: 1px solid red;
  }
}
</style>
