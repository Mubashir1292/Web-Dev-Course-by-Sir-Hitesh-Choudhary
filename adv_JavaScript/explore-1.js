//! Practising the Asynchronous behavior of JavaScript
console.log("first console log is here");
setTimeout(() => {
  console.log("seTimeout function is here");
}, 3000);
for (let index = 0; index < 10; index++) {
  console.log(index);
}
//* firstly the functions goto the call stack and if the call stack have time related functions then it will send all the time related functions to the browser or the environment like Node/bun and then browser will send these time functions to the event loop queues, after that event loop will executes the time functions and try to clean the call stack.
