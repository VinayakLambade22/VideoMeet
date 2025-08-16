import { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
// import "../App.css";
import "../styles/Home.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="navBar">
        <div className="logo-container">
          <h2 className="logo">VideoMeet</h2>
        </div>

        <div className="nav-controls">
          <div 
            className="history-btn"
            onClick={() => navigate("/history")}
          >
            <IconButton className="history-icon">
              <RestoreIcon />
            </IconButton>
            <span>History</span>
          </div>

          <Button
            className="logout-btn"
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div className="content-wrapper">
            <h1 className="hero-title">
              Premium Video Meetings,<br />
              <span className="highlight">Simplified.</span>
            </h1>
            <p className="hero-subtitle">
              Connect with anyone, anywhere. Crystal clear video quality and seamless collaboration.
            </p>

            <div className="join-container">
              <TextField
                className="meeting-input"
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
                size="medium"
                fullWidth
              />
              <Button 
                className="join-btn"
                onClick={handleJoinVideoCall} 
                variant="contained"
                size="large"
              >
                Join Meeting
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <div className="image-container">
            <img src="/logo3.png" alt="Videoconference illustration" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(HomeComponent);