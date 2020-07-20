/*
 * @Description: 无重复子串/字符串全排列
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-17 16:23:10
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-20 10:40:54
 */ 

var lengthOfLongestSubstring = function(s) {
  var res = 0; // 用于存放当前最长无重复子串的长度 
  var str = ""; // 用于存放无重复子串 
  var len = s.length; 
  for(var i = 0; i < len; i++) { 
      var char = s.charAt(i); //返回指定位置的字符
      var index = str.indexOf(char); 
      if(index === -1) { 
          str += char; 
          res = res < str.length ? str.length : res; 
      } else { 
          str = str.substr(index + 1) + char; //如果子串和当前字符对比有重复，新的子串从重复的位置开始 
      } 
  } 
  return res; 
};


//字符串全排列--finish
var strFunc = (arr) => {
  let res = 1 ;
  if(arr.length < 3) {
    res = arr.length ;
  }else{
    let str = "" ;
    for(let i = 0 ; i < arr.length ;i ++) {
      let curItem = arr.charAt(i) ;
      let flag = str.indexOf(curItem) ;
      if(flag == -1) {
        str += curItem;
        res = res < str.length ? str.length : res;
      }else{
        str = str.substr(flag +1) + curItem ;
      }
    }
  }
  return res ;
}


//字符串全排列---todo
var perm = function(s) {
  var result = [];
  if (s.length <= 1) {
    return [s];
  } else {
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      var newStr = s.slice(0, i) + s.slice(i + 1, s.length);
      var l = perm(newStr);
      console.log('newStr:', newStr);
      for (var j = 0; j < l.length; j++) {
        var tmp = c + l[j];
        console.log('temp',tmp);
        result.push(tmp);
      }
    }
  }
  return result;
};  