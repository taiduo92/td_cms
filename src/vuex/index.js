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
    //接口版本
    apiVersion:'online',
}
//检查登陆
let checkLogin = ()=>{
    //获取本地存储token 用来记录是否登陆过
    let _getToke = window.localStorage.getItem("token");
    if(_getToke){
        state.mxToken = _getToke;
        return true
    };
    return false;
}
//检查是否设置过环境模式
let checkVersion = ()=>{
    //获取本地存储token 用来记录是否登陆过
    let _version = window.localStorage.getItem("mx_version");
    if(_version){
        state.apiVersion = _version;
        return true
    };
    return false;
}
checkVersion();
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
        },
        //获取接口版本
        getApiVersion(state){
            return state.apiVersion;
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
        },
         //设置接口版本
         setApiVersion(state,version){
            state.apiVersion = version;
            window.localStorage.setItem('mx_version',version);
        }
    }
})














export default Store;