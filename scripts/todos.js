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
  console.log(userTodos);
  console.log(dropdown);
  console.log(dropdown.value);

  let todoContainer = document.getElementById("todoContainer");
  todoContainer.innerHTML = "";
  if (userTodos.length > 0) {
    userTodos.forEach(todo => {
   
      let card = document.createElement("div");
      card.classList.add("card");

      
      let cardHeader = document.createElement("h3");
      cardHeader.textContent = todo.description;
      card.appendChild(cardHeader);

      
      let cardCategory = document.createElement("p");
      cardCategory.textContent = `Category: ${todo.category}`;
      card.appendChild(cardCategory);

      
      let cardDeadline = document.createElement("p");
      cardDeadline.textContent = `Deadline: ${todo.deadline}`;
      card.appendChild(cardDeadline);

      
      let cardPriority = document.createElement("p");
      cardPriority.textContent = `Priority: ${todo.priority}`;
      card.appendChild(cardPriority);

      
      todoContainer.appendChild(card);
    });
  } else {
    let noTodosMessage = document.createElement("p");
    noTodosMessage.textContent = "No todos found for this user.";
    todoContainer.appendChild(noTodosMessage);
  }

}
// It works now
