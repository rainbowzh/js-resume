/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-09-10 15:01:43
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-09-10 16:53:03
 */
const { arguments, bind } = require("file-loader");
const resolve = require("resolve");
const { useRef, useEffect, useCallback } = require("react");

//apply
const myapply = (context) => {
  if(typeof this !== 'funciton') {
    throw new TypeError('not funciton ');
  }
  context = context || window ;
  context.fn = this ;
  let result ;
  if(arguments[1]){
    result = context.fn(arguments[1]);
  }else{
    result = context.fn() ;
  }
  delete context.fn ;
  return result ;
}

//call
const mycall = (context) => {
  if(typeof this !== 'funciton') {
    throw new TypeError('not funciton ');
  }

  let args = [...arguments].slice(1);
  context.fn = this ;
  let result = context.fn(this, args);
  delete context.fn ;
  return result ;
}

//mybind
const mybind = (context) => {
  if(typeof this !== 'funciton') {
    throw new TypeError('not funciton ');
  }

  let args = [...arguments].slice(1) ;
  let _this = this ;
  return function F() {
    if( _this instanceof F){
      return new _this(context, args) ;
    }else{
      return _this.apply(context, args.concat(...arguments));
    }
  }
}


//loadLimit
const loadLimit = (urls, limit, loadImg) => {
  const urlArr = [].concat(urls) ;
  const promises = urlArr.splice(0,limit).map((index) => {
    return loadImg().then(() => {
      return index ;
    })
  });


  return urlArr.reduce((collect, item) => {
    return collect.then(() => {
      Promise.race(promises) ;
    }).then((firstIndex) => {
      promises[firstIndex] = loadImg().then(() => {
        return firstIndex ;
      });
    }).catch (e => {
      console.log('err',e) ;
    })
  },Promise.resolve()).then(() => {
    Promise.all(promises);
  });
}

//MYPROMISE
function myPromise (constructor) {
  let self = this ;
  self.status = 'pending' ;
  self.value = undefined ;
  self.reason = undefined ;

  function resolve(value) {
    let self = this;
    if(self.status == 'pending'){
      self.value = value ;
      self.status = 'fullfilled' ;
    }
  }

  function reject(reason) {
    let self = this;
    if(self.status == 'pending'){
      self.value = value ;
      self.status = 'rejected' ;
    }
  }

  try {
    constructor(resolve, reject) ;
  } catch (error) {
    console.log('err',error);
  }
}

myPromise.prototype.then = (onfullfilled, onrejected) => {
  let self = this;
  switch(self.status) {
    case "fullfilled" :
      onfullfilled(self.value);
      break;
    case "rejected" :
      onrejected(self.reason);
      break;
    default :
      break;
  }
}

//debonce

const debonce = (fn, wait) => {
  let timer = null;
  return function () {
    if(timer) {
      clearTimeout();
    }
    timer = setTimeout(() => {
      fn.apply(this,arguments);
    },wait)
  }
}

//throttle

const throttle = (fn, wait) => {
  let time = new Date();
  return function () {
    let newTime = new Date() ;
    if(newTime - time > wait){
      fn.apply(this, arguments);
      time = new Date();
    }
  }
}


//reacthook debonce
const useDebonce = (fn, wait) => {
  const { current } = useRef({fn: fn, time : null}) ;

  useEffect(() => {
    current.fn = fn ;
  },[fn]);

  return useCallback( function f(){
    if(current.time){
      clearTimeout(time);
    }
    current.time = setTimeout(() => {
      current.fn.apply(this, arguments);
    },wait)
  },[])
}

//reacthook throttle

const useThrottle = (fn, wait) => {
  const { current } = useRef({fn: fn, time : new Date()}) ;

  useEffect(() => {
    current.fn = fn ;
  },[fn]);

  return useCallback(function f() {
    if(current.time + wait < new Date()){
      current.fn.apply(this ,arguments) ;
      current.time = new Date();
    }
  })
}

//new
function mynew(fun) {
  let obj = {} ; 
  obj.__proto__ = func.prototype ; //原型链继承
  let res = fun.call(obj, ...arguments) ;//继承函数等
  if(typeof res  == 'object' || typeof res == 'funciton'){
    return res ;
  }
  else return obj;
}


//instance of
function myinstanceof (left, right) {
  while(true){
    if(left.__proto__ == right.prototype) {
      return true ;
    }
    if(left.__proto__ == null) {
      return false;
    }
    left = left.__proto__ ;
  }
}

//eventEmitter
class eventEmitter {
  constructor() {
    this.events = {} ;
  }
  
  //订阅发布
  on (type, cb) {
    if(!this.events[type]){
      this.events[type]= [] ;
    }else{
      this.events[type].push(cb) ;
    }
  }

  //发布
  emit(type, ...args) {
    if(this.events[type]) {
      this.events[type].forEach(() => {
        cb(...args);
      })
    }
  }

  //once
  once(type, cb) {
    const _this = this;
    function one() {
      cb.call(_this, arguments) ;
      _this.off(type,one)
    } ;
    this.on(type, one);
  }


  //off
  off(type, cb) {
    if(this.events[type]){
      this.events[type] = this.events[type].filter((item) => {
        item != cb
      })
    }
  }
}


//函数柯里化
let curring = ( fn ) => {
  let argsArr = [] ;
  let temp  = ( ...args ) => {
    console.log('temp', args);
  
    if( args.length >0 ){
      argsArr = argsArr.concat( args ) ;
      return temp;
    }
    return fn( ...argsArr );
  }
  return temp ;
}

let myFunc = ( ...args ) => {
  console.log('myFunc', args);
  
  return args.reduce( (total, current) => total * current)
}

let curry = curring(myFunc) ;
curry(2)(3,4)();



//快排
function quickSort(arr) {
  //如果数组长度<=1,则直接返回
  if (arr.length <= 1) {
    return arr;
  }
  // 中间位(基准)取长度的一半向下取整
  var pivotIndex = Math.floor(arr.length / 2);
  //把中间位从原数组切割出来, splice 会改变原数组!!!!
  var pivot = arr.splice(pivotIndex, 1)[0];
  //定义两个空数组来存放比对后的值
  var left = [];
  var right = [];

  //比基准小的放在left，比基准大的放在right
  for (var i = 0 , j = arr.length; i < j; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  //递归下去  arr = [ left , pivot , right]
  // 怎么个递归法,就是比对后的数组还是会重复之前的取基准再切开比较..直到最后没有可以切了
  return quickSort(left).concat([pivot], quickSort(right));
}


