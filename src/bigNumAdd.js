/*
 * @Description: big num add
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-12-12 10:09:49
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-22 10:54:12
 */
let bigNum = (x, y) => {
  //转换成数组
  let a = x + "" ,  b = y + "" ;
  let arr1 = a.split('') , arr2 = b.split('') ;
  let distance = a.length - b.length ;
  let len = distance > 0 ? a.length : b.length ;
  //carry:进位值 temp:当前位计算值
  let temp = 0 , carry = 0 ,res = [];
  //转换成数组
  //比较小的数字 字符串前用0补充
  if( distance > 0 ) {
    for(let i = 0; i < distance ; i ++) {
      arr2.unshift('0') ;
    }
  }else{
    for(let i = 0; i < -distance ; i ++) {
      arr1.unshift('0') ;
    }
  }

  //使用最长数组进行反向循环
  for( let i = len-1 ;i >=0 ;i-- ) {
    temp = arr1[i] *1  + arr2[i] *1  + carry *1 ;
    if(temp >= 10) {
      carry = 1 ;
      res.unshift((temp + "" )[1]) ;
    }else{
      carry = 0 ;
      res.unshift(temp) ;
    }
  }
  
  //转换成字符串，替换0为空
  res = res.join('').replace(/^0/, '') ;
  console.log(res) ;
}


export default bigNum ;