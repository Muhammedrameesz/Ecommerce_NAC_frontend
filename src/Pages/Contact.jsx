import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Footer from "../Components/footer.jsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Accordion from "../Components/accordian.jsx";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onData = async (data) => {
    setLoading(true);
    try {
      const result = await axios.post(
        "https://ecommerce-nac-backend.onrender.com/user/message",
        data
      );
      if (result.status===200) {
        setTimeout(() => {
        toast.success("Message sent successfully")
        reset();
        setLoading(false);
      }, 2500);
      }
    } catch (error) {
      setTimeout(()=>{
        console.log("error", error);
        toast.error("Error sending message");
        setLoading(false);

      },2500)
   
    } 
  };

  return (
    <>
      <Box
        sx={{
          padding: "8%",
          backgroundImage:
            "url(https://img.freepik.com/premium-vector/silhouette-man-drinking-water-drinking-water-benefits-illustration-isolated-white-background_529206-84.jpg?w=740)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
        }}
      >
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <Stack sx={{ width: "100%" }} direction={"column"}>
              <Typography
                sx={{
                  marginTop: "30px",
                  fontFamily: "Courier New",
                  color: "blue",
                  fontWeight: "bold",
                }}
                variant="h3"
              >
                Contact Me!
              </Typography>
              <Typography
                sx={{
                  marginTop: "30px",
                  fontFamily: "Courier New",
                  color: "#000",
                  fontWeight: "bold",
                }}
                variant="h5"
              >
                Have any questions? Fill out the form and I’ll get you a
                response soon!
              </Typography>
              <Typography
              
                sx={{
                  marginTop: "30px",
                  fontFamily: "Courier New",
                  color: "#000",
                  fontWeight: "bold",
                }}
              >
                Feel free to ask/inquire anything about our products and
                services. Hoping to be a resource and be of help in your journey
                in any way possible.
              </Typography>
              <Typography
                sx={{
                  marginTop: "10px", // Adjust margin if needed
                  fontFamily: "Courier New",
                  color: "#000",
                  fontWeight: "bold",

                }}
              >
                Similarly, please use this form or email me directly if your
                message regards a NIL opportunity.
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} sx={{mt:{xs:1,md:10}}}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "#1d1b1bcc",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
                boxShadow:
                  "box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;",
              }}
            >
              <form onSubmit={handleSubmit(onData)}>
                <Typography
                  variant="h5"
                  component="h2"
                  align="center"
                  gutterBottom
                  sx={{
                    textTransform: "uppercase",
                    color: "#fff",
                    fontSize: { xs: "16px", md: "18px" },
                  }}
                >
                  Contact Form!
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    width: "100%",
                  }}
                >
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    {...register("name", { required: true })}
                    InputProps={{
                      style: {
                        color: "white",
                        borderColor: "white",
                      },
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                      },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...register("email", { required: true })}
                    InputProps={{
                      style: {
                        color: "white",
                        borderColor: "white",
                      },
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                      },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                  />
                  <TextField
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    {...register("message", { required: true })}
                    InputProps={{
                      style: {
                        color: "white",
                        borderColor: "white",
                      },
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                      },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    sx={{
                      backgroundColor: "#201d53",
                      color: "#fff",
                      transition: "all 0.5s ease-in-out",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px", // Add some space between spinner and text
                      "&:hover": {
                        backgroundColor: "#201d53",
                        color: "#fff",
                        transform: "scale(1.01)",
                      },
                    }}
                  >
                    {loading && (
                      <CircularProgress size={24} sx={{ color: "#dfdfdf" }} />
                    )}
                    {!loading && "Send Message"}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack
              direction={{xs:'column',md:'row'}}
              spacing={{xs:5,md:10}}
              sx={{
                backgroundColor: "#000000cc", 
                padding:{xs:'6px',md:'20px'},
                borderRadius: "10px",
              }}
              width={'100%'}
            >
             
              <Stack sx={{ pt: "2%" }}>
                <Typography
                  style={{
                    color: "blue",
                    fontSize: "small",
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: "0.8",
                    fontFamily: "cursive",
                    borderBottom: "1px solid #000",
                    letterSpacing: "10px",
                  }}
                >
                  MAIN OFFICE
                </Typography>
                <Typography
                  style={{
                    fontSize: "small",
                    textAlign: "center",
                    opacity: "0.8",
                    fontFamily: "cursive",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Nirappam, near hospital road,
                </Typography>
                <Typography
                  style={{
                    fontSize: "small",
                    textAlign: "center",
                    opacity: "0.8",
                    fontFamily: "cursive",
                    color: "#fff",

                    fontWeight: "bold",
                  }}
                >
                  Sulthan Bathery, Wayanad,
                </Typography>
                <Typography
                  style={{
                    fontSize: "small",
                    textAlign: "center",
                    opacity: "0.8",
                    fontFamily: "cursive",
                    color: "#fff",

                    fontWeight: "bold",
                  }}
                >
                  Kerala, India,
                </Typography>
                <Typography
                  style={{
                    fontSize: "small",
                    textAlign: "center",
                    opacity: "0.8",
                    fontFamily: "cursive",
                    color: "#fff",

                    fontWeight: "bold",
                  }}
                >
                  +91 9999999999
                </Typography>
              </Stack>

              <Stack sx={{ pt: "2%" }}>
                <Typography
                  style={{
                    color: "blue",
                    fontSize: "small",
                    fontWeight: "bold",
                    textAlign: "center",
                    opacity: "0.8",
                    fontFamily: "cursive",
                    borderBottom: "1px solid #000",
                    letterSpacing: "10px",
                  }}
                >
                  SUB OFFICE
                </Typography>
                <Typography
                  style={{
                    fontSize: "small",
                    textAlign: "center",
                    opacity: "0.8",
                    fontFamily: "cursive",
                    color: "#fff",

                    fontWeight: "bold",
                  }}
                >
                  Kalloor,Mysure road,
                </Typography>
                <Typography
                  style={{
                    fontSize: "small",
                    textAlign: "center",
                    opacity: "0.8",
                    fontFamily: "cursive",
                    color: "#fff",

                    fontWeight: "bold",
                  }}
                >
                  Sulthan Bathery, Wayanad,
                </Typography>
                <Typography
                  style={{
                    fontSize: "small",
                    textAlign: "center",
                    opacity: "0.8",
                    fontFamily: "cursive",
                    color: "#fff",

                    fontWeight: "bold",
                  }}
                >
                  Kerala, India,
                </Typography>
                <Typography
                  style={{
                    fontSize: "small",
                    textAlign: "center",
                    opacity: "0.8",
                    fontFamily: "cursive",
                    color: "#fff",

                    fontWeight: "bold",
                  }}
                >
                  +91 9999999999
                </Typography>
              </Stack>
              <Paper
                elevation={3}
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.4013813594574!2d76.3143819105501!3d11.665940388494361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6076ccce4c3a5%3A0x76dde8fa8cd0f14b!2sNANMA%20Polution%20Testing%20centre!5e0!3m2!1sen!2sin!4v1718976843164!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  frameBorder="0"
                  title="Google Maps Embed"
                ></iframe>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </>
  );
}
