/*
 * @Description: 有效的括号
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-08-10 11:01:04
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-10-09 17:55:40
 */

//括号是否合法
var isValid = function (s) {
  var map = {
    "(": ")",
    "[": "]",
    "{": "}"
  }
  var leftArr = []
  for (var ch of s) {
    if (ch in map) leftArr.push(ch); //为左括号时，顺序保存
    else { //为右括号时，与数组末位匹配
      if (ch != map[leftArr.pop()]) return false; // 与最后一位比较 并pop最后一位
    }
  }
  return !leftArr.length // 防止全部为左括号
};
console.log(isValid('{()[]}'));
