import * as React from 'react';
import {useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { AppState } from '../App';
import axios from 'axios'
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();
  
  export default function Login() {
    const [email,setEmail]= useState("");
    const [password, setPassword] = useState("");
    const {login,updateAuth} = useContext(AppState);
    const history = useNavigate();
    
    async function submit(e){
      e.preventDefault();
      try{
          const res = await axios.post("http://localhost:8000/auth/login", {
             email, password,
            });
            if (res.data.email===email) {
              const { name } = res.data;
              localStorage.setItem("token",res.data.token);
              Cookies.set("user",res.data.token,{expires:30});
              updateAuth();
              history("/");
              toast.success(`Logged in Successfully as ${name}`);
            }
          if(res.data==="Incrorrect"){
              toast.error("Email and Password doesn't match!")
              return;
          }
          if(res.data==="notexist"){
              toast.error("This email is not registered! SignUp to register");
              return;
          }
      }
      catch(e){
          toast.error("Login Error!")
      }
    }
    return (<>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" style={{backgroundColor:'#efefef'}}>
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
              Sign in
            </Typography>
              <Box component="form" action="POST" noValidate sx={{ mt: 1 }}>
              <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e)=>{setEmail(e.target.value)}}
              autoComplete="email"
              autoFocus
              />
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={(e)=>{setPassword(e.target.value)}}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"/>
                {/* <input type= "email" name="email" onChange={(e)=>{setEmail(e.target.value)}} id = 'email' required/>
              //     <br/>
              //     <input type= "password" name="password" onChange={(e)=>{setPassword(e.target.value)}} id = 'password' required/>
              //     <br/> */}
  
               {/* <ToastContainer> */}
              <Button type="submit"
                onClick={submit}
                value="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>Sign In</Button>
              {/* </ToastContainer> */}
              <Grid container>
                {/* <Grid item xs>
                  <Link to="/">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                Don't have an account?
                  <Link to="/register">
                    {" Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
          </Box>
        </Container>
          </ThemeProvider>
          </>
    )
  }