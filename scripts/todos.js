"use strict"

let dropdown = document.getElementById('usersDropdown')
let api = "http://localhost:8083/api/users";
let usersApi = "http://localhost:8083/api/todos"

async function populateDropdown() {
    let response = await fetch(api);
    let users = await response.json();

    for (const user of users) {
    const option = document.createElement('option');
    option.value = user.username; 
    option.textContent = `${user.name}`; 
    dropdown.appendChild(option)
  }
}
populateDropdown();

// fetch('api/todos') => todos => todos.filter(todo.userid === usedid) <--- pseudo code



