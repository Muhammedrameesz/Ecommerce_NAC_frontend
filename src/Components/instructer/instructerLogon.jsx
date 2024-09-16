import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import useInstructerAuthStore from "../../store/InstructerAuthStore";
import LockIcon from "@mui/icons-material/Lock";
import LoadingSpinner from "../../UI/loadinSpinner.jsx";
import AuthSvg from "../../image/auth protect.svg";  // Import the SVG

export default function InstructerLogin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { instructer } = useInstructerAuthStore();
  const [loading, setLoading] = useState(false);

  const ondata = async (data) => {
    setLoading(true);
    try {
      const result = await axios.post(
        "https://ecommerce-nac-backend.onrender.com/instructer/login",
        data
      );
      console.log(result.data);
      const tokens = result.data.tokens;
      if (tokens) {
        setTimeout(async () => {
          await instructer(tokens);
          toast.success("Successfully logged in");
          navigate("/admin-dashboard");
          setLoading(false);
        }, 2000);
      } else {
        setTimeout(() => {
          toast.error("Login failed");
          navigate("/instructer");
          reset();
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
      setLoading(false);

    }
  };

  const style = {
    color: "#ec2805",
    marginLeft: 10,
  };

  return (
    <>
      <section>
        <form id="signUpForm" onSubmit={handleSubmit(ondata)}>
          <Box
            width={{ xs: "90%", md: "70%" }}  
            mt={5}
            ml={{ xs: "5%", md: "15%" }}  
            sx={{
              background: "linear-gradient(.25turn, #0F3443, #5adfa8)",

              borderRadius: "10px",
              boxShadow:
                "0 0 10px 0 rgba(0,0,0,0.2), 0 0 4px 0 rgba(0,0,0,0.14), 0 4px 8px 0 rgba(0,0,0,0.12)",
              overflow: "hidden",
            }}
          >
            
            <Stack
              direction={{ xs: "column", md: "row" }} 
              spacing={2}
              alignItems="center"
              justifyContent="space-around"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flex={1}  
                p={3}
              >
                <img src={AuthSvg} alt="Authentication Illustration" width="100%" />
              </Box>

              {/* Form elements */}
              <Stack
                direction={"column"}
                maxWidth={{ xs: "90%", md: "50%" }}  
                spacing={2}
                flex={1}  
                px={3}
                py={4}
              >
                <Typography
                  variant="h5"
                  textAlign={"center"}
                  sx={{ color: "black", pt: "20px" }}
                >
                  <LockIcon
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      fontSize: "18px",
                    }}
                  />
                  Instructer-Login
                </Typography>

                <TextField
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                  {...register("email", {
                    required: true,
                    maxLength: 30,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                />

                {errors.email && errors.email.type === "required" && (
                  <span style={style}>This column is required.....</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span style={style} className="errorMsg">
                    Email is not valid.
                  </span>
                )}

                <TextField
                  id="outlined-basic"
                  label="password"
                  variant="outlined"
                  {...register("password", { required: true, minLength: 6 })}
                />

                {errors.password && errors.password.type === "required" && (
                  <span style={style}>This column is required.....</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span style={style} className="errorMsg">
                    Password should be at-least 6 characters.
                  </span>
                )}
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    backgroundColor: "black",
                    transition: "all 0.5s ease",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    color: "#ebe0e0",
                    boxShadow:
                      "0 0 10px 0 rgba(0,0,0,0.2), 0 0 4px 0 rgba(0,0,0,0.14), 0 4px 8px 0 rgba(0,0,0,0.12)",
                    overflow: "hidden",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "#b4b4b4",
                      border:'none'
                    },
                    
                  }}
                >
                  {loading ? <LoadingSpinner /> : "Submit"}
                </Button>
                <Typography
                  variant="span"
                  textAlign={"center"}
                  sx={{ color: "#a3081c", fontWeight: "bold", fontSize: "13px" }}
                >
                  Only Instructer Can Access This..
                </Typography>

                {/* <div style={{ color: "black",display:'flex',justifyContent:'center',alignItems:'center' ,fontFamily:'helvicta'}}>
                  <div style={{ marginBottom: "10px"   }}>
                    Back to signup?
                    <Link to={"/"}>
                      <b
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          textDecoration: "underline",
                          color:'#0c0c0c'
                        }}
                      >
                        Signup
                      </b>
                    </Link>
                  </div>
                </div> */}
              </Stack>
            </Stack>
          </Box>
        </form>
      </section>
    </>
  );
}
