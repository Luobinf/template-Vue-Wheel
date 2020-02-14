<template>
  <div class="f-input-wrapper">
    <input :type="type" :class="[size]" :placeholder="placeholder" :disabled="disabled" :style="iptStyle"
           ref="input" v-if="!showPassword" :value="value"
           @input="$emit('input',$event.target.value)" @change="$emit('change', $event.target.value)"
    />
    <input :type="iptType" :class="[size]" :placeholder="placeholder" :disabled="disabled" :style="iptStyle"
           @focus="focus" @blur="blur" ref="input" v-if="showPassword" :value="value"
           @input="$emit('input',$event.target.value)" @change="$emit('change', $event.target.value)"
    />
    <template v-if="showPassword && show">
      <svg class="iptIcon" aria-hidden="true" @click="switchPassword">
        <use xlink:href="#i-eye"></use>
      </svg>
    </template>
    <f-icon v-if="icon" :iconName="icon" class="iptIcon"></f-icon>
  </div>
</template>

<script type="text/javascript">
import fIcon from './Icon'
import Emitter from './emitter'
export default {
  name: "fInput",
  mixins: [Emitter],
  data() {
    return {
      show: false,
      iptType: 'password',
      information: 'hi'
    };
  },
  props: {
    size: {
      type: String,
      default: 'medium',
      validator(val) {
        return ['medium','small','large'].indexOf(val) >= 0
      }
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text',
      validator(val) {
        return ['text','password','number','email','date','checkbox','radio','submit'].indexOf(val) >= 0
      }
    },
    'show-password': {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    value: {
      type:String
    }
  },
  components: {
    fIcon
  },
  computed: {
    iptStyle() {
      return (this.showPassword || this.icon) ? {
        paddingRight: '1.8em'
      } : {
        paddingRight: '0.6em'
      }
    }
  },
  methods: {
    focus(event) {
     this.show = true
      this.$emit('focus',event.target.value)
    },
    blur() {
      if(this.$refs.input.value === '') {
        this.show = false
      }
      this.$emit('focus',event.target.value)
    },
    switchPassword() {
      this.iptType = this.iptType === 'password' ? 'text' : 'password'
    }
  },
  created() {
    this.$on('showSomething',(val) => {
      console.log(val)
    })
  },
  mounted() {
    this.dispatch('App','show',this.information)
  }
};
</script>

<style scoped lang="scss">
$font-size: 16px;
$height: 32px;
$box-sizing: border-box;
$border-radius: 6px;
$border-color: rgb(220, 223, 230);
$border-color-focus: #40a9ff;
$border-color-hover: rgb(192, 196, 204);
$color: rgb(192, 196, 204);
.f-input-wrapper {
  display: inline-flex;
  position: relative;
  vertical-align: top;
  > input {
    padding: 0.5em 0.6em;
    font-size: $font-size;
    outline: none;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    transition: all 0.5s;
    cursor: pointer;
    width: 9em;
    &::-webkit-input-placeholder{
      color: $color;
    }
    &:-ms-input-placeholder {
      color: $color;
    }
    &::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: $color;
    }
    &:hover{
      border-color: $border-color-hover;
    }
    &:focus{
      border-color: $border-color-focus;
    }
    &:disabled{
      cursor: not-allowed;
      background-color: #f5f7fa;
    }
    &.small{
      font-size: 12px;
    }
    &.large{
      font-size: 20px;
    }
  }
  .iptIcon{
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    overflow: hidden;
    fill: rgb(192, 196, 204);
    position: absolute;
    right: 0.6em;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.5s;
    cursor: pointer;
    &:hover{
      fill: gray;
    }
  }
}
</style>
