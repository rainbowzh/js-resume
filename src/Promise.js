/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-29 10:30:07
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-09-09 19:26:37
 */
function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    function resolve(value){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.value=value;
          self.status="fulfilled";
       }
    }
    function reject(reason){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}

myPromise.prototype.then=function(onFullfilled,onRejected){
   let self=this;
   switch(self.status){
      case "resolved":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
      default:       
   }
}

var p=new myPromise(function(resolve,reject){resolve(1)});
p.then(function(x){console.log(x)})
//输出1



/**
 * promise  并发控制个数
 * @description 手动封装一个请求函数，可以设置最大请求次数，请求成功则不再请求，请求失败则继续请求直到超过最大次数
 */

function request(url, body, successCallback, errorCallback, maxCount = 3) {
  return fetch(url, body)
    .then(response => successCallback(response))
    .catch(err => {
        if (maxCount <= 0) return errorCallback('请求超时');
        return request(url, body, successCallback, errorCallback, --maxCount);
    });
}

// 调用
request('https://some/path', { method: 'GET', headers: {} }, (response) => {
    console.log(response.json());
}, (err) => console.error(err));


/***
 * @description  Promise.all并发限制
 */

function limitLoad (limit, loadImg, urls) {
  let sequeue = [].concat(urls) ;
  let promises = sequeue.splice(0, limit).map((item, index) => {
    return loadImg(item).then(() => {
      return index ;
    })
  });

  return sequeue.reduce((collect, item) => {
    return collect
    .then(() => {
      //
      return Promise.race(promises);
    })
    .then((fristIndex) => {
      promises[fristIndex] = loadImg(item).then(() => {
        return fristIndex ;
      });
    })
    .catch(err => {
      console.log('err',err) ;
    })
  },Promise.resolve())
  .then(() => {
    Promise.all(promises);
  })
}