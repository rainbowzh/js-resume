/*
 * @Description: 矩阵顺时针遍历(1.遍历过的行或列不再遍历，即可遍历范围在不断缩小。2.遍历的方向：右、下、左、上（循环）)
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-08-31 14:19:51
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-31 14:41:16
 */


const printMatrix = (arrNum) => {
  let result = [] ;
  let rowLeft = 0 , rowRight = arrNum.length - 1 ;
  let cowLeft = 0 , cowRight = arrNum.length - 1 ;

  while(true){
    //右 ->
    for(let i = cowLeft ; i<= cowRight ;i ++) {
      result.push(arrNum[rowLeft][x]);
    }
    rowLeft ++ ;
    if(rowLeft > rowRight) {
      break;
    }

    //下 ↓
    for(let i = rowLeft; i<= rowRight ;i++) {
      result.push(arrNum[i][cowRight]);
    }
    cowRight -- ;
    if(cowRight < cowLeft) {
      break;
    }

    //左 ←
    for(let i = cowRight ; i>= cowLeft; i--) {
      result.push(arrNum[rowRight][i]);
    }
    rowRight -- ;
    if(rowRight < rowLeft){
      break;
    }

    //上 ↑
    for(let i = rowRight ; i>= rowLeft ; i--) {
      result.push(arrNum[i[cowLeft]]);
    }
    cowLeft ++ ;
    if(cowLeft > cowRight) {
      break;
    }
    return result ;
  }
}

