<template>
  <div class="Todo">
    <button @click="onClick">点击按钮</button>
  </div>
</template>

<script type="text/javascript">
export default {
  inject: ['eventBus'],
  data () {
    return {

    }
  },
  methods: {
    onClick() {
      this.$emit('addTodo','hello vue.js!')
      this.eventBus.$emit('addTodo','使用eventBus进行通信')
    }
  },
  mounted() {
    this.$on('addTodo', (value) => {
      console.log(value)
    })
  }
}
</script>

<style scoped lang="scss">
</style>
