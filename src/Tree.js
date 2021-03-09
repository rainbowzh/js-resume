const { RuleTester } = require("eslint");

/*
 * @Description: 二叉树遍历/翻转/对称二叉树
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-29 15:02:11
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-11-04 14:14:32
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


//翻转二叉树
var invertTree = function(root) {
  if (root !== null) {
    var temp = root.left;
    root.left = root.right;
    root.right = temp;
    invertTree(root.left); 
    invertTree(root.right);
  }
  return root;
};

// 前序遍历
const preorderTraversal = (root) => {
    const list = [];
    const stack = [];//存储根节点
    
    // 当根节点不为空的时候，将根节点入栈
    if(root) stack.push(root)
    while(stack.length > 0) {
        const curNode = stack.pop() ;
        // 第一步的时候，先访问的是根节点
        list.push(curNode.val) ;
        
        // 我们先打印左子树，然后右子树
        // 所以先加入栈的是右子树，然后左子树
        if(curNode.right !== null) {
            stack.push(curNode.right) ;
        }
        if(curNode.left !== null) {
            stack.push(curNode.left) ;
        }
    }
    return list
}

//前序遍历
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

//中序遍历
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


//层序遍历
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



//
