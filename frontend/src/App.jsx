import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import CreatePost from './CreatePost';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
    <Routes>
    <Route
    path="/"
    element={
      <Home
      isAuthenticated={isAuthenticated}
      user={user}
      onLogout={handleLogout}
      />
    }
    />
    <Route
    path="/login"
    element={
      isAuthenticated ?
      <Navigate to="/" /> :
      <Login onLogin={handleLogin} />
    }
    />
    <Route
    path="/signup"
    element={
      isAuthenticated ?
      <Navigate to="/" /> :
      <Signup onLogin={handleLogin} />
    }
    />
    <Route
    path="/create"
    element={
      isAuthenticated ?
      <CreatePost user={user} /> :
      <Navigate to="/login" />
    }
    />
    </Routes>
    </div>
    </Router>
  );
}

export default App;
