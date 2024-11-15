import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Modal from './Modal';
import Update from './Update';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from './api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTodos();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCreateTask = async () => {
    try {
      const newTaskObject = {
        title: newTask,
        description: 'default',
        completed: false,
      };
      
      const createdTask = await createTodo(newTaskObject);
      console.log('Creating task:', newTaskObject); // Log to check the new task object

      setTasks([...tasks, createdTask]);
      setNewTask(''); // Clear input field after adding task

      // Show success notification
      Swal.fire({
        title: 'Task Created!',
        text: `The task has been successfully added.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error creating task:', error);

      // Show error notification
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue creating the task. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleOpenDetailModal = (task) => {
    setSelectedTask(task);
    setOpenDetailModal(true); // Open Detail Modal
  };

  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setOpenEditModal(true); // Open Edit Modal
  };

  const handleCloseModal = () => {
    setOpenDetailModal(false);
    setOpenEditModal(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const updated = await updateTodo(updatedTask._id, updatedTask);
      const updatedTasks = tasks.map((task) =>
        task._id === updated._id ? updated : task
      );
      setTasks(updatedTasks);
      handleCloseModal(); // Close modal after successful update
      // Show success notification
      Swal.fire({
        title: 'Task Updated!',
        text: `The task has been successfully updated.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating task:', error);

      // Show error notification
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue updating the task. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    Swal.fire({
      title: 'Do you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#3B82F6',
      confirmButtonText: 'Delete!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTodo(taskId);
          const filteredTasks = tasks.filter((task) => task._id !== taskId);
          setTasks(filteredTasks);
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting task:', error);
          Swal.fire('Error!', 'There was an error deleting the task.', 'error');
        }
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="min-w-full p-4">
        <h1 className="text-2xl font-bold">To-do-list</h1>
        {/* Adding todo */}
        <div className="flex items-center justify-center space-x-2 py-2">
          <input 
            type="text" 
            placeholder="Task" 
            className="task-card dark:task-card px-4 py-2 border rounded" 
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="button-create dark:button-create bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreateTask}>
            Create
          </button>
        </div>
        {/* Task card */}
        {tasks.map((task, index) => (
          <div key={index} className="w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-2 dark:bg-gray-800 dark:border-gray-700 mb-2">
            <div className="px-4 py-3.5 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Todo {index + 1} : {task.title}</h3>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button 
                  onClick={() => handleOpenDetailModal(task)} // Open Detail Modal
                  className="font-medium text-indigo-600 hover:text-indigo-400"
                >
                  Detail
                </button>
                <button 
                  onClick={() => handleOpenEditModal(task)} // Open Edit Modal
                  className="font-medium text-red-600 hover:text-red-400"
                >
                  Edit
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Status: <span className={task.completed ? 'text-green-600' : 'text-red-600'}>{task.completed ? 'Complete' : 'Incomplete'}</span></p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button 
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 text-white px-2.5 py-2 rounded text-medium">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Detail Modal */}
      <Modal open={openDetailModal} onClose={handleCloseModal}>
        {selectedTask && <div>
          <h3 className="font-bold">{selectedTask.title}</h3>
          <div className="mt-4 flex items-center justify-between">{selectedTask.description}</div>
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleCloseModal} 
              className="bg-red-500 text-white px-2.5 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>}
      </Modal>
      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={handleCloseModal}>
        {selectedTask && (
          <Update selectedTask={selectedTask} onUpdate={handleUpdateTask} onClose={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};

export default App;



