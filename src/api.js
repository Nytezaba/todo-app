import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getAllTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const getTodoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw error;
  }
};

export const createTodo = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};
