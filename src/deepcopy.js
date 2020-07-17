/*
 * @Description: 实现深拷贝
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-12-11 17:26:10
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-13 18:18:05
 */


let deepClone = (obj) => {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key]!==null) {
        result[key] = deepClone(obj[key]); 
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

// function deepClone(arr){
//     return JSON.parse(JSON.stringify(arr))
// }

//



export default deepClone ;
