// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '../node_modules/_swiper@5.3.6@swiper/css/swiper.min.css'
import '../node_modules/_swiper@5.3.6@swiper/js/swiper.min.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)
axios.defaults.withCredentials = true
Vue.use(VueQuillEditor)
    // 获取cookie
function getCookie(name) {
    name = name + "="
    var start = document.cookie.indexOf(name),
        value = null;
    if (start > -1) {
        var end = document.cookie.indexOf(";", start);
        if (end == -1) {
            end = document.cookie.length;
        }
        value = document.cookie.substring(start + name.length, end);
    }
    return value;
}

NProgress.configure({
        easing: 'ease', // 动画方式    
        speed: 500, // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })
    // 跳转拦截
router.beforeEach((to, from, next) => {
    // 每次切换页面时，调用进度条
    NProgress.start()
    if (getCookie('isAdmin') === 'true') { //如果有cookie就畅通无阻
        next();
    } else {
        if (to.path == '/' || to.path == '/detail' || to.path == '/map' || to.path == '/about' || to.path == '/contract') { //如果是首页和详情和地图以及关于我们页面就直接next()
            next();
        } else { //不然就跳转到登录；
            console.log('没有cookie:' + getCookie("isAdmin"))
            next('/');
        }
    }
});
router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})