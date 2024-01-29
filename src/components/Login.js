import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

const LoginForm = ({ onLogin, onShowSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'black', // Ensure the overall background is black
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>Login</Typography>
      <TextField
        placeholder="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ 
          mb: 2, 
          backgroundColor: 'black', // Set the text field background to black
          color: 'white', // Text color
          borderRadius: '25px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // Border color
              borderRadius: '25px',
            },
            '& input': {
              color: 'white', // Text color
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '10px', // Adjust padding as needed
          },
          '& .MuiOutlinedInput-placeholder': {
            color: 'white', // Placeholder text color
          },
          '& .MuiInputBase-input': {
            '&::placeholder': {
              color: 'white', // Placeholder text color
              opacity: 1, // Full opacity
            },
          },
        }}
        InputLabelProps={{
          style: { color: 'white' }, // Label color
        }}
      />
      <TextField
        placeholder="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ 
          mb: 2, 
          backgroundColor: 'black', // Set the text field background to black
          color: 'white', // Text color
          borderRadius: '25px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // Border color
              borderRadius: '25px',
            },
            '& input': {
              color: 'white', // Text color
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '10px', // Adjust padding as needed
          },
          '& .MuiOutlinedInput-placeholder': {
            color: 'white', // Placeholder text color
          },
          '& .MuiInputBase-input': {
            '&::placeholder': {
              color: 'white', // Placeholder text color
              opacity: 1, // Full opacity
            },
          },
        }}
        InputLabelProps={{
          style: { color: 'white' }, // Label color
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#8BC34A',
          borderRadius: '50%',
          width: "80px",
          height: "80px",
          minWidth: "0",
          '&:hover': {
            backgroundColor: '#8BC34A',
            boxShadow: '0 0 10px 3px #8BC34A',
          },
        }}
      >
        Login
      </Button>

      <Typography sx={{ mt: 2, color: 'white' }}>
      New user?&nbsp;
        <Link 
          href="#"
          onClick={(e) => { e.preventDefault(); onShowSignup(); }}
          sx={{ color: '#8BC34A', cursor: 'pointer' }}
        >
          Signup
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
