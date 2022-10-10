const todoManager = new Todo();

const todoInput = document.getElementById("todo-input") as HTMLInputElement | null;
const todoBtn = document.getElementById("todo-btn") as HTMLButtonElement | null;
const todoList = document.getElementById("todo-list") as HTMLDListElement | null;
const todoStatus = document.getElementById("todo-status") as HTMLDivElement | null;
const errorMessage = document.getElementById("error-message") as HTMLDivElement | null;

todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", function (e) {
  const element = e.target as HTMLUListElement;
  const todoId = Number((element.closest("li[data-todo-id]")as HTMLElement).dataset.todoId);
  const shouldRemove = element.classList.contains("bi-trash3-fill");

  if (shouldRemove) {
    todoManager.remove(todoId);
  } else {
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
  } catch (err) {
    setErrorMessage(err.message);
  }
}

function renderList() {
  const todos = todoManager.getTodos();

  refreshStatus();
  todoList.innerHTML = todos
  .sort((a) => (a.isDone ? 1 : -1))
  .map(
    (todo) => `
     <li data-todo-id="${todo.id}" class="todo-item list-group-item cursor-pointer" aria-current="true">
     <i class="bi bi-trash3-fill"></i>
   <span class="ms-2 ${
     todo.isDone ? "text-muted text-decoration-line-through" : ""
   }">
    ${todo.text} 
    </span>
       </li>
       `
  )
  .join("");
}

function resetInput() {
  todoInput.value = "";
}

function setErrorMessage(error: string) {
  errorMessage.innerHTML = `<span>${error}</span>`;
}

function clearErrorMessage() {
  errorMessage.innerHTML = "";
}

function refreshStatus() {

  const amountDone = todoManager
  .getTodos()
  .filter((todo) => todo.isDone).length;
  
  todoStatus.innerHTML = `${amountDone}/${todoManager.getTodos().length}`;
};