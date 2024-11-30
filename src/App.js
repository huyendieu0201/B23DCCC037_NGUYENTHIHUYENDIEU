import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleToggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index].text);
  };

  const handleSaveEdit = () => {
    if (editTask.trim()) {
      const newTasks = tasks.map((task, i) =>
        i === editIndex ? { ...task, text: editTask } : task
      );
      setTasks(newTasks);
      setEditIndex(null);
      setEditTask('');
    }
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {editIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <>
                <span onClick={() => handleToggleTask(index)}>{task.text}</span>
                <button onClick={() => handleEditTask(index)}>Edit</button>
                <button onClick={() => handleRemoveTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
