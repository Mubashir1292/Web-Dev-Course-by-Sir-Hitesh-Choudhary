"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // getting the button clicker
  const submitButton = document.getElementById("submit");
  // getting the input field
  let input = document.getElementById("item");
  //* creating the array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  reloadTasks();

  submitButton.addEventListener("click", () => {
    const inputText = input.value.trim();
    if (inputText === "") return;
    const newListItem = {
      id: Date.now(),
      title: inputText,
      completed: false,
    };
    tasks.forEach((task) => renderElement(task));
    tasks = [...tasks, newListItem];
    saveTasks();
    reloadTasks();
    input.value = "";
  });
  function reloadTasks() {
    tasks.forEach((item) => renderElement(item));
  }
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  // just getting all the tasks from the local-storage and rendering them on to the dom
  function renderElement(task) {
    let ul = document.getElementById("listItems");
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.textContent = task.title;
    li.innerHTML = `<span>${task.title}</span>
    <button>delete</button>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "button") return;
      task.completed = !task.completed;
      if (task.completed) li.classList.toggle("completed");
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      console.log(tasks);
      saveTasks();
      li.remove();
      reloadTasks();
    });
    ul.appendChild(li);
  }
});
