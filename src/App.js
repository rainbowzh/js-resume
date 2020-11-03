/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-10 16:39:42
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-11-03 20:21:12
 */
import React , { useEffect, useReducer, useRef, useCallback } from 'react';
import './App.scss';
import resolve from 'resolve';





function App() {

  useEffect(() => {
    //call
    const mycall = (context) => {
      if(typeof this !== 'function'){
        throw new TypeError('not funciton!');
      }

      context = context || window ;
      context.fn  = this ;
      let args = [...arguments].slice(1) ;
      let result  = context.fn(...args) ;
      delete context.fn ;
      return result ;

    }


    const myapply = ( context ) => {
       if(typeof this !== 'function'){
        throw new TypeError('not funciton!');
      }

      context = context || window ;
      context.fn = this ;
      let result ;
      if([...arguments][1]) {
        result = context.fn([...arguments][1]) ;
      }
      else{
        result = context.fn();
      }
      delete context.fn ;
      return result ;
    }

    //返回一个函数，新函数的this指向第一个参数，其余参数作为新函数的参数
    const mybind = (context) => {
       if(typeof this !== 'function'){
        throw new TypeError('not funciton!');
      }
      let _this = this ;
      let args = [...arguments].slice(1) ;
      return function F() {
        if(this instanceof F) {
          return new _this(args, ...arguments) ;
        }else{
          return _this.apply(context, args.concat(...arguments))
        }
      }
    }
  },[]) ;
  
  return (
    <div className="App">
    </div>
  );
}

export default App;



function myPromise (constuctor) {
  let self = this ;
  self.state = "pending" ;
  self.value = undefined ;
  self.reason = undefined ;
  function resolve(value) {
    if(self.state == 'pending') {
      self.reason = value ;
      self.state = "fulfilled" ;
    }
  }

  function reject(reason) {
    if(self.state == 'pending') {
      self.reason = reason ;
      self.state = "rejected" ;
    }
  }

  try{
    constuctor(resolve, reject) ;
  }catch (e){
    reject(e) ;
  }
}

myPromise.prototype.then = (onfullfilled, onrejected) => {
  let self = this ;
  switch(self.state) {
    case "fullfilled" : 
      resolve(self.value);
      break;
    case  "rejected" :
      reject(self.reason) ;
      break;
    default:
      break;
  }
}


class Promise {
  constuctor(executor) {
    this.state = 'pending' ;
    this.value = undefined ;
    this.reason = undefined ;
    this.onResolvedCallbacks = [] ;
    this.onRejectedCallbacks = [] ;
    let resolve = (value) => {
      if(this.state == 'pending') {
        this.state = 'fullfilled' ;
        this.value = value ;
        this.onResolvedCallbacks.forEach(fn => fn()) ;
      }
    } ;
    let reject = (reason) => {
      if(this.state == 'pending') {
        this.state = 'rejected' ;
        this.reason = reason ;
        this.onRejectedCallbacks.forEach(fn => fn()) ;
      }
    } ;
    try {
      executor(resolve, reject) ;
    } catch (error) {
      reject(error) ;
    }
  }
  then(onfullfilled, onrejected) {
    if(this.state == 'fullfilled') {
      onfullfilled(this.value) ;
    }
    if(this.state == 'rejected') {
      onrejected(this.reason);      
    }
    if(this.state == 'pending') {
      this.onResolvedCallbacks.push(() => {
        onfullfilled(this.value) ;
      })
      this.onRejectedCallbacks.push(() => {
        onrejected(this.reason);
      })
    }
  }
}


const limitLoad = (url, limit ,fetch) => {
  const quene = [].concat(urls) ;
  const promises = quene.splice(0, limit).map((item, index) => {
    return fetch(item).then(() => {
      return index ;
    })
  }) ;

  return quene.reduce((collect, item) => {
    return collect.then(() => {
      Promise.race(promises) ;
    }).then((index) => {
      promises[index] = fetch(item).then(() => {
        return index;
      }) ;
    }).catch( e => {
      reject(e) ;
    })
  },Promise.resolve())
  .then(() => {
    return Promise.all(promises);
  })
}

//异位词

const isYw = (str1, str2) => {
  if(str1.length !== str2.length) return ;
  let hash1 = {} ; let res = true ;
  str1.split("").map((item, index) =>{
    if(hash1[item]) {
      hash1[item] =  hash1[item]++ ;
    }else{
      hash1[item] = 1 ;
    }
  });
  str2.split("").map((item, index) => {
    console.log('--item',item,hash1[item]);
    if(hash1[item] > 0) {
      hash1[item] = hash1[item] -- ;
    }else{
      res = false ;
      return ;
    }
  });
  return res;
}

//快排
const fastSort  = (arr) => {
  if(arr.length < 2) {
    return arr ;
  }
  let tempIndex = Math.floor(arr.length / 2) ;
  let left = [] ,right = [] ;
  let temp = arr.splice(0, tempIndex) ;

  for(let i = 0,  j = arr.length; i < j ; i ++) {
    if(arr[i] > temp) {
      right.push(arr[i]) ;
    }
    if(arr[i] < temp) {
      left.push(arr[i]);
    }
  }

  return fastSort(left.concat([temp],fastSort(right)));
}


//二分
//需要考虑精度问题
const TwoSerach = (item) => {
  let left = 0 ;
  let right = Math.floor(item / 2) + 1 ;
  let mid = Math.floor((left + right) / 2) ;
  while(left < right) {
    if(mid * mid == item) {
      return mid ;
    }else if(mid * mid < item) {
      left += 0.1 ;
    }else {
      right -= 0.1 ;
    }
  }
}


//发布订阅者模式
class EventEmitter {
  constuctor() {
    this.events = {} ;
  }
  //订阅
  on(type, cb) {
    if(!this.events[type]) {
      this.events[type] = [] ;
    }
    this.events[type].push(cb) ;
  }
  //发布
  emit(type, ...args) {
    if(this.events[types]) {
      this.events[type].forEach((cb) => {
        cb(...args) ;
      })
    }
  }
  //只执行一次
  once(type, cb) {
    const _this = this ;
    function one() {
      cb.call(_this, arguments) ;
      _this.off(type, one) ;
    }
    this.on(type, one) ;
  }
  //移除事件
  off(type, cb) {
    if(this.events[type]) {
      this.events[type] = this.events[type].filter(item => {
        return item != cb ;
      })
    }
  }
}

//观察者模式
class Observer{
  constuctor(cb) {
    if(!cb || typeof cb != 'function') {
      throw new Error('observer构造器必须传入函数类型') ;
    }
  }
  update () {
    this.cb();
  }
}
class Subject {
  //维护观察者列表
  constuctor(observer) {
    this.observerList = [] ;
  }

  //添加一个观察者
  addObserver(observer) {
    this.observerList.push(observer) ;
  }

  //通知所有观察者
  notify() {
    this.observerList.forEach( observer => {
      observer.update();
    })
  }
}


//层序遍历
const levelTreeOrder = (root) => {
  if(!root) { return []} ;
  let queue = [root] ;
  let res = [] ;
  while(queue.length) {
    let temp = [] ;
    let curr = [];
    while(queue.length) {
      let node = queue.shift() ;
      curr.push(node.val) ;
      if(node.left) {
        temp.push(node.left) ;
      }
      if(node.right) {
        temp.push(node.right) ;
      }
    }
    res.push(curr) ;
    queue = temp;
  }
}


//前序遍历 ？？？
const preTreeOrder = (root) => {
  if(!root) return [] ;
  if(!root.next) return [root.val] ;
  let res = [], queue = [root] ; 
  while(root.next) {
    if(root.right) {
      let temps = root.right ;
      res.push(temps.val) ;
    }
    if(root.right) {
      let temp =  root.right ;
      queue.push(temp.val) ;
    }
    root = root.next;
  }
  return root.val.concat(res, queue.reverse());
}

//中序遍历
