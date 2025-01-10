import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTaskPage from "./pages/AddTaskPage";
import ViewTasksPage from "./pages/ViewTasksPage";
import ViewMenuPage from "./pages/ViewMenuPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddTaskPage />} />
        <Route path="/tasks" element={<ViewTasksPage />} />
        <Route path="/menu" element={<ViewMenuPage />} />
      </Routes>
    </Router>
  );
};

export default App;