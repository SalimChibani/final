import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { tokens } from "../../../theme"
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/actions/authActions';
import Toast from "react-hot-toast";


export default function Login() {
  const currentTheme = useTheme();
  const customTokens = tokens(currentTheme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email: data.get('email'),
        password: data.get('password')
      })
      if (response.status ==200 && !response.data.error) {
        Toast.success('User logged in successfully')
        dispatch(loginSuccess(response.data));
        switch (response.data.userInfo.role) {
          case 'ADMIN':
            navigate('/admin/dashboard');
            break;
          case 'USER':
            navigate('/user/dashboard');
            break;
        }
      }
      else {
        Toast.error(response.data.error);
        setError(response.data.error);
      }

    }
    catch (err) {
      console.log(err);
    }
  };

  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',

            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#4FD1C5" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Grid item>
            {"If you don’t have an account register?  You can"}
                <Link href="/register" variant="body2" color="#4FD1C5">
                  {"   Register here !"}
                </Link>
              </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,  bgcolor: "#4FD1C5",'&:hover': { bgcolor: "#4FD1C5" } }}
            >
             Login
            </Button>
            <Grid container>
              {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
             
            </Grid>
          </Box>
        </Box>
        
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("/assets/a.png")',
          backgroundRepeat: 'no-repeat',
          backgroundColor: customTokens.greenAccent[600], borderBottom: "none",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>

  );
}