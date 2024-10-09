import React from 'react';
import { Link } from 'react-router-dom';
import ColorSchemesExample from '../components/nav';
import Footer from '../components/Footer';
import './Home.css';

export default function Home() {
  return (
    <div>
      <ColorSchemesExample />

      <div className="hero-section">
        <div className="hero-image"></div>
        <h1 className="hero-title"> Welcome to PicGuard </h1>
        <p className="hero-description">Secure your images with our state-of-the-art encryption software. Protect your privacy and data effortlessly.</p>
        <Link to="/signup" className="hero-button">Get Started</Link>
      </div>

      <div className="content-section">
        <p className="content-description">Discover the best encryption methods to keep your images secure. Learn more about our features and how to get started.</p>
        <Link to="/features" className="content-link">Discover Features</Link>
      </div>
      <Footer/>
    </div>
  );
}
