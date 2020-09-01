/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-10 16:39:42
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-09-01 11:27:52
 */
import React , { useEffect, useReducer, useRef, useCallback } from 'react';
import './App.scss';





function App() {

  useEffect(() => {
    //url字典
    const parseUrl = (url) => {
      const params = url.indexOf("?") == -1 ? "" : url.slice(url.indexOf("?")+1) ;
      const paramsArr = params.split("&") ;

      let resultObj = {} ;

      paramsArr.forEach( item => {
        if(/=/.test) {
          let [key, value] = item.split("=") ;
          let val = decodeURIComponent(value) ;
          if(resultObj.hasOwnProperty(key)) {
            resultObj[key] = [].concat(resultObj[key], val) ;
          }else{
            resultObj[key] = val;
          }
        }else{
          resultObj[item] = true ;
        }
      });
    }

    //jsonp  promise
    const jsonp = (url, data = {} ,callback = "callback") => {
      let dataStr = url.indexOf("?") == -1 ? "?" : "&" ;
      for(let i in data) {
        dataStr += `${i}=${data[i]}` ;
      }

      let domScirpt = document.createElement('script') ;
      domScirpt.src = url + dataStr + `callback=${callback}` ;
      document.body.appendChild(domScirpt) ;

      return new Promise((resolve, reject) => {
        window[callback] = (data) => {
          try {
            resolve(data) ;
          } catch (error) {
            reject(error);
          } finally {
            //移除scirpt
            domScirpt.parentNode.removeChild(domScirpt) ;
          }
        }
      })
    }

    //深克隆
    const deepClone = (obj) => {
      var result = Array.isArray(obj) ? [] :  {};
      for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
          result[key] = deepClone(obj[key]) ;
        }else{
          result[key] = obj[key] ;
        }
      }
    }
    
    //防抖
    const debonce = (fn, delay = 200) => {
      let timer = null ;
      let self = this ;
      return function () {
        if(timer) clearTimeout();
        timer = setTimeout(() => {
          fn,apply(self) ;
        },delay) ;
      }
    }

    //节流
    const throttle = (fn, wait) => {
      let timer = new Date(); 
      let expireTimer = timer + wait ;
      return function() {
        if(new Data() > expireTimer) {
          fn.apply(this) ;
          timer = new Date();
        }
      }
    }

    //react-hook  debonce
    const useDebonce = (fn, delay = 200, dep = [] ) => {
      const { current } =  useRef({fn :fn ,timer : null}) ;

      useEffect(() => {
        current.fn = fn ;
      },[fn]) ;
      let self = this;
      return useCallback(function f(...args) {
        if(current.timer) {
          clearTimeout();
        }
        current.timer = setTimeout(() => {
          current.fn.apply(self) ;
        },delay)

      } ,dep) ;
    }

  },[]) ;
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
