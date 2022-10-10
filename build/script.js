var Todo = /** @class */ (function () {
    function Todo() {
        this.currentId = 0;
        this.todos = [
        //{
        // id: 1,
        // text: 'Buy Milk',
        //  isDone: false,
        //  createdAt: new Date(),
        // },
        ];
    }
    Todo.prototype.save = function () {
        localStorage.setItem("todos", JSON.stringify(this.todos));
        localStorage.setItem("currentId", String(this.currentId));
    };
    Todo.prototype.load = function () {
        if (localStorage.getItem("todos")) {
            this.todos = JSON.parse(localStorage.getItem("todos"));
            this.currentId = Number(localStorage.getItem("currentId"));
        }
    };
    Todo.prototype.add = function (text) {
        if (text.length < 2) {
            throw new Error("Task must be at least two characters");
        }
        var todo = {
            id: this.currentId++,
            text: text,
            isDone: false,
            createdAt: new Date()
        };
        this.todos.push(todo);
        this.save();
        return todo;
    };
    Todo.prototype.getTodos = function () {
        return this.todos;
    };
    Todo.prototype.getTodo = function (id) {
        var found = this.todos.find(function (todo) { return todo.id === id; });
        if (found) {
            return found;
        }
        throw new Error("id was not found");
    };
    Todo.prototype.remove = function (id) {
        var removedTodo = this.getTodo(id);
        this.todos = this.todos.filter(function (todo) { return todo.id !== id; });
        this.save();
        return removedTodo;
    };
    Todo.prototype.clear = function (isDone) {
        if (isDone === void 0) { isDone = null; }
        if (typeof isDone === "boolean") {
            this.todos = this.todos.filter(function (todo) { return todo.isDone !== isDone; });
        }
        else {
            this.todos = [];
        }
        this.save();
    };
    Todo.prototype.changeDone = function (id, isDone) {
        if (isDone === void 0) { isDone = null; }
        var updatedTodo = this.getTodo(id);
        this.todos = this.todos.map(function (todo) {
            if (todo.id === id) {
                todo.isDone = typeof isDone === "boolean" ? isDone : !todo.isDone;
            }
            return todo;
        });
        this.save();
        return updatedTodo;
    };
    return Todo;
}());
