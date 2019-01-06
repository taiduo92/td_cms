<template>
    <div class="v_chapterDetail">
        <!-- 头部  BEGIN -->
        <pb-header :isRight="true">
            <span slot="left" @click="closeFn">返回</span>
            <span slot="title" v-text="chapter.chapter_name"></span>
            <span slot="right">恢复数据</span>
        </pb-header>
         <!-- 头部  END -->
        
        <section class="v_section">
                <role-bubble  v-for="(bubbleItem,bubbleIndex) in bubbleList" v-if="bubbleItem.code != 130 || bubbleItem.code != 105" :isRole="bubbleItem.code == 100" :roleType="bubbleItem.code">
                    <span v-text="bubbleType[bubbleItem.code]" slot="title"></span>
                    <span v-text="bubbleItem.argv.text" slot="content"></span>
                </role-bubble>
        </section>


        

    </div>
</template>

<script>
import pbHeader from '../../../components/pb_header'
import roleBubble from './bubble/roleBubble'
export default {
       created(){
        //    console.log("chapterchapterchapter",this.chapter);
            this.init();
       },
       props:['chapter'],
       components:{
            pbHeader,
            roleBubble
        },
        data(){
            return{
                bubbleList:[],
                //类型
                bubbleType:{
                    '110':'CG',
                    '111':'中气泡',
                    '112':'旁白'
                }
            }
        },
        methods: {
            init(){
                this.initData();
            },
            //初始化数据
            initData(){
               
                if(!this.chapter || !this.chapter.cmd_sequence_list || !this.chapter.cmd_sequence_list.length)return;
                //获取数据内容
                 this.bubbleList  = this.chapter.cmd_sequence_list.map(item=>{
                     return item.cmd_event
                 });
                 console.log('this.bubbleList',this.bubbleList)
            },
            //关闭页面
            closeFn(){
                this.$parent.isChapterDetail = false;
            },
        },
}
</script>

<style>
    .v_chapterDetail{

    }
    .v_section{
        position: relative;
        width: 100%;
        height: 100%;
        padding: 18px 15px  12px;
        box-sizing: border-box;
        overflow: hidden;
    }
</style>
