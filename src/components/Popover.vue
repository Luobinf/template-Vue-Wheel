<template>
  <div class="f-popover-wrapper" @click="xxx">
    <div class="f-popover" v-show="show" ref="popover">
      <div class="f-popover-title">
        {{title}}
      </div>
      <div class="f-popover-content">
        {{content}}
      </div>
    </div>
    <span class="btn-wrapper">
      <slot></slot>
    </span>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'f-popover',
  data() {
    return {
      show: false
    }
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '这是一段内容'
    },
    width: {
      type: [String,Number],
      default: 200
    }
  },
  methods: {
    xxx() {
      this.show = !this.show
    },
    close() {
      let body = document.querySelector('body')
      let popover = this.$refs.popover
      body.addEventListener('click',(event) => {
        console.log(event.target)
        if(event.target.tagName !== 'BUTTON' && event.target.tagName !== 'SPAN' && !event.target.classList.contains('btn-wrapper')){
          this.show = false
        }
      if(popover.contains(event.target)) {
        this.show = true
      }
      })
    }
  },
  mounted() {
   this.close()
  }
}
</script>

<style scoped lang="scss">
  .f-popover-wrapper {
    display: inline-block;
    position: relative;
    margin-left: 100px;
    .f-popover {
      position: absolute;
      width: 200px;
      left: 0;
      bottom: 100%;
      border: 1px solid red;
    }
  }
  .btn-wrapper {
    display: inline-block;
  }
</style>
