import axios from 'axios'
import store from '../vuex/index'
import ut_showMessage from '../utils/messageBox'
const packAxios = (option)=>{   
    return new Promise((resolve,reject)=>{
        //创建一个axios请求
        let instance = axios.create({
            headers: option.headers? option.headers :{'Content-Type': 'application/json'},
        });
        // 添加请求拦截器
        instance.interceptors.request.use( (config)=>{
            // 在发送请求之前做些什么
            return config;
            },(error)=>{
                // 对请求错误做些什么
                reject(err);
        })
        //添加响应拦截器
        instance.interceptors.response.use((response)=>{
            return response;
        },(err)=>{
            reject(err);
        })
        
        //判断是否需要传递token
        if(option.isToken){
            //获取token
            if(option.method == 'post'){
                option.data.append('token', store.getters.getToken)
            }else{
                if(option.url.indexOf("?") != -1) option.url+=`&token=`+store.getters.getToken;
                else  option.url+=`?token=`+store.getters.getToken;
                
            }
        }

        //配置请求成功失败后返回对应失败数据
        instance(option).then((data)=>{
            if(option.url.indexOf("/apitool/v1/web/opus/maker/structure/save_structures") != -1 &&  !data.data.isOk  && data.data.message.code == "3050"){
                ut_showMessage('error', data.data.message.title)
                reject(false);
            }else{
                resolve({
                    data:data.data
                });
            }
        }).catch(err=>{
            reject(err);
            console.log("接口请求错误",err);
        })
    })
}




export default packAxios;