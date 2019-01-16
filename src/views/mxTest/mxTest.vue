//**********************************
//创建人  : 泰多
//创建时间: 2019年1月16日
//功能说明: 木夕暴力测试作品发布 修改
//**********************************
<template>
    <div class="V_mxTest">
        <el-row :gutter="20">
            <!-- 左边添加作品 BEGIN -->
            <el-col :span="10">
                <el-button type="primary" class="fl mb20" @click="fn_addProject">添加作品</el-button>
                <el-table  :data="dt_projectList"  border  style="width: 100%">
                    <el-table-column    label="作品名称"  >
                        <template  slot-scope="scope">
                                <el-autocomplete
                                v-model="scope.row.projectName"
                                class="inline-input medium-width medium-input"
                                placeholder="请输入作品名称"
                                :trigger-on-focus="false"
                                :fetch-suggestions="fn_querySearch"
                                @select="((item)=>fn_selectProject(item,scope))"
                                ></el-autocomplete>
                        </template>
                    </el-table-column>
                    <el-table-column    label="选择章节" >
                        <template slot-scope="scope">
                             <el-select v-model="scope.row.chapterId" @change="fn_selectChapter(scope.row)" class="medium-input" size="medium" placeholder="请选择">
                                <el-option
                                v-for="item in scope.row.chapterList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column  width="120" label="操作">
                        <template slot-scope="scope">
                           <el-button
                            size="mini"
                            type="danger"
                            @click="fn_deleteRow(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <!-- 左边添加作品 END -->
            

            <!-- 右边章节内容添加发布 BEGIN -->
            <el-col :span="6" class="mxTest-right fr">
                 <div class="mxTest-right-title mb20 ">
                     <el-button type="primary" size="medium" @click="fn_batchSaveChaper">保存章节</el-button>
                 </div>

                 <el-form label-width="100px" class="form-newClass">
                      <el-form-item  label="选择气泡类型">
                            <el-select  v-model="dt_bubbleType"  placeholder="请选择活动区域">
                                <el-option
                                v-for="coreBubble in dt_coreBubble"
                                :key="coreBubble.value"
                                :label="coreBubble.label"
                                :value="coreBubble.value">
                                </el-option>
                            </el-select>
                      </el-form-item>
                      <el-form-item label="输入内容">
                           <el-input type="textarea" v-model="dt_bubbleContent"></el-input>
                      </el-form-item>
                 </el-form>
            </el-col>
            <!-- 右边章节内容添加发布  END -->
           
        </el-row>



    </div>
</template>

<script>
  //封装接口请求
 import {axiosQueryProject,axiosSaveStructures,axiosGetStructures}  from '../../service/requestConfig.js'
 import ut from '../../utils/utils.js'
  export default {
    data() {
      return {
        dt_projectList: [{
            //作品名称
            projectName:"",
            //作品id
            projectId:0,
            //选中章节id
            chapterId:"",
            //章节列表
            chapterList:[],
            //章节内容数据
            chapterContent:""
        }],
        //核心气泡
        dt_coreBubble:[{
                value:100,
                label:"角色气泡",
            },{
                value:111,
                label:"中气泡",
            },{
                value:110,
                label:"CG",
            },{
                value:112,
                label:"旁白",
            }
        ],
        //气泡类型
        dt_bubbleType:"",
        //气泡内容
        dt_bubbleContent:""
      }
    },

    methods: {
        //初始化
        init(){

        },
        //初始化数据
        initData(){

        },
        //初始化方法
        initFn(){

        },
        //添加作品
        fn_addProject(){
            this.dt_projectList.push({
                //作品名称
                projectName:"",
                //作品id
                projectId:0,
                //选中章节id
                chapterId:"",
                //章节列表
                chapterList:[],
                //章节内容数据
                chapterContent:""
            })
        },
        /**     
         * 删除当前列
         * @param {String} index=>当前列索引
        */
        fn_deleteRow(index){
            this.dt_projectList.splice(index,1);
        },
        /**
         * 搜索作品
         * @param {String}  queryValue:  选择作品
         * @param {String}          cb:  搜索到作品后传递搜索数据的回调函数
         */
        fn_querySearch(queryValue, cb){
           if(!queryValue || queryValue == "")return;
           axiosQueryProject(queryValue).then(resp=>{
                let _serverData  = resp.data;
                let _arr = [];
                if(_serverData.isOk && _serverData.data && _serverData.data.length){
                    _arr = _serverData.data.map((item)=>{
                        return {
                            value:item.work_name+'  ['+item.username+']',
                            projectId:item.project_id
                        }
                    })
                }
                cb(_arr);
            })
        },
        /**
         * 选择作品
         * @param  {Object}        item=>当前下拉框里面的作品数据 包含作品名称和作品id
         * @param  {Object}  currentRow=>当前一列数据集合 dt_projectList里面的对象数据 还有element ui返回的对象
         */
        fn_selectProject(item,currentRow){
            currentRow.row.projectId = item.projectId;
            //获取章节列表数据
            this.xhr_getProjectFile(item.projectId,"['chapterinfo.bin']",(data)=>{
                //清空章节列表
                currentRow.row.chapterList = [];
                //遍历存储章节数据
                data.chapter_list.forEach(item=>{
                    currentRow.row.chapterList.push({
                        value:item.chapter_id,
                        label:item.chapter_name
                    })
                })
            });
        },
        /**
         * 获取作品文件
         * @param {String}          projectId=>作品id
         * @param {Array}      structuresName=>获取文件名称
         * @param {Function}               cb=>回调函数  获取数据成功后执行并返回数据
         */
        xhr_getProjectFile(projectId,structuresName,cb){
            axiosGetStructures(projectId,structuresName).then(resp=>{
                //获取处理后数据
                let _handlerData = this.ut_handlerChapterData(resp.data.data[0]);
                cb(_handlerData);
            },()=>{
            }).catch((err)=>{
                console.log("章节列表获取失败",err)
                this.ut_showMessage("error",'章节列表获取失败');
            })
        },
        /**  
         * 处理章节数据
         * @param {Object}  data=>接口获取的chapterinfo数据
        */
        ut_handlerChapterData(data){
            if(Object.prototype.toString.call(data) != "[object Object]")return null;
            if(data.materialVer == 'v3'){
                return JSON.parse(data.structureContent_v3)
            }else{
                return JSON.parse(data.structureContent)
            }
        },
        /**  
         * 选择章节
         * @param {Object} row=>当前列数据
        */
        fn_selectChapter(row){
            this.xhr_getProjectFile(row.projectId,`['chapter_${row.chapterId}.bin']`,(item)=>{
                row.chapterContent = item;
            })
        },
        //批量保存章节数据
        fn_batchSaveChaper(){
            console.log(this.dt_projectList)
            // this.xhr_getProjectFile()
        },
        /** 
         * 保存章节数据
         * @param {String} projectId=>工程id
         * @param {String} chapterId=>章节id
        */
        xhr_saveChapter(projectId,chapterId,chapterContent){
            return new  Promise((reolve,reject)=>{
                chapterContent = chapterContent.
                axiosSaveStructures(projectId,`['chapter_${row.chapterId}.bin']`,)
            }) 
        },
        /** 
         * 添加章节数据
         * 
        */
        ut_addChapterData(data){
            data.cmd_sequence_list

            return data;
        },
        /** 
         * 生成气泡数据
         * 
        */
        ut_createBubbleData(){
            let _bubble = null;
            switch(this.dt_bubbleType){
                //角色气泡
                case 100:
                    _bubble = {
                        cmd_event: {
                            argv: {
                                text: this.dt_bubbleContent,
                                text_pos: 0
                            },
                            cmd_key: "show_aside",
                            code: 112
                        },
                        cmd_list:{},
                        i_id: ut.createId(),
                        s_id: ut.createId()
                    }
                    break;
                //中气泡
                case 111:
                    break;
                //CG
                case 110:
                    break;
                //旁白
                case 112:
                    break;
            }   

        }
    }
  }
</script>

<style scoped>
    @import './mxTest.css';
</style>
 