// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
	// prevent form fromm submittin
	event.preventDefault();
	// create Todo Div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	// create Li
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	// add todo to localstorage
	saveLocalTodos(todoInput.value);
	// create completed button
	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class = "fas fa-check"></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	// / create trash button
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	// APPEND TO LIST
	todoList.appendChild(todoDiv);
	// CLEAR TODO INPUT VALUE
	todoInput.value = "";
}

function deleteCheck(e) {
	const item = e.target;
	// DELETE
	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
		// ANIMATION
		todo.classList.add("fall");
        removeLocalTodos(todo);
		todo.addEventListener("transitionend", function () {
			todo.remove();
		});
	}

	// CHECK MARK
	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
        checkLocalTodos(todo);

	}
}
//  FILTERING FUNCTION
function filterTodo(e) {
	// SELECLTING TODOS
	const todos = todoList.childNodes;
	// CREATING CONDITIONS FOR EACH SORTING VALUE
	todos.forEach(function (todo) {
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
	});
}

function saveLocalTodos(todo) {
	// check if there's someting in the local storage
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    // check if there's someting in the local storage
    let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
    const todoIndex = todo.children[0].innerText;
	let indexSearch = todos.indexOf(todoIndex);
    todos.splice(indexSearch, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkLocalTodos(todo) {
    // check if there's someting in the local storage
    let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
    const todoIndex = todo.children[0].innerText;
    todos[todos.indexOf(todoIndex)].classList.toggle("completed");
    
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
	// check if there's someting in the local storage
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function (todo) {
		// create Todo Div
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		// create Li
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);
		// create completed button
		const completedButton = document.createElement("button");
		completedButton.innerHTML = '<i class = "fas fa-check"></i>';
		completedButton.classList.add("complete-btn");
		todoDiv.appendChild(completedButton);
		// / create trash button
		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);
		// APPEND TO LIST
		todoList.appendChild(todoDiv);
	});
}


