/*
 * @Description: 模拟new的实现过程
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-11-18 14:20:48
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-11-03 14:14:42
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


var cat = new Animal("cat");
//JS引擎执行这句代码时，在内部做了很多工作，用伪代码模拟其工作流程如下：
 
new Animal("cat") = () =>{
 
  var obj = {};
 
  obj.__proto__ = Animal.prototype;
 
  var result = Animal.call(obj,"cat");
 
  return typeof result === 'obj'? result : obj;
}


//new的执行过程，主要使用原型链
//通过new可以产生原对象的一个实例对象，而这个实例对象继承了原对象的属性和方法。
//因此，new存在的意义在于它实现了javascript中的继承，而不仅仅是实例化了一个对象！
function myNEW (ctor, ...args) {
  let obj = {} ;
  obj.__proto__ = ctor.prototype ;
  let result = ctor.apply(obj, args) ;
  let isObject = typeof result === 'object' && result !== null;
  let isFunction = typeof result === 'function';

  return isObject || isFunction ? result : obj;
}

//