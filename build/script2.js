var todoManager = new Todo();
var todoInput = document.getElementById("todo-input");
var todoBtn = document.getElementById("todo-btn");
var todoList = document.getElementById("todo-list");
var todoStatus = document.getElementById("todo-status");
var errorMessage = document.getElementById("error-message");
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", function (e) {
    var element = e.target;
    var todoId = Number(element.closest("li[data-todo-id]").dataset.todoId);
    var shouldRemove = element.classList.contains("bi-trash3-fill");
    if (shouldRemove) {
        todoManager.remove(todoId);
    }
    else {
        todoManager.changeDone(todoId);
    }
    renderList();
});
function addTodo() {
    try {
        todoManager.add(todoInput.value);
        resetInput();
        clearErrorMessage();
        renderList();
    }
    catch (err) {
        setErrorMessage(err.message);
    }
}
function renderList() {
    var todos = todoManager.getTodos();
    refreshStatus();
    todoList.innerHTML = todos
        .sort(function (a) { return (a.isDone ? 1 : -1); })
        .map(function (todo) { return "\n     <li data-todo-id=\"" + todo.id + "\" class=\"todo-item list-group-item cursor-pointer\" aria-current=\"true\">\n     <i class=\"bi bi-trash3-fill\"></i>\n   <span class=\"ms-2 " + (todo.isDone ? "text-muted text-decoration-line-through" : "") + "\">\n    " + todo.text + " \n    </span>\n       </li>\n       "; })
        .join("");
}
function resetInput() {
    todoInput.value = "";
}
function setErrorMessage(error) {
    errorMessage.innerHTML = "<span>" + error + "</span>";
}
function clearErrorMessage() {
    errorMessage.innerHTML = "";
}
function refreshStatus() {
    var amountDone = todoManager
        .getTodos()
        .filter(function (todo) { return todo.isDone; }).length;
    todoStatus.innerHTML = amountDone + "/" + todoManager.getTodos().length;
}
;
