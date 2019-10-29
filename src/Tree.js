/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-29 15:02:11
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-10-29 15:05:26
 */
let tree = {
  "id": 0,
  "name": "root",
  "left": {
      "id": 1,
      "name": "Simon",
      "left": {
          "id": 3,
          "name": "Carl",
          "left": {
              "id": 7,
              "name": "Lee",
              "left": {
                  "id": 11,
                  "name": "Fate"
              }
          },
          "right": {
              "id": 8,
              "name": "Annie",
              "left": {
                  "id": 12,
                  "name": "Saber"
              }
          }
      },
      "right": {
          "id": 4,
          "name": "Tony",
          "left": {
              "id": 9,
              "name": "Candy"
          }
      }
  },
  "right": {
      "id": 2,
      "name": "right",
      "left": {
          "id": 5,
          "name": "Carl",
      },
      "right": {
          "id": 6,
          "name": "Carl",
          "right": {
              "id": 10,
              "name": "Kai"
          }        
      }
  }
}
let arrD= [];
// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR(obj) {
  arrD.push(obj.id);
  console.log(obj.id);
  if(obj.left){
    getListWithDLR(obj.left);
  }
  if(obj.right){
    getListWithDLR(obj.right);
  }
}
getListWithDLR(tree);
console.log("arr",arrD.length);