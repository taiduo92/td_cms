import Vue from 'vue'
const ConfigMessgae = {
    //数据恢复成功
    dataRenewSuccess:"数据恢复成功",
    //数据恢复失败
    dataRenewFailure:"数据恢复失败",
}

let messgaeItem = {
    //普通消息
    message(message){
        this.$message(message);
    },
    //成功消息
    success(message){
        this.$message({
            message: message,
            type: 'success'
        });
    },
    //警告消息
    warning(message){
        this.$message({
            message: message,
            type: 'warning'
        });
    },
    //错误 失败消息
    error(message){
        this.$message.error(message);
    }
}


const ut_showMessage = function(type,message){
    let _message = ConfigMessgae[message] ? ConfigMessgae[message] : message;
    if(messgaeItem[type]){
        messgaeItem[type].call(this,_message);
    }else{
        messgaeItem.warning.call(this,'程序员 ！！！ 没有你想要的提示框？');
    }
}


export default ut_showMessage;