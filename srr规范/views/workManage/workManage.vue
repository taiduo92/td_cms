//*****************************************
// 创建人：泰多
// 创建时间：2019-01-15
// 功能说明：作品管理主界面
//*****************************************
<template>
    <div class="V_workInfo">
        <!-- 头部 BEIN -->
        <header class="workinfo-header">

        </header>
        <!-- 头部 END -->

        <!-- 内容 BEIN -->
        <section class="workinfo-section">

        </section>
        <!-- 内容 END -->

        <!-- 底部 BEIN -->
        <footer class="workinfo-footer">

        </footer>
         <!-- 底部 END -->
    </div>
</template>

<script>
     export default {
        created(){
            init();
        },
        computed:{
            //计算累加
            cu_add(){
                return  this.dt_num+this.dt_numFrist;
            }
        },
        data(){
            return{
                dt_message:"数据",
                dt_num:10,
                dt_numFrist:20
            }
        },
        watch:{
            //监听消息
            dt_message(){

            },
        },
        methods:{
            //必须写的 初始化方法
            init(){ 
                this.initData();
                this.initFn();
            },
            //初始化数据
            initData(){

            },
            //初始化方法
            initFn(){

            },
            //方法类 以fn开头 后面方法名
            fn_openTag(){

            },
            //请求类  以xhr开头  后面方法名
            xhr_login(){

            },
            //辅助功能类 以ut开头 后面方法名
            ut_handlerString(){

            }
        }
    }
</script>

<style scoped>
    @import './workManage.css';
</style>

