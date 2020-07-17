/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-29 19:54:52
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-10-30 16:26:18
 */
var arr=[5,7,2,9,3,8,4,7,1];
// 每次选择最左边的数作为基数
function quickSort(arr) {
  //如果数组长度<=1,则直接返回
  if (arr.length <= 1) {
    return arr;
  }
  // 中间位(基准)取长度的一半向下取整
  var pivotIndex = Math.floor(arr.length / 2);
  //把中间位从原数组切割出来, splice 会改变原数组!!!!
  var pivot = arr.splice(pivotIndex, 1)[0];
  //定义两个空数组来存放比对后的值
  var left = [];
  var right = [];

  //比基准小的放在left，比基准大的放在right
  for (var i = 0 , j = arr.length; i < j; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  //递归下去  arr = [ left , pivot , right]
  // 怎么个递归法,就是比对后的数组还是会重复之前的取基准再切开比较..直到最后没有可以切了
  return quickSort(left).concat([pivot], quickSort(right));
}
console.log(quickSort(arr));
