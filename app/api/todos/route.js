// app/api/todos/route.js

import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/mongodb'; // Import the MongoDB connection
import Todo from '../../models/Todo'; // Import the Todo model

// Ensure the database connection is established before handling requests
const connectDb = async () => {
  await connectToDatabase();
};

// GET method to read todos
export async function GET() {
  await connectDb();
  const todos = await Todo.find({});
  return NextResponse.json(todos);
}

// POST method to create a new todo
export async function POST(request) {
  await connectDb();
  const { text } = await request.json();
  const newTodo = new Todo({
    text,
    completed: false,
  });
  await newTodo.save(); // Save to the database
  return NextResponse.json(newTodo);
}

// DELETE method to delete a todo
export async function DELETE(request) {
  await connectDb();
  const { id } = await request.json();
  await Todo.findByIdAndDelete(id); // Delete by ID
  return NextResponse.json({ message: 'Todo deleted' });
}
