<template>
    <div id="V_login">
       <el-form status-icon   label-width="62px" class="demo-ruleForm">

            <el-form-item label="用户名:" >
                <el-input v-model="userName" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>


            <el-form-item label="密码:">
                <el-input type="password" v-model="password" placeholder="请输入密码" autocomplete="off"></el-input>
            </el-form-item>
             <el-button type="primary" @click="submitForm()">登陆</el-button>
        </el-form>
    </div>
</template>
<script>
 import {axiosLogin} from '../../service/requestConfig.js'
 import {mapGetters} from 'vuex'
 export default {
    computed:{
        ...mapGetters([
             //获取上一次存储的路由地址
            'getStNextRouter'
        ])
    },
    data() {
      return {
        userName:'',
        password:''
      }
    },
    created(){
        this.init();
    },
    methods: {
      init(){
          this.initData();
      },
      //初始化数据
      initData(){
       
      },
      submitForm(formName) {
          if(this.userName =='' || this.password ==''){
              this.ut_showMessage('error','userPwdInexistence');
              return;
          }
          this.requestLoginFn((state,token)=>{
                this.ut_showMessage('success','loginSuccess');
                this.storeLoginInfo(token);
                setTimeout(()=>{
                    this.$router.replace(this.getStNextRouter);
                },100)
          })
      },

      //请求登陆接口
      requestLoginFn(callback){
          axiosLogin(this.userName,this.password).then(resp=>{
              let _data = resp.data;
              if(_data.isOk){
                    callback(_data.isOk,_data.token);
              }else{
                    this.ut_showMessage('error',_data.message.title);
              }
          }).catch(err=>{
              console.log('登陆失败,失败原因',err);
              this.ut_showMessage('error','serviceUnusual');
          })
      },
      //存储登陆成功token
      storeLoginInfo(token){
          this.$store.commit('setLoginState',token);
      }
    }
  }
</script>
<<style scoped>
    @import './login.css'
</style>