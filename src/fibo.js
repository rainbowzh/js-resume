/*
 * @Description: 实现斐波那契数列
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-17 14:17:00
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-17 14:18:48
 */ 
//递归
function Fibo(n){ 
  if(n<=0){ 
    return 0
  } 
  if(n===1){ 
    return 1
  } 
  return Fibo(n-1)+Fibo(n-2) ;
}
//优化
function Fibo(n) { 
  if (n <= 0) { 
    return 0
  } 
  if(n == 1) {
     return 1
  }; 
  let fn_2 = 0 ;let fn_1 = 1 ;
  let fn = 0; 
  for (let i = 2; i <= n; i++) {
    fn = fn_1 + fn_2 ;
    fn_2 = fn_1 ;
    fn_1 = fn ;
  } 
  return fn ;
}