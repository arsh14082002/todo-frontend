import React, { useEffect, useState } from 'react';
import {
  getUserTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  togglePin,
  updateTodoStatus,
} from '../api/todoApi';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import NoTodo from '../components/NoTodo';
import { Link } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // Manage visibility of the create form
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getUserTodos();
        setTodos(response.todos);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching todos');
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleCreateTodo = async (todo) => {
    try {
      const response = await createTodo(todo);
      setTodos([...todos, response]);
      setShowCreateForm(false); // Hide the form after successful creation
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating todo');
    }
  };

  const handleUpdateTodo = async (todo) => {
    try {
      const response = await updateTodo(todo._id, todo);
      setTodos(todos.map((t) => (t._id === todo._id ? response : t)));
      setEditingTodo(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting todo');
    }
  };

  const handleTogglePin = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await togglePin(id);
      setTodos(todos.map((t) => (t._id === id ? response : t)));
    } catch (error) {
      setError(error.response?.data?.message || 'Error toggling pin');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await updateTodoStatus(id, status);
      setTodos(todos.map((t) => (t._id === id ? response : t)));
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating todo status');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="bg-slate-500 h-screen w-full pr-5 pl-5">
      {/* Button to toggle the create todo form */}
      <div className="flex justify-between">
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="bg-slate-700 p-3 text-white font-bold pr-6 pl-6"
        >
          {showCreateForm ? 'Cancel' : 'Create Todo'}
        </button>

        <Link to={'/profile'}>Profile</Link>
      </div>

      {showCreateForm && (
        <TodoForm onSubmit={handleCreateTodo} onCancel={() => setShowCreateForm(false)} />
      )}

      {editingTodo && (
        <TodoForm
          onSubmit={handleUpdateTodo}
          onCancel={() => setEditingTodo(null)}
          initialData={editingTodo}
        />
      )}

      <div className="grid grid-cols-4 gap-6">
        {todos.length === 0 ? (
          <NoTodo />
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={setEditingTodo}
              onDelete={handleDeleteTodo}
              onTogglePin={handleTogglePin}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
