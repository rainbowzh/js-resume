/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-10 16:39:42
 * @LastEditors: zhouhong07
 * @LastEditTime: 2021-04-01 20:14:23
 */
import React , { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import './App.scss';

function debounce(fn, wait) {
  let timer ;
  return function(...args) {
      if(timer) {
        clearTimeout(timer) ;    
      }
      timer = setTimeout(() => {
        fn(...args) ;   
      }, wait) ;
  }
}


function useDebounce(fn, time) {
  return debounce(fn, time);
}




const App = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const handleClick = useDebounce(function() {
    console.count('click1')
    // setCounter1(counter1 + 1)
  }, 5000)
  useEffect(function() {
    const t = setInterval(() => {
      setCounter2(x => x + 1)
    }, 500);
    return clearInterval.bind(undefined, t)
  }, [])
  return <div style={{ padding: 30 }}>
    <button
      onClick={function() {
        handleClick()
      }}
    >click</button>
    <div>{counter1}</div>
    <div>{counter2}</div>
  </div>
}

export default App ;