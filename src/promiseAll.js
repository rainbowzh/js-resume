/*
 * @Description: promiseAll
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-04-03 09:47:23
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-22 10:59:13
 */ 

function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if(!Array.isArray(promises)){
        throw new TypeError(`argument must be a array`)
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedResult = [];
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(value=>{
        resolvedCounter++;
        resolvedResult[i] = value;
        if (resolvedCounter == promiseNum) {
            return resolve(resolvedResult)
          }
      },error=>{
        return reject(error)
      })
    }
  })
}

const  promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    let count = 0 ; //记录完成的异步任务数量
    let result = [] ; //异步结果
    let len = promises.length ; //异步任务数量
    for(let i = 0 ; i < len ; i++) {
      return Promise.resolve(promises[i]).then((value) => {
        result[i] = value ;
        count ++ ;
        if(count == len) {
          return resolve(result);
        }
      },err => {
        return reject(err);
      })
    }
  })
}