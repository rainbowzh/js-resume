/*
 * @Description: big num add
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-12-12 10:09:49
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-12-12 11:33:20
 */
let bigNum = (x, y) => {
  let a = x + "" ,  b = y + "" ;
  let arr1 = a.split('') , arr2 = b.split('') ;
  let distance = a.length - b.length ;
  let len = distance > 0 ? a.length : b.length ;
  let temp = 0 , carry = 0 ,res = [];
  //转换成数组
  if( distance > 0 ) {
    for(let i = 0; i < distance ; i ++) {
      arr2.unshift('0') ;
    }
  }else{
    for(let i = 0; i < -distance ; i ++) {
      arr1.unshift('0') ;
    }
  }

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

  res = res.join('').replace(/^0/, '') ;
  console.log(res) ;
}

export default bigNum ;