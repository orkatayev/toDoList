interface TodoItem {
  id: number;
  text: string;
  isDone: boolean;
  createdAt: Date;
}

class Todo {
  currentId = 0;

  todos: TodoItem[] = [
    //{
    // id: 1,
    // text: 'Buy Milk',
    //  isDone: false,
    //  createdAt: new Date(),
    // },
  ];
  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    localStorage.setItem("currentId", String(this.currentId));
  }

  load() {
    if (localStorage.getItem("todos")) {
      this.todos = JSON.parse(localStorage.getItem("todos"));
      this.currentId = Number(localStorage.getItem("currentId"));
    }
  }

  add(text: string) {
    if (text.length < 2) {
      throw new Error("Task must be at least two characters");
    }

    const todo: TodoItem = {
      id: this.currentId++,
      text,
      isDone: false,
      createdAt: new Date(),
    };

    this.todos.push(todo);

    this.save();

    return todo;
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: number) {
    const found = this.todos.find((todo) => todo.id === id);

    if (found) {
      return found;
    }

    throw new Error("id was not found");
  }

  remove(id: number) {
    const removedTodo = this.getTodo(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);

    this.save();

    return removedTodo;
  }

  clear(isDone: boolean | null = null) {
    if (typeof isDone === "boolean") {
      this.todos = this.todos.filter((todo) => todo.isDone !== isDone);
    } else {
      this.todos = [];
    }
    this.save();
  }

  changeDone(id: number, isDone: boolean | null = null) {
    const updatedTodo = this.getTodo(id);

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = typeof isDone === "boolean" ? isDone : !todo.isDone;
      }
      return todo;
    });
    this.save();
    return updatedTodo;
  }
}
