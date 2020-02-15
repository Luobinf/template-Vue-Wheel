<template>
  <div id="app">
    <section>
      <f-button icon="loading" iconPosition="right">Default</f-button>
      <hr>
      <f-button type="dashed" :loading="true">Dashed</f-button>
      <hr>
      <f-button type="primary" icon="settings" iconPosition="left" size="large">Primary</f-button>
      <hr>
      <f-button type="danger" size="small" @click="xxx">Danger</f-button>
      <hr>
      <f-button-group>
        <f-button icon="arrow-left">上一页</f-button>
        <f-button icon="arrow-right" iconPosition="right">下一页</f-button>
      </f-button-group>
    </section>
    <section>
      <f-input size="small" placeholder="请输入内容" disabled></f-input>
      <f-input size="small" placeholder="请输入内容" :disabled="true"></f-input>
      <hr>
      <f-input placeholder="请输入密码" :show-password="true"></f-input>
      <f-input placeholder="请输入密码" type="password"></f-input>
      <hr>
      <f-input placeholder="请输入" size="large"></f-input>
      <hr>
      <f-input placeholder="请搜索" icon="search"></f-input>
      <f-input placeholder="请选择日期" icon="calculator"></f-input>
      <f-input value="你好!"></f-input>
      <f-input v-model="message"></f-input>
    </section>
    <section>
      <button @click="showToast1('top')">top</button>
      <button @click="showToast2('middle')">middle</button>
      <button @click="showToast3('bottom')">bottom</button>
    </section>
    <section>
      <button @click="showT">有关闭按钮</button>
      <button @click="showT1">无关闭按钮</button>
    </section>
    <section>
      <hr>
      <f-tabs :selected.sync="activeName" @tab-click="handleClick">
        <!--   name表示选项卡的别名   -->
        <f-tab-pane label="用户管理配置" name="first" disabled>用户管理</f-tab-pane>
        <f-tab-pane label="配置管理" name="second">配置管理</f-tab-pane>
        <f-tab-pane label="角色管理哈哈哈哈" name="third">角色管理</f-tab-pane>
        <f-tab-pane label="定时任务补偿" name="forth">定时任务补偿</f-tab-pane>
      </f-tabs>
      当前激活的选项卡名字为: {{activeName}}
      <hr>
    </section>

    <section>
      <g-tabs :selected.sync="selectedTab">
        <g-tabs-head>
          <g-tabs-item name="woman">美女与野兽</g-tabs-item>
          <g-tabs-item name="finance">财经</g-tabs-item>
          <g-tabs-item name="sports">体育生活</g-tabs-item>
          <template v-slot:actions>
            <button>设置</button>
          </template>
        </g-tabs-head>
        <g-tabs-body>
          <g-tabs-pane name="woman">美女相关资讯</g-tabs-pane>
          <g-tabs-pane name="finance">财经相关资讯</g-tabs-pane>
          <g-tabs-pane name="sports">体育相关资讯</g-tabs-pane>
        </g-tabs-body>
      </g-tabs>
      {{selectedTab}}
    </section>
  </div>
</template>
<script>
  import fButton from './components/Button'
  import fButtonGroup from './components/ButtonGroup'
  import fInput from './components/Input'
  import fToast from './components/Toast'
  import Vue from 'vue'
  import Emitter from './components/emitter'
  import fTabs from './components/fTabs/Tabs'
  import fTabPane from './components/fTabs/TabPane'

  import gTabs from './components/Tabs/Tabs'
  import gTabsHead from './components/Tabs/TabsHead'
  import gTabsBody from './components/Tabs/TabsBody'
  import gTabsItem from './components/Tabs/TabsItem'
  import gTabsPane from './components/Tabs/TabsPane'
  export default {
    name: 'App',
    //混入
    mixins: [Emitter],
    data() {
      return {
        message: 'hello',
        eventBus: new Vue(),
        activeName: 'second',
        selectedTab: 'sports'
      }
    },
    provide () {
      return {
        app: this,
        eventBus: this.eventBus
      }
    },
    components: {
      fButton,
      fButtonGroup,
      fInput,
      fToast,
      fTabs,
      fTabPane,
      gTabs,
      gTabsHead,
      gTabsBody,
      gTabsItem,
      gTabsPane
    },
    methods: {
      xxx() {
        console.log('我被点击了')
      },
      showToast(position) {
        this.$toast('更新成功😄',{
          closeButton: {
            text: '关闭',
            show: true,
            callback() {
              console.log('哈哈哈哈你好')
            }
          },
          enableHtml: false,
          position,
          showButton: true
        })
      },
      showToast1(position) {
        this.showToast(position)
      },
      showToast2(position) {
        this.showToast(position)
      },
      showToast3(position) {
        this.showToast(position)
      },
      showT() {
        this.$createToast('我来更新了顶顶',{
          autoClose: true,
          autoCloseDelay: 5,
          closeButton: {
            text: '关闭了',
            show: true,
            callback() {
              console.log('已经关闭了')
            }
          },
          position: 'top'
        })
      },
      showT1() {
        this.$createToast('我来更新了顶顶',{
          autoClose: true,
          autoCloseDelay: 10,
          position: 'top'
        })
      },
      handleClick(val) {
        //第一个参数是被点击的那个元素
        // console.log(val.target)
      }
    }
  }
</script>
<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  section{
    margin-top: 10px;
  }
</style>
