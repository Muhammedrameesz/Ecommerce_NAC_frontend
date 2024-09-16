import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignupWithGoogle from "../UI/signupWithGoogle";
import { useCart } from "../store/cartContext";
import LoadingSpinner from "../UI/loadinSpinner.jsx";
import AuthSvg from "../image/Authentication-protected.svg";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .max(30, "Email cannot exceed 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await axios.post("https://ecommerce-nac-backend.onrender.com/user/login", data);
      const token = result.data.token;
      if (token) {
        setTimeout(async () => {
          await login(token);
          toast.success("Successfully signed in");
          navigate("/home");
          setLoading(false);
        }, 2000);
      } else {
        toast.error(result.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred during login");
      setLoading(false);

    }
  };

  const style = {
    color: "#a11616",
    marginLeft: 10,
  };

  return (
    <section>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={{ xs: 4, md: 15 }}
        sx={{ height: "100%", minHeight: "100vh", px: 2 }}
      >
        <Box
          component="img"
          src={AuthSvg}
          alt="Authentication Illustration"
          sx={{
            width: { xs: "80%", sm: "60%", md: "40%" },
            maxWidth: "400px",
            mb: { xs: 4, md: 0 },
          }}
        />

        <Box
          component="form"
          id="loginForm"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: { xs: "90%", sm: "70%", md: "50%", lg: "35%" },
            padding: { xs: "10px", sm: "30px", md: "35px" },
            mt: 5,
            mx: "auto",
            background: "linear-gradient(.25turn, #0F3443, #34E89E)",
            borderRadius: "10px",
            boxShadow:
              "0 0 10px 0 rgba(0,0,0,0.2), 0 0 4px 0 rgba(0,0,0,0.14), 0 4px 8px 0 rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
        >
          <Stack direction={"column"} spacing={2} padding={1}>
            <Typography
              variant="h5"
              textAlign={"center"}
              sx={{ color: "black" }}
            >
              <LockIcon style={{ fontSize: "18px" }} />
              Login
            </Typography>

            <TextField
              id="email"
              label="Email"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
            />
            {errors.email && (
              <FormHelperText sx={{ color: "#920606" }}>
                {errors.email.message}
              </FormHelperText>
            )}

            <TextField
              id="password"
              label="Password"
              variant="outlined"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <FormHelperText sx={{ color: "#920606" }}>
                {errors.password.message}
              </FormHelperText>
            )}
            <Button
              type="submit"
              variant="outlined"
              sx={{
                backgroundColor: "black",
                transition: "all 0.5s ease",
                fontWeight: "bold",
                borderRadius: "10px",
                boxShadow:
                  "0 0 10px 0 rgba(0,0,0,0.2), 0 0 4px 0 rgba(0,0,0,0.14), 0 4px 8px 0 rgba(0,0,0,0.12)",
                "&:hover": {
                  backgroundColor: "black",
                  color: "#ebe0e0",
                },
              }}
            >
              {loading ? <LoadingSpinner /> : "Login"}
            </Button>

            <Typography sx={{ color: "black", textAlign: "center", mt: 2 }}>
              Create a new account?
              <Link to={"/"}>
                <b
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    transition: "all 0.5s ease",
                  }}
                >
                  Signup
                </b>
              </Link>
            </Typography>

            <SignupWithGoogle />
          </Stack>
        </Box>
      </Stack>
      <br /> <br />
    </section>
  );
}

export default Login;
