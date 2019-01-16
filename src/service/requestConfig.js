import packAxios from './configAxios'
import url from './url'




/**
 * 登录
 * @param {String} loginName  用户名
 * @param {String} password   密码
 */
export function  axiosLogin(loginName,password){
    return packAxios({
        method:'post',
        url:url().login+`?login_name=${loginName}&password=${password}`,
    })
}

/**
 * 获取作品
 * @param {String} projectId           作品id
 * @param {String} publishTimes        作品发布次数
 * @param {String} fileName            作品文件名称
 */
export function axiosGetPublishProject(projectId,publishTimes,fileName){
    return packAxios({
        url:url().getPublishProject+`${projectId}/${publishTimes}/${fileName}`
    })
}



/**
 * 查询作品
 * @param {String} workName  作品名称
 */
export function axiosQueryProject(workName){
    let data = new FormData();
    data.append('workName',workName);
    return packAxios({
        url:url().queryProject,
        method:'post',
        data:data
    })
}



/**
 * 保存工程文件
 * @param {String} structureName               作品id
 * @param {Array}  structureContent            作品文件集合
 * @param {Array}  structureContent            作品数据
 */
export function axiosSaveStructures(projectId,structureName,structureContent){
    let data = new FormData();
    //工程id
    data.append("project_id",projectId);
    //保存文件名称
    data.append("structure_name",JSON.stringify([structureName]));
    //保存文件内容
    data.append("structure_content",JSON.stringify([structureContent]));
    //保存数据类型
    data.append("material_ver",'v3');

    return packAxios({
        url:url().saveStructures,
        method:'post',
        data:data,
        isToken:true
    })
}


/**
 * 获取作品文件
 * @param {String} projectId     作品id
 * @param {String} structureName 获取作品文件名称集合
 */
export function axiosGetStructures(projectId,structureName) {  
    return packAxios({
        url:url().getStructures+`?project_id=${projectId}&structure_name=${structureName}`,
        isToken:true
    })
}


