/*
 * @Description: 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，
  然后写一个 myClear，停止上面的 mySetInterVal
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-27 10:48:05
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-27 10:59:04
 */ 


function mySetInterVal(a, b) {
  let time = 1 ;
  let timer = null ;
  timer = setTimeout(() => {
    time ++ ;
    console.log('time',time);
  } , a + time *b) ;
}