/*
 * @Description: 螺旋矩阵
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-08-13 09:42:49
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-13 09:43:42
 */
var spiralOrder = function(matrix) {
  // 最终返回的结果数组
  var ans = [];

  var spiralLoop = function() {
    // 临时数组
    var arr = [];

    for (var i = 0; i < matrix.length; i++) {
      if (i === 0) {
          arr = arr.concat(matrix[0]);
      }

      if (i > 0 && i < matrix.length - 1) {
          var insertRight = matrix[0].length === 1 ? 
                            [] : 
                            arr.splice(-(i - 1), i - 1), // 插入位置右侧的元素
              last = matrix[i].splice(-1, 1), // 数组尾元素
              first = matrix[i].splice(0, 1); // 数组首元素
          // 在指定位置插入元素
          arr = arr.concat(last, first, insertRight);
      }

      if (matrix.length > 1 && i === matrix.length - 1) {
          var insertRight  = matrix[0].length === 1 ? 
                              [] : 
                              arr.splice(-(matrix.length - 2), matrix.length - 2);
          // 将最后一行倒叙排列然后插入指定位置
          arr = arr.concat(matrix[matrix.length - 1].reverse(), insertRight);
      }

    }
    // 删除矩阵的首尾行，得到的就是下一次需要遍历的矩阵
    matrix.splice(0, 1);
    matrix.splice(-1, 1);

    ans = ans.concat(arr);
    // 根据矩阵内是否还存在数组进行递归
    if (matrix.length >= 1) {
        spiralLoop(matrix);
    }

  }

  spiralLoop(matrix);

  return ans;

};
