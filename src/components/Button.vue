<template>
  <button class="f-button" :class="[type, iconPosition, size]" @click="onClick">
    <span class="word">
      <slot>按钮</slot>
    </span>
    <f-icon :iconName="icon" v-if="icon && !loading"></f-icon>
    <f-icon class="loading" iconName="loading" v-if="loading"></f-icon>
  </button>
</template>
<script type="text/javascript">
import fIcon from "./Icon";
export default {
  name: "fButton",
  data() {
    return {};
  },
  props: {
    type: {
      default: "default",
      type: String,
      validator(val) {
        return ["default", "dashed", "danger", "primary"].indexOf(val) >= 0;
      }
    },
    icon: {},
    iconPosition: {
      default: "left",
      type: String,
      validator(val) {
        return ["left", "right"].indexOf(val) >= 0;
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      default: "medium",
      type: String,
      validator(val) {
        return ["medium", "small", "large"].indexOf(val) >= 0;
      }
    }
  },
  components: {
    fIcon
  },
  methods: {
    onClick() {
        this.$emit('click')
    }
  }
};
</script>

<style scoped lang="scss">
$border-color: rgb(217, 217, 217);
$button-padding: 0.3em 1em;
$font-small-size: 12px;
$font-size: 14px;
$font-large-size: 16px;
$border-radius: 4px;
$color: rgba(0, 0, 0, 0.65);
$border-color-hover: #40a9ff;
$color-hover: #40a9ff;

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.f-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: $button-padding;
  font-size: $font-size;
  border-radius: $border-radius;
  color: $color;
  cursor: pointer;
  transition: all 0.5s;
  background-color: white;
  outline: none;
  &:focus {
    outline: none;
  }
  &.default {
    border: 1px solid $border-color;
    &:hover {
      color: $color-hover;
      border: 1px solid $border-color-hover;
    }
  }

  &.dashed {
    border: 1px dashed $border-color;
    &:hover {
      color: $color-hover;
      border: 1px dashed $border-color-hover;
    }
  }

  &.primary {
    background: #1890ff;
    color: #fff;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    border: none;
    &:hover {
      background-color: rgb(64, 169, 255);
    }
  }

  &.danger {
    background: #ff4d4f;
    color: #fff;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    border: none;
    &:hover {
      background-color: rgb(255, 120, 117);
    }
  }

  &.left > .fIcon {
    order: 1;
    margin-right: 0.3em;
  }
  &.left > .word {
    order: 2;
  }
  &.right > .fIcon {
    order: 2;
    margin-left: 0.3em;
  }
  &.right > .word {
    order: 1;
  }

  .loading {
    animation: spin 1s infinite linear;
  }

  &.small {
    font-size: $font-small-size;
  }
  &.large {
    font-size: $font-large-size;
  }
}
</style>
