import { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (path) => {
    router(path);
    setIsMenuOpen(false); 
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="navbar-header">
          <h2 className="logo">VideoMeet</h2>
        </div>

        <div
          className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          role="button"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <p onClick={() => handleLinkClick("/guest")}>Join as Guest</p>
          <p onClick={() => handleLinkClick("/auth")}>Register</p>
          <div onClick={() => handleLinkClick("/auth")} role="button">
            <p>Login</p>
          </div>
        </div>
      </nav>

      <section className="main-section">
        <div className="text-content">
          <h1>
            <span className="highlight">Connect</span> with your loved Ones
          </h1>
          <p className="subtext">Cover a distance by VideoMeet</p>
          <div className="get-started-button" role="button">
            <Link to="/auth">Get Started</Link>
          </div>
        </div>
        <div className="image-content">
          <img src="/mobile.png" alt="Video Call Illustration" />
        </div>
      </section>
    </div>
  );
}