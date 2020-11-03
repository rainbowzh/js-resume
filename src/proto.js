/*
 * @Description: 寄生组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性。
 寄生式组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-09-02 11:12:40
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-09-02 11:14:44
 */
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
  console.log("My name is " + this.name + ".");
};

function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayMyGrade = function() {
  console.log("My grade is " + this.grade + ".");
  
};
