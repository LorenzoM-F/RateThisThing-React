import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchItems();
    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.categoryName === selectedCategory.name : true;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleRemoveSelection = () => {
    setSelectedCategory(null);
  };

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
          {categories.map((category) => (
            <button
              key={category.id}
              className="category-button"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
        {selectedCategory && (
          <div className="selected-category">
            <p>Selected Category: {selectedCategory.name}</p>
            <button onClick={handleRemoveSelection} className="remove-selection-button">
              Remove Selection
            </button>
          </div>
        )}
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for places..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="items-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Link to={`/item/${item.id}`} key={item.id} className="item-card-link">
              <div className="item-card">
                <h3>{item.name}</h3>
                <div>
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className="stars" style={{ color: 'gold' }}>
                      &#9733;
                    </span>
                  ))}
                </div>
                <p>{item.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No items found for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
