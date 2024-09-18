import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import useInstructerAuthStore from "../../store/InstructerAuthStore";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingSpinner from "../../UI/loadinSpinner.jsx";
import AuthSvg from "../../image/auth protect.svg";

export default function InstructerLogin() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { instructer } = useInstructerAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const ondata = async (data) => {
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:5000/instructer/login", data);
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
      reset();
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const style = {
    color: "#ec2805",
    marginLeft: 10,
  };

  return (
    <>
      <Box>
        <form id="signUpForm" onSubmit={handleSubmit(ondata)}>
          <Box
              width={{ xs: "80%", sm: "80%", md: "80%" }}  
              mt={{ xs: 4, md: 3, lg: 3 }}
              ml={{ xs: "10%", sm: "8%", md: "7%" }}  // Increase margin-left for xs and sm screens
              mr={{ xs: "5%", sm: "0", md: "2%" }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems="center"
              justifyContent="space-around"
            >
              <Stack
                direction={"column"}
                width={{ xs: "100%", sm: "80%", md: "50%" }} // Set responsive width
                spacing={2}
                flex={1}
                px={3}
                py={4}
                sx={{
                  background: "linear-gradient(.25turn, #c8c9c9 , #7ec0c0)",
                  borderRadius: "10px",
                  boxShadow:
                    "0 0 10px 0 rgba(0,0,0,0.2), 0 0 4px 0 rgba(0,0,0,0.14), 0 4px 8px 0 rgba(0,0,0,0.12)",
                  overflow: "hidden",
                }}
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
                  Instructor Login
                </Typography>

                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  {...register("email", {
                    required: true,
                    maxLength: 30,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email && errors.email.type === "pattern" && "Invalid email format"
                  }
                />

                {errors.email && errors.email.type === "required" && (
                  <span style={style}>This field is required</span>
                )}

                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true, minLength: 6 })}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password && errors.password.type === "minLength" && "Password must be at least 6 characters"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {errors.password && errors.password.type === "required" && (
                  <span style={style}>This field is required</span>
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
                      border: "none",
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
                  Only instructors can access this.
                </Typography>
              </Stack>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flex={1}
                p={3}
              >
                <img src={AuthSvg} alt="Authentication Illustration" width="90%" />
              </Box>
            </Stack>
          </Box>
        </form>
      </Box>
    </>
  );
}
