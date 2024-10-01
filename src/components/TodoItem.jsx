// src/components/TodoItem.js
import React from 'react';

const TodoItem = ({ todo, onUpdate, onDelete, onTogglePin, onStatusChange }) => {
  return (
    <div className=" p-4 rounded-lg bg-slate-700 text-white">
      <h2 className="capitalize font-bold text-2xl">{todo.title}</h2>
      <p>{todo.description}</p>
      <p>Due Date: {new Date(todo.dueDate).toLocaleDateString()}</p>
      <p>Status: {todo.status}</p>
      {/* <p>Pinned: {todo.pinned ? 'Yes' : 'No'}</p> */}
      <select
        value={todo.status}
        onChange={(e) => onStatusChange(todo._id, e.target.value)}
        className="bg-black text-white p-2 font-bold outline-none"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button
        onClick={() => onTogglePin(todo._id)}
        className="bg-black text-white p-2 pl-5 pr-5 font-bold"
      >
        {todo.pinned ? 'Unpin' : 'Pin'}
      </button>
      <button
        onClick={() => onUpdate(todo)}
        className="bg-black text-white p-2 pl-5 pr-5 font-bold"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(todo._id)}
        className="bg-black text-white p-2 pl-5 pr-5 font-bold"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
