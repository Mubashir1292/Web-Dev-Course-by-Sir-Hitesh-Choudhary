let changeButton = document.querySelector("#button1");
let paragraphText = document.querySelector("#my-paragraph");
//! One Important thing in it for the this concept in the function like first is the local level and second this is for the global level
changeButton.addEventListener("click", () => {
  //   console.log(this);
  //* this `This` will return window object cause we are using the arrow function
  paragraphText.innerHTML = "Text Changed";
});
changeButton.addEventListener("click", function () {
  //   console.log(this);
});
//!----------------- second Example
let completeList = document.querySelector(".listItemToHighLight");
let highLightButton = document.querySelector("#highlightButton");
highLightButton.addEventListener("click", () => {
  completeList.firstElementChild.classList.add("highLightSomething");
});
