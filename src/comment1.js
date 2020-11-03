/*
 * @Description: 双指针总结（快慢指针，碰撞指针，滑动窗口）
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-10-10 10:13:08
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-10-24 12:38:46
 */


/**
 * 快慢指针
 */
//(1)
//计算链表中的中点：
//快慢指针从头节点出发，每轮迭代中，快指针向前移动两个节点
//，慢指针向前移动一个节点，最终当快指针到达终点的时候，慢指针刚好在中间的节点。

const Middle = (root) => {
  if(!root) return null ;
  let fast = root ;
  let slow = root ;
  if (root == null || root.next == null) {
    return root;
  }
  while(fast.next != null && fast.next !== null) {
    fast = fast.next.next ;
    slow = slow.next ;
  }
  return slow;
}


//(2)
//判断链表中是否有环
//当链表中存在环时，两个指针最终会在环中相遇
const circile = (root) => {
  let fast = root , slow = root ;
  if(root == null || root.next == null) {
    return false ;
  }
  while(slow.next != null && fast.next.next != null) {
    slow = slow.next ;
    fast = fast.next ;
    if(slow == fast) {
      return true ;
    }
  }
}


//(3)
//判断链表是否有环并找出环的入口
//从链表开始到入口的距离 == fast和slow的相遇点到入口的距离
const entry = (root) => {
  let fast = root , slow = root ;
  if(root == null || root.next == null) {
    return false ;
  }
  while(slow.next != null && fast.next.next != null) {
    slow = slow.next ;
    fast = fast.next ;
    if(slow == fast) {
      break ;
    }
  }
  let temp1 = root , temp2 = slow ;
  while(temp1 !== temp2) {
    temp1 = temp1.next ;
    temp2 = slow.next ;
  }
  return temp1;
}


//(4)
//判断单链表是否有环，并求出环上的节点
const nums = (root) => {
  let fast = root , slow = root ;
  if(root == null || root.next == null) {
    return false ;
  }
  while(slow.next != null && fast.next.next != null) {
    slow = slow.next ;
    fast = fast.next ;
    if(slow == fast) {
      break ;
    }
  }
  let temp = slow.next ; let num = 1 ;
  while(temp !== slow) {
    temp = slow.next ;
    num ++ ;
  }
}


//(5)
//如果存在环，求链表的长度
//头部到入口的距离 + 环节点的个数

//（6）
//求出环上任意一个节点最远的点
//slow和fast都指向ptr0，每一步都执行与上面相同的操作（slow每次跳一步，fast每次跳两步），
//当fast = ptr0或者fast = prt0->next的时候slow所指向的节点就是ptr0的”对面节点“。
const long = (prt) => {
  let slow = prt ,fast = ptr ;
  while(fast.next !== null && fast.next.next !== null) {
    fast = fast.next.next ;
    slow = slow.next ;
    if(fast == prt  || fast == prt.next){ //奇数环偶数环
      return slow ;
    }
  }
}

//(7)
//求出两个单链表是否相交
//那么我们可以让其中一个链表（不妨设是listA）的为节点连接到其头部，
//这样在listB中就一定会出现一个环。

const mix = (list1, list2) => {
  while(true) {
    if(list1.next == null) {
      list1.next = list2 ;
      break;
    }
  }

  let slow = list1 , fast = list1 ;
  while(fast.next !== null && fast.next.next !== null) {
    fast = fast.next.next ;
    slow = slow.next ;
    if(slow == fast) {
      return true;
    }
  }
  return false;
}


//求链表的倒数第K个元素
const getK = (list,  k) => {
  let fast = list, slow = list ;
  while(k > 0 && fast !=null && fast.next != null) {
    fast = fast.next ;
    k -- ;
  }

  while(true){
    if(fast.next == null) {
      return slow ;
    }
    fast = fast.next ;
    slow = slow.next ;
  }

}

/**
 * 碰撞指针（一般都是排好序的数组或链表）
 */

//(1)
//二分查找问题
const search = (list , target) => {
  if(list.length == 0) return -1 ;
  let left = 0 , right = list.length ;
  while(left <  right) {
    let mid = Math.floor(left + right) / 2;
    if (list[mid] == target) {
      right = mid;
    } else if (list[mid] < target) {
      left = mid + 1;
    } else if (list[mid] > target) {
      right = mid; // 注意
    }
  }
  return left ;
}

//一个数的平方根
const mathSearch = (num) => {
  let right = Math.floor(num / 2) ;
  let left = 0;
  let result = [] ;
  while(left <  right) {
    let mid = Math.floor( (left + right) /2) ;
    let res = mid * mid ;
    if(res == num) {
      result.push(mid, -mid) ;
    }
    if(res > left) {
      left = res ;
    }
    if(res < left) {
      right = res ; 
    }
  }
}



//(2)
//N数之和问题
//hashMap和碰撞双指针
//--1 hashMap
const twoSum = (list , target) => {
  let temp = {} ;
  for(let i = 0; i< list.length ; i++) {
    temp[list[i]] = i ;
  };
  for(let i of temp) {
    let res = target - i ;
    if((res != i) && temp[res]) {
      return [temp[i], temp[res]] ;
    }
  }
}
//使用碰撞指针
const TwoSum = (list, target) => {
  //先排序，成有序数组，假设list已经成为有序数组
  let left = 0, right = list.length - 1 ;
  while(left <  right) {
    let sum = list[left] + list[right] ;
    if(sum == target) {
      return [left, right] ;
    }
    if(sum < target) {
      left ++ ;
    }
    if(sum > target) {
      right -- ;
    }
  }
}

//反转数组
const reverse = (list) => {
  let left = 0 ,right = list.length -1 ;
  while(left < right) {
    let temp = list[left] ;
    list[left] = list[right] ;
    list[right] = temp ;
    left++ ;
    right-- ;
  }
  return list ;
}




/**
 * 滑动窗口法(计算窗口中元素的问题)
 */

//(1)字符串匹配问题
//(2)子数组问题
//(3)最小覆盖子串
//(4)字符串排列
//(5)找到字符串中的所有字母的以为词
//(6)无重复最长子串

//(1)字符串匹配


//(2)
/**
 * 输入: s = 7, nums = [2,3,1,2,4,3]
输出: 2
解释: 子数组 [4,3] 是该条件下 >= s 的长度最小的连续子数组。
 */

const minLen = (s, arr) => {
  if(arr.length == 0) return 0;
  if((arr.length == 1) && (arr[0] == s)) return 1 ;
  let left = 0 , right = 1 , res ;
  while(left <  right){
    let result = 0 ;
    for(let i = left ;i < right ; i++) {
      result += arr[i] ;
    }
    if(result < s) {
      right ++ ;
      if(right > arr.length) break ;
    }else{
      let templen = right - left ;
      res = res ? Math.min(res , templen) : templen ;
      if(templen == 1) break;
      left ++; 
    }
  }
  return res; 
}



//(3)
const minStr = (str, target) => {
  let left = 0 ,right = 1 ;
  let res;
  while(right > str.length) {
    let temp = str.slice(left, right) ;
    let include = true ;
    for(let i = 0 ;i< target.length ;i ++) {
      include =  temp.includes(target[i]) ? temp.includes(target[i])&include : false ;
    }
    if(!include) {
      right = right > str.length ? str.length :  right ++ ;
    }
    if(include) {
      if(res) {
        res = res.length > (right - left) ? str.slice(left, right) : res;
      }else{
        res = str.slice(left, right) ;
      }
      left ++ ;
    }
  }
  return res ;
}

//(4)判断一个串是否包含另外一个字符串的排列
const judge = (s1, s2) => {
  if(s2.length < s1.length) return false ;
  let left = 0 ,right = s1.length - 1 ;
  while(true) {
    
  }
}

