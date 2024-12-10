function getUsers() {
    fetch('http://localhost:8083/api/users')
    .then(response => response.json())
    .then(data => {
        putUsersToDropdown(data)
    })
}

function getCategories() {
    fetch('http://localhost:8083/api/categories')
    .then(response => response.json())
    .then(data => {
        putCategoriesToDropdown(data)
    })
}

function putUsersToDropdown(users) {
    let usersDropdown = document.querySelector('#users-list-select')
    for (user of users) {
        let option = new Option(user.name, user.id)
        usersDropdown.append(option)
    }
}

function putCategoriesToDropdown(categories) {
    let categoriesDropdown = document.querySelector('#categories-list-select')
    for (category of categories) {
        let option = new Option(category.name, category.name)
        categoriesDropdown.append(option)
    }
} 

function postNewToDo() {
    let usersDropdown = document.querySelector('#users-list-select').value
    let categoriesDropdown = document.querySelector('#categories-list-select').value
    let urgencyDropdown = document.querySelector('#urgency-list-select').value
    let descriptionTextarea = document.querySelector('#description').value
    // let deadlineText = document.querySelector('#deadline-text').value
    let date = document.querySelector('#deadline-date').value

    let todoData = {
        userid: usersDropdown,
        category: categoriesDropdown,
        description: descriptionTextarea,
        deadline: date,
        priority: urgencyDropdown
    }

    fetch('http://localhost:8083/api/todos', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(todoData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Success: ", data)
        console.log("Success: ", data)
    })
}

// function showDate() {
//     let date = document.querySelector('#deadline-date').value
//     console.log(date)
// }

getUsers()
getCategories()