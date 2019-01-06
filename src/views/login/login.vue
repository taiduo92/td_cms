<template>
    <div id="V_login">
       <el-form status-icon   label-width="62px" class="demo-ruleForm">

            <el-form-item label="用户名:" >
                <el-input v-model="userName"></el-input>
            </el-form-item>


            <el-form-item label="密码:">
                <el-input type="password" v-model="password" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="确认密码:" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
            </el-form-item> -->
           
             <el-button type="primary" @click="submitForm()">登陆</el-button>
        </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        // userName:'15611789985',
        // password:'td123456'
      }
    },
    methods: {
      submitForm(formName) {
          if(this.userName =='' || this.password ==''){
              this.$message({
                message: '用户名和密码不能为空!',
                type: 'warning'
              });
              return;
          }
          this.requestLoginFn((state,token)=>{
                this.$message('登陆成功');
                this.storeLoginInfo(token);
                setTimeout(()=>{
                    this.$router.replace('/');
                },100)
          })
      },

      //请求登陆接口
      requestLoginFn(callback){
          let _api =`http://mxapi.cgyouxi.com/apiuser/v1/web/user/login/common/login?login_name=${this.userName}&password=${this.password}`;
        //   ,{
        //       login_name:this.userName,
        //       password:this.password
        //   }
          this.axios.post(_api).then(resp=>{
              let _data = resp.data;
              if(_data.isOk){
                    callback(_data.isOk,_data.token);
              }else{
                    this.$message({
                        message: _data.message.title,
                        type: 'warning'
                    });
              }
              
          }).catch(err=>{
              console.log('登陆失败,失败原因',err);
              this.$message({
                message: '服务器连接失败！',
                type: 'warning'
              });
          })
      },
      //存储登陆成功token
      storeLoginInfo(token){
        //   window.localStorage.setItem('token',this.userName+this.password)
          this.$store.commit('setLoginState',token);
      }



    }
  }
</script>
<<style scoped>
    @import './login.css'
</style>