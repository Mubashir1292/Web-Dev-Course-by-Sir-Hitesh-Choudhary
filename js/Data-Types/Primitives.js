let balance = 120;
let anotherBalance = new Number(230);
console.log(balance);
console.log(`Balance :${balance} - Balance Type :${typeof balance}`);
console.log(
  `Another Balance : ${anotherBalance.valueOf()} - Another Balance Type :${typeof anotherBalance}`
);
let sm1 = Symbol();
let sm2 = Symbol();
console.log(`sm1 == sm2 ${sm1 == sm2}`);
