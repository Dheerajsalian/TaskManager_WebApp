import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Task Manager</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
