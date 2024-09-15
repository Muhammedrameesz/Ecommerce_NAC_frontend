import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Example() {
 
  const items = [
    {
      src: "https://www.shutterstock.com/shutterstock/photos/208932679/display_1500/stock-photo-sofia-bulgaria-may-collection-of-various-brands-of-soda-drinks-in-aluminum-cans-208932679.jpg",
      name: "Pepsi",
      description: "Probably the most random thing you have ever seen!",
    },
  
    {
      src: "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Pepsi",
      description: "Probably the most random thing you have ever seen!",
    },
    
    
    {
      src: "https://images.pexels.com/photos/4113682/pexels-photo-4113682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Random Name #2",
      description: "Hello World!",
    },
    {
      src: "https://images.pexels.com/photos/17849586/pexels-photo-17849586/free-photo-of-hat-and-blanket-on-chair-on-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Random Name #2",
      description: "Hello World!",
    },
    
    {
      src: "https://images.pexels.com/photos/4061441/pexels-photo-4061441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];
  
  return (
    <Carousel
      sx={{
        mt: "5%",
        mb:'5%',
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      navButtonsAlwaysVisible
      indicators={false}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item({ item }) {
  const navigate=  useNavigate();
  return (
    <Paper
    sx={{
      width: "90%",
      height: "auto",
      aspectRatio: "16/6",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      margin: "20px auto", // Center the Paper and add margin
      // borderRadius: "5%", // Add border radius
    }}
  >
    <img
      src={item.src}
      alt={item.name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover", // Ensures image covers the container while maintaining aspect ratio
        position: "absolute",
        // borderRadius: "5%", // Add border radius to the image
        // opacity: 0.5,
      }}
    />
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "20px",
        borderRadius: "5%",   // Add border radius to the overlay
      }}
    >
      <Typography variant="h4" component="div" sx={stylesTypo}>
        {item.name}
      </Typography>
      <Typography variant="body1" component="div" style={{ marginBottom: "10px",fontWeight:'bold' }}>
        {item.description}
      </Typography>
      <Button variant="contained" sx={{
        backgroundColor: "#0d0e0d",
        color: "white",
        borderRadius: "5px",
        "&:hover": {
          backgroundColor: "#252725",
        },
      
      }}
      onClick={()=>navigate('/products')}
      >
        Learn More
      </Button>
    </div>
  </Paper>
  );
}

export default Example;

const stylesTypo = {
  color: "#eee5e5",
  fontWeight: "bold",
};