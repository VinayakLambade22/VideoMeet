import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="navbar-header">
          <h2 className="logo">VideoMeet</h2>
        </div>
        <div className="navbar-links">
          <p onClick={() => router("/guest")}>Join as Guest</p>
          <p onClick={() => router("/auth")}>Register</p>
          <div onClick={() => router("/auth")} role="button">
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
