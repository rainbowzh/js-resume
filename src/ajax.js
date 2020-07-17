/*
 * @Description: 原生ajax
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-07-13 10:37:16
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-07-14 14:19:55
 */ 

function _ajax (url, method = "GET", data = null) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      success(JSON.parse(xhr.responseTxt));
    } else {
      fail(xhr.responseTxt) 
    }
  }
  xhr.open(method, url, true);
  if(method.toLowerCase() == 'post') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
  }
  xhr.send(data);
}
function success(data) {
  console.log(data);
}
function fail(err) {
  console.log(err);
}



//将原生的封装成promise

const ajax = (url, method, async, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      // 已经接收到全部响应数据，而且已经可以在客户端使用了
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status > 400) {
          reject('发生错误')
        }
      }
    }
    xhr.open(url, method, async)
    xhr.send(data || null)
  })
}
