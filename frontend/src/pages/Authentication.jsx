import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";
import server from "../environment";

const defaultTheme = createTheme();

export default function Authentication() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0); // 0 = login, 1 = register
  const [open, setOpen] = React.useState(false);
  const [backgroundImage, setBackgroundImage] = React.useState("");

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  React.useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(
          `${server}/api/unsplash/random-image`
        );
        setBackgroundImage(res.data.imageUrl); 
      } catch (err) {
        console.error("Failed to fetch Unsplash image", err);
      }
    };
    fetchImage();
  }, []);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setUsername("");
        setPassword("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
      }
    } catch (err) {
      let message = err.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "10fr 4fr" },
        }}
      >
        {/* Left Background */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Right Login/Signup */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#1B3C53",
            p: 4,
          }}
        >
          <Paper
            elevation={8}
            square
            sx={{
              width: { xs: "90%", sm: "80%", md: "100%" },
              maxWidth: 450,
              p: 4,
              borderRadius: 3,
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
                {formState === 0 ? "Sign In" : "Create Account"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                  mb: 2,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Button
                  fullWidth
                  variant={formState === 0 ? "contained" : "outlined"}
                  onClick={() => setFormState(0)}
                  sx={{ borderRadius: 5, textTransform: "none" }}
                >
                  Sign In
                </Button>
                <Button
                  fullWidth
                  variant={formState === 1 ? "contained" : "outlined"}
                  onClick={() => setFormState(1)}
                  sx={{ borderRadius: 5, textTransform: "none" }}
                >
                  Sign Up
                </Button>
              </Box>

              <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
                {formState === 1 && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    value={name}
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    sx={{ borderRadius: 1 }}
                  />
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ borderRadius: 1 }}
                />
                {error && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ mt: 1, textAlign: "center" }}
                  >
                    {error}
                  </Typography>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: 2,
                    textTransform: "none",
                  }}
                  onClick={handleAuth}
                >
                  {formState === 0 ? "Login" : "Register"}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate("/");
                  }}
                  sx={{
                    width: "100%",
                    mb: 2,
                    borderRadius: 5,
                    textTransform: "none",
                    color: "gray",
                    borderColor: "gray",
                    "&:hover": {
                      borderColor: "#888",
                      backgroundColor: "#f4f4f4",
                    },
                  }}
                >
                  ⬅ Back to Home
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </ThemeProvider>
  );
}
