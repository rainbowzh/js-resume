/*
 * @Description: 模拟new的实现过程
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-11-18 14:20:48
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-11-18 14:22:40
 */
/**
 * （1）让实例可以访问到私有属性
 * （2）让实例可以访问构造函数原型(constructor.prototype)所在原型链上的属性
 * （3）如果构造函数返回的结果不是引用数据类型
 */

function newOperator(ctor, ...args) {
    if(typeof ctor !== 'function'){
      throw 'newOperator function the first param must be a function';
    }
    let obj = Object.create(ctor.prototype);
    let res = ctor.apply(obj, args);
    
    let isObject = typeof res === 'object' && res !== null;
    let isFunction = typeof res === 'function';
    return isObect || isFunction ? res : obj;
};
