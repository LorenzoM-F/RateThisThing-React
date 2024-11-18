import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  const [items] = useState([]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="app-name">Rate This Thing</h1>
        <div className="burger-menu">
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <nav className="menu">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        </div>
      </header>

      <div className="categories-container">
        <div className="categories-scroll">
          <button className="category-button">Restaurants</button>
          <button className="category-button">Cafes</button>
          <button className="category-button">Parks</button>
          <button className="category-button">Hotels</button>
          <button className="category-button">Shops</button>
          <button className="category-button">Gyms</button>
          <button className="category-button">Museums</button>
          <button className="category-button">Theaters</button>
        </div>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for places..."
          className="search-bar"
        />
      </div>

      <div className="items-container">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <h3>{item.name}</h3>
            <p><strong>Category:</strong> {item.categoryName}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
