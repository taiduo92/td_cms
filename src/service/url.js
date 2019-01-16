import store from '../vuex/index'
const DOMAIN = {
    //获取发布域名
    mxapi:'//mxapi.cgyouxi.com',
    mxapi_test:'//test-mxapi.cgyouxi.com'

}

//正式环境API
const PRODUCTION_API = {
    //获取发布作品的资源文件
    getPublishProject:'/resource/v3/project/',
    //登录接口
    login:DOMAIN.mxapi+"/apiuser/v1/web/user/login/common/login",
    //查询作品
    queryProject:DOMAIN.mxapi+'/community/v1/qingcheng/community/work/workinfo/get_work_info',
    //保存工程文件
    saveStructures:DOMAIN.mxapi+"/apitool/v1/web/opus/maker/structure/save_structures",
    //获取工程文件
    getStructures:DOMAIN.mxapi+"/apitool/v1/web/opus/maker/structure/get_structures"
}

//测试环境API
const TEST_API = {
    //获取发布作品的资源文件
    getPublishProject:'/resource/v3/test-project/',
    //登录接口
    login:DOMAIN.mxapi_test+"/apiuser/v1/web/user/login/common/login",
    //查询作品
    queryProject:DOMAIN.mxapi_test+'/community/v1/qingcheng/community/work/workinfo/get_work_info',
    //保存工程文件
    saveStructures:DOMAIN.mxapi_test+"/apitool/v1/web/opus/maker/structure/save_structures",
    //获取工程文件
    getStructures:DOMAIN.mxapi_test+"/apitool/v1/web/opus/maker/structure/get_structures"
}




export default function (param) {
    if(store.getters.getApiVersion == 'online'){
        return  PRODUCTION_API;
    }else{
        return  TEST_API;
    }
   
}
