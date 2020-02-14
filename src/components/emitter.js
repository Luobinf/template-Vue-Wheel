export default {
    methods: {
        broadcast(componentName,eventName,param) {
            broadcast.call(this,componentName,eventName,param)
        },
        dispatch(componentName,eventName,param) {
            let parent = this.$parent
            let name = parent.$options.name
            // 有可能父组件没有使用name属性，此时name为undefined，那么！undefined为true
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent
                if(parent) {
                    name = parent.$options.name
                }
            }
            if(name === componentName) {
                parent.$emit.call(parent,eventName,param)
            }
        }
    }
}

// 类似于Vue.js 1.x 中的this.$broadcast 和 this.$dispatch方法
function broadcast(componentName,eventName,param) {
    this.$children.forEach( (child) => {
        // child为子组件实例
        const name = child.$options.name
        if(name === componentName) {
            child.$emit.call(child,eventName,param)
        } else {
            broadcast.call(child,componentName,eventName,param)
        }
    })
}
