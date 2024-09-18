import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import LockIcon from "@mui/icons-material/Lock";
import SignupWithGoogle from "../UI/signupWithGoogle";
import LoadingSpinner from "../UI/loadinSpinner.jsx";
import AuthSvg from "../image/Authentication-protected.svg";

const schema = yup.object().shape({
  firstname: yup
    .string()
    .min(3, "First name must be at least 3 characters long")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "First name can only contain letters and numbers"
    )
    .required("First name is required"),
  lastname: yup
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .matches(/^[a-zA-Z0-9]+$/, "Last name can only contain letters and numbers")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(24, "Password cannot be longer than 24 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    )
    .required("Password is required"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { signup } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onsave = async (data) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const result = await axios.post(
          "https://ecommerce-nac-backend.onrender.com/user/signup",
          data
        );
        const token = result.data.token;
        if (token) {
          await signup(token);
          toast.success("Successfully Signed up");
          navigate("/home");
        } else {
          toast.error("This account already exists");
          reset();
        }
      } catch (error) {
        console.log(error);
        toast.error("Signup failed");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        // justifyContent="center"
        sx={{ height: "100%", minHeight: "100vh", px: 2,mb:{ xs: 10, md: 5 } }}
        spacing={{xs:4,md:15}}
      >
        <Box
          component="img"
          src={AuthSvg}
          alt="auth svg"
          sx={{
            width: { xs: "80%", sm: "60%", md: "40%" },
            maxWidth: "400px",
            mb: { xs: 4, md: 0 },
          }}
        />

        <Box
          component="form"
          id="signupForm"
          onSubmit={handleSubmit(onsave)}
          sx={{
            width: { xs: "90%", sm: "80%", md: "50%", lg: "35%" },
            padding: { xs: "10px", sm: "30px", md: "35px" },
            background: "linear-gradient(.25turn, #0F3443, #34E89E)",
            borderRadius: "10px",
            boxShadow:
              "0 0 10px 0 rgba(0,0,0,0.2), 0 0 4px 0 rgba(0,0,0,0.14), 0 4px 8px 0 rgba(0,0,0,0.12)",
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ color: "black", mb: 2 }}
            >
              <LockIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Sign-Up
            </Typography>

            <TextField
              id="firstname"
              label="First Name"
              fullWidth
              variant="outlined"
              {...register("firstname", { required: true })}
              error={!!errors.firstname}
            />
            {errors.firstname && (
              <FormHelperText sx={{ color: "#920606" }}>
                {errors.firstname.message}
              </FormHelperText>
            )}

            <TextField
              id="lastname"
              label="Last Name"
              fullWidth
              variant="outlined"
              {...register("lastname", { required: true })}
              error={!!errors.lastname}
            />
            {errors.lastname && (
              <FormHelperText sx={{ color: "#920606" }}>
                {errors.lastname.message}
              </FormHelperText>
            )}

            <TextField
              id="email"
              label="Email"
              fullWidth
              variant="outlined"
              {...register("email", { required: true })}
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
              fullWidth
              variant="outlined"
              {...register("password", { required: true })}
              error={!!errors.password}
              type={showPassword ? "text" : "password"}
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
              {loading ? <LoadingSpinner /> : "SignUp"}
            </Button>

            <Typography
              sx={{ color: "black", textAlign: "center", mt: 2 }}
            >
              Already have an account?
              <Link to={"/login"}>
                <b
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    transition: "all 0.5s ease",
                  }}
                >
                  Login
                </b>
              </Link>
            </Typography>

            <SignupWithGoogle />
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
