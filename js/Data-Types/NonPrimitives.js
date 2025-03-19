//* I am just writing non primitives as well.
// ? I am checking the different behavior of object
const testing = {
  firstName: "SomeOne",
  "last name": "Whom",
  age: 15,
  isAlive: true,
};
// console.log(testing.firstName);
// console.log(testing["last name"]);
testing.location = "SomeWhere on Earth";
// console.log(testing);

const multipleItems = ["names", 1, 2, 3, true];
// console.log(multipleItems[1]);
const numberForTest = false;
console.log(Number(numberForTest));
