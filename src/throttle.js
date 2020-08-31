/*
 * @Description: 节流和防抖
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-29 19:47:50
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-26 19:57:58
 */
let throttle = (fn, delay = 50) => { // 节流 控制执行间隔时间 防止频繁触发 scroll resize mousemove
    let stattime = 0;
    return function (...args) {
        let curTime = new Date();
        if (curTime - stattime >= delay) {
            fn.apply(this, args);
            stattime = curTime;
        }
    }
}

//节流 react-hook版本
function useThrottle(fn, delay, dep = []) {
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


//防抖 react-hook版本
function useDebounce(fn, delay, dep = []) {
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

//最长回文子串
var longestPalindrome = function(s) {
  // babad
  // tag : dp
  if (!s || s.length === 0) return "";
  let res = s[0];

  const dp = [];

  // 倒着遍历简化操作， 这么做的原因是dp[i][..]依赖于dp[i + 1][..]
  for (let i = s.length - 1; i >= 0; i--) {
    dp[i] = [];
    for (let j = i; j < s.length; j++) {
      if (j - i === 0) dp[i][j] = true;
      // specail case 1
      else if (j - i === 1 && s[i] === s[j]) dp[i][j] = true;
      // specail case 2
      else if (s[i] === s[j] && dp[i + 1][j - 1]) {
        // state transition
        dp[i][j] = true;
      }

      if (dp[i][j] && j - i + 1 > res.length) {
        // update res
        res = s.slice(i, j + 1);
      }
    }
  }

  return res;
};


//数字全排列 
//看做树形结构 dfs回溯
const permute = (nums) => {
  const res = [];
  const used = {};
  dfs([]);
  function dfs(path) {
    if (path.length == nums.length) {
      res.push(path.slice());
      return;
    }
    for (const num of nums) {
      // if (path.includes(num)) continue; // 查找的时间是O(n)，这么写增加了时间复杂度
      if (used[num]) continue;
      path.push(num);
      used[num] = true;
      dfs(path);
      path.pop();
      used[num] = false;
    }
  }
  return res;
};

export default throttle ;