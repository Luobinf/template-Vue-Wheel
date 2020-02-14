<template>
  <div class="f-tabs">
    <div class="f-tabs-header">
      <div class="f-tabs-item" v-for="(item,val) in headerTabsItems" @click="switchTabOption(val,$event)" :key="++val"
        :class="{'is-active': `${val}` === value}" ref="tabsItem"
           :name="names[val]"
      >
        {{item}}
      </div>
      <!-- 暂时先这样写着 -->
      <f-tabs-item v-for="(item,val) in headerTabsItems" :name="names[val]">
        {{item}}
      </f-tabs-item>
      <div class="line" ref="line"></div>
  </div>
    <div class="f-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import fTabsItem from './TabsItem'
export default {
  name: 'fTabs',
  data () {
    return {
      eventBus: new Vue(),
      headerTabsItems: [],
      names: []
    }
  },
  provide() {
    return {
      eventBus: this.eventBus
    }
  },
  props: {
    value: {
      type: String
    }
  },
  components: {
    fTabsItem
  },
  created() {
    // 中央事件总线
    this.eventBus.$on('update:headerTabsItems',(label,name) => {
      this.headerTabsItems.push(label)
      this.names.push(name)
    })
    this.eventBus.$on('update:selectedTab',(val) => {
      this.$emit('update:value',val)
    })
  },
  methods: {
    switchTabOption(value,event) {
      this.eventBus.$emit('update:selectedTab',`${value}`)
      this.$emit('tab-click',event)
      this.updateLineStyles(event)
    },
    initialSelectTab() {
      this.$children.forEach( (vm) => {
        if(vm.$options.name === 'fTabPane') {
          if(this.value === vm.name) {
            this.eventBus.$emit('initialSelected',this.value)
          }
        } else {
          alert(`f-tabs的子元素只能是组件f-tab-pane`)
        }
      })
    },
    updateLineStyles(event) {
      let width = event.target.getBoundingClientRect().width
      let line = this.$refs.line
      line.style.width = `${width}px`
      line.style.left = event.target.getBoundingClientRect().left + 'px'
    },
    initialLineStyles() {
      this.$nextTick( function () {
        let tabsItems = this.$refs['tabsItem']
        tabsItems.forEach((node) => {
          let activeTabItem = node.classList.value.indexOf('is-active')
          if(activeTabItem !== -1) {
            let width = node.getBoundingClientRect().width
            let line = this.$refs.line
            line.style.width = `${width}px`
          }
        })
      })
    }
  },
  mounted() {
    this.initialSelectTab()
    this.initialLineStyles()
  }
}
</script>

<style scoped lang="scss">
  $font-size: 14px;
  .f-tabs{
    width: 600px;
    /*margin: 0 auto;*/
  }
  .f-tabs-header{
    display: flex;
    align-items: center;
    border-bottom: 2px solid #dddddd;
    font-size: $font-size;
    position: relative;
    .f-tabs-item{
      padding: 0.5em 1em;
      cursor: pointer;
      transition: all .5s;
      margin-right: 1em;
      &:last-child{
        margin-right: 0;
      }
      &:hover{
        color: #1890ff;
      }
      &.is-active{
        color: #1890ff;
      }
    }
    .line{
      content: '';
      display: block;
      height: 2px;
      background-color: #1890ff;
      position: absolute;
      top: 100%;
      left: 0;
      transition: all 0.5s;
    }
  }
  .f-tabs-content{
    border: 1px solid red;
    padding: 1em 0;
  }
</style>
