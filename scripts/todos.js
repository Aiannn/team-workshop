"use strict";

let dropdown = document.getElementById("usersDropdown");
let api = "http://localhost:8083/api/users";
let todosApi = "http://localhost:8083/api/todos";

async function populateDropdown() {
  let response = await fetch(api);
  let users = await response.json();

  for (const user of users) {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = `${user.username}`;
    dropdown.appendChild(option);
  }
}
populateDropdown();

// fetch('api/todos') => todos => todos.filter(todo.userid === usedid) <--- pseudo code

async function showUserTodos() {
  let response = await fetch(todosApi);
  let todos = await response.json();

  let userTodos = todos.filter((todo) => todo.userid == dropdown.value);

  let todoContainer = document.getElementById("todoContainer");
  todoContainer.classList.add("d-flex", "flex-wrap", "gap-4");
  todoContainer.innerHTML = "";

  if (userTodos.length > 0) {
    userTodos.forEach((todo) => {
      let card = document.createElement("div");
      card.classList.add("card", "mb-3");
      card.style.maxWidth = "18rem";

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "border-5", "rounded", "border-bottom");

      let cardHeader = document.createElement("h5");
      cardHeader.classList.add("card-title");
      cardHeader.textContent = todo.description;
      cardBody.appendChild(cardHeader);

      let cardCategory = document.createElement("p");
      cardCategory.classList.add("card-text");
      cardCategory.textContent = `Category: ${todo.category}`;
      cardBody.appendChild(cardCategory);

      let cardDeadline = document.createElement("p");
      cardDeadline.classList.add("card-text");
      cardDeadline.textContent = `Deadline: ${todo.deadline}`;
      cardBody.appendChild(cardDeadline);

      let cardPriority = document.createElement("p");
      cardPriority.classList.add("card-text");
      cardPriority.textContent = `Priority: ${todo.priority}`;
      cardBody.appendChild(cardPriority);

      let completedButton = document.createElement("button");
      completedButton.classList.add("btn", "mt-2");
      completedButton.style.backgroundColor = "#266b65";
      completedButton.style.color = "white";
      completedButton.textContent = "Mark as Completed";

      card.appendChild(cardBody);
      cardBody.appendChild(completedButton);
      todoContainer.appendChild(card);
    });
  } else {
    let noTodosMessage = document.createElement("p");
    noTodosMessage.textContent = "No todos found for this user.";
    todoContainer.appendChild(noTodosMessage);
  }
}
