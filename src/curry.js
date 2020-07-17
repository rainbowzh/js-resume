/*
 * @Description: 
  Currying 为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
  并且返回接受余下的参数而且返回结果的新函数，
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-11-16 15:19:11
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-11-16 16:58:46
 */

/**
 * 通用函数柯里化
 */

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


/**
 * 根据功能函数传参来确定柯里化参数
 */

let curring2 = ( fn ) => {
  let argsArr = [] ,maxLen = fn.length ;
  let temp = ( ...args ) => {
    argsArr = argsArr.concat(args) ;
    if(argsArr.length < maxLen) return temp ;
    return fn( ...argsArr );
  }
  return temp ;
}

let myFunc2 = ( x, y, z ) => {
  return x+y+z ;
}

let curry2 = curring2(myFunc2);
curry2(1,3)(2);