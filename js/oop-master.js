//! In this file We are just explaining the OOP Concepts
// Encapsulation
// Inheritance
// Polymorphism
// Abstraction
//! Firstly we have to focus on the functional constructors, How it works and what is the difference between constructor and Classes...
function Animal(type) {
  this.type = type;
}
Animal.prototype.speak = function () {
  return `${this.type} makes a sound`;
};
// console.group(Animal.speak);
Array.prototype.Iteration = function () {
  return `Custom method ${this}`;
};
let randomArray = [1, 2, 3, 4, 5, 6, 2, 3];
// console.log(randomArray.Iteration());
// ! Classes
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  start() {
    return `${this.make} company launched this ${this.model} model`;
  }
}
class car extends Vehicle {
  drive() {
    return `${this.model} is a model of ${this.make}`;
  }
}
const myOwnCar = new car("Toyota", "Corolla");
// console.log(myOwnCar.start());
// console.log(myOwnCar.drive());
//? Some Encapsulation
class BankAccount {
  #Balance = 0;
  constructor() {}
  deposit(amount) {
    this.#Balance += amount;
    return `Amount is deposited Successfully, Now Current Balance is ${
      this.#Balance
    }`;
  }
  withdraw(amount) {
    if (amount < this.#Balance) {
      this.#Balance -= amount;
      return `Amount ${amount} is withdrawn successfully,Now Current Balance is ${
        this.#Balance
      }`;
    } else {
      return `Please Choose less Amount`;
    }
  }
  getBalance() {
    return `Your Current Balance is ${this.#Balance}`;
  }
}
let myOwnBankAccount = new BankAccount();
// console.log(myOwnBankAccount.getBalance());
//? Abstraction
class cafeteria {
  start() {
    // do some operations
    return `Making Coffee...`;
  }
  serve() {
    // bringing the coffee from chicken
    return `Delivering Coffee`;
  }
  completeProcessWithCoffee() {
    let makingCoffee = this.start();
    let deliverCoffee = this.serve();
    return `${makingCoffee} & ${deliverCoffee}`;
  }
}
let myOwnCafeteria = new cafeteria();
// console.log(myOwnCafeteria.completeProcessWithCoffee());
//** */ Polymorphism**
//? using same name but different use cases
class bird {
  fly() {
    return `I am Flying...`;
  }
}
class penguin extends bird {
  fly() {
    return `Penguin can't fly....`;
  }
}
class sparrow extends penguin {}
const sampleBird = new sparrow();
// console.log(sampleBird.fly());

class Calculator {
  static Addition(a, b) {
    return a + b;
  }
  static Subtraction(a, b) {
    return a - b;
  }
  Multiplication(a, b) {
    return a * b;
  }
}
const calcu = new Calculator();
console.log(`Adding 9 and 0 ${Calculator.Addition(9, 0)}`);
console.log(`Subtraction 3 and 4 ${Calculator.Subtraction(3, 4)}`);
console.log(`Trying Multiplication 4 and 5 ${calcu.Multiplication(4, 5)}`);
