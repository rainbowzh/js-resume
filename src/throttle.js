/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-29 19:47:50
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-12-14 12:00:16
 */
let throttle = (fn, delay = 50) => { // 节流 控制执行间隔时间 防止频繁触发 scroll resize mousemove
    let stattime = 0;
    return function (...args) {
        let curTime = new Date();
        if (curTime - stattime >= delay) {
            fn.apply(this, args);
            stattime = curTime;
        }
    }
}


export default throttle ;