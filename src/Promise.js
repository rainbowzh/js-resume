/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2019-10-29 10:30:07
 * @LastEditors: zhouhong07
 * @LastEditTime: 2019-10-29 19:50:27
 */
class Promise {
 constructor(fn) {
   this.status = 'Pending'
   setTimeout(() => {
     fn((data) => {
       this.resolve(data)
     }, (error) => {
       this.reject(error)
     })
   })
 }
 
 resolve(data) {
   if (this.status === 'Pending') {
     this.success(data)
     this.status = 'Fulfilled'
   }
 }

 reject(error) {
   if (this.status === 'Pending') {
     this.error(error)
     this.status = 'Rejected'
   }
 }

 then(success, error) {
   this.success = success
   this.error = error
 }
}

let p1 = new Promise((resolve, reject) => {
 // reject('hello error');
 setTimeout(() => {
   resolve('hello promise')
 }, 1000)
})

p1.then((data) => console.log(data), (err) => console.log(err))

