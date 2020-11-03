/*
 * @Description: 实现深拷贝
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-12-11 17:26:10
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-10-09 19:40:11
 */


// let deepClone = (obj) => {
//   var result = Array.isArray(obj) ? [] : {};
//   for (var key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (typeof obj[key] === 'object' && obj[key]!==null) {
//         result[key] = deepClone(obj[key]); 
//       } else {
//         result[key] = obj[key];
//       }
//     }
//   }
//   return result;
// }
function deepClone(source, hash = new WeakMap()) {
  if (source == null) return source;
  if (typeof source !== 'object') return source; // 函数 或者非object 直接返回
  if (source instanceof Date) return new Date(source); // 时间戳
  if (source instanceof RegExp) return new RegExp(source);
  if (hash.has(source)) return hash.get(source);   // 处理循环引用

  let clone = new source.constructor;

  hash.set(source, clone);

  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      clone[key] = deepClone(source[key], hash);
    }
  }
  return clone;
}

// function deepClone(arr){
//     return JSON.parse(JSON.stringify(arr))
// }

//



export default deepClone ;
