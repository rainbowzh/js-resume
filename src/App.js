/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-10 16:39:42
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-21 11:20:27
 */
import React , { useEffect } from 'react';
import './App.scss';




function App() {
  useEffect(() => {
  //最长公共前缀
  const maxStr = (strs)  => {
    if (strs.length===0 ||strs[0].length===0){return "";}
    var str=strs[0];
    for (let i=1,len=strs.length;i<len;i++){
        while(strs[i].indexOf(str)!==0) {
            if (str.length === 0) {return "";}
            str = str.substring(0, str.length - 1);
        }
    }return str;
  }
  // maxStr(["aa","a"]);
  maxStr(["flower","flow","flight"]);
  
  const s = () => {
    let nums = [-4, -1, -1, 0, 1, 2];
  }
  },[]) ;



  
  return (
    <div className="App">
    
    </div>
  );
}

export default App;
