//*****************************************
// 创建人：泰多
// 创建时间：2019/1/6
// 功能说明：该组件主要显示当前章节列表
//***********
<template>
    <div class="mx-preview-right">

        <div  v-if="!isChapterDetail">
            <!-- 头部  BEGIN -->
            <pb-header :isLeft="false" :isRight="chapterNumber > 0">
                <span slot="title" v-text="getProjectName"></span>
                <span slot="right"  @click="allRestoreDataFn">全部恢复</span>
            </pb-header>
            <!-- 头部  END -->


            <header class="preview-header">
                <span>章节数:<font v-text="chapterNumber">3</font></span>
                <span >作品字数:<font v-text="chapterSize">3</font></span>
            </header>

            <!-- 章节列表 -->
            <section class="preview-chapterList">
                <div class="preview-chapterList-item" v-for="(chapterItem,chapterIndex) in chapterList"  @click="skipChapterDetailFn(chapterItem)">
                    <div>
                        <span v-text="chapterType[chapterItem.chapter_type]">普通</span>
                        <span v-text="chapterItem.chapter_name">章节1</span>
                        <el-tag  class="publishState"  size="small" type="success" v-if="chapterItem.puhlishState == 'succeed'" v-text="restoreState[chapterItem.puhlishState]"></el-tag>
                        <el-tag  class="publishState"  size="small" type="danger" v-if="chapterItem.puhlishState == 'failure'" v-text="restoreState[chapterItem.puhlishState]"></el-tag>
                    </div>
                    <div :class="chapterItem.chapter_expression.s_id == 2 ? 'chapter-bsx' : chapterItem.chapter_expression.s_id == 3 ? 'chapter-xx' : '' ">
                        <span v-text="chapterMode[chapterItem.chapter_expression.s_id]">网聊</span>
                        <span v-text="chapterItem.chapter_words  + '字'">4字</span>
                    </div>
                </div>
            </section>
            <div v-if="chapterNumber <= 0" style="text-align:center;margin-top:30px;">
                章节数据全部丢失 请联系程序员
            </div>
        </div>
      
        
          <!-- 章节内容详情 -->
        <chapter-detail :chapter="chapter" v-if="isChapterDetail"></chapter-detail>
    </div>
</template>

<script>

import pbHeader from '../../../components/pb_header'
import chapterDetail from './chapterDetail'
import { mapGetters } from 'vuex';
//封装接口请求
import {axiosGetPublishProject,axiosSaveStructures}  from '../../../service/requestConfig.js'
import ut from '../../../utils/utils.js'
export default {
    created() {
        this.init();
    },
    components:{
        pbHeader,
        chapterDetail
    },
    computed: {
        ...mapGetters([
            'getProjectName',
            'getProjectNumber',
            'getProjectId'
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
            //创作区内容显示详情
            isChapterDetail:false,
            //章节内容详情
            chapter:{},
            //恢复数据状态
            restoreState:{
                succeed:"恢复成功",
                failure:"恢复失败"
            },
            //当前章节版本
            currentChapterVersion:0
        }
    },
    watch:{
        "$route":"init"    //后面是methods中的一个方法
    },
    methods: {
        //初始化  
        init(){
           this.initData();
            let _param = this.$route.params;
            let _previewData =  _param.data;
            
            if(_previewData && _previewData.chapter_list.length){
                this.currentChapterVersion = _param.version;
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
        //初始化数据
        initData(){
             this.isChapterDetail = false;
             this.chapterList = [];
             this.chapterSize = 0;
             this.chapterNumber = 0;
        },
        //每个章节添加一些操作状态
        chapterAddProperty(chapterList){
            return chater;
        },
        //跳转章节内容详情
        skipChapterDetailFn(chapter){
            this.getCurrentChpaterContentFn(chapter.chapter_id,(data)=>{
                if(data){
                    this.chapter = data;
                    this.isChapterDetail = true;
                }else{
                    this.ut_showMessage("error",'作者章节内容未发布');
                }
            })
        },
        //获取当前章节内容
        getCurrentChpaterContentFn(id,callback){
            axiosGetPublishProject(this.getProjectId,this.currentChapterVersion,`chapter_${id}.bin`).then((item)=>{
                callback(item.data)
            }).catch(err=>{
                callback(false);
            })
        },
        //全部恢复数据
        allRestoreDataFn(){


            //  this.chapterList.forEach(item=>{
            //      item.puhlishState = null;
            //  })
            //  console.log(" this.chapterList", this.chapterList);
            this.chapterList.forEach(item=>{
                
                this.getCurrentChpaterContentFn(item.chapter_id,(data)=>{
                    if(data){ 
                        this.restoreDataFn(item,data);
                    }else{
                        this.ut_showMessage("error",`${item.chapter_name}章节内容没有发布过`);
                        this.restoreStateBind('failure',item);
                    }
                })
            })  
        },
        //数据恢复
        restoreDataFn(chapter,chapterContent){
            //恢复数据结构
            axiosSaveStructures(this.getProjectId,`chapter_${chapter.chapter_id}.bin`,chapterContent).then(resp=>{
                if(resp.data.isOk){
                    this.restoreStateBind('succeed',chapter);
                }else{
                   this.restoreStateBind('failure',chapter);    
                }
            },()=>{
                 this.restoreStateBind('failure',chapter);
            }).catch(err=>{
                this.restoreStateBind('failure',chapter);
                this.ut_showMessage('error','dataRenewFailure');
                console.log("数据恢复失败原因",err);
            })
        },
        //数据恢复状态绑定
        restoreStateBind(type,chapter){
            switch(type){
                case 'succeed':
                    this.$set(chapter,'puhlishState','succeed')
                break;
                case 'failure':
                    this.$set(chapter,'puhlishState','failure')
                break;
            }
        }
    },
}
</script>

<style>

</style>
