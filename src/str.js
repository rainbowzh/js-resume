/*
 * @Description: 无重复子串
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-17 16:23:10
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-17 18:09:48
 */ 

var lengthOfLongestSubstring = function(s) {
  var res = 0; // 用于存放当前最长无重复子串的长度 
  var str = ""; // 用于存放无重复子串 
  var len = s.length; 
  for(var i = 0; i < len; i++) { 
      var char = s.charAt(i); 
      var index = str.indexOf(char); 
      if(index === -1) { 
          str += char; 
          res = res < str.length ? str.length : res; 
      } else { 
          str = str.substr(index + 1) + char; 
      } 
  } 
  return res; 
};
