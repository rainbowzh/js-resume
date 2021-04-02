/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-12-08 15:00:30
 * @LastEditors: zhouhong07
 * @LastEditTime: 2021-04-02 15:51:37
 */

//(1)大数相加 / 大数相乘（字符串相加，字符串相乘）

//相乘
var multiply = function(num1, num2) {
  if (num1 == "0" || num2 == "0") return "0";
  let l1 = num1.length,
    l2 = num2.length;
  let res = new Array(l1 + l2 - 1).fill(0); //两数相乘的最大取值范围
  for (let i = 0; i < l2; i++) {
    for (let j = 0; j < l1; j++) {
      res[i + j] += num2[i] * num1[j]; //交错获得数组值，可用竖式验算来验证
    }
  }
  let len = res.length;
  let str = "",
    num = 0;//进位
  while (len--) { //从右至左，计算进位和当前位的值
    num += res[len];
    str = (num % 10) + str;
    num = (num / 10) | 0;
  }
  return num > 0 ? num + str : str;
};


//相加
const addStrings = (num1, num2) => {
  while (num1.length > num2.length) num2 = '0' + num2; //先补0对齐,较短的用零补齐
  while (num1.length < num2.length) num1 = '0' + num1; // 先补0对齐，较短的用零补齐
  let res = '';     // 结果字符串
  let carry = 0;    // 进位
  for (let i = num1.length - 1; i >= 0; i--) { // 加法 从右往左做
    const sum = +num1[i] + +num2[i] + carry;   // +号将字符转数字
    res = sum % 10 + res;                      // 模10的结果 + res字符串
    carry = sum > 9 ? 1 : 0;
  }
  return carry == 1 ? '1' + res : res;
};


//(2)无重复最长子串 （hash + 滑动）
var lengthOfLongestSubstring = function(s) {
   let obj = {} ; let res = 0; 
   for(let j=0 , i = 0; i <s.length; i ++){
      if(obj[s[i]] !== undefined){
        j = Math.max(obj[s[i]]+1 , j)
      }
      res = Math.max(i-j +1, res) ;
      obj[s[i]] = i;
    }
   return res ;
};


//(3)有效的字母异位分词
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
//=======
const isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false
  }
  let count = {}
  for (let i = 0; i < s.length; i++) {
    count[s[i]] ? count[s[i]] = (count[s[i]] + 1) : count[s[i]] = 1 ;
    count[t[i]] ? count[t[i]] = (count[t[i]] - 1) : count[t[i]] = -1 ;
  }
  
  for (const item in count) {
    console.log('item',item ,count) ;
    if (count[item] != 0) {
      return false
    }
  }
  return true ;
};


//异位词分组
const groupAnagrams = (strs) => {
  const hashTable = {};

  function sort(str) {
    return str.split("").sort().join("");
  }
  // 这个方法需要排序，因此不是很优，但是很直观，容易想到
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    const key = sort(str);
    if (!hashTable[key]) {
      hashTable[key] = [str];
    } else {
      hashTable[key].push(str);
    }
  }

  return Object.values(hashTable);
};



//(4)x的平方根(取整)
const mySqrt = (x) => {
  if(x === 0 || x=== 1) return x ;
  let low = 0 ;
  let high = x ;
  let mid ;
  let qr ;
  while(low < high) {
    mid = Math.floor(low + (high - low)/2) ;
    qr = mid * mid ;
    if(qr === x) return mid ;
    if(qr < x && (mid + 1)*( mid + 1) > x) return mid //这里要判断mid下一位的平方是否会比给定的阿平方数大
    if(qr > x) {
      high = mid -1 ;
    }else {
      low = mid + 1 ;
    }
  }
  return low ; //最后返回low必然没错，因为是舍弃小数点往小取整数
};


//(5) 两数之和
var twoSum = function(nums, target) {
  let obj = {};
  for(let i = 0 ; i < nums.length ; i++) {
    let curItem = target - nums[i] ;
    if(obj[curItem] !== undefined) {
      return [i,obj[curItem]]
    }else{
      obj[nums[i]] = i ;
    }
  }
  return [];
};


//(6) 两数相加
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
var addTwoNumbers = function(l1, l2) {
  let head = new ListNode('head') ;
  let temp = head ;
  let count = 0 ;//进位
  let res = 0 ;//结果

  while(l1 || l2) {
    let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + count ;
    count = sum >= 10 ? 1 : 0 ;
    temp.next = new ListNode(sum % 10) ;
    temp = temp.next ;
    l1 && (l1 = l1.next) ;
    l2 && (l2 = l2.next );
  }
  count && (temp.next = new ListNode(count)) ;
  return head.next;
};



//(7)最长回文子串
var longestPalindrome = function(s) {
  if(!s || s.length ==0) {
      return "";
  }
  let res = s[0] ;
  let dp = [] ;
  for(let i = s.length -1 ;i>=0 ; i--) {
    dp[i] = [];
    for(let j = i ;j<s.length ;j ++) {
      if (j - i === 0) dp[i][j] = true; 
      // specail case 1
      else if (j - i === 1 && s[i] === s[j]) dp[i][j] = true;
      // specail case 2
      else if (s[i] === s[j] && dp[i + 1][j - 1]) {
        // state transition
        dp[i][j] = true;
      }
      if(dp[i][j] && (j - i +1 > res.length)) { //取得最大值
        res = s.slice(i, j + 1);
      }
    }
    
  }
  return res ;
};



//(8) 三数之和
const threeSum = (nums) => {
  nums.sort((a, b) => a - b); // 排序
  
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) { // 外层遍历
    let n1 = nums[i];
    if (n1 > 0) break; // 如果已经爆0，不用做了，break
    if (i - 1 >= 0 && n1 == nums[i - 1]) continue; // 遍历到重复的数，跳过    

    let left = i + 1;            // 左指针
    let right = nums.length - 1; // 右指针

    while (left < right) {
      let n2 = nums[left], n3 = nums[right];

      if (n1 + n2 + n3 === 0) {  // 三数和=0，加入解集res
        res.push([n1, n2, n3]);
        while (left < right && nums[left] == n2) left++; // 直到指向不一样的数
        while (left < right && nums[right] == n3) right--; // 直到指向不一样的数
      } else if (n1 + n2 + n3 < 0) { // 三数和小于0，则左指针右移
        left++;
      } else {      // 三数和大于0，则右指针左移
        right--;
      }
    }
  }
  return res;
};



//(9)最接近的三数之和
const threeSumClosest = (nums, target) =>{
  nums.sort((a, b) => a - b);
  let res = nums[0] + nums[1] + nums[nums.length - 1];

  for (let i = 0; i < nums.length - 2; i++) {
    const n1 = nums[i];
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const n2 = nums[l];
      const n3 = nums[r];
      const sum = n1 + n2 + n3;
      if (sum > target) {
        r--;
      } else {
        l++;
      }
      if (Math.abs(sum - target) < Math.abs(res - target)) {
        res = sum;
      }
    }
  }
  return res;
};




//(10)二叉树遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

//前序遍历
const preorderTraversal = (root) => {
  const list = [];
  const stack = [];
  
  // 当根节点不为空的时候，将根节点入栈
  if(root) stack.push(root)
  while(stack.length > 0) {
    console.log('stack',stack);
    const curNode = stack.pop()
    // 第一步的时候，先访问的是根节点
    list.push(curNode.val);
    console.log('curNode',curNode,list,curNode.right);
    
    // 我们先打印左子树，然后右子树
    // 所以先加入栈的是右子树，然后左子树
    // 利用入栈的右左顺序和stack.pop的先后顺序控制 遍历顺序
    if(curNode.right !== null) {
        stack.push(curNode.right)
    }
    if(curNode.left !== null) {
        stack.push(curNode.left)
    }
    console.log('--',list)
  }
  console.log('list',list);
  return list
}


//中序遍历
const inorderTraversal = (root) => {
  let list = []
  let stack = []
  let node = root
  
  while(node || stack.length) {
  // 遍历左子树
    while(node) {
      console.log('node',node.left,stack);
      stack.push(node)
      node = node.left
    }
    console.log('kkkk',stack);
    node = stack.pop();
    console.log('stack--',node,stack);
    list.push(node.val);
    console.log('list',list);
    node = node.right
  }
  return list
}



//后序遍历
// 先将后序遍历取反变为类似于先序遍历，即：左-右-根 => 根-右-左
// 再利用栈先进后出特性，把先序遍历的结果取反，遍历访问就是后序遍历的结果
const postorder = (root) => {
  if (!root) return;
  const outputStack = []; // 最终用来倒序输出的栈
  const stack = [root]; // 用来先序遍历的栈
  while (stack.length) {
    const n = stack.pop();
    // 将 n push 到 outputStack 中
    outputStack.push(n);
    // 因为和现需遍历不完全一样，先序遍历：根-左-右，此时为：根-右-左
    // 所以此时先 push left，再 push right
    if (n.left) stack.push(n.left);
    if (n.right) stack.push(n.right);
  }
  // 最终遍历 pop outputStack 的所有元素输出，即为后序遍历的结果
  while (outputStack.length) {
    const n = outputStack.pop();
    console.log(n.val);
  }
};


//层序遍历
const levelOrder = (root) => {
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
  return res;
};



//(11)盛水最多的容器
const maxArea = (height) => {
  let res = 0, i = 0, j = height.length - 1, cur = 0;
  while (i < j) {
    let h = height[i] < height[j] ? height[i] : height[j];
    cur = h * (j - i);
    res = cur > res ? cur : res;
    if (height[i] < height[j]) {
      i++;
    } else {
      j--;
    }
  }
  return res;
};
maxArea([1,8,6,2,5,4,8,3,7])



//(12) 有序数组绝对值最小的值
//利用二分查找（结合数组的有序性）
//[-4,-1,2,3]
//准确性待确认（错误！！！）
const maxAbs = (arr) => {
  if(!arr) return -1 ;
  let low = 0 , high = arr.length - 1 ,mid ;
  while(low <= high){
    if(arr[low] * arr[high] >=0) { //判断数组中是否有负数，有负数则立马确定最大最小值
      return (arr[low] >=0 ? arr[low] : arr[high]) ;
    } 
    if(low + 1 == high)
      return abs(a[low]) < abs(a[high]) ? a[low] : a[high];
    mid = low + Math.floor((high - low) / 2) ;
    if(arr[low] * arr[high] >= 0) {
      low = mid ;
    }
    if(arr[low] * arr[mid] >= 0) {
      high = mid ;
    }
  }
}


//(13)归并排序
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
  console.log(tmp, left, right)
 
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





//(14)快速排序
var quickSort = function (arr) {
  if (arr.length <= 1) return arr;
  let mIndex = Math.floor(arr.length / 2);
  let mItem = arr.splice(mIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < mItem) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([mItem]).concat(quickSort(right))
}




//字符串相加见（1）

//(15)url字典
const parseUrl = (url) => {
  const params = url.indexOf('?') == -1 ? "" : url.slice( url.indexOf("?")+1 );
  const paramsArr = params.split('&') ;
  let resultObj = {} ;

  paramsArr.forEach((item) => {
    if(/=/.test(item)) {
      let [key, value] = item.split("=") ;
      val = decodeURIComponent(value) ;
      
      if(resultObj.hasOwnProperty(key)) {
        resultObj[key] = [].concat(resultObj[key], val);
      } else{
        resultObj[key] = val;
      }
    }else{
      resultObj[item] = true;
    }
  });
  return resultObj;
}



//jsonp实现
let jsonp = function (url, data = {}, callback='callback') {
  // 转化数据为url字符串形式
  let dataStr = url.indexOf('?') === -1 ? '?' : '&'
  for(let key in data) {
    dataStr += `${key}=${data[key]}&`
  }
  // 处理url中的回调函数
  dataStr += 'callback=' + callback
  // 创建srcipt标签并添加src属性值
  let scriptBody = document.createElement('script')
  scriptBody.src = url + dataStr
 
  // append到页面中 添加到页面就立刻发起请求
  document.body.appendChild(scriptBody)
  //返回一个
  return new Promise((resolve, reject) => {
    window[callback] = (data) => {
      try {
        resolve(data)
      } catch(e) {
        reject(e)
      } finally {
        // 移除script元素
        scriptBody.parentNode.removeChild(scriptBody)
        console.log(scriptBody)
      }
    }
  })
}


//（17）函数柯里化
let curring = ( fn ) => {
  let argsArr = [] ;
  let temp  = ( ...args ) => {
    console.log('temp', args); //[2] ,[3,4] , []
  
    if( args.length >0 ){
      argsArr = argsArr.concat( args ) ;
      return temp;
    }
    return fn( ...argsArr );
  }
  return temp ;
}

let myFunc = ( ...args ) => {
  console.log('myFunc', args);
  
  return args.reduce( (total, current) => total * current)
}

let curry = curring(myFunc) ;
curry(2)(3,4)();



//(18)防抖
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



//(19)节流
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



//(20)call  分别接受参数
// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }
  context = context || window
  context.fn = this 
  let arg = [...arguments].slice(1)
  let result = context.fn(...arg)
  delete context.fn
  return result
} 



///(21) apply 接受数组形式的参数
// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myapply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }
  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}



//(22)bind
// 思路：类似call，但返回的是函数
//bind() 方法创建一个新的函数，在 bind() 被调用时，
//这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
Function.prototype.mybind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  let _this = this
  let arg = [...arguments].slice(1)
  return function F() {
    // 处理函数使用new的情况
    if (this instanceof F) {
      return new _this(...arg, ...arguments)
    } else {
      return _this.apply(context, arg.concat(...arguments))
    }
  }
}

//数字千分位处理
function toThousands(num) {
  numArr = (num || 0).toString().split(".")
  var num = numArr[0].toString(), result = '';
  // 三个一起减少循环测试
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result + (numArr[1]?"."+numArr[1]:"");
}

console.log(toThousands(12314654))
console.log(toThousands(12314654.456))
console.log(toThousands())

//正则处理千分位
let b = a.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');




//(23)展平
//报错！！
let flatten = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  },[])
}
//=====
const flat = (arr) => {
  let newArr = arr.map((item) => {
    return Array.isArray(item) ? flatten(item) : item;
  })
  return [].concat(...newArr)
}
arr.toString().split(",").map(x=> +x )


//(24)乱序、洗牌
const shuffle = (array) => {
  let j , x ;
  for(let i = 1 ;i <= array.length ; i++) {
    j = Math.floor(Math.random() * i);
    x = array[i - 1];
		array[i - 1] = array[j];
		array[j] = x;
  }
  return array ;
}



//(25)promise实现
//Promise函数
function Promise(executor) {
    let self = this; //保留this。防止后面方法出现this只想不明的问题
    self.status = 'pending'; //promise的默认状态是pending
    self.success = undefined; //保存成功回调传递的值
    self.error = undefined; //保存失败回调传递的值

    self.onSuccessCallbacks = []; //存放成功的回调
    self.onErrorCallbacks = []; //存放失败的回调

    function resolve(success) {
        if (self.status === 'pending') {
            self.status = 'resolved'; //成功函数将其状态修改为resolved（fullfilled）
            self.success = success; //将成功的值保存起来
            self.onSuccessCallbacks.forEach(element => {
                element();
            });
        }
    }

    function reject(error) {
        if (self.status === 'pending') {
            self.status = 'rejected'; //失败函数将其函数修改为rejected
            self.error = error; //将失败的值保存起来
            self.onErrorCallbacks.forEach(element => {
                element();
            })
        }
    }
    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

//then函数
Promise.prototype.then = function (onResolved, onRejected) {
    let self = this;
    let promiseAgain = new Promise((resolve, reject) => {
        if (self.status === 'pending') {
            self.onSuccessCallbacks.push(() => {
                let x = onResolved(self.success); //将resolve函数保留的成功值传递作为参数
                resolvePromise(promiseAgain, x, resolve, reject);
            })
            self.onErrorCallbacks.push(() => {
                let x = onRejected(self.error); //将reject函数保留的失败值传递作为参数
                resolvePromise(promiseAgain, x, resolve, reject);
            })
        }
        if (self.status === 'resolved') {
            let x = onResolved(self.success); //将resolve函数保留的成功值传递作为参数
            resolvePromise(promiseAgain, x, resolve, reject);
        }
        if (self.status === 'rejected') {//fullfilled
            let x = onRejected(self.error); //将reject函数保留的失败值传递作为参数
            resolvePromise(promiseAgain, x, resolve, reject);
        }
    })
    return promiseAgain;
}
//resolvePromise函数
function resolvePromise(promiseAgain, x, resolve, reject) {
    if (promiseAgain === x) {
        return reject(new TypeError("循环调用"));
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    resolvePromise(promiseAgain, y, resolve, reject);
                }, (e) => {
                    reject(e);
                })
            } else {
                resolve(x);
            }
        } catch (error) {
            reject(error);
        }
    } else {
        resolve(x);
    }
}

module.exports = Promise;



//(26)promiseAll实现
function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if (!isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedValues = new Array(promiseNum);
    for (var i = 0; i < promiseNum; i++) {
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}



//(27)promiseRace实现
function promiseRace(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    let len = promises.length;
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(function (value) {
        return resolve(value)
      }, function (reason) {
        return reject(reason)
      })
    }
  })
}


//(28)promise并发限制
//==使用promise.race
function limitLoad (limit, loadImg, urls) {
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
    return Promise.all(promises);
  })
}

//==使用递归
function limitLoad (urls, handler, limit) {
  const sequence = [].concat(urls) // 对数组做一个拷贝
  let count = 0
  const promises = []

  const load = function () {
    if (sequence.length <= 0 || count > limit) return 
    count += 1
    console.log(`当前并发数: ${count}`)
    return handler(sequence.shift())
      .catch(err => {
        console.error(err)
      })
      .then(() => {
        count -= 1
        console.log(`当前并发数：${count}`)
      })
      .then(() => load())
  }

  for(let i = 0; i < limit && i < urls.length; i++){
    promises.push(load())
  }
  return Promise.all(promises)
}


//(29)promise失败重试
var promiseRetry = function (fn, times, delay) {
  return new Promise(function (resolve, reject) {
    var attempt = function () {
      fn().then(resolve).catch(function (err) {
        console.log(`Attempt #${times} failed`);
        if (0 == times) {
          reject(err);
        } else {
          times--;
          setTimeout(function () {
            attempt()
          }, delay);
        }
      });
    };
    attempt();
  });
}

//(30)instanceof 实现
function _instanceof(A, B) {
    var O = B.prototype;// 取B的显示原型
    A = A.__proto__;// 取A的隐式原型
    while (true) {
      //Object.prototype.__proto__ === null
      if (A === null)
          return false;
      if (O === A)// 这里重点：当 O 严格等于 A 时，返回 true
          return true;
      A = A.__proto__;
    }
}




//(31)new 的实现  继承过程
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


//(32)观察者模式实现
//构造 订阅器 的类
class Dep{
  constructor(id){
    this.id = id; //订阅器 标识
    this.subs = []
      
  }

  push(watch){
    watch.bind_id = this.id; //给 观察者 标识 归属的订阅器
    this.subs.push(watch)
  }

  notify(){
    this.subs.forEach((watch)=>{
      watch.update()
    })
  }
}

//构造 观察者 的类
class Watch{
  constructor(update){
      this.update = update
  }
}

//创建一个订阅器实例 click dep 
var clickDep = new Dep('click');

//创建观察者实例
var w1 = new Watch(()=>console.log('click watch 1'))
var w2 = new Watch(()=>console.log('click watch 2'))

//添加观察者
clickDep.push(w1)
clickDep.push(w2)

//发布消息
clickDep.notify()



//(33)发布订阅模式实现
class Common{
  constructor(id){
    this.id = id
    this.deps = {} //用于保存 订阅器
  }

  createDep(key){
    this.deps[key] = []
  }

  createWatch(update){
    return {
        bind_id:null,
        update
    }
  }

  push(key,watch){
    watch.bind_id = key
    this.deps[key].push(watch)
  }

  notify(key){
    this.deps[key].forEach((watch)=>{
      watch.update()
    })
  }
}

//创建 调度中心
const common = new Common('my common')

//创建 订阅器 
common.createDep('click')

//创建 观察者 
var w1 = common.createWatch(()=>console.log('click watch 1'))
var w2 = common.createWatch(()=>console.log('click watch 2'))

//添加 观察者
common.push('click',w1)
common.push('click',w2)

//发布 通知
common.notify('click')



//(34)深拷贝
function deepClone(source, hash = new WeakMap()) {
  if (source == null) return source;
  if (typeof source !== 'object') return source; // 函数 或者非object 直接返回
  if (source instanceof Date) return new Date(source); // 时间戳
  if (source instanceof RegExp) return new RegExp(source);
  if (hash.has(source)) return hash.get(source);   // 处理循环引用

  let clone = new source.constructor;

  hash.set(source, clone);

  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      clone[key] = deepClone(source[key], hash);
    }
  }
  return clone;
}




//输入一个日期 返回几秒前 几天前或者几月前
function getTimer(stringTime) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var month = day * 30;
  var time1 = new Date().getTime();//当前的时间戳
  console.log(time1);
  var time2 = Date.parse(new Date(stringTime));//指定时间的时间戳
  console.log(time2);
  var time = time1 - time2;

  var result = null;
  if (time < 0) {
      alert("设置的时间不能早于当前时间！");
  } else if (time / month >= 1) {
      result = "发布于：" + parseInt(time / month) + "月前";
  } else if (time / week >= 1) {
      result = "发布于：" + parseInt(time / week) + "周前";
  } else if (time / day >= 1) {
      result = "发布于：" + parseInt(time / day) + "天前";
  } else if (time / hour >= 1) {
      result = "发布于：" + parseInt(time / hour) + "小时前";
  } else if (time / minute >= 1) {
      result = "发布于：" + parseInt(time / minute) + "分钟前";
  } else {
      result = "刚刚发布！";
  }
  return result;
}
getTimer("2020-04-20 15:06:36")




//将数组转换成有层级关系的树
var data = [
  { parentId: 0, id: 1, value: '1' }, 
  { parentId: 3, id: 2, value: '2' }, 
  { parentId: 0, id: 3, value: '3' }, 
  { parentId: 1, id: 4, value: '4' }, 
  { parentId: 1, id: 5, value: '5' }
] ;

const convert = (list) => {
  const map = list.reduce((res,v)=>{
    res[v.id] = v;
    return res;
  },{})
  const res = [];
  for(let item of list){
    if(item.parentId === 0){
      res.push(item);
      continue;
    }
    if(item.parentId in map){
      const parent = map[item.parentId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return res;
}


//实现原生ajax
function ajax({url,method,body,headers}) {
  //之前代码返回值是 undefined，我们return一个Promise
  return new Promise(function(resolve,reject){
    let request = new XMLHttpRequest()
  //初始化请求
  request.open(method, url)
  for (let key in headers) {
    let value = headers[key]
    request.setRequestHeader(key, value)
  }
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        // successFn 就由 resove 代替了
        resolve.call(undefined, request.responseText)
      } else if (request.status >= 400) {
        // failFn 就由 reject 代替了
        reject.call(undefined, request)
      }
    }
  }
  request.send(body)
  })
}




//(35)二分查找
const binarySearch = (target, arr) => {
  if (!arr.length) return -1;
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = parseInt(start + (end - start) / 2);
    if (target === arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1
}


//(36)promise红绿灯
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
  
/**
 * 循环显示红绿灯
 * @param {number} green 绿灯显示毫秒数
 * @param {number} yellow 黄灯显示毫秒数
 * @param {number} red 红灯显示毫秒数
 */
async function light(green = 15000, yellow = 3000, red = 10000) {
  let status = 'green';
  while (true) {
    await sleep(green).then(() => {
      status = 'yellow'
      console.log(status)
    })
    await sleep(yellow).then(() => {
      status = 'red'
      console.log(status)
    })
    await sleep(red).then(() => {
      status = 'green'
      console.log(status)
    })
  }
}

//(37) reduce多对象合并（object.assign）或者对象去重
let arrObj = [
  { name: "xiaoming" },
  { age: 18 },
  { age: 19 }
]
var resultObject = arrObj.reduce(function (result, currentObject) {
  for (var key in currentObject) {
    if (currentObject.hasOwnProperty(key)) {
      result[key] = currentObject[key];
    }
  }
  return result;
}, {});

const responseList = [
  { id: 1, a: 1 },
  { id: 2, a: 2 },
  { id: 3, a: 3 },
  { id: 1, a: 4 },
];
const result = responseList.reduce((acc, cur) => {
    const ids = acc.map(item => item.id);
    return ids.includes(cur.id) ? acc : [...acc, cur];
}, []);
console.log(result); // -> [ { id: 1, a: 1}, {id: 2, a: 2}, {id: 3, a: 3} ]





//(38) 继承（原生，组合，寄生+ class）
//原型链继承==========
function SuperType(){
 this.property = true;
}

SuperType.prototype.getSuperValue = function(){
 return this.property;
};
function SubType(){
 this.subproperty = false;
}
//继承了 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function (){
 return this.subproperty;
};
var instance = new SubType();
alert(instance.getSuperValue()); //true

//组合继承=======
function SuperType(name){
 this.name = name;
 this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
 alert(this.name); 
 };
function SubType(name, age){
 //继承属性
 SuperType.call(this, name);

 this.age = age;
}
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
 alert(this.age);
};
var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29
var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27 


//寄生继承==========
function object(o){
　　function F(){

　　}
　　F.prototype=o;
　　 return new F();
 };



function createAnother(original){
  var clone = object(original); // 通过调用函数创建一个新对象
  clone.sayHi = function(){ //以某种方式增强真个对象
      alert("hi");
  }
  return clone; //返回这个对象
}

var person={
    name:"Nicholas",
    friends:["Shelby","Court","Van"]
}
 var now = createAnother(person);
 now.sayHi(); // hi

//寄生组合式继承==========
function SuperType(name){
 this.name = name;
 this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
 alert(this.name);
};
function SubType(name, age){
 SuperType.call(this, name); //第二次调用 SuperType()

 this.age = age;
}
SubType.prototype = new SuperType(); //第一次调用 SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
 alert(this.age);
}; 




//(39) 单例模式的实现
class Singleton {
  constructor(name) {
    this.name = name;
    this.instance = null;
  }
  static getInstance(name) {
    if(!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
  }
}
var oA = Singleton.getInstance('hi');
var oB = Singleton.getInstance('hisd');
console.log(oA===oB);



//(40)找出字符串中重复次数最多的字符（hash + for）


//(41)让异步操作顺序执行
const arr = [1, 2, 3]
arr.reduce((p, x) => {
  return p.then(() => {
    return new Promise(r => {
      setTimeout(() => r(console.log(x)), 1000)
    })
  })
}, Promise.resolve())




//（42）merge promise 顺序存储函数和 返回值 合并并发请求
const time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () => time(2000).then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => time(1000).then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => time(1000).then(() => {
  console.log(3);
  return 3
})

function mergePromise () {
  // 在这里写代码
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});


//====
function mergePromise (ajaxArray) {
  // 存放每个ajax的结果
  const data = [];
  let promise = Promise.resolve();
  ajaxArray.forEach(ajax => {
  	// 第一次的then为了用来调用ajax
  	// 第二次的then是为了获取ajax的结果
    promise = promise.then(ajax).then(res => {
      data.push(res);
      return data; // 把每次的结果返回
    })
  })
  // 最后得到的promise它的值就是data
  return promise;
}


// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]




// a==1 && a==2 && a== 3 为true
//(1)对象类型转换
var a = {
  i:1,
  toString:function(){
      return a.i++;
  }
}
//(2)数组类型转换
var a = [1,2,3];
a.join = a.shift;
console.log(a == 1 && a == 2 && a == 3);

//(3)利用Object.defineProperty
var val = 0;
Object.defineProperty(window, 'a', {
  get: function() {
    return ++val;
  }
});
console.log(a == 1 && a == 2 && a == 3);



// less函数和scss函数的使用

// 


//爬楼梯
//dp[0] = 0 dp[1] = 1 dp[2] = 2
//dp[n] = dp[n-1] + dp[n-2]   // 到达第n阶楼梯有从n-1阶走一步和从第n-2阶走两步两种情况
var climbStairs = function(n) {
    let dp = [];
    dp[0] = 0,dp[1] = 1,dp[2] = 2;
    for(let i = 3;i <= n;i++){
        dp[i] = dp[i-2] + dp[i-1];
    }
    return dp[n];
};

//裴波那切-- 1、1、2、3、5、8、13、21
//(2)
var longestCommonPrefix = function(strs) {
    if(!strs.length) return '';
    strs.sort();
    let a = strs[0],b = strs[strs.length-1],res = '';
    for(let i = 0;i < a.length;i++){
        if(i < b.length && a[i] === b[i]){
            res += a[i];
        }else break;
    }
    return res;
};
//(1)
var longestCommonPrefix = function(strs) {
    if(!strs.length) return '';
    strs.sort();
    let a = strs[0],b = strs[strs.length-1],res = '';
    for(let i = 0;i < a.length;i++){
        if(i < b.length && a[i] === b[i]){
            res += a[i];
        }else break;
    }
    return res;
};

//写一个 es6 的继承过程


//发布订阅过程
let eventEmitter = {
    // 缓存列表
    list: {},
    // 订阅
    on (event, fn) {
        let _this = this;
        // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
        // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
        (_this.list[event] || (_this.list[event] = [])).push(fn);
        return _this;
    },
    // 监听一次
    once (event, fn) {
        // 先绑定，调用后删除
        let _this = this;
        function on () {
            _this.off(event, on);
            fn.apply(_this, arguments);
        }
        on.fn = fn;
        _this.on(event, on);
        return _this;
    },
    // 取消订阅
    off (event, fn) {
        let _this = this;
        let fns = _this.list[event];
        // 如果缓存列表中没有相应的 fn，返回false
        if (!fns) return false;
        if (!fn) {
            // 如果没有传 fn 的话，就会将 event 值对应缓存列表中的 fn 都清空
            fns && (fns.length = 0);
        } else {
            // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
            let cb;
            for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
                cb = fns[i];
                if (cb === fn || cb.fn === fn) {
                    fns.splice(i, 1);
                    break
                }
            }
        }
        return _this;
    },
    // 发布
    emit () {
        let _this = this;
        // 第一个参数是对应的 event 值，直接用数组的 shift 方法取出
        let event = [].shift.call(arguments),
            fns = [..._this.list[event]];
        // 如果缓存列表里没有 fn 就返回 false
        if (!fns || fns.length === 0) {
            return false;
        }
        // 遍历 event 值对应的缓存列表，依次执行 fn
        fns.forEach(fn => {
            fn.apply(_this, arguments);
        });
        return _this;
    }
};

function user1 (content) {
    console.log('用户1订阅了:', content);
}

function user2 (content) {
    console.log('用户2订阅了:', content);
}

function user3 (content) {
    console.log('用户3订阅了:', content);
}

function user4 (content) {
    console.log('用户4订阅了:', content);
}

// 订阅
eventEmitter.on('article1', user1);
eventEmitter.on('article1', user2);
eventEmitter.on('article1', user3);

// 取消user2方法的订阅
eventEmitter.off('article1', user2);

eventEmitter.once('article2', user4)

// 发布
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');

// eventEmitter.on('article1', user3).emit('article1', 'test111');

/*
    用户1订阅了: Javascript 发布-订阅模式
    用户3订阅了: Javascript 发布-订阅模式
    用户1订阅了: Javascript 发布-订阅模式
    用户3订阅了: Javascript 发布-订阅模式
    用户4订阅了: Javascript 观察者模式
*/


//输入一个日期 返回几秒前 几天前或者几月前
function getTimer(stringTime) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var month = day * 30;
  var time1 = new Date().getTime();//当前的时间戳
  console.log(time1);
  var time2 = Date.parse(new Date(stringTime));//指定时间的时间戳
  console.log(time2);
  var time = time1 - time2;

  var result = null;
  if (time < 0) {
      alert("设置的时间不能早于当前时间！");
  } else if (time / month >= 1) {
      result = "发布于：" + parseInt(time / month) + "月前";
  } else if (time / week >= 1) {
      result = "发布于：" + parseInt(time / week) + "周前";
  } else if (time / day >= 1) {
      result = "发布于：" + parseInt(time / day) + "天前";
  } else if (time / hour >= 1) {
      result = "发布于：" + parseInt(time / hour) + "小时前";
  } else if (time / minute >= 1) {
      result = "发布于：" + parseInt(time / minute) + "分钟前";
  } else {
      result = "刚刚发布！";
  }
  return result;
}
getTimer("2020-04-20 15:06:36");


//map和原生对象的区别

//koa洋葱模型  compose实现
function compose() {
  // 递归函数
  let self = this;
  function dispatch(index) {
    // 异步实现
    // 如果所有中间件都执行完跳出，并返回一个 Promise
    if (index === self.middlewares.length) return Promise.resolve();

    // 取出第 index 个中间件并执行
    const route = self.middlewares[index];

    // 执行后返回成功态的 Promise
    return Promise.resolve(route(() => dispatch(index + 1)));
  }

  // 取出第一个中间件函数执行
  dispatch(0);
}

function compose (middleware) {
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


//实现一个eventEmitter（发布订阅）
class EventEmitter {
  constructor () {
    this.events = {};
  }
  // 订阅事件
  on (type, cb) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(cb);
  }
  // 发布事件
  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(cb => {
        cb(...args);
      });
    }
  }
  // 只执行一次
  once(type, cb) {
    const _this = this;
    function one() {
      cb.call(_this, arguments);
      _this.off(type, one);
    }
    this.on(type, one);
  }
  // 移除事件
  off(type, cb) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter(item => item != cb );
    }
  }
}
// 测试例子
var myEmitter = new EventEmitter();
myEmitter.on('study', function(data) {
  console.log(`学习${data}`);
});
myEmitter.on('eat', function(data) {
  console.log(`吃${data}`);
});
myEmitter.once('relax', function() {
  console.log('relax');
})
myEmitter.emit('study', 'javascript'); // => 学习javascript
myEmitter.emit('eat', '苹果'); // => 吃苹果
myEmitter.emit('relax'); // => relax
myEmitter.emit('relax'); // => undefined


//观察者模式
class Observer {
    constructor(cb) {
        if(!cb || typeof cb !== 'function') {
            throw new Error('Observer构造器必须传入函数类型');
            return;
        }
        this.cb = cb;
    }
    // 被目标对象通知时执行
    update() {
        this.cb();
    }
}

class Subject {
    // 维护观察者列表
    constructor(observer) {
        this.observerList = [];
    }
    // 添加一个观察者
    addObserver(observer) {
        this.observerList.push(observer);
    }
    // 通知所有观察者
    notify() {
        this.observerList.forEach(observer => {
            observer.update();
        })
    }
}

// 测试例子
const cbFun = function() {
    console.log('update');
}
const observer = new Observer(cbFun);
const subject = new Subject();
subject.addObserver(observer);
subject.notify(); // update




//使用setTimeout模拟setInterval
function _setInterval(fn, time) {
  function _inner() {
      fn();
      setTimeout(_inner, time);
  }
  _inner();
}
// 测试例子
_setInterval(function() {
    console.log(1);
}, 1000);



//使用promise实现ajax
function _ajax (url, method = "GET", data = null) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseTxt));
      } else {
        reject(xhr.responseText);
      }
    }
    xhr.open(method, url, true);
    if (method.toLowerCase() === "post") {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
    }
    xhr.send(data);
  })
}


/**
 * 实现setinterval用requestAnimation
 */
function setInterval(callback, interval) {
  let timer
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  const loop = () => {
    timer = window.requestAnimationFrame(loop)
    endTime = now()
    if (endTime - startTime >= interval) {
      startTime = endTime = now()
      callback(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}

let a = 0
setInterval(timer => {
  console.log(1)
  a++
  if (a === 3) cancelAnimationFrame(timer)
}, 1000)



//node的事件循环
//V8的垃圾回收机制


//options请求是为什么，node中如何解决options请求



//promise带延迟功能的链式调用
//维护异步队列
class People {
  constructor (name) {
    this.name = name ;
    this.queue = Promise.resolve() ;
    this.init() ;
  }

  init() {
    console.log(`hello, ${this.name}`) ;
  }

  sleep (time = 1) {
    this.queue = this.queue.then((res) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(res)
        }, time * 1000)
      })
    })
    return this ;
  }

  eat (food) {
    this.queue =this.queue.then((res) => {
      console.log(`${this.name} eat ${food}`);
    });
    return this ;
  }
}

//new People('whr').sleep(3).eat('apple').sleep(5).eat('durian');



//后序遍历
function pos(root) {
  if (root) {
    let stack1 = [];
    let stack2 = [];
    // 后序遍历是先左再右最后根
	// 所以对于一个栈来说，应该先 push 根节点
    // 然后 push 右节点，最后 push 左节点
    stack1.push(root);
    while (stack1.length > 0) {
      root = stack1.pop();
      stack2.push(root);
      if (root.left) {
        stack1.push(root.left);
      }
      if (root.right) {
        stack1.push(root.right);
      }
    }
    while (stack2.length > 0) {
      console.log(stack2.pop());
    }
  }
}


//斐波那契
function fib(n) {
  let array = new Array(n + 1).fill(null) ;
  array[0] = 0
  array[1] = 1
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2]
  }
  return array[n] ;
}
fib(10)






//lodash.get实现
const get = (obj, path = "", defaultValue = undefined) => {
  const paths = path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  let result = obj;
  for (let i = 0; i < paths.length; i++) {
    result = result ? result[paths[i]] : undefined;
    if (result == undefined) {
      return defaultValue;
    }
  }
  return result;
};


//链表反转
function reverse( linkedList ){
  var head = linkedList.head;
  // 如果只有一个节点 或者 是空链表
  if( head === null || head.next === null ){
    return;
  }
  var p = head;
  var q = p.next;
  // 反转后的头结点变成尾节点
  head.next = null;
  while(q){
    r = q.next;
    q.next = p;
    p = q;
    q = r;
  }
  // 退出循环后 r = q.next = null, q.next = q; p=q; q=null;
  // p指向原来节点的尾节点， 那么翻转后，尾节点变成头结点
  linkedList.head = p;
}

//LRU缓存机制(最近最少使用)
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.map = new Map();
  }

  get(key) {
    let val = this.map.get(key);
    if (val === undefined) return -1;

    this.map.delete(key); // 因为被用过一次，原有位置删除
    this.map.set(key, val); // 放入最下面表示最新使用
    return val;
  }

  put(key, val) {
    if (this.map.has(key)) this.map.delete(key); // 如果有，删除
    this.map.set(key, val); // 放到最下面表示最新使用

    if (this.map.size > this.capacity) {
      // 这里有个知识点
      //需要特别注意的是，Map 的遍历顺序就是插入顺序。
      // map的entries方法，还有keys方法(可以看mdn))，会返回一个迭代器
      // 迭代器调用next也是顺序返回，所以返回第一个的值就是最老的，找到并删除即可
      //基于ES6 Map中keys的有序性来实现
      // 一个Map对象在迭代时会根据对象中元素的插入顺序来进行
      // get操作
      // 如果元素存在，先delete再set, 元素便会置为最新使用；如果不存在，返回-1
      // put操作
      // 如果元素存在，先delete再set, 元素便会置为最新使用；
      // 如果容器超限，进行删除末尾元素操作，使用 Map{}.keys().next()得到迭代器的第一个元素，为使用时间最远的元素，进行删除
      this.map.delete(this.map.entries().next().value[0])
    }
  }
}



//字符串匹配，返回第一个不匹配的index
const func = (str) => {
  let temp = ["{", "(", "["] ;
  let obj= new Map() ;
  obj.set("{","}").set("(",")").set("[","]") ;
  let stack = [] ;
  

  for(let i = 0 ;i< str.length ;i++) {
    if(temp.includes(str[i])) {
      stack.push(str[i]) ;
    }else{
      let item = stack.pop() ;
      if(obj.has(item) && obj.get(item) === str[i]) {
        continue ;
      }else{
        return i ;
      }
    }
  }
  return  -1 ;
} 


//数组里面第K大的元素
const func = (arr, target) => {
  arr.sort((a, b) => b - a) ;
  let temp = new Set(arr) ;
  console.log(arr, temp);
  return [...temp][target - 1] ;
}



//最长公共前缀
const func = (arr) => {
  let temp = arr[0] ;
  let str = "" ;
  for(let i = 0 ;i < temp.length ;i ++) {
    str += temp[i] ;
    for(let j = 1 ; j < arr.length ; j ++) {
      if(arr[j].slice(0, i+1) !== str) {
        return arr[j].slice(0, i);
      }
    }
  }
}


//翻转二叉树
var invertTree = function(root) {
  if (root === null) {
      return null;
  }
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};


//有序数组绝对值最小的值
const func = (arr) => {
  if(arr.length === 1) return arr[0] ;
  let left = arr[0] , right = arr[arr.length -1] ;
  if(left * right < 0) {
    let temp = left >0 ? 1 : -1 ;
    for(let i = 0 ;i < arr.length ;i ++) {
      if(arr[i] * temp < 0) {
        return Math.abs(arr[i]) > Math.abs(arr[i-1]) ? Math.abs(arr[i-1]) : Math.abs(arr[i]) ;
      }
    }
  }else if(left * right > 0) {
    if(left > 0) {
      return left ;
    }else{
      return right ;
    }
  }else {
    if(left >  right) {
      return left ;
    }else{
      return right ;
    }
  }
}



//实现reduce
const reduce = (fn, initValue) => {
  let result = initValue ;
  for(let i =0 ;i < arr.length ;i ++) {
    if(initValue&& i==0) {
      result = fn(arr[0], arr[i], i,arr) ;
    }else{
      result = fn(result, arr[i], i, arr) ;
    }
  }
  return result ;
}



//只出现一次的数
const func = (arr) => {
  let obj = new Map() ;
  for(let i = 0 ;i < arr.length ;i ++) {
    if(obj.get(arr[i])) {
      obj.set(arr[i], obj.get(arr[i])+1);
    }
    else{
      obj.set(arr[i], 1);
    }
  }

  let result = [] ;
  console.log(obj);
  for(let i of obj) {
    console.log(i);
    if(i[1] == 1) {
      result.push(i[0]) ;
    }
  }
  return result ;
}


//[2,2,1,1,1,1,2,2]
//多数元素  大于[n /2 ]
const func = (arr) => {
  let len = arr.length ;
  let hash = new Map() ;
  for(let i = 0 ;i< len; i++) {
    if(hash.get(arr[i])) {
      hash.set(arr[i],hash.get(arr[i])+1) ;
      if(hash.get(arr[i]) > Math.floor(len/2)) {
        return arr[i] ;
      }
    }else{
      hash.set(arr[i], 1) ;
    }
  }
}


//[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]  target= 5, return true
//搜索二维矩阵
//找出规律，从右上角开始或者左下角开始
const func = (arr, target) => {
  let x = arr[0].length -1, xlen = arr[0].length
  let y = 0, ylen = arr.length ;//从零开始
  
  while(x>=0 &&y<ylen) {
    console.log("x:",x,"y:",y) ;
    if(target == arr[y][x]) {
      return true ;
    }else if(target > arr[y][x]) { //大于  往下找
      y++ ;
    }else if(target < arr[y][x]) { //小于  往左找
      x--;
    }
  }
  return false ;
}


//合并有序链表
var mergeTwoLists = function(l1, l2) {
  let current = new ListNode();
  const dummy = current;

  while (l1 || l2) {
    if (!l1) {
      current.next = l2;
      return dummy.next;
    } else if (!l2) {
      current.next = l1;
      return dummy.next;
    }

    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }

    current = current.next;
  }

  return dummy.next;
};




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


//实现compose函数，
// const compose = (a,b) =>
//(c) => a(b(c))

function compose() {
  let fns = [...arguments];

  return function() {
    let args = [...arguments];
    let result = fns.reduce((ret, fn) => {
      ret = fn.apply(this, ret);
      return Array.isArray(ret) ? ret : [ret];
    }, args);
    
    return result;
  }
}


class PromisePool {
  constructor(max, fn) {
    this.max = max; // 最大并发数
    this.fn = fn;   // 自定义的文件上传函数
    this.pool = []; // 并发池
    this.urls = []; // 剩余的请求地址
  }

  start(urls) {
    this.urls = urls;
    // 先循环把并发池塞满
    while (this.pool.length < this.max) {
      let url = this.urls.shift();
      this.setTask(url);
    }
    // 利用Promise.race 方法来获得并发池中某任务完成的信号
    let race = Promise.race(this.pool);
    return this.run(race);
  }

  run(race) {
    race
      .then(res => {
        // 每当并发池跑完一个任务，就再塞入一个任务
        let url = this.urls.shift();
        this.setTask(url);
        return this.run(Promise.race(this.pool));
      });
  }
  setTask(url) {
    if (!url) return;
    let task = this.fn(url);
    this.pool.push(task); // 将该任务推入pool并发池中
    console.log(`\x1B[43m ${url} 开始，当前并发数：${this.pool.length}`);
    task.then(res => {
      // 请求结束后将该Promise任务从并发池中移除
      this.pool.splice(this.pool.indexOf(task), 1);
      console.log(`\x1B[43m ${url} 结束，当前并发数：${this.pool.length}`);
    });
  }
}

// test
const URLS = [
  'bytedance.com',
  'tencent.com',
  'alibaba.com',
  'microsoft.com',
  'apple.com',
  'hulu.com',
  'amazon.com'
];

// 自定义请求函数
var requestFn = url => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`任务 ${url} 完成`);
    }, 1000)
  }).then(res => {
    console.log('完成 ', res);
  })
}

const pool = new PromisePool(3, requestFn); // 并发数为3
pool.start(URLS);









