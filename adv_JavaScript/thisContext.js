let person = {
  name: "SomeOne",
  greet() {
    console.log(`Hi,I am ${this.name}`);
  },
};
person.greet();
// ! on the upside line it works fine like the this keyword
const greetFunction = person.greet;
// ? firstly we were just calling the person's function so now we just passing the signature of the function
greetFunction();

const boundGreet = person.greet.bind({ name: "John Doe" });
boundGreet();
