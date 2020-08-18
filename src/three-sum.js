/*
 * @Description: 两数之和,三数之和
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-08-10 11:27:54
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-13 10:44:32
 */

//两数之和
const twoSum = (current , arr) => {
  let nums = arr.slice(0) ;
  nums.sort((a, b) => a - b);
  let res = [] ;
  let temp1 = 0 ,temp2 = nums.length - 1 ;
  while(temp1 < temp2){
    if(nums[temp1] + nums[temp2] == current) {
      res.push(arr.indexOf(nums[temp1]));
      res.push(arr.lastIndexOf(nums[temp2]));
      temp2 -- ;
      temp1 ++ ;
    }
    if(nums[temp1] + nums[temp2] > current) {
      temp2 -- ;
    }
    if(nums[temp1] + nums[temp2] < current) {
      temp1 ++ ;
    }
  }
  console.log('res',res);
  return res ;
}


//三数之和
const threeSum = (arr) => {
  let nums = arr.slice(0) ;
  let res = [] ;
  nums.sort((a,b) => a - b) ;
  console.log('sort',nums);
  for(let i = 0 ;i < nums.length ; i++) {
    if(nums[i]>0 || nums[nums.length -1] < 0){
      break;
    }
    if(i>0&&nums[i] == nums[i-1]) continue;
    let temp1 = i+1 ,temp2 = nums.length -1 ;
    while(temp1 < temp2){
      if(nums[temp1] + nums[temp2] == -nums[i]) {
        res.push([nums[i],nums[temp1],nums[temp2]]) ;
        while (nums[temp1] == nums[temp1 + 1])
          temp1++ ;
        while (nums[temp2] == nums[temp2 - 1])
          temp2-- ;
        temp2-- ;
        temp1++ ;
      }
      if(nums[temp1] + nums[temp2] > -nums[i]) {
        temp2-- ;
      }
      if(nums[temp1] + nums[temp2] < -nums[i]) {
        temp1++ ;
      }
    }
  }
  console.log('res',res);
  return res;
}


//最接近的三数之和
//类比三数之和，添加一个变量表示差值
const threeSumClosest = function(nums, target) {
  if(nums.length == 0){
    return 0;
  }
  else if(nums.length < 4){
    return nums.reduce((a, b) => a + b)
  }
  else {
    let min = -1, res;
    nums.sort((a, b) => a - b);
    for(let i = 0; i < nums.length - 2; i++){
      if(i > 0 && nums[i] == nums[i - 1]){
        // 去重
        continue;
      }
      let l = i + 1, r = nums.length - 1;
      while(l < r){
        let sum = nums[i] + nums[l] + nums[r];
        if(sum == target){
          // 差距为0，直接出结果
          return sum;
        }
        else if(sum > target){
          if(min == -1){
            min = sum - target;
            res = sum;
          }
          else if(sum - target < min){
            min = sum - target;
            res = sum;
          }
          r--;
        }
        else if(sum < target){
          if(min == -1){
            min = target - sum;
            res = sum;
          }
          else if(target - sum< min){
            min = target - sum;
            res = sum;
          }
          l++;
        }
      }
    }
    return res;
  }
};


//最大子序和
const maxSum = (nums) => {
  let sum = nums[0] ;
  let pre = nums[0] ;
  for(let i = 1; i < nums.length ; i ++) {
    if(pre > 0) {
      pre+=nums[i] ;
    }else{
      pre = nums[i] ;
    }
    if(sum < pre) {
      sum = pre;
    }
  }
  console.log('sum',sum);
  return sum ;
}

//乘积最大子数组
//In: [2,3,-2,4] 
//Out: 6
const maxProduct = (nums) => {
  if(!nums || nums.length <1){
    return 0;
  }
  if(nums.length == 1) {
    return nums[0];
  }
  let max = nums[0] ;
  let min = nums[0] ;
  let product = nums[0] ;
  for(let i = 1 ; i < nums.length ; i ++) {
    let maxF = Math.max(max * nums[i] , nums[i], min * nums[i]);
    let minF = Math.min(max * nums[i], nums[i], min * nums[i]);
    max = maxF ;
    min = minF ;
    product = Math.max(product ,max) ;
  }
  console.log('product',product);
  return product ;
}
