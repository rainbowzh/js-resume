/*
 * @Description: 无重复子串/字符串全排列
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-17 16:23:10
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-26 20:12:58
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


//最长无重复子串--finish
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
var permute = function(nums) {
  var result = [];
  if (nums.length <= 1) {
    return [nums];
  } else {
    for (var i = 0; i < nums.length; i++) {
      var c = nums[i];
      var newStr = nums.slice(0, i) + nums.slice(i + 1, nums.length);
      var l = permute(newStr);
      console.log('newStr:', newStr);
      for (var j = 0; j < l.length; j++) {
        var tmp = c + l[j];
        console.log('temp',tmp);
        result.push(tmp);
        console.log(result);
      }
    }
  }
  return result;
};  


//三数之和
var threeSum = function(nums) {
    if(nums.length < 3){
        return [];
    }

    let res = [];
    // 排序
    nums.sort((a, b) => a - b);
    for(let i = 0; i < nums.length; i++){
        if(i > 0 && nums[i] == nums[i-1]){
            // 去重
            continue;
        }
        if(nums[i] > 0){
            // 若当前元素大于0，则三元素相加之后必定大于0
            break;
        }
        // l为左下标，r为右下标
        let l = i + 1; r = nums.length - 1;
        while(l<r){
            let sum = nums[i] + nums[l] + nums[r];
            if(sum == 0){
                res.push([nums[i], nums[l], nums[r]]);
                while(l < r && nums[l] == nums[l+1]){
                    l++
                }
                while(l < r && nums[r] == nums[r-1]){
                    r--;
                }
                l++;
                r--;
            }
            else if(sum < 0){
                l++;
            }
            else if(sum > 0){
                r--;
            }
        }
    }

    return res;
};


//出现重复次数最多的字符
const maxTime = (str) => {
  let num = 0; //出现的次数
  let res = "" ; //哪个字符出现最多
  let result = {} ;
  const temp = str.split("");
  for(let  i = 0; i< temp.length ;i ++) {
    if(result[temp[i]]) {
      result[temp[i]] += 1 ;
    }
    else {
      result[temp[i]] = 1 ;
    }
  }

  for(let j in result) {
    if(result[j] > num) {
      num = result[j] ;
      res = j ;
    }
  }
  return {
    num ,
    res
  }
}