/*
 * @Description: jsonp实现
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-13 11:21:03
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-13 15:43:13
 */ 

//myjsonp
let myjsonp = function (url, callback="jsonpCallback") {
  let Url = url + callback ;
  let scriptBody = document.createElement('script') ;
  scriptBody.src = Url ;

  document.body.appendChild(scriptBody) ;

  return new ((resolve, reject) => {
    window[callback] = (data) => {
       try{
        resolve(data)
      }catch(e) {
        reject(e)
      } finally {
        scriptBody.parentNode.removeChild(scriptBody) ;
        console.log(scriptBody);
      }
    }
  })
}



// 动态的加载js文件
let jsonp = function (url, data = {}, callback) {
  // 转化数据为url字符串形式
  let dataStr = url.indexOf('?') === -1 ? '?' : '&'
  for(let key in data) {
    dataStr += `${key}=${data[key]}&`
  }
  // 处理url中的回调函数
  let cb_name = 'jsonpCallback'
  dataStr += 'callback=' + cb_name
  // 创建srcipt标签并添加src属性值
  let scriptBody = document.createElement('script')
  scriptBody.src = url + dataStr
  // 在全局对象上挂载回调函数
  window[cb_name] = function(data) {
    callback(data)
    document.body.removeChild(scriptBody)
  }
  // append到页面中 添加到页面就立刻发起请求
  document.body.appendChild(scriptBody)
}


//进行优化
let jsonp = function (url, data = {}, callback='callback') {
  // 转化数据为url字符串形式
  let dataStr = url.indexOf('?') === -1 ? '?' : '&'
  for(let key in data) {
    dataStr += `${key}=${data[key]}&`
  }
  // 处理url中的回调函数
  dataStr += 'callback=' + callback
  // 创建srcipt标签并添加src属性值
  let scriptBody = document.createElement('script')
  scriptBody.src = url + dataStr
 
  // append到页面中 添加到页面就立刻发起请求
  document.body.appendChild(scriptBody)
  //返回一个
  return new ((resolve, reject) => {
    window[callback] = (data) => {
      try {
        resolve(data)
      } catch(e) {
        reject(e)
      } finally {
        // 移除script元素
        scriptBody.parentNode.removeChild(scriptBody)
        console.log(scriptBody)
      }
    }
  })
}


