/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-10 16:39:42
 * @LastEditors: zhouhong07
 * @LastEditTime: 2021-03-22 15:04:51
 */
import React , { useEffect } from 'react';
import './App.scss';




const App = () => {

  return(null)
}

class People {
  constructor (name) {
    this.name = name ;
    this.queue = Promise.resolve() ;
    this.init() ;
  }

  init() {
    console.log(`hello, ${this.name}`) ;
  }

  sleep (time = 1) {
    this.queue = this.queue.then((res) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(res)
        }, time * 1000)
      })
    })
    return this ;
  }

  eat (food) {
    this.queue =this.queue.then((res) => {
      console.log(`${this.name} eat ${food}`);
    });
    return this ;
  }

}
new People('whr').sleep(3).eat('apple').sleep(5).eat('durian');

export default App ;
