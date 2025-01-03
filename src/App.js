import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    if (tasks.length) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks((prevTasks) => [...prevTasks, { text: newTask, done: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, idx) =>
        idx === index ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Management</h1>
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border p-2 rounded w-2/3"
            placeholder="Enter a new task"
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask} className="ml-2 bg-black text-white px-4 py-2 rounded">
            Add Task
          </button>
        </div>
        <ul className="w-full">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`p-2 mb-2 rounded flex justify-between items-center ${task.done ? "bg-green-100" : "bg-red-100"}`}
            >
              <span className="bg-gray-100 px-3 py-1">{task.text}</span>
              <button onClick={() => toggleTask(index)} className="bg-black text-white px-2 py-1 rounded">
                {task.done ? "Undo" : "Done"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
