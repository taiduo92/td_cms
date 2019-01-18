<template>
    <div class="mx_create">
        <div class="mx-create-center">
            <!-- 左边查询编辑章节数据 -->
            <div class="fl mx-create-center-left"> 
              <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="作品名称:"  >
                         <el-autocomplete
                        class="inline-input samll-width"
                        v-model="queryProjectName"
                        
                        :fetch-suggestions="queryProjectFn"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                      
                        @select="((item)=>{selectProjectFn(item,'query')})"
                        ></el-autocomplete>
                    </el-form-item>

                    



                    <el-form-item>
                        <el-button type="primary" @click="queryChapterFn">查询</el-button>
                    </el-form-item>
                </el-form>

              <el-table  :data="chapterList"  border  style="width: 100%">
                <el-table-column    label="章节名称"   align="center"   prop="chapterName"> </el-table-column>
                <el-table-column    label="章节类型"   align="center"  prop="chapterType"></el-table-column>       
                <el-table-column    label="章节模式"   align="center"  prop="chapterMode"></el-table-column>         
                <el-table-column    label="章节字数"   align="center"  prop="chapterSize"></el-table-column>         
                <el-table-column   align="right" width="250">
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini">编辑</el-button>
                        <el-button
                        size="mini" type="danger">添加气泡</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            

             <!-- 右边插入作品数据 -->
            <div class="fr mx-create-center-right">
                <el-form :inline="true" class="demo-form-inline">
                        <!-- <el-form-item label="导入作品名称:">
                            <el-input v-model="insertProjectId" class="samll-width" placeholder="请输入作品名"></el-input>
                            
                        </el-form-item> -->
                         <el-form-item label="导入作品名称:" >
                            <el-autocomplete
                            class="inline-input samll-width"
                            v-model="insertProjectName"
                            :fetch-suggestions="queryProjectFn"
                            placeholder="请输入内容"
                            :trigger-on-focus="false"
                            @select="((item)=>{selectProjectFn(item,'insert')})"
                            ></el-autocomplete>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="insertProjectFn">导入</el-button>
                        </el-form-item>
                </el-form>
                <el-table  :data="insertList"  border  style="width: 100%">
                    <el-table-column    label="导入文件名称"    prop="fileName"> </el-table-column>
                    
                    <el-table-column label="导入状态">
                        <template slot-scope="scope" >
                            <span style="color:red" v-text="insertState[scope.row.state]"></span>
                        </template>
                    </el-table-column>       


                    <el-table-column   align="center">
                        <template slot="header">操作</template>
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" v-if="scope.row.state == 'failure'">重试</el-button>
                            <el-button @click="lookChaterListFn()" v-if="scope.row.fileName.indexOf('chapterinfo') != -1" size="mini" type="danger">查看章节列表</el-button> 
                        </template>
                    </el-table-column>
                </el-table>
            </div>


             <!-- 导入章节列表弹出层 -->
            <transition name="el-zoom-in-center">
                <div class="mx-create-chapterLayer" @click="closeLayer" v-show="isInsertChapterList">
                    <div class="chapterLayer-content" @click.stop>
                        <el-button type="primary"  class="all-insertChapterList" @click="allInsertCurrentChapterFn">全部导入</el-button>
                

                        <el-table  :data="insertChapterList"  border  style="width: 100%">
                            <el-table-column    label="章节名称"    prop="chapter_name"> </el-table-column>
                            <el-table-column    label="章节类型"    > 
                                    <template slot-scope="scope">
                                        <span v-text="chapterType[scope.row.chapter_type]"></span>
                                    </template>
                            </el-table-column>
                            <el-table-column    label="章节模式"    prop="fileName">
                                 <template slot-scope="scope">
                                        <span v-text="chapterMode[scope.row.chapter_mode]"></span>
                                    </template>
                            </el-table-column>
                            <el-table-column    label="章节字数"   prop="chapter_words"> </el-table-column>
                            
                            <el-table-column label="导入状态">
                                <template slot-scope="scope" >
                                    <span style="color:red" v-text="insertState[scope.row.chapter_state]"></span>
                                </template>
                            </el-table-column>       


                            <el-table-column   align="center">
                                <template slot="header">操作</template>
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger" @click="insertCurrentChapterFn(scope.row)">导入</el-button>
                                    <!-- <el-button v-if="scope.row.fileName.indexOf('chapterinfo') != -1" size="mini" type="danger">查看章节列表</el-button>  -->
                                </template>
                            </el-table-column>
                        </el-table>


                    </div>
                </div>
            </transition>
            
        </div>
    </div>
</template>

<script>
//封装接口请求
import {axiosQueryProject,axiosSaveStructures,axiosGetStructures}  from '../../service/requestConfig.js'
export default {
    created(){
        this.init();
    },
    data() {
      return {
        //查询章节名称
        queryProjectName:'',
        //查询章节id
        queryProjectId:0,
        //插入章节名称
        insertProjectName:"",
        //插入章节id
        insertProjectId:0,
        //章节类型
        chapterType:['初始','普通','结局'],
        //章节模式
        chapterMode: ['','网聊','半身像','胸像模式'],
        //章节列表
        chapterList: [{
            chapterName: '第一章节',
            chapterType: '普通章节',
            chapterMode: '网聊模式',
            chapterSize: '字数'
            }
        ],
        //导入数据列表
        insertList:[{
                fileName:"workinfo.bin",
                state:"成功",
                chapterAllList:null
            }
        ],
        //导入数据状态
        insertState:{
            no:"未导入",
            load:"正在导入中....",
            success:"成功",
            failure:"失败",
            contentNull:"未上传创作区文件"
        },
        //章节列表
        insertChapterList:[{
            chapter_id: "e39e00c0a331e89e",
            chapter_name: "网聊模式",
            chapter_type: 0,
            chapter_words: 22,
            chapter_expression:{
                s_id:1
            }
        }],
        isInsertChapterList:false,
        newChapterId:null,
        //搜索条件
        search: ''
      }
    },
    methods: {
        //初始化
        init(){
             this.chapterList = [];
             this.insertList = [];
             this.chapterList = [];
             this.insertChapterList = [];
             if(process.env.NODE_ENV !== 'production'){
                //  this.initData();

                
             }
        },
        //初始化数据
        initData(){
             this.queryProjectId = "06be0534638a4feb92fb3e056fcba4ee";
             this.queryProjectName = "书圣模板";
             this.insertProjectId = "f65eaf4b606a478e8aece4a00dd1fb4d";
             this.insertProjectName = "导入书圣数据";
        },
        //查询作品
        queryProjectFn(queryString, cb){
            if(!queryString || queryString == "")return;
           axiosQueryProject(queryString).then(resp=>{
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
        //选择作品
        selectProjectFn(item,type) {
            if(type == 'query'){
                 this.queryProjectId = item.projectId;
            }else{
                 this.insertProjectId = item.projectId;
            }
            console.log("queryProjectId:"+this.queryProjectId+'====insertProjectId:'+this.insertProjectId)
        },
        //查询章节
        queryChapterFn(){
            //章节类型
            let chapterType = this.chapterType;
            //章节模式
            let chapterMode = this.chapterMode;
            //查询数据名称
            let structureName = JSON.stringify(['chapterinfo.bin']);
            //请求查询数据
            this.getInsertProjectInfoFn(structureName,(data)=>{
                //章节列表数据
                let chapterData = this.packDataFn(data.data)[0];
                //判断章节必须存在
                if(chapterData && chapterData.chapter_list &&  chapterData.chapter_list.length ){
                    let chapterList = chapterData.chapter_list;
                    let _arr = [];
                    chapterList.forEach(element => {
                        _arr.push({
                            //章节名称
                            chapterName:  element.chapter_name,
                            //章节类型
                            chapterType: chapterType[element.chapter_type],
                            //章节模式
                            chapterMode:  chapterMode[element.chapter_expression.s_id],
                            //章节字数
                            chapterSize: element.chapter_words
                        })
                    });
                    this.chapterList = _arr;
                }
            })
        },
        //导入作品
        insertProjectFn(){
            let structureName = JSON.stringify(["workinfo.bin","filemap.bin","rolelist.bin","values.bin","chapterinfo.bin"]);
            //查询数据
            this.getInsertProjectInfoFn(structureName,(data)=>{
                //存储所有临时数据
                let _tempData = [];
                this.newChapterId = Date.parse(new Date());
                //所有工程数据
                let _projectData = data.data;
                if(_projectData && _projectData.length){
                    _tempData = _projectData.map(item=>{
                        return {
                            structureName:item.structureName,
                            data:item.materialVer == 'v3' ? item.structureContent_v3 : item.structureContent
                        }
                    })
                    this.insertList = [];
                    //逐一恢复数据
                    this.queueInsertData(_tempData);
                }
            })
        },
        //逐一恢复数据
        async queueInsertData(data){
            let _obj = {}
            let _structureName = "";
            for(let item in data){
                _structureName = data[item].structureName;
                _obj= {
                    fileName:_structureName,
                    state:'load',
                }
                //判断如果是章节列表 则添加章节列表数据 用来显示所有章节
                if(_structureName.indexOf("chapterinfo") != -1){
                    //获取章节信息
                    let _chapterAllList = JSON.parse(data[item].data);
                  
                   
                    //重新生成章节id
                    _chapterAllList.chapter_list.forEach((item,itemIndex)=>{
                        item.chapter_id = item.chapter_id+'_'+this.newChapterId;
                        if(item.end_setting && item.end_setting.end_condition_list.length){
                            this.ut_updateCondtionChapterId(item.end_setting.end_condition_list);
                        }
                    })

                    // console.log('_chapterAllList',_chapterAllList);
                    //追加自身作品数据
                    // _chapterAllList = await this.appendChapterInfoFn(_chapterAllList);
                    //重新生成字符串保存
                    data[item].data = JSON.stringify(_chapterAllList);
                    _obj.chapterAllList = data[item].data;
                }
               
                //添加导入数据
                this.insertList.push(_obj);
                await this.insertData(_structureName,data[item].data,(status,resp,next)=>{
                    if(status){
                        //数据请求成功保存
                        if(resp.data.isOk){
                            this.delayedTime(()=>{
                                if(_structureName.indexOf("chapterinfo") !=  -1 ){
                                    this.bindChapterList(data[item].data);
                                }
                                this.insertList[this.insertList.length-1].state = 'success';
                                next();
                            })
                        }
                    }else{
                        this.delayedTime(()=>{
                            this.insertList[this.insertList.length-1].state = "failure";
                            this.ut_showMessage('error','dataRenewFailure');
                            next();
                        })
                    }
                });
            }
        },
        //追加chapterinfo数据
        appendChapterInfoFn(appendData){
            return new Promise((resolve,reject)=>{
                this.getInsertProjectInfoFn("['chapterinfo.bin']",(resp)=>{
                    let _data = this.packDataFn(resp.data)[0].chapter_list;
                    appendData.concat(_data);
                    resolve();
                },this.insertProjectId)
            })
        },
        //插入数据
        insertData(name,allData,cb){
            allData = this.resetProjectIdFn(allData);
            return new Promise((resolve,reject)=>{
                    //恢复数据结构
                    axiosSaveStructures(this.insertProjectId,name,allData).then(resp=>{
                        if(resp.data.isOk){
                             cb && cb(resp.data.isOk,resp,resolve);
                        }else{
                            this.ut_showMessage('error',resp.data.message.title);
                             cb && cb(false,null,reject);
                        }
                    }).catch(err=>{
                        cb && cb(false,null,reject);
                        this.ut_showMessage('error','dataRenewFailure');
                        console.log("数据恢复失败原因",err);
                    })
            })
        },
        //获取要导入作品所有信息
        getInsertProjectInfoFn(structureName,callback,project = this.queryProjectId){
           axiosGetStructures(project,structureName).then(resp=>{
                let _data = resp.data;
                if(_data.isOk){
                    callback(_data);
                }else{
                    if(!_data.isOk && _data.message.code == 2010){
                        callback(false);
                    }else{
                        this.ut_showMessage('error',_data.message.title);
                    }
                    
                }
            }).catch(err=>{
                console.log("数据获取失败",err);
            })
        },
        //绑定章节列表数据
        bindChapterList(data){
            this.insertChapterList  = JSON.parse(data).chapter_list.map(item=>{
                return {
                    chapter_id: item.chapter_id,
                    chapter_name: item.chapter_name,
                    chapter_type: item.chapter_type,
                    chapter_words: item.chapter_words,
                    chapter_mode:item.chapter_expression.s_id,
                    chapter_state:'no'
                }
            });
        },
        //查看章节列表
        lookChaterListFn(){
            this.isInsertChapterList = true;
        },
        //关闭章节列表
        closeLayer(){
             this.isInsertChapterList = false;
        },
        //导入当前章节
        insertCurrentChapterFn(row){
           row.chapter_state = 'load';
           let structureName = `['chapter_${row.chapter_id.split('_')[0]}.bin']`;
           let inseterStructureName = `chapter_${row.chapter_id}.bin`;
           return new Promise((resolved,reject)=>{
               //获取当前章节数据
                this.getInsertProjectInfoFn(structureName,(chapter)=>{
                    
                        //重新设置工程id
                        let structureContentJson = this.ut_newCreateChapterContent(this.resetProjectIdFn(this.packDataFn(chapter.data)[0]));
                        // return;
                         if(!structureContentJson){
                             this.delayedTime(()=>{
                                    row.chapter_state = 'contentNull';
                            })
                            resolved();
                            return;
                        }
                        //导入数据到当前工程
                        this.insertData(inseterStructureName,structureContentJson,(status,resp,next)=>{
                            next();
                            if(status){
                                this.delayedTime(()=>{
                                    row.chapter_state = 'success';
                                })
                                resolved();
                            }else{
                                this.delayedTime(()=>{
                                    row.chapter_state = 'failure';
                                }) 
                                reject();
                            }
                            
                        });
                })
           })
           

        },
        //全部导入章节
        async allInsertCurrentChapterFn(){
            for(let item in this.insertChapterList){
                await this.insertCurrentChapterFn(this.insertChapterList[item]);
            }
        },
        //重新设置工程数据
        resetProjectIdFn(data){
            if(!data)return false;
            data  = typeof(data) == 'string' ? JSON.parse(data) : data;
            //workinfo中最后一次进入章节id设置
            if(data.last_chapter_id && data.last_chapter_id.indexOf(this.newChapterId) == -1){
                data.last_chapter_id = data.last_chapter_id+'_'+this.newChapterId;;
            }
            //作品名称
            if(data.work_name){
                data.work_name = this.insertProjectName;
            }
            //每一个章节重新设置章节id
            if(data.chapter_id && data.chapter_id.indexOf(this.newChapterId) == -1){
                 data.chapter_id = data.chapter_id+'_'+this.newChapterId;
            }
            data.project_id  = this.insertProjectId;
            return data;
        },
        //异步执行代码
        delayedTime(cb){
            setTimeout(()=>{
                cb && cb();
            },150)
        },
        //包装一下数据
        packDataFn(data){
            if(!data)return [];
            let arr =  data.map(item=>{
                if(item.materialVer == 'v3'){
                    return JSON.parse(item.structureContent_v3);
                }else{
                    return JSON.parse(item.structureContent);
                }
            })
            return arr;
        },
        //重新生成创作区中的章节id
        ut_newCreateChapterContent(data){
            // console.log('chapter',data.cmd_sequence_list);
            if(!data.cmd_sequence_list || !data.cmd_sequence_list.length)return data;
            //遍历事件列表
            data.cmd_sequence_list.map(item=>{
                //判断附件事件存在 才可以继续遍历
                if(item.cmd_event.code == 105 || item.cmd_event.code == 130){
                    item.cmd_event.argv.data.forEach(nextItem=>{
                        //替换条件分歧中章节id
                        this.ut_updateCondtionChapterId( nextItem.conditions);
                        nextItem.sequence_list.forEach(nextCondtion=>{
                            this.ut_updateChapterId(nextCondtion);
                        })
                    })
                }else{
                    this.ut_updateChapterId(item);
                }
            })
            // console.log('更新后数据',data.cmd_sequence_list);
            return data;
        },
        //替换跳转章节id
        ut_updateChapterId(data){
             if(data.cmd_list && data.cmd_list.length){
                data.cmd_list.map(addEventItem=>{
                    if(addEventItem.code == 118){
                        addEventItem.argv.data.map(chapterItem=>{
                            chapterItem.sequence_list[0].argv.id = chapterItem.sequence_list[0].argv.id  +'_'+this.newChapterId;
                        })
                    }
                    if(addEventItem.code == 116){
                         addEventItem.argv.id = addEventItem.argv.id  +'_'+this.newChapterId;
                    }
                })
             }
        },
        //替换条件分歧章节id
        ut_updateCondtionChapterId(data){
             data.forEach(item=>{
                 if(item.var_operate && item.var_operate.c_type == 13){
                     item.var_operate.c_value = item.var_operate.c_value +'_'+this.newChapterId;
                 }
                 if(item.var_operated && item.var_operated.c_type == 13){
                      item.var_operated.c_value = item.var_operated.c_value +'_'+this.newChapterId;
                 }
             })
        }
    },
}
</script>

<style scoped>
    .mx-create-center{
        /* width:400px; */
    }
    .mx-create-center-left{
        width:55%;
       text-align: left;
    }

    .mx-create-center-right{
        width:40%;
       text-align: left;
    }
    .samll-width{
        width:300px;
    }


    /* 弹出层内容层 */
    .mx-create-chapterLayer{
        position: fixed;
        left:0;
        top:0;
        width:100%;
        height: 100%;
        z-index:8;
        background-color:rgba(0, 0, 0, .6)
    }

    .chapterLayer-content{
        z-index:9;
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
        width:70%;
        height:60vh;
        overflow-y:auto;
        background-color:#fff;
        border-radius: 4px;
        padding: 10px 15px;
        box-sizing: border-box;
    }
    .all-insertChapterList{
        display: block;
        float: right;
        margin-bottom: 20px;
    }
</style>
