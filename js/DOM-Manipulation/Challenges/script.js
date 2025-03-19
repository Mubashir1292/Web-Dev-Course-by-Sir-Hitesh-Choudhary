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
// Question 5
//? List Items
let listItems = document.querySelector(".listItemToHighLight");
document.getElementById("removeLastItem").addEventListener("click", () => {
  if (listItems.childElementCount > 0) {
    listItems.lastElementChild.remove();
  } else {
    console.log("No Items in List");
  }
});
// Question 7 //! Event Delegation
document.getElementById("teaList").addEventListener("click", function (event) {
  if (event.target && event.target.matches(".teaItem")) {
    alert(`You just triggered ${event.target.textContent}`);
  }
});
