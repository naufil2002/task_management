import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const updateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTask = (index) => {
    updateTasks(
      tasks.map((task, idx) => (idx === index ? { ...task, done: !task.done } : task))
    );
  };

  const deleteTask = (index) => {
    updateTasks(tasks.filter((_, idx) => idx !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">View Tasks</h1>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks available. Add a task to get started!
          </p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`p-2 mb-2 rounded flex justify-between items-center ${
                  task.done ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <span>{task.text}</span>
                <div>
                  <button
                    onClick={() => toggleTask(index)}
                    className="bg-black text-white px-2 py-1 rounded mr-2"
                  >
                    {task.done ? "Not Done" : "Done"}
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ViewTasksPage;