import { Box, Button, Grid, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../store/cartContext";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Footer from "../Components/footer.jsx"

export default function ProductDetails() {
  const [item, setItem] = useState([]);
  const [data, setData] = useState([]);
  const { addToCart } = useCart();
  const [review, setReview] = useState([]);

  let { id } = useParams();

  const product = async () => {
    try {
      const result = await axios.get(
        `https://ecommerce-nac-backend.onrender.com/product/get-product/${id}`
      );
      setItem(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const rateAndReview = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-nac-backend.onrender.com/rateAndReview/getReview/${id}`
      );
      if (response.status === 200) {
        setReview(response.data.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    product();
    rateAndReview();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          "https://ecommerce-nac-backend.onrender.com/product/get-product"
        );

        setData(result.data.slice(1, 6));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Box
  sx={{
    m: { xs: 1, md: 3 },
    ml: { xs: 3,sm:10, md: 30 },
    textAlign: "center",
    width: { xs: "90%",sm:'80%',md:'70%', lg: "60%" },
    justifyContent: "center",
    alignItems: "center",
    mb: 15,
    mt: 5,
  }}
>
  <Card
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: "black",
      color: "#fff",
      border: "1px solid #353232",
      "&:hover": {
        boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",
        filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))",
      },
    }}
  >
    <CardMedia
      component="img"
      sx={{
        width: { xs: "100%", sm: '80%', md: "50%", lg: '40%' },
        height: { xs: "200px", sm: "250px", md: "300px" },
        padding: { xs: "5px", sm: "10px" },
        objectFit: "fill",
        objectPosition: "center",
      }}
      image={item.image}
      alt="Product Image"
    />

    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: { xs: "100%", md: "50%" },
        padding: { xs: 2, sm: 3 },
      }}
    >
      <Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ color: "#cecece", fontSize: { xs: '1rem', sm: '1.25rem' } }}
        >
          {item.title}
        </Typography>
        <Typography
          sx={{ textAlign: "center", color: "#cecece" }}
          gutterBottom
          variant="body2"
          component="div"
        >
          {item.productQuantity}
        </Typography>
        <Typography variant="body2" sx={{ color: "#cecece" }}>
          <CurrencyRupeeIcon
            style={{ fontSize: "14px", color: "#cecece" }}
          />
          {item.price}
        </Typography>
        <Typography variant="body2" sx={{ color: "#cecece", mt: 1 }}>
          {item.description}
        </Typography>
      </Box>

      <Stack
        spacing={2}
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          mt: { xs: 2, md: 3 },
        }}
      >
        <Button
          className="addtocartbtn"
          onClick={() => addToCart(item)}
          type="submit"
          size="small"
          variant="outlined"
          sx={{
            fontWeight: "bold",
            transition: "all 0.5s ease",
            "&:hover": {
              color: "#fff",
            },
          }}
        >
          <ShoppingCartIcon /> Add to Cart
        </Button>
      </Stack>
    </CardContent>
  </Card>
</Box>


      {/* <hr style={{ width: "90%", border: "1px dashed #a09898 " }} /> */}

      <Box
        sx={{
          // bgcolor: "#000000",
          m: 5,
          p: 5,
          borderRadius:'15px',
          border:'1px solid #252525',
          mb:8
        }}
      >
        <Stack>
          <Typography variant={"h5"} sx={{ textAlign: "center", mb: 6,color:'#9b9b9b' }}>
            Rate And Reviews
          </Typography>
          {review.length === 0 ? (
            <>
              <Typography>No reviews</Typography>
            </>
          ) : (
            <>
              <Grid container spacing={3}>
                {review.map((item, i) => (
                  <Grid item xs={12} md={6} lg={4} key={item._id || i}>
                    <Stack
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 4,
                        p: 2,
                        boxShadow: "0 4px 8px rgba(22, 22, 22, 0.6)",
                        borderRadius: "10px",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "0.95rem",
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            borderRadius: "8px",
                            padding: "4px 8px",
                            marginRight: "10px",
                            backgroundColor: "#24940e",
                            color: "#fff",
                            fontSize: "0.85rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {item.rating}
                          <StarRateRoundedIcon
                            sx={{
                              fontSize: "1rem",
                              color: "#fff",
                              ml: "4px",
                            }}
                          />
                        </span>
                        {item.review}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "0.85rem", color: "#a8a8a8" }}
                      >
                        {item.userEmail}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Stack>
      </Box>

      <Typography variant="h4" style={{textAlign:'center',color:'#a3a3a3' }}>
        Popular Products
      </Typography>
      <Box alignItems={"center"} textAlign={"center"} m={3}>
        <Stack>
          <Grid container spacing={3}>
            {data.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/product/${item._id}`}
                >
                  <Card
                     sx={{
                      width: "auto",
                      backgroundImage: 'linear-gradient(147deg, #1d1d1d 0%, #0a0a0a 74%)',
                      color: "#afafaf",
                      borderRadius: "10px",
                      transition: "all 0.30s",
                      padding: 2,
                      ":hover": {
                        transform: "translatey(-10px)",
                        transition: "all 0.30s",
                        cursor: "pointer",
                        boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",
                        filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))",
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                      sx={{
                        objectFit:'fill'
                      }}
                        component="img"
                        height="140"
                        image={item.image}
                        alt="green iguana"
                        
                        
                      />
                      <CardContent>
                        <Typography
                          sx={{ textAlign: "center", color: "#cecece" }}
                          gutterBottom
                          variant="h6"
                          component="div"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{ textAlign: "center", color: "#cecece" }}
                          gutterBottom
                          variant="body2"
                          component="div"
                        >
                          {item.productQuantity}
                        </Typography>
                        <Typography
                          sx={{ textAlign: "center", color: "#cecece" }}
                          variant="p"
                          component="div"
                        >
                          <CurrencyRupeeIcon
                            sx={{ fontSize: "small", color: "#cecece" }}
                          />{" "}
                          {`${item.price}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}
