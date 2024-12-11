const urlParams = new URLSearchParams(location.search);
const todoId = urlParams.get("id");
const completeButton = document.getElementById("completedButton");

async function getTodoDetails() {
  let response = await fetch(`http://localhost:8083/api/todos/${todoId}`);
  let todo = await response.json();

  document.getElementById("description").textContent = todo.description;
  document.getElementById("deadline").textContent = todo.deadline;
  document.getElementById("category").textContent = todo.category;
  document.getElementById("priority").textContent = todo.priority;

  if (todo.completed) {
    completeButton.disabled = true;
    completeButton.textContent = "Already Completed"; 
  } else {
    completeButton.addEventListener("click", () => markAsCompleted(todo.id)); 
  }
}

async function markAsCompleted(id) {
  try {
    let response = await fetch(`http://localhost:8083/api/todos/${id}`, {
      method: "PUT", 
    });

    if (response.ok) {
      completeButton.disabled = true; 
      completeButton.textContent = "Marked as Completed"; 
    } else {
      console.error("Failed to mark as completed");
    }
  } catch (error) {
    console.error("Error marking Todo as completed:", error);
  }
}
getTodoDetails();
