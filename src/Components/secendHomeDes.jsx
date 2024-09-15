import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

export default function SecendHomeDes() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  let fontSize = '20px';
  let padding = '20px';
  let margin = '10%';

  if (isXs) {
    fontSize = '12px';
    padding = '10px';
    margin = '5%';
  } else if (isSm) {
    fontSize = '14px';
    padding = '15px';
    margin = '7%';
  } else if (isMd) {
    fontSize = '16px';
    padding = '18px';
    margin = '8%';
  } else if (isLg) {
    fontSize = '20px';
    padding = '20px';
    margin = '10%';
  }

  return (
    <Box
      sx={{
        mt: '3%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // backgroundAttachment: 'fixed',
        backgroundBlendMode: 'darken',
        backgroundClip: 'border-box',
        backgroundOrigin: 'border-box',
        height: '60vh',
        width: 'auto',
        overflowX:'hidden'
      }}
    >
      <Stack
        sx={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        overflowX:'hidden'

        }}
      >
        <Typography
          variant="h6"
          sx={{
            m: margin,
            textAlign: 'center',
            maxWidth: '90%',
            padding: padding,
            fontSize: fontSize,
            fontWeight: 'bold',
            color: '#070707',
            border: '1px solid #494545',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px #000000',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          "Quench your thirst for life's adventures with NAC Distributions – where every sip and bite is a journey of flavor and delight. Embrace refreshment, indulge in quality, and elevate your everyday moments with us."
        </Typography>
      </Stack>
    </Box>
  );
}