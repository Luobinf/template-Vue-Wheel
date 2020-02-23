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
          <g-tabs-item name="woman">美女</g-tabs-item>
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
    <section style="margin-top: 100px">
      <div style="border: 1px solid red;padding: 5px;width: 500px;margin-left: 100px">
        <f-popover width="250" title="Title" :visible.sync="visible">
            <template v-slot:content>
                <p>Content内容</p>
                <p>Content内容</p>
               <div>
                   <button @click="visible = false" style="margin-left: 80%;">Close</button>
               </div>
            </template>
            <f-button size="small">Top</f-button>
        </f-popover>
          {{visible}}
<!--        <f-popover width="200" position="bottom" title="Title">-->
<!--          <template v-slot:content>-->
<!--            <p>Content内容</p>-->
<!--            <p>Content内容</p>-->
<!--          </template>-->
<!--          <f-button size="small">Bottom</f-button>-->
<!--        </f-popover>-->
<!--        <f-popover width="200" position="left" title="Title" content="Content内容，Content内容">-->
<!--            <f-button size="small">Left</f-button>-->
<!--        </f-popover>-->
<!--        <f-popover width="200" position="right">-->
<!--          <template v-slot:content>-->
<!--            <div>popover内容</div>-->
<!--          </template>-->
<!--          <f-button size="small">Right</f-button>-->
<!--        </f-popover>-->
      </div>
<!--      <f-popover width="200" trigger="hover">-->
<!--        <template v-slot:content>-->
<!--          <div>popover内容popover内容</div>-->
<!--        </template>-->
<!--        <f-button>Top</f-button>-->
<!--      </f-popover>-->
<!--      <f-popover width="200" position="bottom" trigger="hover">-->
<!--        <template v-slot:content>-->
<!--          <div>popover内容</div>-->
<!--        </template>-->
<!--        <f-button size="small">Bottom</f-button>-->
<!--      </f-popover>-->
<!--      <f-popover width="200" position="left" trigger="hover">-->
<!--        <template v-slot:content>-->
<!--          <div>popover内容</div>-->
<!--        </template>-->
<!--        <f-button size="small">Left</f-button>-->
<!--      </f-popover>-->
<!--      <f-popover width="200" position="right" trigger="hover">-->
<!--        <template v-slot:content>-->
<!--          <div>popover内容</div>-->
<!--        </template>-->
<!--        <f-button size="small">Right</f-button>-->
<!--      </f-popover>-->
    </section>
    <section id="collapse">
        {{active}}
      <f-collapse :active-name.sync="active">
          <f-collapse-item name="1" title="一致性 Consistency">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          </f-collapse-item>
          <f-collapse-item name="2" title="反馈 Feedback">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          </f-collapse-item>
          <f-collapse-item name="3" title="效率 Efficiency">
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          </f-collapse-item>
          <f-collapse-item name="4" title="可控 Controllability">
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </f-collapse-item>
      </f-collapse>
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

  import fPopover from './components/Popover'

  import fCollapse from './components/fCollapse/Collapse'
  import fCollapseItem from './components/fCollapse/CollapseItem'
  export default {
    name: 'App',
    //混入
    mixins: [Emitter],
    data() {
      return {
        message: 'hello',
        eventBus: new Vue(),
        activeName: 'second',
        selectedTab: 'sports',
        visible: false,
          active: ['2']
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
      gTabsPane,
      fPopover,
      fCollapse,
      fCollapseItem
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
