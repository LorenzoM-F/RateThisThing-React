import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <nav>
        <Link to="/register">Register</Link>
        <br />
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}

export default Home;
