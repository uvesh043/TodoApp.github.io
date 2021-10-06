const todo_button = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo_input");
const selectTodo = document.querySelector(".select-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoList.addEventListener("click", deleteChecked);
selectTodo.addEventListener("click", filterOption);
todo_button.addEventListener("click",addTodo)
function addTodo(event) {
  
  // event.preventDefault();
  console.log("HJello from Add tooa");
  // let todoDiv = document.createElement("Div");
  // todoDiv.classList.add("todo");
  // let newTodo = document.createElement("li");
  // newTodo.innerText = todoInput.value;
  // newTodo.classList.add("todoItems");
  // todoDiv.appendChild(newTodo);
  //Adding  TODOS INTO LOCALSTORAGE
  saveLocalTodos(todoInput.value);
  // Checked Mark Button
  // let CheckedButton = document.createElement("button");
  // CheckedButton.innerHTML =
  //   '<i class="fa-solid fa-check" id="checked_icon"></i>';
  // CheckedButton.classList.add("checked_button");
  // todoDiv.appendChild(CheckedButton);

  // //Delete Mark Button
  // let deleteButton = document.createElement("button");
  // deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  // deleteButton.classList.add("delete_button");
  // todoDiv.appendChild(deleteButton);

  // // Appending Todo In Todo Div
  // todoList.appendChild(todoDiv);
  // //clear input
  todoInput.value = "";
};
function deleteChecked(e) {
  const item = e.target;
  //Delete Todo
  if (item.classList[0] === "delete_button") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    deleteTodo(todo)
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //Checked Todo
  if (item.classList[0] == "checked_button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Filter Option :->
function filterOption(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    if (todo.nodeName === "DIV") {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    }
  });
}

function saveLocalTodos(todo) {
  // console.log(todo);
  let todos;
  if (localStorage.getItem("todos")=== null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log("This is todo" + todos);
  todos.push(todo);
  console.log("hellow form saverLOcal Stroage");
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){
  let todos;
  if (localStorage.getItem("todos")=== null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
 todos.forEach((todo)=>{
  let todoDiv = document.createElement("Div");
  todoDiv.classList.add("todo");
  let newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todoItems");
  todoDiv.appendChild(newTodo);

  // Checked Mark Button
  let CheckedButton = document.createElement("button");
  CheckedButton.innerHTML =
    '<i class="fa-solid fa-check" id="checked_icon"></i>';
  CheckedButton.classList.add("checked_button");
  todoDiv.appendChild(CheckedButton);

  //Delete Mark Button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.classList.add("delete_button");
  todoDiv.appendChild(deleteButton);

  // Appending Todo In Todo Div
  todoList.appendChild(todoDiv);
 })
}

function deleteTodo(todo){
  let todos;
  if (localStorage.getItem("todos")=== null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log("delete");
  const clickTodoText=todo.children[0].innerText;
 todos.splice(todos.indexOf(clickTodoText), 1);
 localStorage.setItem('todos',JSON.stringify(todos));

}