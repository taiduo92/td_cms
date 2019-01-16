import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router-url'
import store from '../vuex/index'

// 1:Vue中添加路由插件
Vue.use(VueRouter);


// 2:实例化vueRouter
const vueRouter =  new VueRouter({
    //3:添加对应路由页面
    routes,
    //4:开启histroy模式 去掉#号
    mode:"history",
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
    }
})




/** 
 *  beforeEach  全局路由守卫
 *  功能: 当触发一个导航路由时 会先触发beforeEach 方法·
 *  to       即将要进入的路由地址
 *  from     当前跳转路由地址
 *  next     执行跳转   
 */
vueRouter.beforeEach((to,from,next)=>{
    if(!store.getters.getLoginState && to.name != "login"){
        alert("未登录 请先登陆！")
        next({
            path:'/login'
        })
    }else{
        next(); 
    }
   
})


export default vueRouter;