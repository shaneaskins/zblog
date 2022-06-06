<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import './App.css';
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Components

import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import Posts from "./components/Posts/Posts"
import Post from "./components/Post/Post"
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAuth } from "./hooks/useAuth"

function App() {

  const { verify } = useAuth();

  useEffect(() => {
    verify();
  });

  return (
    <>
      <Routes>
        <Route element={<Home />}>
          <Route exact path="/" element={<Posts />}/>
          <Route exact path="/post/:post_id" element={<Post />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route element={<Posts />}/>
        </Route>
      </Routes>
    </>
>>>>>>> dev
  );
}

export default App;
