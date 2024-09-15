import React from 'react';
import styled, { keyframes } from 'styled-components';
import Avatar from '@mui/material/Avatar';

const moveBorder = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const BorderAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid transparent;
  box-sizing: border-box;
  pointer-events: none;
  animation: ${moveBorder} 4s linear infinite;
  background: linear-gradient(90deg, transparent, blue, transparent);
  background-size: 200% 200%;
`;

const StyledAvatar = styled(Avatar)`
  width: 100%;
  height: 100%;
`;

const MovingBorderAvatar = ({ src, alt, size = 100 }) => {
  return (
    <Container size={size}>
      <StyledAvatar src={src} alt={alt} />
      <BorderAnimation />
    </Container>
  );
};

export default MovingBorderAvatar;
