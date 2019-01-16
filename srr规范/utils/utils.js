// 工具方法
let ut = {
    //对象深拷贝
    cloneCopy(obj) {
        var objClone;
        if (!obj) {
            return obj;
        }
        if (obj.constructor == Object) {
            objClone = new obj.constructor();
        } else {
            objClone = new obj.constructor(obj.valueOf());
        }

        for (var key in obj) {
            if (objClone[key] !== obj[key]) {
                if (typeof(obj[key]) == 'object') {
                    if (obj[key] instanceof Array) {

                        objClone[key] = obj[key].length ? this.cloneCopy(obj[key]) : [];
                    } else {
                        objClone[key] = this.cloneCopy(obj[key]);
                    }

                } else {
                    objClone[key] = obj[key];
                }
            }
        }
        return objClone;
    }
}

export default ut;