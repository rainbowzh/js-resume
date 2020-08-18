/*
 * @Description: 实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-08-13 11:02:35
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-13 11:27:04
 */
class TrieNode {
  //可以看到，节点本身不存储字符，字符是保存在next对象中的 key 中。直观来看，字符是保存在节点之间的连线上的。
  constructor(){
    this.next = {} ;//next[i]保存着下一个字符i的节点引用
    this.isEnd = false ;//当前节点是否可以作为一个单词的结束位置
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode() ;
  }
  insert(word){
    if(!word) {
      return false ;
    }
    let node = this.root ;
    for (let i = 0; i < word.length; ++i) {
      if (!node.next[word[i]]) {
        node.next[word[i]] = new TrieNode();
      }
      node = node.next[word[i]];
    }
    node.isEnd = true;
    return true;
  }
  search(word) {
    if (!word) return false;

    let node = this.root;
    for (let i = 0; i < word.length; ++i) {
      if (node.next[word[i]]) {
        node = node.next[word[i]];
      } else {
        return false;
      }
    }
    return node.isEnd;
  }
  startWith (prefix) {
    if (!prefix) return true;

    let node = this.root;
    for (let i = 0; i < prefix.length; ++i) {
      if (node.next[prefix[i]]) {
        node = node.next[prefix[i]];
      } else {
        return false;
      }
    }
    return true;
  }
}