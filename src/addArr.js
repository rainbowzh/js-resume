/*
 * @Description: 归并排序 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-02-28 10:17:16
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-20 11:15:51
 */

//合并两个有序数组
const mergeArr = (arr1, arr2) => {
  let temp = arr1.length - arr2.length ;
  let len = arr1.length - arr2.length > 0 ? arr2.length  : arr1.length ;
  let i = 0, j = 0;
  let result = [] ;
  while(i !== len) {
    if(arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i++ ;
    }else{
      result.push(arr2[j]);
      j++ ;
    }
  }
  if(temp > 0){
    return result.concat(arr1.slice(i));
  }
  else{
    return result.concat(arr2.slice(j));
  }
}


//归并排序
var arr = [49, 38, 65, 97, 76, 13, 27, 49];
console.log(mergeSort(arr))
 
function merge(left, right) {
  var tmp = [];
 //[1,3] [2,4]
  while (left.length && right.length) {
    if (left[0] < right[0])
      tmp.push(left.shift());
    else
      tmp.push(right.shift());
  }
 
  return tmp.concat(left, right);
}
 
function mergeSort(a) {
  if (a.length === 1) 
    return a;
 
  var mid = Math.floor(a.length / 2);
  var left = a.slice(0, mid);
  var right = a.slice(mid);
 
  return merge(mergeSort(left), mergeSort(right));
}
