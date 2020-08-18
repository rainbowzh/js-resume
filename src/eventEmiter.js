/*
 * @Description: es6实现event类
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-27 10:03:56
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-27 10:11:35
 */ 

class EventEmitter{
  constructor(){
    //记录所有事件和处理函数
    this._events={}
  }

  //添加事件监听
  on(event,callback){
    let callbacks = this._events[event] || [] ;
    
    this._events[event] = callbacks.push(callback);
    return this ;
  }

  //取消事件监听
  off(event,callback){
    let callbacks = this._events[event] ;
    //判断是否存在传进来的callback，过滤掉要取消的回调函数
    this._events[event] =  callbacks && callbacks.filter(function(fn){
      return fn !== callback;
    }) ;
    return this ;
  }

  //触发event事件，并把参数传给事件处理函数
  emit(eventName,...args) {
    const callbacks = this._events[eventName] ;
    callbacks.map(cb => {
      cb(...args)
    })
    return this;
  }

  //为指定的事件注册一个单次监听器，只能触发一次，触发后立即解除监听器
  once(event,callback){
    let wrap = (...args) => {
        callback.apply(this, args)
        this.off(event, wrap)
    }
    this.on(event, wrap ) ;
    return this ;
  }
}