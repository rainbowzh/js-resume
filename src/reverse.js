/*
 * @Description: 链表反转
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-08-10 10:38:51
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-10 10:43:54
 */

/**
 * In : 1->2->3->4->null
 * Out: 4->3->2->1->null
 */
var reverseList = function(head) {
  if(!head || !head.next) return head ;
  var prev = null, curr = head ;
  while(curr) {
      // 用于临时存储 curr 后继节点
      var next = curr.next ;
      // 反转 curr 的后继指针
      curr.next = prev ;
      // 变更prev、curr 
      // 待反转节点指向下一个节点 
      prev = curr ;
      curr = next ;
  }
  head = prev ;
  return head ;
};
