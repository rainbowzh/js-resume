/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-12-11 10:26:51
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-12-11 10:29:26
 */

function sleep(time) {
  return new Promise( resolve => setTimeout(resolve ,time)) ;
}

const t1 = +new Date() ;
sleep(3000).then(() => {
  const t2 = +new Date();
  console.log(t2 - t1) ;
})