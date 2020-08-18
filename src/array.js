/*
 * @Description: some demo about array
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-11-18 14:10:45
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-13 11:34:16
 */



/**
 * 数组扁平化
 */
//reduce函数迭代
let flatten = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  })
}
//扩展运算符
//只要有一个元素有数组，那么循环继续
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
}

/**
 * @description: 数组乱序/洗牌算法（就是随机抽一个放到最后。把剩余的数继续抽，继续放到最后。。。。依次执行）
 * @param {type} 
 * @return: 
 * @author: zhouhong07
 */

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



