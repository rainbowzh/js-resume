/*
 * @Description: 有效的括号
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-08-10 11:01:04
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-10 11:01:59
 */
let map: any = {
    '{' : '}',
    '(' : ')',
    '[' : ']'
}

function isValid(s: string): boolean {
  let stack: string[] = [];
  let top: string | undefined;

  for(let char of s){
      let value;
      if((value = map[char])){
          stack.push(value);
      }else{
          top = stack.pop();
          if(top !== char){
              return false;
          }
      }
  }

  return !stack.length;
}
