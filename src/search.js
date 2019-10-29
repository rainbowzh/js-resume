/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-29 19:41:20
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-10-29 19:41:57
 */
const bsearch = (A, x) => {
  let l = 0
  let r = A.length - 1
  let guess
  while (l <= r) {
    console.log('find')
    guess = Math.floor((l + r) / 2)
    if (A[guess] === x) return guess
    if (A[guess] > x) r = guess - 1
    else l = guess + 1
  }
  return -1
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(bsearch(arr, 6))