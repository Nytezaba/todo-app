import React, { useState } from 'react';
import { updateTodo } from './api';

const Update = ({ selectedTask, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    title: selectedTask ? selectedTask.title : '',
    description: selectedTask ? selectedTask.description : '',
    completed: selectedTask ? selectedTask.completed : false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTask) {
        const updatedTask = { ...selectedTask, ...formData };
        await updateTodo(selectedTask._id, updatedTask);
        onUpdate(updatedTask);
      }
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full text-center ">
      <form onSubmit={handleSubmit} className="px-4 py-3.5 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Edit
          </h3>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <label htmlFor="title" className="font-medium text-indigo-600 hover:text-indigo-400">Title:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleInputChange} 
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <label htmlFor="description" className="font-medium text-indigo-600 hover:text-indigo-400">Description:</label>
          <input 
            type="text" 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <label htmlFor="completed" className="font-medium text-indigo-600 hover:text-indigo-400">Status:</label>
          <input 
            type="checkbox" 
            id="completed" 
            name="completed" 
            checked={formData.completed} 
            onChange={(e) => setFormData({ ...formData, completed: e.target.checked })} 
          />
          <label htmlFor="completed" className="ml-2">{formData.completed ? 'Complete' : 'Incomplete'}</label>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
