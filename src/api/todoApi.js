// src/api/todoApi.js
import axiosInstance from './axiosInstance';

// Create a new todo
export const createTodo = (todo) =>
  axiosInstance.post('/todo/create', todo).then((response) => response.data);

// Get all todos for the user
export const getUserTodos = () => axiosInstance.get('/todo').then((response) => response.data);

// Delete a todo
export const deleteTodo = (id) =>
  axiosInstance.delete(`/todo/${id}`).then((response) => response.data);

// Toggle pin status
export const togglePin = (id) =>
  axiosInstance.patch(`/todo/pin/${id}`).then((response) => response.data);

// Update a todo
export const updateTodo = (id, updates) =>
  axiosInstance.put(`/todo/${id}`, updates).then((response) => response.data);

// Update the status of a todo
export const updateTodoStatus = (id, status) =>
  axiosInstance.patch(`/todo/status/${id}`, { status }).then((response) => response.data);
