'use client';

import { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'; // Import the delete icon
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from the API on component mount
  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch('/api/todos');
      const data = await res.json();
      setTodos(data);
      console.log(data)
    }
    fetchTodos();
  }, []);

  // Add a new todo
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return; // Prevent adding empty todos

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo }),
    });
    
    if (res.ok) {
      const addedTodo = await res.json();
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      setNewTodo('');
      toast.success('Todo added successfully!'); // Show success toast
    } else {
      toast.error('Failed to add todo.'); // Show error toast
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    const res = await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      toast.success('Todo deleted successfully!'); // Show success toast
    } else {
      toast.error('Failed to delete todo.'); // Show error toast
    }
  };

  return (
    <div className="flex flex-col items-center p-5 w-3/4 border border-red-300 rounded-2xl shadow-xl mx-auto">
     <div className="flex mb-4 w-full max-w-lg justify-center">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition duration-200"
        >
          Add Todo
        </button>
      </div>
      <ul className="w-full max-w-lg">
  {todos.map((todo) => (
    <li
      key={todo._id}
      className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-md mb-2 shadow-sm hover:shadow-md transition duration-200"
    >
      <span className="text-gray-800">{todo.text}</span>
      <span className="text-red-400">{todo.completed ? 'Completed' : 'Not Completed'}</span>
      <button
        onClick={() => handleDeleteTodo(todo._id)}
        className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
      >
        <AiOutlineDelete className="mr-1" /> {/* Icon with margin */}
        Delete
      </button>
    </li>
  ))}
</ul>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </div>
  );
}

export default TodoList;
