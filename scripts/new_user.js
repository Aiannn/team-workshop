function postUser() {
    let name = document.querySelector('#name').value 
    let username = document.querySelector('#username').value 
    let password = document.querySelector('#password').value 

    let userData = {
        name: name,
        username: username,
        password: password
    }

    fetch('http://localhost:8083/api/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Success: ", data)
        console.log("Success: ", data)
    })
    
    let namefield = document.querySelector('#name')
    namefield.value = ''
    let usernamefield = document.querySelector('#username') 
    usernamefield.value = ''
    let passwordfield = document.querySelector('#password') 
    passwordfield.value = ''
}