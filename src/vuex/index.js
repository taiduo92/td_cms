import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


let  state = {
    //登陆状态
    isLogin:false,
    //用户token
    mxToken:null,
    //作品发布次数
    projectNumber:0,
    //作品id
    projectId:0,
    //作品名称
    projectName:"作品名称",
}
//检查登陆
let checkLogin = ()=>{
    //获取本地存储token 用来记录是否登陆过
    let getToke = window.localStorage.getItem("token");
    if(getToke){
        state.mxToken = getToke;
        return true
    };
    return false;
}

if(checkLogin()){
    state.isLogin = true;
}





const Store = new Vuex.Store({
    state,
    getters:{
        //获取登陆状态
        getLoginState(state){
            return state.isLogin;
        },
        //获取token
        getToken(state){
            return state.mxToken;
        },
        //获取发布次数
        getProjectNumber(state){
            return state.projectNumber;
        },
        //获取作品id
        getProjectId(state){
            return state.projectId;
        },
        //获取作品名称
        getProjectName(state){
            return state.projectName;
        }
    },
    //设置登陆状态
    mutations:{
        //设置登陆状态和token
        setLoginState(state,param){
            state.isLogin = param;
            state.mxToken = param;
            window.localStorage.setItem('token',param ? param : '');
        },
        //设置发布次数
        setProjectNumber(state,num){
             state.projectNumber = num;
        },
        //设置作品id
        setProjectId(state,id){
            state.projectId = id;
        },
        //获取作品名称
        setProjectName(state,name){
            state.projectName = name;
        }
    }
})














export default Store;