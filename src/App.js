import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTaskPage from "./pages/AddTaskPage";
import ViewTasksPage from "./pages/ViewTasksPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddTaskPage />} />
        <Route path="/tasks" element={<ViewTasksPage />} />
      </Routes>
    </Router>
  );
};

export default App;