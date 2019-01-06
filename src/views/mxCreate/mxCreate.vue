<template>
    <div class="mx_create">
        <div class="mx-create-center">
            
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="作品名称:">
                    <el-input v-model="chapterName" placeholder="请输入作品名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryChapterFn">查询</el-button>
                </el-form-item>
                </el-form>

              <el-table  :data="chapterList"  border  style="width: 100%">
                <el-table-column    label="章节名称"    prop="chapterName"> </el-table-column>
                <el-table-column    label="章节类型"    prop="chapterType"></el-table-column>       
                <el-table-column    label="章节模式"    prop="chapterMode"></el-table-column>         
                <el-table-column   align="right">
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
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
     created(){
        this.init();
     },
     data() {
      return {
        //章节名称
        chapterName:'6626e81b528c40a8aab6a4ab211cf344',

        chapterList: [{
            chapterName: '第一章节',
            chapterType: '普通章节',
            chapterMode: '网聊模式'
            }
        ],
        search: ''
      }
    },
    computed: {
        ...mapGetters([
            'getToken',
            'getProjectId'
        ])
    },
    methods: {
        init(){
             this.chapterList = [];
        },
        //查询章节
        queryChapterFn(){
                  //章节类型
            let chapterType = ['初始','普通','结局'];
            //章节模式
            let chapterMode = ['','网聊','半身像','胸像模式'];
            let _api = `http://mxapi.cgyouxi.com/apitool/v1/web/opus/maker/structure/get_structures?project_id=${this.chapterName}&structure_name=['chapterinfo.bin']&token=${this.getToken}`
            this.axios.get(_api).then(resp=>{

                let _data = resp.data;
                console.log('data',_data);
                if(_data.isOk){
                    let chapterData = _data.data[0];
                    if(chapterData.structureContentJson && chapterData.structureContentJson.chapter_list &&  chapterData.structureContentJson.chapter_list.length ){
                        let chapterList = chapterData.structureContentJson.chapter_list;
                        let _arr = [];
                        chapterList.forEach(element => {
                            _arr.push({
                                chapterName:  element.chapter_name,
                                chapterType: chapterType[element.chapter_type],
                                chapterMode:  chapterMode[element.chapter_expression.s_id],
                               
                            })
                        });
                        this.chapterList = _arr;
                    }
                }else{
                    this.ut_showMessage('');
                }
            }).catch(err=>{
                console.log("数据获取失败",err);
            })

        }

    },
}
</script>

<style scoped>
    .mx-create-center{
        /* width:400px; */
    }
</style>
