import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Box from '@mui/material/Box';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableCard() {
  const cards = [
    { id: 1, content: 'Card 1' },
    { id: 2, content: 'Card 2' },
    { id: 3, content: 'Card 3' },
  ];

  return (
    <Box sx={{ width: '80%', margin: '0 auto' }}>
      <AutoPlaySwipeableViews interval={10000} enableMouseEvents>
        {cards.map((card) => (
          <Box
            key={card.id}
            sx={{
              height: '300px',
              backgroundColor: '#333',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.5rem',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              margin: '10px',
            }}
          >
            {card.content}
          </Box>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default SwipeableCard;
