<template>
    <div class="mx-preview-right">

        <div  v-show="!isChapterItemList">
            <!-- 头部  BEGIN -->
            <pb-header >
                <span slot="title" v-text="getProjectName"></span>
            </pb-header>
            <!-- 头部  END -->


            <header class="preview-header">
                <span>章节数:<font v-text="chapterNumber">3</font></span>
                <span >作品字数:<font v-text="chapterSize">3</font></span>
            </header>

            <!-- 章节列表 -->
            <section class="preview-chapterList">
                <div class="preview-chapterList-item" v-for="(chapterItem,chapterIndex) in chapterList"  @click="skipCurrentChapterListFn(chapterItem.chapter_id,chapterItem.chapter_name)">
                    <div>
                        <span v-text="chapterType[chapterItem.chapter_type]">普通</span>
                        <span v-text="chapterItem.chapter_name">章节1</span>
                    </div>
                    <div :class="chapterItem.chapter_expression.s_id == 2 ? 'chapter-bsx' : chapterItem.chapter_expression.s_id == 3 ? 'chapter-xx' : '' ">
                        <span v-text="chapterMode[chapterItem.chapter_expression.s_id]">网聊</span>
                        <span v-text="chapterItem.chapter_words  + '字'">4字</span>
                    </div>
                </div>
            </section>
        </div>
        

        <chapter-item-list :chapterItem = 'chapterItem' v-if="isChapterItemList"></chapter-item-list>
    </div>
</template>

<script>

import pbHeader from '../../../components/pb_header'
import chapterItemList from './chapterItemList'
import { mapGetters } from 'vuex';
export default {
    created() {
        this.init();
    },
    components:{
        pbHeader,
        chapterItemList
    },
    computed: {
        ...mapGetters([
            'getProjectName'
        ])
    },
    data(){
        return {
            //章节列表
            chapterList:[],
            //所有章节字数
            chapterSize:0,
            //章节数量
            chapterNumber:0,
            //章节类型
            chapterType:['初始','普通','结局'],
            //章节模式
            chapterMode:['','网聊','半身像','胸像模式'],
            //章节id
            chapterId:0,
            //章节名称
            chapterName:"",
            //单个章节列表显示状态
            isChapterItemList:false,
            chapterItem:{}
        }
    },
    watch:{
        "$route":"init"    //后面是methods中的一个方法
    },
    methods: {
        //初始化  
        init(){
            this.isChapterItemList = false;
            let _param = this.$route.params;
            let _previewData =  _param.data;
            if(_previewData && _previewData.chapter_list.length){
                let _chapterList = _previewData.chapter_list;
                //绑定章节数
                this.chapterNumber = _chapterList.length;
                //绑定章节字数
                this.chapterSize = _chapterList.reduce((to,current)=>{
                    to  = to == undefined ? 0 : typeof(to) == 'object' ?  to.chapter_words  : to;
                    return  parseInt(to) + parseInt(current.chapter_words);
                })
                this.chapterSize = typeof(this.chapterSize) == 'object' ? this.chapterSize.chapter_words : this.chapterSize; 
                //绑定章节列表
                this.chapterList = _chapterList;
            }
        },
        //跳转查看当前章节发布次数
        skipCurrentChapterListFn(id,name){
            this.chapterItem = {
                chapterId:id,
                chapterName:name
            }
            this.isChapterItemList = true;
        }
        
    },
}
</script>

<style>

</style>
