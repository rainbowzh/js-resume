/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-10 16:39:42
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-17 13:58:33
 */
import React , { useEffect } from 'react';
import './App.scss';
import resolve from 'resolve';



function App() {
  useEffect(() => {
  //quickSort
  const quickSort = (arr) => {
    if(arr.length < 2) {
      return arr ;
    }
    let temp = Math.floor(arr /2) ;
    let flag = arrs.splice(temp,1)[0] ;
    let right = [];
    let left = [] ;
    for(let i =0; i< arr.length ;i ++) {
      if(arr[i] < temp) {
        left.push(arr[i]);
      }
      else{
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat(flag, quickSort(right));
  }

  //实现call
  Array.prototype.mycall = function (context) {
    if(typeof this !== 'funciton') {
      throw new TypeError('not function');
    }
    context = context || window ;
    context.fn = this ;
    
    let args = [...arguments].slice(1) ;
    let result = contxt.fn(this,args);
    delete context.fn ;
    return result;
  }

  //promise
  function myPromise (constructor) {
    let self = this;
    self.status = 'pending' ;
    self.value = undefined ;
    self.reason = undefined ;

    function resolve (value) {
      if(self.status == 'pending') {
        self.value = valeu ;
        self.status = 'resolved' ;
      }
    }

    function rejecte (reason) {
      if(self.status = 'pending') {
        self.reason = reason ;
        self.status = 'rejected' ;
      }
    }

    try{
      constructor(resolve, rejecte);
    }catch(e) {
      console.log(e);
    }
  }
  myPromise.prototype.then = function(onfullfilled, onrejected) {
    let self = this ;
    switch (self.status) {
      case 'resolved':
        onfullfilled(self.value);
        break;
      case 'rejected' :
        onrejected(self.reason) ;
        break;
      default:
        break;
    }
  }

  //jsonp
  const myjsonp = (url, callBack='jsonpCallBack') => {
    let Url = url.indexOf("?") !== -1 ? `${url}?callback=${callBack}` : `${url}&callback=${callBack}` ;
    let domScirpt = document.createElement('script') ;
    domScirpt.src = Url ;
    document.body.appendChild(domScirpt) ;


    return new Promise ((reslove, reject) => {
      window[callBack] = (data) => {
        try {
          reslove(data) ;
        } catch (error) {
          reject(error) ;
        } finally {
          domScirpt.parentNode.removeChild(domScirpt);
        }
      }
    });
  }

  //parseUrl
  const parseUrl = (url) => {
    const index = url.indexOf("?") ;
    if(index == -1) {
      return {} ;
    }
    let result = {}  ;
    const arrTemp = url.slice(index+1).split("&") ;

    for(let i in arrTemp) {
      let temp = arrTemp[i].split('=') ;
      let key = temp[0] ;let value = temp[1] ;
      result[key] = value;
    }
    return result;
  }

  //apply
  Array.prototype.myapply = function(context) {
    if(typeof this !== 'funciton') {
      throw new TypeError('not funciton') ;
    }
    context = context || window ;
    context.fn = this; 
    let result  ;
    if(arguments[1]) {
      result = context.fn(this, arguments[1]) ;
    }else{
      result = context.fn() ;
    }
    delete context.fn ;
    return result ;
  }
  

  //bind
  Array.prototype.mybind = function (context) {
    if(typeof this !== 'funciton') {
      throw new TypeError('not funciton') ;
    }
    let args = arguments.slice(1) ;
    let self = this ;
    return function F() {
      if(this instanceof F) {
        return new self(context,arguments.concat(args)) ;
      }else{
        return self.apply(context, arguments.concat(args))
      }
    }
  }

  //throttle
  const debonce = (fn, delay) => {
    let timer = null ;
    let self = this ;
    return function() {
      if(timer) {
        timer = null ;
      }
      timer = setTimeout(() => {
        self.apply(fn) ;
        clearTimeout(timer);
      },delay);
    }
  }


  
  //throttle
  const throttle = (fn, delay) => {
    let timer = new Date();
    let self = this ;
    return function() {
      if(new Date() > timer + delay ){
        self.apply(fn) ;
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
