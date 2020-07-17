/*
 * @Description: some demo about array
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-11-18 14:10:45
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-13 11:25:20
 */



/**
 * 数组扁平化
 */
//reduce函数迭代
let flatten = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  })
}
//扩展运算符
//只要有一个元素有数组，那么循环继续
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
}

/**
 * @description: 数组乱序
 * @param {type} 
 * @return: 
 * @author: zhouhong07
 */

function confuseArr (arr) {
  const res = [];
  while(arr.length) {
    res.push(arr.splice(Math.floor(Math.random() * (arr.length - 1)), 1)[0]);
  }
  return res;
}
// 测试例子
confuseArr([1,2,3,4,5,6,7]);



