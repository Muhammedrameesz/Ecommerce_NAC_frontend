import { Box, Stack } from '@mui/material'
import React from 'react'
import Video from "../asset/5173766-uhd_2560_1440_30fps.mp4"

export default function homeVideo() {
  return (
    <>
    <Box >
        <Stack>
             <video autoPlay loop muted  style={{
            position:'absolute',
            width:'100%',
            // height:'75%',
            objectFit:'cover',
            zIndex:'-1',
            opacity:'0.5',
           
                
          
           }}  >
             <source src={Video} type='video/mp4' />
           </video>
       
        </Stack>
        
    </Box>
  
    
    
    </>
  )
}
