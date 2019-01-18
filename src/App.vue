<template>
  <div id="app">

      <div class="app_menu" @click="fn_routeActive">
          <el-menu  class="el-menu-demo"   mode="horizontal" :default-active="activeRouter" active-text-color="#E6A23C" background-color="#409EFF"  text-color="#fff">
              <el-menu-item index="/" ><router-link  tag="div" to="/">主页</router-link> </el-menu-item>
              <el-menu-item index="mx"><router-link  tag="div" to="/mx">木夕数据恢复</router-link></el-menu-item>
              <el-menu-item index="mxCreate"><router-link  tag="div" to="/mxCreate">木夕作品拷贝</router-link></el-menu-item>
              <el-menu-item index="mxTest"><router-link  tag="div" to="/mxTest">木夕工具测试</router-link></el-menu-item>
              <el-menu-item index="about"><router-link  tag="div" to="/about">关于我们</router-link></el-menu-item>
              <el-menu-item index="login" class="fr" v-show="!loginState"><router-link tag="div" to="login">登陆</router-link></el-menu-item>
              <el-menu-item index="1"  @click="centerDialogVisible = true" v-show="loginState"   class="fr" >退出登陆</el-menu-item>
          </el-menu>


          <el-select   v-model="versionOption" @change="fn_checkVerion" class="selectOption" placeholder="请选择">
                <el-option  
                  v-for="item in versionItem"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
          </el-select>
      
      </div>


      <el-dialog title="提示"  :visible.sync="centerDialogVisible"   width="30%"   center>
          <span>确定退出登陆吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="exitLogin">确 定</el-button>
          </span>
      </el-dialog>

      <div class="v_wrapper">
        <!-- <transition  name="fade" mode="out-in"> -->
             <router-view></router-view>
        <!-- </transition> -->
       
      </div>
  </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
export default {
  name: 'app',
  created() {
    this.init();
  },
  computed: {
     loginState(){
       return this.$store.getters.getLoginState;
     },
     ...mapGetters([
        //获取当前是测试环境还是线上环境
        'getApiVersion'
      ])
  },
  data(){
    return{
        centerDialogVisible:false,
        activeRouter:'login',
        //环境版本
        versionItem:[
            {
              value:"online",
              label:"正式环境"
            },
            {
              value:"test",
              label:"测试环境"
            },
        ],
        //版本类型
        versionOption:"test"
    }
  },
  methods: {
    init(){
        this.initData();
        this.initFn();
    },
    initData(){
      this.versionOption = this.getApiVersion;
    },
    initFn(){
      this.fn_routeActive();
    },
    //当前路由默认选中状态
    fn_routeActive(){
       this.activeRouter =  this.$route.path.split('/')[1] ?   this.$route.path.split('/')[1] : '/';
    },
    //选择版本
    ...mapMutations([
      'setApiVersion',
      'setStNextRouter'
    ]),
    /** 
     * 切换环境
     * @param {String} version=>版本类型
    */
    fn_checkVerion(version){
         let _router =  this.$route.path ?   this.$route.path : '/';
         this.setApiVersion(version);
         this.setStNextRouter(_router);
         this.exitLogin('no')
    },
    //退出登录
    exitLogin(type){
        this.centerDialogVisible = false;
        this.$store.commit('setLoginState',false);
        if(!type){
           this.$message('退出登陆成功');
        }
        this.$router.replace('/login');
    },
  },
  updated() {
    this.initFn();
  },
}
</script>

<style>
  @import url('./assets/css/common.css');

</style>
