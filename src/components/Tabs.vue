<template>
  <div class="f-tabs">
    <div class="f-tabs-head">
      <div class="f-tabs-item" v-for="(item, index) in TabsItems" :key="index" :class="tabsClasses(item)"
           @click="handleChange(index)"
      >
        {{item.label}}
      </div>
    </div>
    <div class="line" ref="line"></div>
    <div class="f-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from "vue";
export default {
  name: "fTabs",
  data() {
    return {
      eventBus: new Vue(),
      TabsItems: [],
      activeName: this.selected
    };
  },
  provide() {
    return {
      eventBus: this.eventBus
    };
  },
  props: {
    selected: {
      type: String
    }
  },
  methods: {
    tabsClasses(item) {
      return {
        'is-active': item.name === this.activeName
      }
    },
    handleChange(index) {
      let selectedTabItem = this.TabsItems[index]
      this.activeName = selectedTabItem.name
      this.eventBus.$emit('update:selected',selectedTabItem)
    }
  },
  created() {
    this.eventBus.$on("update:TabsItems", ({label, name}) => {
      this.TabsItems.push({
        label:label,
        name:name
      })
    })
  },
  mounted() {
    this.eventBus.$emit('update:selected',this.selected)
  }
};
</script>

<style scoped lang="scss">
$font-size: 14px;
.f-tabs {
  width: 600px;
  .f-tabs-head {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #dddddd;
    font-size: $font-size;
    position: relative;
    .f-tabs-item {
      padding: 0.5em 1em;
      cursor: pointer;
      transition: all 0.5s;
      margin-right: 1em;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: #1890ff;
      }
      &.is-active {
        color: #1890ff;
      }
    }
  }
  .line {
    content: "";
    display: block;
    height: 2px;
    background-color: #1890ff;
    position: absolute;
    top: 100%;
    left: 0;
    transition: all 0.5s;
  }
  .f-tabs-content {
    border: 1px solid red;
    padding: 1em 0;
  }
}
</style>
