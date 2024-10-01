import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, onCancel, initialData }) => {
  const [todo, setTodo] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    if (initialData) {
      // Ensure dueDate is in YYYY-MM-DD format
      const formattedDueDate = initialData.dueDate
        ? new Date(initialData.dueDate).toISOString().split('T')[0]
        : '';
      setTodo({
        ...initialData,
        dueDate: formattedDueDate,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTodo({
      ...todo,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(todo);
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-600 p-8 text-white rounded-2xl">
      <h2 className="text-3xl font-bold mb-6">{initialData ? 'Update Todo' : 'Create New Todo'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-bold text-xl">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={todo.title}
            onChange={handleChange}
            className="bg-transparent border p-1 rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-bold text-xl">
            Description:
          </label>
          <textarea
            id="description"
            value={todo.description}
            onChange={handleChange}
            className="bg-transparent border p-1 rounded-lg w-full h-[150px] resize-none outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate" className="font-bold text-xl">
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            value={todo.dueDate}
            onChange={handleChange}
            required
            className="bg-transparent border p-1 rounded-lg"
          />
        </div>
        <div className="flex gap-5 justify-center items-center">
          <button type="submit" className="bg-white text-black p-3 rounded-2xl font-bold">
            {initialData ? 'Update Todo' : 'Add Todo'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-white text-black p-3 rounded-2xl font-bold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
