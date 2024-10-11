// app/api/todos/todos.js

let todos = [];

export const getTodos = () => todos;

export const addTodo = (todo) => {
  todos.push(todo);
  return todos; // Return updated list after adding a todo
};

export const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  return todos; // Return updated list after deleting a todo
};
