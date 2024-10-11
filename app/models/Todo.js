// app/models/Todo.js

import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically create createdAt and updatedAt fields
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

export default Todo;
