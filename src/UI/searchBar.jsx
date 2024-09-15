import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ setQuery}) {
const handleChange =(e)=>{
   setQuery(e.target.value)
}

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60px',
      
      borderRadius: '25px',
//  background: 'radial-gradient(circle, #0c0c0c 0%, #111111 100%)',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      marginTop: '25px',
      padding:'20px'
    }}>
      <TextField
      size='small'
        variant="outlined"
        placeholder="Search..."
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: '#005f03' }} />
            </InputAdornment>
          ),
          style: {
            borderRadius: '25px',
            backgroundColor: '#cecece',
            color: '#000000',
          },
        }}
        style={{
          width: '100%',
          maxWidth: '600px',
          marginRight: '5px',
      

        }}
      />
    </div>
  );
}
