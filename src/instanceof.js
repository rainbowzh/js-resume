/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-12-12 19:39:41
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-12-12 19:41:01
 */
let myInstanceof = (left,right) => {
  var proto = left.__proto__;
  var protoType = right.prototype;
  while(true){
      if(proto === null){
          return false
      }
      if(proto == protoType){
          return true
      }
      proto = proto.__proto__
  }
}


export default myInstanceof;