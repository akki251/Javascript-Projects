const form = document.querySelector("form");
const input = document.getElementById("input");
const taskCount = document.getElementById("task-count");
const todos = document.getElementById("todos");
var cnt = 0;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = input.value;

  if (todoText) {
    cnt++;
    const todoEl = document.createElement("li");
    todoEl.classList.add("to-do-container");

    todoEl.innerHTML = `
    <i  class="far fa-check-double check-icon"></i>
    <span class ="todo-text">${todoText}</span>
    <i  class="far fa-trash-alt delete-icon"></i>
    `;

    const checkIcon = todoEl.querySelector(".check-icon");
    checkIcon.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
    });

    const deleteIcon = todoEl.querySelector(".delete-icon");
    deleteIcon.addEventListener("click", () => {
      --cnt;
      taskCount.innerText = ` Total Tasks : ${cnt}`;
      todoEl.remove();
    });

    taskCount.innerText = ` Total Tasks : ${cnt}`;
    todos.appendChild(todoEl);
    input.value = "";
  }
});
