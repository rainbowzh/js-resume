/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-10 16:39:42
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-21 14:17:02
 */
import React , { useEffect, useReducer } from 'react';
import './App.scss';





function App() {
  const [state , setState] = useReducer(reducer, {count : initialCount}) ;

  
  return (
    <div className="App">
      {
        [1,2,3].map((item, index) => {
          return <span key={index} onClick={() => dispatch({type : item})}>{item}</span>
        })
      }
    </div>
  );
}

export default App;
