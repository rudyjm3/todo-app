//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
  //Prevent form from submitting
  event.preventDefault();
  //Todo Div creation
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");
  //Create li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // ADD TODO TO LOCAL localStorage
  saveLocalTodos(todoInput.value);
  //Check Mark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);
  //Check Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Append to List
  todoList.appendChild(todoDiv);
  // Clear todo Input Value from the form once plus button is clicked
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // Delete TODO
  if(item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    //Line below removes it from local storage when trash button clicked
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function() {
      todo.remove();
    })
  }

  // Check Mark
  if(item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch(e.target.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if(todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        }else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        }else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // CHECK TO SEE IF ITEMS ARE ALREADY THERE
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
console.log(localStorage)
}

function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo) {
    //RESUING CODE FROM LINE 17 - 37 ABOVE AND MAKING EDITS TO
    //RETREIVE INFO FROM LOCAL STORAGE
    //Todo Div creation
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create li
    const newTodo = document.createElement('li');
    //Changed ""= todoInput.value;"" to "todo;"
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Removed local storage code used --> ///
    /// ADD TODO TO LOCAL localStorage
    ///saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
//TO CLEAR LOCAL STORAGE FROM BROWSER - BACKEND/CODE.
// All code above needs to be commented out and code below active only
//localStorage.clear();
