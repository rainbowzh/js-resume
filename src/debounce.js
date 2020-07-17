/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-29 19:48:41
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-12-14 11:57:01
 */
// let  debounce  =  (fn, time = 50) => { // 防抖动 控制空闲时间 用户输入频繁
//   let timer;
//   return function (...args) {
//       // console.log('zzz',this);
//       let that = this;
//       clearTimeout(timer);
//       timer = setTimeout(fn.bind(that, ...args), time);
//   }
// }

function debounce(fn, wait = 50) {
  var timeout = null;
  return function() {
      if(timeout !== null) 
      clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
  }
}


export default debounce ;