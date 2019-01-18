<template>
    <div class="v_mx">
        <!-- 数据展示部分 BEGIN -->
        <div class="mx-showData-left">
            <!-- 搜索头部 -->
            <div class="mx-search">
                <el-autocomplete 
                class="input-with-select small-width"
                v-model="queryProjectName"
                :fetch-suggestions="queryProjectFn"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="selectProjectFn"
                >
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                         <el-option label="作品名称" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchProjectFn"></el-button>
                </el-autocomplete>
            </div>

            <!-- 选项卡 -->
            <el-tabs v-model="activeName" @tab-click="handleClickFn">
                <el-tab-pane v-for="tabItem in tabFileList" :label="tabItem.label" :name="tabItem.name"></el-tab-pane>
            </el-tabs>

            <!-- 数据展示部分 -->
            <el-table  :data="searchResult" sort="order"    :default-sort = "{prop: 'version', order: 'descending'}"  border style="width: 100%">
                <el-table-column prop="fileName" label="文件名" > </el-table-column>
                <el-table-column  prop="version"  sortable label="发布版本号"  ></el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <el-button  size="mini" v-show="activeName == 'chapterinfo'" @click="previewChpaterListFn(scope.$index, scope.row)">预览章节列表</el-button>
                        <el-button size="mini"  type="danger" @click="restoreDataFn(scope.row)" >还原数据</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
         <!-- 数据展示部分 END -->

        <!-- 预览 -->
        <router-view v-show="activeName == 'chapterinfo'"></router-view>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
//封装接口请求
import {axiosQueryProject,axiosGetPublishProject,axiosSaveStructures}  from '../../service/requestConfig.js'


export default {
    name:"mx",
    data() {
        return {
            //搜索内容
            queryProjectName:"",
            projectId:"",
            select:"作品名称",
            // 选项卡文件
            tabFileList:[
                {
                    label:"基本信息文件",
                    name:"workinfo"
                },
                {
                    label:"静态资源文件",
                    name:"filemap"
                },
                {
                    label:"角色文件",
                    name:"rolelist"
                },
                {
                    label:"数值型",
                    name:"values"
                },
                {
                    label:"章节集合",
                    name:"chapterinfo"
                }
            ],
            //选中的选项
            activeName:'workinfo',
            //搜索数据结果
            searchResult: [],
            //存储临时搜索结果  等所有结果获取完毕后  再绑定给searchResult
            tempSearchResult:[],

            bin:{
                workInfo:'workinfo.bin',
                filemap:'filemap.bin',
                rolelist:'rolelist.bin',
                values:'values.bin',
                chapterList:'chapterinfo.bin'
            },
            //次数
            binNumber:0,
            //预览数据
            previewData:[]
        }
    },
    methods: {
        ...mapMutations([
            // 设置作品次数
            'setProjectNumber',
            //设置作品id
            'setProjectId',
            //设置作品名称
            'setProjectName'
        ]),
        //初始化数据
        initData(){
            this.searchResult = [];
            this.tempSearchResult = [];
        },
        //查询作品
        queryProjectFn(queryString, cb){
            if(!queryString || queryString == "")return;
            let _arr = [];
            //查询数据
            axiosQueryProject(queryString).then(resp=>{
                let _serverData  = resp.data;
               
                if(_serverData.isOk && _serverData.data && _serverData.data.length){
                    _arr = _serverData.data.map((item)=>{
                        return {
                            value:item.work_name+'  ['+item.username+']',
                            projectId:item.project_id
                        }
                    })
                }
                cb(_arr);
            },(e)=>{
                console.log("errr",e);
                this.ut_showMessage("error",'服务器异常');
                cb(_arr);
            })
        },
        //选择作品
        selectProjectFn(item,type) {
            this.projectId = item.projectId;
            this.binNumber = 0;
            console.log("queryProjectId:"+this.projectId)
        },
        //查询当前文件所有版本
        searchProjectFn(cb){
            //验证搜是否存在id
            this.checkSearchContentFn('message');
            //重新计算发布次数
            this.binNumber = 0;
            //初始化章节列表数据
            this.initData();
            //设置工程id
            this.setProjectId(this.projectId);
            this.getWorkInfoFn(()=>{
                if(!this.binNumber)return;
                //vuex绑定发布次数
                this.setProjectNumber(this.binNumber);
                if(cb && Object.prototype.toString.call(cb) == '[object Function]'){
                    cb();
                    return;
                }
                if(this.activeName == 'workinfo'){
                    this.searchResult  = this.tempSearchResult;
                }else{
                    this.getFileFn();
                }
            });
    
        },
        
        //获取workInfo.bin 并初始化binNumber的值  其余文件都需要根据这个数量去遍历请求接口次数
        getWorkInfoFn(callback){
             ++this.binNumber;
            this.searchApiFn(this.bin['workInfo'],'getWorkInfoFn',callback);
        },

        //搜索接口
        searchApiFn(file,method,callback){
            axiosGetPublishProject(this.projectId,this.binNumber,file).then(data=>{
                this.tempSearchResult.push({
                    fileName:'workinfo.bin',
                    version:this.binNumber,
                    data:data.data
                });
                this[method](callback);
                //设置作品名称
                this.setProjectName(data.data.work_name != "" ? data.data.work_name : this.queryProjectName );
            },(err)=>{
                --this.binNumber;
                callback(false);
                if(this.binNumber == 0){
                    this.ut_showMessage("error",'projectPublishNull');
                }
                console.log("失败原因",err);
            })
        },

        //选项卡切换
        handleClickFn(){
            //判断搜索框内容是否为空
            if(!this.checkSearchContentFn())return;;
            //判断如果已经遍历得到过所有文件的一个总次数 直接遍历
            if(this.binNumber > 0){
                this.initData();
                this.getFileFn();
            }else{
                this.searchProjectFn(this.handleClickFn);
            }
        },
        //验证搜索框内容是
        checkSearchContentFn(type){
            if(this.queryProjectName == "" || !this.queryProjectName){
                type == 'message' ?  this.ut_showMessage('success','dataRenewSuccess') : '';
                return false;
            }
            return true;
        },

        //获取其余文件
        getFileFn(){
            if(!this.binNumber)return;
            //存储所有的请求
            let _requestArr = [];
            //当前bin文件全程
            let _curBinName = this.activeName+'.bin';
            //遍历总发布文件次数  并添加到数组
            for(let i =1;i <= this.binNumber;i++){
                _requestArr.push(axiosGetPublishProject(this.projectId,i,_curBinName))
            }

            Promise.all(_requestArr).then(data=>{
                console.log("data=>>>>",data);
                this.searchResult = [];
                data.forEach((item,index)=>{
                    this.searchResult.push({
                        fileName:_curBinName,
                        version:(index+1),
                        data:item.data
                    });
                })
               
            }).catch(e=>{
                console.log("获取失败",e);
            })
        },
        //预览
        previewChpaterListFn(index,row){
            console.log(index,row)
            this.previewData = row.data;
            this.$router.push({
              name:"chapterList",
              query:{
                  id:Date.parse(new Date())
              },
              params:{
                  data: row.data,
                  version:row.version
              }
            })
        },
        //数据恢复
        restoreDataFn(row){
            //恢复数据结构
            axiosSaveStructures(this.projectId,this.activeName+'.bin',row.data).then(resp=>{
                if(resp.data.isOk){
                    this.ut_showMessage('success','dataRenewSuccess')
                }else{
                    this.ut_showMessage('error',resp.data.message.context);
                }
            },()=>{

            }).catch(err=>{
                this.ut_showMessage('error','dataRenewFailure');
                console.log("数据恢复失败原因",err);
            })

        }

    },  
}
</script>


<style scpoed>
    @import './mx.css';
</style>

