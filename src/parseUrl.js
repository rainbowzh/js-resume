/*
 * @Description: 解析url为对象
 * @url：https://juejin.im/post/5d79ccf85188254bf34fd9d1#heading-0
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-10 09:39:48
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-13 16:33:50
 */
const { useReducer } = require("react");

 

function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })

  return paramsObj;
}


//
const paseUrl = (url) => {
  const params = url.indexOf('?') == -1 ? "" : url.slice( url.indexOf("?")+1 );
  const paramsArr = params.split('&') ;
  let resultObj = {} ;

  paramsArr.forEach((item) => {
    if(/=/.test(item)) {
      let [key, value] = item.split("=") ;
      val = decodeURIComponent(value) ;
      
      if(resultObj.hasOwnProperty(key)) {
        resultObj[key] = [].concat(resultObj[key], val);
      } else{
        resultObj[key] = val;
      }
    }else{
      resultObj[item] = true;
    }
  });
  return resultObj;
}
