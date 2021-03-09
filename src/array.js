/*
 * @Description: some demo about array
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-11-18 14:10:45
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-12-17 15:23:08
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
//递归
const flatten = (arr) =>{
	let res = [];
	arr.map(item => {
		if(Array.isArray(item)) {
			res = res.concat(flatten(item));
		} else {
			res.push(item);
		}
	});
	return res;
}
//拓展运算符
[].concat(...[1, 2, 3, [4, 5]]) ;

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

/**
 * @description: 合并区间[[1,3],[2,4],[10,12]] => [[1,4],[10.12]] ;
 * @param {type} 
 * @return {type} 
 * @author: zhouhong07
 */
const merge = (arr) => {
	//排序
	arr.sort(function(a,b){
		if(a[0] != b[0]){
			return a[0]-b[0]
		}
		return a[1] - b[1] ;
	})
	let ans = [], start, end;
	//排序之后，看看有没有重叠的，如果有，合并
	for(let i=0;i<arr.length;i++){
		let s = arr[i][0], e = arr[i][1];
		if(start === undefined){
			start = s, end = e;//第一次进入循环
		}else if(s <= end){
			end = Math.max(e, end) ;
		}else{
			let part = [start, end];
			ans.push(part)
			start = s;
			end = e ;
		}
	}
	console.log('---',start,end);
	if(start !== undefined){
		let part = [start, end] ;
		ans.push(part) ;
	}
	
	return ans ;
}


//z字转换
var convert = (s, numRows) => {
	if(numRows == 1 || s.length == numRows)
		return s;
	
	// let len = Math.min(s.length(), numRows);
	let len = numRows ;
	let rows = new Array(len).fill('');
	for(let i = 0; i< len; i++) rows[i] = "";
	let loc = 0;
	let down = false;

	for(let i=0;i<s.length;i++) {
		rows[loc] += s.substring(i,i+1);
		if(loc == 0 || loc == numRows - 1) {
			down = !down;
		}
		loc += down ? 1 : -1;
	}
	
	let ans = "";
	for(let i in rows) {
		ans += rows[i];
	}
	return ans ;
};


