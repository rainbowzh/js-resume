class LRUCache {
  constructor(limit) {
    this.limit = limit ;
    this.map = new Map();  
  }

  get(key) {
    let item = this.map.get(key) ;
    if(item) {
      this.map.delete(key) ;
      this.map.set(key, item) ;
      return item ;
    }
    return  -1 ;
  }

  put(key, value) {
    this.map.delete(key) ;
    this.map.set(key, value) ;
    if(this.map.size > this.limit) {
      this.map.delete(this.map.entries().next().value[0]) ;
    }
  }
}


class PromiseLimit {
  constructor(limit, fn) {
    this.limit = limit ;
    this.fn = fn  ;
    this.pool = [] ;
    this.urls = [];
  }


  start(urls) {
    this.urls = [].concat(urls);
    while(this.pool.length < this.limit) {
      let url = this.urls.shift() ;
      this.setTask(url) ;
    }
    
    let race = Promise.race(this.pool) ;
    return this.run(race) ;
  }


  setTask(url) {
    if(!url) return ;
    let item = this.fn(url) ;
    this.pool.push(item) ;
    item.then(() => {
      this.pool.splice(this.pool.indexOf(item), 1) ;
    })

  }

  run(race) {
    race.then(() => {
      let url = this.urls.shift() ;
      this.setTask(url) ;
      return this.run(Promise.race(this.pool)) ;
    })
  }
}


function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let count = 0 ;
    let len = promises.length ;
    let result = new Array(len) ;

    for(let i = 0 ;i< len; i++) {
      Promise.resolve(i).then((res) => {
        result[i] = res ;
        count ++ ;
        if(count === len) {
          return resolve(result) ;
        }
      },(err) => {
        return reject(err) ;
      })
    }
  });
}

class EventEmitter {
  constructor() {
    this.events = {} ;
  }


  on(type, cb) {
    if(!this.events[type]) {
      this.events[type] = [] ;
    }
    this.events[type].push(cb) ;
  }


  emit(type) {
    if(this.events[type]){
      this.events[type].forEach(ele => ele()) ;
    }
  }

  once(type, cb) {
    this.on(type, one) ;
    let self = this ;
    function one() {
      cb.apply(self);
      self.off(type, cb) ;
    }
  }

  off(type, cb) {
    if(this.events[type]) {
      this.events[type] = this.events[type].filter(item => item !== cb) ;
    }
  }
}



