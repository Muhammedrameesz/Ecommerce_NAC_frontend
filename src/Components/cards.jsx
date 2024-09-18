import React, { useState } from "react";
import Cards from "../cardData/cardData.json";
import { CardContent, Typography, Box, Grid } from "@mui/material";
import Video from "../asset/5173766-uhd_2560_1440_30fps.mp4";

export default function CardsComponent() {
  const [flippedCards, setFlippedCards] = useState(
    Array(Cards.length).fill(false)
  );

  const handleCardClick = (index) => {
    setFlippedCards((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          mb: "5%",
          
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "-1",
            opacity: "0.5",
          }}
        >
          <source src={Video} type="video/mp4" />
        </video>
        <Grid container spacing={5} sx={{ p: "5%" }}>
          {Cards.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index} sx={{
              display:'flex',
              alignItems:'center',
              justifyContent:'space-around',
              mb:{xs:5,md:0},
              mr:{xs:4,md:1}
            }}>
              <Box
                sx={{
                  perspective: "1000px",
                }}
              >
                <Box
                  sx={{
                    width:{xs:300,md:200} ,
                    height:{xs:230,md:300},
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform: flippedCards[index]
                      ? "rotateY(-180deg)"
                      : "rotateY(0deg)",
                    transition: "transform 2s",
                    backgroundColor: "black",
                    borderRadius: "10px",
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  {/* Front Side */}
                  <CardContent
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      backfaceVisibility: "hidden",
                      backgroundColor: "black",
                      color: "purple",
                      border: "2px solid #adadad",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: flippedCards[index] ? 0 : 1,
                      boxShadow: "5px 5px 5px 0px rgba(240, 11, 183, 0.3)",
                      transition: "opacity 2s",
                      ":hover": {
                        cursor: "pointer",
                        boxShadow: "5px 5px 5px 0px rgba(240, 11, 183, 0.3)",
                        filter:
                          "drop-shadow(5px 5px 5px rgba(212, 19, 230, 0.3))",
                      },
                    }}
                  >
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      align="center"
                      variant="body2"
                      sx={{ color: "#b9b9b9" }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>

                  {/* Back Side */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      border: "2px solid #fff",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundColor: "black",
                      borderRadius: "10px",
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: flippedCards[index] ? 1 : 0,
                      transition: "opacity 2s",
                      boxShadow: "5px 5px 5px 0px rgba(240, 11, 183, 0.3)",
                      ":hover": {
                        cursor: "pointer",
                        boxShadow: "5px 5px 5px 0px rgba(240, 11, 183, 0.3)",
                        filter:
                          "drop-shadow(5px 5px 5px rgba(212, 19, 230, 0.3))",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
