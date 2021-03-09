/*
 * @Description: correct版
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-11-14 14:21:56
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-12-16 11:12:47
 */

//(1)new的执行过程，主要使用原型链
//通过new可以产生原对象的一个实例对象，而这个实例对象继承了原对象的属性和方法。
//因此，new存在的意义在于它实现了javascript中的继承，而不仅仅是实例化了一个对象！
function myNEW (ctor, ...args) {
  let obj = {} ;
  obj.__proto__ = ctor.prototype ;
  let result = ctor.apply(obj, args) ;
  let isObject = typeof result === 'object' && result !== null;
  let isFunction = typeof result === 'function';

  return isObject || isFunction ? result : obj;
}



//(2) promise
class Promise {
  constuctor(executor) {
    this.state = 'pending' ;
    this.value = undefined ;
    this.reason = undefined ;
    this.onResolvedCallbacks = [] ;
    this.onRejectedCallbacks = [] ;
    let resolve = (value) => {
      if(this.state == 'pending') {
        this.state = 'fullfilled' ;
        this.value = value ;
        this.onResolvedCallbacks.forEach(fn => fn()) ;
      }
    } ;
    let reject = (reason) => {
      if(this.state == 'pending') {
        this.state = 'rejected' ;
        this.reason = reason ;
        this.onRejectedCallbacks.forEach(fn => fn()) ;
      }
    } ;
    try {
      executor(resolve, reject) ;
    } catch (error) {
      reject(error) ;
    }
  }
  then(onfullfilled, onrejected) {
    if(this.state == 'fullfilled') {
      onfullfilled(this.value) ;
    }
    if(this.state == 'rejected') {
      onrejected(this.reason);      
    }
    if(this.state == 'pending') {
      this.onResolvedCallbacks.push(() => {
        onfullfilled(this.value) ;
      })
      this.onRejectedCallbacks.push(() => {
        onrejected(this.reason);
      })
    }
  }
}



//(3)promise并发
const limitLoad = (limit, loadImg, urls) => {
  let sequeue = [].concat(urls) ;
  let promises = sequeue.splice(0, limit).map((item, index) => {
    return loadImg(item).then(() => {
      return index ;
    })
  });

  return sequeue.reduce((collect, item) => {
    return collect
    .then(() => {
      //
      return Promise.race(promises);
    })
    .then((fristIndex) => {
      promises[fristIndex] = loadImg(item).then(() => {
        return fristIndex ;
      });
    })
    .catch(err => {
      console.log('err',err) ;
    })
  },Promise.resolve())
  .then(() => {
    Promise.all(promises);
  })
}



//(4)异位字符
const isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false
  }
  let count = new Map()
  for (let i = 0; i < s.length; i++) {
    count.get(s[i]) ? count.set(s[i], count.get(s[i]) + 1) : count.set(s[i], 1)
    count.get(t[i]) ? count.set(t[i], count.get(t[i]) - 1) : count.set(t[i], -1)
  }
  for (const item of count) {
    if (item[1] != 0) {
      return false
    }
  }
  return true
};






//(5)二叉树层序遍历
var levelOrderBottom = function(root) {
  if(!root) return [] ;
  let res = [], 
  queue = [root] ;
  while(queue.length) { //分层
    let curr = [],
    temp = [] ;
    while(queue.length) { //每一层的左右节点统计
      let node = queue.shift(); //删除并返回数组中的第一个元素
      curr.push(node.val);
      if(node.left) temp.push(node.left);
      if(node.right) temp.push(node.right);
    }
    res.push(curr) ;
    queue = temp ;
  }
  return res ;
};



//(6)二叉树前序遍历
const myPre = (root) => {
  let res = [] ;
  let stack = [root] ;
  if(!root) return [];
  while(stack.length > 0) {
    let curNode = stack.pop() ;
    res.push(curNode.val);
    if(curNode.right !== null) {
      stack.push(curNode.left);
    }
    if(curNode.left !== null) {
      stack.push(curNode.right);
    }
  }
  return res;
}



//(7)二叉树中序遍历
const trieMiddle = (root) => {
  let res = [] ;
  let stack = [] ;
  let node = root ;
  while(node || stack.length) {
    while(node) {
      stack.push(node) ;
      node = node.left ;
    }
    stack.pop();
    res.push(node.val);
    node = node.right;
  }
  
  return res;
}


//(8)二叉树后序遍历




//(9)二分法（平方根）



//(10)快速排序
const fastSort  = (arr) => {
  if(arr.length < 2) {
    return arr ;
  }
  let tempIndex = Math.floor(arr.length / 2) ;
  let left = [] ,right = [] ;
  let temp = arr.splice(0, tempIndex) ;

  for(let i = 0,  j = arr.length; i < j ; i ++) {
    if(arr[i] > temp) {
      right.push(arr[i]) ;
    }
    if(arr[i] < temp) {
      left.push(arr[i]);
    }
  }

  return fastSort(left.concat([temp],fastSort(right)));
}


//（11）防抖
const debounce = (fn, wait = 50) => {
  var timeout = null;
  return function() {
    if(timeout !== null) 
    clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  }
}


const useDebounce = (fn, delay, dep = []) => {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep)
}


//(12) 节流
const throttle = (fn, delay = 50) => { // 节流 控制执行间隔时间 防止频繁触发 scroll resize mousemove
  let stattime = 0;
  return function (...args) {
    let curTime = new Date();
    if (curTime - stattime >= delay) {
        fn.apply(this, args);
        stattime = curTime;
    }
  }
}


const useThrottle = (fn, delay, dep = []) => {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}




//(13) 无重复最长子串
const longStr = ( str ) => {
  let obj = {} ,res = 0 ;
  for(let i =0, j =0 ; i< str.length ; i++) {
    if(obj[str[i]]) {
      j = Math.max(j , obj[str[i]]+1) ;
    }else{
      obj[str[i]] = i ;
      res = Math.max(res , j -i +1) ;
    }
  }
  return res ;
}


//(14)函数科里化
const curring = ( fn ) => {
  let argsArr = [] ;
  let temp  = ( ...args ) => {
    console.log('temp', args);
  
    if( args.length >0 ){
      argsArr = argsArr.concat( args ) ;
      return temp;
    }
    return fn( ...argsArr );
  }
  return temp ;
}

const  myFunc = ( ...args ) => {
  console.log('myFunc', args);
  
  return args.reduce( (total, current) => total * current)
}

const curry = curring(myFunc) ;
curry(2)(3,4)();


//(15) 归并排序
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


//(16) url字典
const parseParam = (url) => {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })

  return paramsObj;
}




//(17) 两数之和
const toSum = (l1, l2) => {
  let head = new ListNode('head') ;
  let temp = head ;
  let sum = 0 ,count = 0;
  while(l1 || l2) {
    sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + count ;
    count = sum >=10 ? 1 : 0 ;
    temp.next  = new ListNode((sum % 10));//新节点，拿到个位数
    temp = temp.next ;
    l1&&l1.next ;
    l2&&l2.next ;
  }
  count&&(temp.next = new ListNode(count));
  return temp ;
}


//(18) 两数相加



//(19) 卡片随机
const shuffle = (array) => {
	let j, x;
	for (let i = array.length; i > 0; i--) {
		j = Math.floor(Math.random() * i);
		x = array[i - 1];
		array[i - 1] = array[j];
		array[j] = x;
	}
	return array;
}



//(20) 最长回文子串
var longestPalindrome = function(s) {
  let dp = [];
  for(let i = 0; i < s.length; i++){
    dp[i] = [];
  }

  let max = -1, str = '';
  for(let k = 0; k < s.length; k++){
    // k为所遍历的子串长度 - 1，即左下标到右下标的距离
    for(let i = 0; i + k < s.length; i++){
      let j = i + k;
      // i为子串开始的左下标，j为子串开始的右下标
      if(k == 0){
        // 当子串长度为1时，必定是回文
        dp[i][j] = true;
      }
      else if(k <= 2){
        // 当子串长度为2时，两字符相同则符合回文，长度为3，首位字符相同则符合回文
        if(s[i] == s[j]){
          dp[i][j] = true;
        }
        else{
          dp[i][j] = false;
        }
      }
      else{
        // 当子串长度超过3，取决于去掉头尾之后的子串是否回文并且首位字符是否相同
        if(dp[i+1][j-1] && (s[i] == s[j])){
          dp[i][j] = true;
        }
        else{
          dp[i][j] = false;
        }
      }

      if(dp[i][j] && k > max){
        max = k;
        str = s.substring(i, j + 1)
      }
    }
  }

  return str;
};


//(21)三数之和
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


//(22)三数和的最近值
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



//(23)有序数组绝对值最小的值



//（24）Z字变型转化
const convert = (s, numRows) => {
  let arr = [] , num = 0 , flag = false ;
  if(numRows == 1) return s ;

  //确定多少列，用空字符串填充
  for(let c = 0 ; c < numRows ;c ++) {
    arr[c] = "" ;
  }

  //每列按照按顺序填充
  for(let c = 0 ; c < s.length ; c++ ) {
    if(num == numRows -1 || num == 0) {
      flag = !flag ;
    }
    arr[num] += s[c] ;
    flag ? ++num : --num ; 
  }
  let ans='';
  for(let item of arr){
    ans+=item;
  }
  return ans;
}



//整数反转
//  123 -> 321  -123 -> -321
const reverse = (num) => {
  let result = 0 ;
  if(num >= 0) {
    result = num.toString().reverse() ;
  }else{
    result = num.toString.slice(1).reverse();
  }

  
  
}


//字符串转化整数
const parseNum = () => {
  
}



//盛水最多的容器
//利用双指针
const maxArea = (height) => {
  let max = 0 ;
  let left = 0 , right = arr.length - 1;
  while(left < right) {
    let min = Math.min(height[left], height[right]) ;
    max = Math.max((right - left) * min, max) ;
    if(height[left] > height[right]) {
      right -- ;
    }else{
      i ++ ;
    }
  }
  return max ;
}



//最长公共前缀
//最大子串和最小子串的公共长度

const maxComlen = (arr) => {
  let max = "" , min = "" ;
  for(let i in arr) {
    max = Math.max(arr[i].length, max.length) ;
    min = Math.min(arr[i].length, min.length) ;
  }
  let obj = "" ;
  for(let j in min) {
    if(min[j] == max[i]) {
      obj += min[j];
    }else{
      return obj ;
    }
  }
  return obj ;
}




//三数之和
//三数相加为0,去掉重复。左右指针,先排序
const threeSum = (arr) => {
  
}



//三数之和最接近的值


//有效的括号

//合并两个有序链表

//删除排序数组中的重复项


//最长有效括号


//字符串相乘

//最大子序和

//字母异位词分组


//x的平方根


//螺旋矩阵


//最下路径和

//爬楼梯


//搜索二维矩阵


//最小覆盖子串

//合并两个有序数组

//二叉树前中后序层次排列

//对称二叉树


