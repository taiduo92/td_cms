<template>
    <div class="v_bubble">
        <div class="bubble-left" v-if="isRole">
            <img  slot="roleImg" src="//mxcdn.cgyouxi.com/res_ver3/39/39bcd3686b9e49442eff74987970256f">

            <div class='roleType'><slot v-if="roleType">主角</slot></div>
        </div>

        <div class="bubble-right" :class="isRole ? 'right-padding' : ''">

            <p class="bubble-right-name">
                <slot name="userName"  v-if="isRole">姓名</slot>
                <slot name="title"  v-else>姓名</slot>
            </p>


            <div class="bubble-right-content">
                <slot name="content">2222222</slot>
                <!-- <img slot="bgImg" src="//mxcdn.cgyouxi.com/res_ver3/65/6548d581805c50647d3581c730da0bfa" /> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        isRole:{
            default:false
        },
        roleType:{
            default:false,
        }
    }
}
</script>


<style scoped>
    .v_bubble{
        overflow: hidden;
        margin-bottom: 20px;
    }
    .bubble-left{
        /* display: inline-block; */
        float: left;
        width:40px;
    }
    .bubble-left>img{
        display: block;
        width:38px;
        height: 38px;
        border-radius: 50%;
        border:1px solid #D6D6D6;
    }
    .bubble-left>.roleType{
        position: relative;
        width: 40px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        background: #647DFF;
        border-radius: 8px;
        margin-top: -4px;
        /* margin-left: 4px; */
    }

    .bubble-right{
      
    }
    .right-padding{
        padding-left:50px;
    }
    .bubble-right-name{
        font-size:14px;
        margin-bottom: 10px;
        color:#7c7c7c;
    }
    .bubble-right-content{
        width:100%;
        font-size:14px;
        /* min-height: 40px; */
        color:rgba(44, 44, 44, 0.8);
        padding:12px;
        line-height: 20px;
        overflow: hidden;
        box-sizing: border-box;
        background-color: #eee;
        border-radius: 6px;
        word-wrap: break-word;
        word-break: break-word;
    }
    .bubble-right-content > span{
        display: block;
         margin-bottom: 12px;
    }
    .bubble-right-content > img{
        display: block;
        width:80px;
        height: 80px;
        border: 1px solid #AAAAAA;
        border-radius: 8px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        /* margin-bottom: 10px; */
    }

</style>
