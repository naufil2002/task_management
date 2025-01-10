import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTaskPage = () => {
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const handleTaskSubmit = () => {
    if (newTask.trim()) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      localStorage.setItem("tasks", JSON.stringify([...tasks, { text: newTask, done: false }])); 
      setNewTask("");
      navigate("/tasks");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Task</h1>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="Enter a new task"
          onKeyDown={(e) => e.key === "Enter" && handleTaskSubmit()}
        />
        <button onClick={handleTaskSubmit} className="bg-black text-white px-4 py-2 rounded w-full">
          Add Task
        </button>
      </div>
      <button
        onClick={() => navigate("/tasks")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Tasks
      </button>
      <button
        onClick={() => navigate("/menu")}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        View Menu
      </button>
    </div>
  );
};

export default AddTaskPage;
