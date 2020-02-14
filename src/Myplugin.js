import fToast from './components/Toa'
let currentToast
export default {
    install(Vue) {
        //添加实例方法
        Vue.prototype.$createToast = function (message,propsData) {
            if(currentToast) {
                currentToast.close()
            }
            currentToast = createToast(Vue,message,propsData,() => {
                //避免在点击关闭按钮后，再次渲染toast组件时，仍然执行一次close操作
                currentToast = null
            })
        }
    }
}

//创建toast实例
function createToast(Vue,message,propsData,onClose) {
    let Toast = Vue.extend(fToast)
    let toast = new Toast({
        propsData
    })
    toast.$slots.default = [message]
    toast.$on('close',onClose)
    toast.$mount()
    document.body.append(toast.$el)
    return toast
}
