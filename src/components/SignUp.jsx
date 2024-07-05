import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppState } from '../App';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { updateAuth } = React.useContext(AppState);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.length >= 6;
    
    if (!name || !lastname || !email || !password) {
      toast.error("All fields are required!", { theme: "dark", autoClose: 2000, position: "top-center" });
      return false;
    }
    if (!isValidEmail) {
      toast.error("Invalid email format!", { theme: "dark", autoClose: 2000, position: "top-center" });
      return false;
    }
    if (!isValidPassword) {
      toast.error("Password must be at least 6 characters long!", { theme: "dark", autoClose: 2000, position: "top-center" });
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      submit(event);
    }
  };

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        name, lastname, email, password
      });
      if (response.data.exist === "true") {
        toast.info("The Email is already registered!", { theme: "dark", autoClose: 2000, position: "top-center" });
      } else if (response.data.exist === "false") {
        const userInfo = { ...response.data._doc, "token": response.data.token };
        Cookies.set("user", response.data.token, { expires: 30 });
        navigate("/");
        updateAuth();
        toast.success(`Registered Successfully! as ${name}`, { theme: "dark", autoClose: 2000, position: "top-center" });
      }
    } catch (error) {
      toast.error("Error Registering!", { theme: "dark", autoClose: 2000, position: "top-center" });
      console.error(error);
    }
  }

  return (
    <>
      <ThemeProvider theme={theme} style={{ marginTop: "5vh" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  Already have an account?
                  <Link to="/login">
                    Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
