import Vue from 'vue'
import { Message } from 'element-ui';
const ConfigMessgae = {
    //数据恢复成功
    dataRenewSuccess:"数据恢复成功",
    //数据恢复失败
    dataRenewFailure:"数据恢复失败",
    //搜索内容不能为空
    searchNull:"搜索内容不能为空",
    //作品未发布
    projectPublishNull:"此作品没有发布过",
    //服务器异常
    serviceUnusual:"服务器连接失败！",
    //用户名密码不能为空
    userPwdInexistence:"用户名密码不能为空",
    //登录成功
    loginSuccess:"登录成功"
}

let messgaeItem = {
    //普通消息
    message(message){
        Message(message);
    },
    //成功消息
    success(message){
        Message({
            message: message,
            type: 'success'
        });
    },
    //警告消息
    warning(message){
        Message({
            message: message,
            type: 'warning'
        });
    },
    //错误 失败消息
    error(message){
        Message.error(message);
    }
}


const ut_showMessage = function(type,message){
    let _message = ConfigMessgae[message] ? ConfigMessgae[message] : message;
    if(messgaeItem[type]){
        messgaeItem[type](_message);
    }else{
        messgaeItem.warning('程序员 ！！！ 没有你想要的提示框？');
    }
}


export default ut_showMessage;