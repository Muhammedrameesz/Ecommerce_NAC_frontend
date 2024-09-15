import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ setQuery }) {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60px',
      borderRadius: '25px',
      marginBottom: '20px',
      marginTop: '10px',
      padding: '0 40px',
    }}>
      <TextField
        size="small"
        variant="outlined"
        placeholder="Search..."
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: '#4CAF50' }} />
            </InputAdornment>
          ),
          style: {
            borderRadius: '25px',
            backgroundColor: '#1f1d1d',
            color: '#fff',
          },
        }}
        sx={{
          width: '100%',
          maxWidth: '600px',
          marginRight: '5px',
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#b8b8b8', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#08792a',
            },
            '& input': {
              color: '#b8b8b8', // Change this to your desired font color
            },
          }
          
        }}
      />
    </div>
  );
}
