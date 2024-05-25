import React from 'react'
import './css/home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className=" Home home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Movies Explorer</h1>
        <p className="hero-description">
          Explore Movies, Discover Stories: Your Gateway to Cinema
        </p>
        <Link to={'/movies'}>
          <button className="hero-button">Start Exploring</button>
        </Link>
      </div>
      <div className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <i className="fa-brands fa-searchengin feature-icon"></i>
            <h3 className="feature-title">Search Movies</h3>
            <p className="feature-description">Search and filter movies tailored to your needs and mood.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-list feature-icon"></i>
            <h3 className="feature-title">Watchlist</h3>
            <p className="feature-description">Store all your favourite movies in one place</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-star feature-icon"></i>
            <h3 className="feature-title">Rate Movies</h3>
            <p className="feature-description">Watched a movie recently? Improve our community with your valuable ratings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;



