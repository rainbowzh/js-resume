const midTree = (root) => {
  if(!root) return [] ;
  let stack = [] ;
  let node = [root] ;
  let result = [] ;

  while(node || stack.length) {
    while(node) {
      stack.push(node.left) ;
      node = node.left ;
    }
    node = stack.pop() ;
    result.push(node.val)  ;
    node = node.right ;
  }
}

const preTree = (root) => {
  if(!root) return [] ;
  let stack = [root] ;
  let result = [] ;
  while(stack.length) {
    let node = stack.pop() ;
    result.push(node.val) ;
    if(node.right) {
      stack.push(node.right) ;
    }
    if(node.left){
      stack.push(node.left) ;
    }
  }

  return result ;
}

const deepClone = (source, hash = new WeakMap()) => {
  if(!source) return null;
  if(typeof source !== 'object') return source ;
  if(source instanceof Date) return new Date(source) ;
  if(source instanceof RegExp) return new RegExp(source) ;
  if(hash.has(source)) return hash.get(source) ;

  let clone = new source.contructor ;
  hash.set(source, clone) ;

  for(let i in source) {
    if(hash.hasOwnProperty(source[i])) {
      clone[i] = deepClone(source[i], hash);
    }
  }

  return clone;
}


const curry = (fn) => {
  let argsArr = [] ;
  let temp = (...args) => {
    if(args.length > 0) {
      argsArr.concat(...args) ;
      return temp ;
    }else{
      return fn(...alertrgsArr) ;
    }
  }
  return temp ;
}


const addObj = (arrObj) => {
  return arrObj.reduce((pre, cur) => {
    for(let i in cur) {
      if(cur.hasOwnProperty(i)) {
        pre[i] = cur[i] ;
      }
    }
  },{}) ;
}


const sleep = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(1) ;
      } catch (error) {
        reject(error);
      }
    },delay)
  })
}


//输入一个日期 返回几秒前 几天前或者几月前
function getTimer(stringTime) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var month = day * 30;
  var time1 = new Date().getTime();//当前的时间戳
  console.log(time1);
  var time2 = Date.parse(new Date(stringTime));//指定时间的时间戳
  console.log(time2);
  var time = time1 - time2;

  var result = null;
  if (time < 0) {
      alert("设置的时间不能早于当前时间！");
  } else if (time / month >= 1) {
      result = "发布于：" + parseInt(time / month) + "月前";
  } else if (time / week >= 1) {
      result = "发布于：" + parseInt(time / week) + "周前";
  } else if (time / day >= 1) {
      result = "发布于：" + parseInt(time / day) + "天前";
  } else if (time / hour >= 1) {
      result = "发布于：" + parseInt(time / hour) + "小时前";
  } else if (time / minute >= 1) {
      result = "发布于：" + parseInt(time / minute) + "分钟前";
  } else {
      result = "刚刚发布！";
  }
  return result;
}
getTimer("2020-04-20 15:06:36");


//map和原生对象的区别

//koa洋葱模型  compose实现
function compose() {
  // 递归函数
  let self = this;
  function dispatch(index) {
    // 异步实现
    // 如果所有中间件都执行完跳出，并返回一个 Promise
    if (index === self.middlewares.length) return Promise.resolve();

    // 取出第 index 个中间件并执行
    const route = self.middlewares[index];

    // 执行后返回成功态的 Promise
    return Promise.resolve(route(() => dispatch(index + 1)));
  }

  // 取出第一个中间件函数执行
  dispatch(0);
}


//实现一个eventEmitter
class EventEmitter {
  constructor () {
    super()
    this.events = {}
    this.onceEvents = {}  
  }

  on (type, cb) {
    if (!type || !cb) {
      return false
    }
    this.events[type] = this.events[type] || []
    this.events[type].push(cb)
  }
  
  emit (type) {
    if (!type) {
      return false
    }
    this.events[type] && this.events[type].forEach(eventCb => {
      eventCb.apply(this, [...arguments].slice(1))
    })
    this.onceEvents[type] && this.onceEvents[type].forEach(eventCb => {
      eventCb.apply(this, [...arguments].slice(1))
    })
    delete this.onceEvents[type]
  }

  off (type) {
    if (!type) {
      return false
    }
    delete this.events[type]
    delete this.onceEvents[type]
  }

  once (type, cb) {
    if (!type || !cb) {
      return false
    }
    this.onceEvents[type] = this.onceEvents[type] || []
    this.onceEvents[type].push(cb)
  }
}





