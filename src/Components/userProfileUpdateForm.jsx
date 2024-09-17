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
import useAuthStore from "../store/authStore";
import LodingSpinner from "../UI/loadinSpinner.jsx";

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

export default function UserProfileUpdateForm({
  profile,
  fetchUserDetails,
  getUserDetails,
  handleClose,
}) {
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
    try {
      const result = await axios.post(
        "https://ecommerce-nac-backend.onrender.com/user/update/editUser",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (result.status === 200) {
        setTimeout(async () => {
          await getUserDetails();
          await handleClose();
          toast.success("User updated successfully");
          setLoading(false);
        }, 3000);
      } else {
        toast.error("This account already exists");
        setLoading(false);
        await handleClose();
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user");
      reset();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onsave)}
      sx={{
        padding: "20px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth:{xs:"280px",sm:'350px',md:'400px'},
        margin: "0 auto",
        width: "auto",
        height:'auto'
      }}
    >
      <TextField
        id="firstname"
        label="First Name"
        defaultValue={profile.firstname}
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#a10345",
            },
            "&:hover fieldset": {
              borderColor: "#960340",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a30647",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#3f041c",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#5f0028",
          },
        }}
        {...register("firstname", { required: true })}
        error={!!errors.firstname}
      />
      {errors.firstname && (
        <FormHelperText sx={{ color: "#920606" }}>
          {errors.firstname.message}
        </FormHelperText>
      )}

      <TextField
        defaultValue={profile.lastname}
        id="lastname"
        label="Last Name"
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#a10345",
            },
            "&:hover fieldset": {
              borderColor: "#960340",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a30647",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#3f041c",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#5f0028",
          },
        }}
        {...register("lastname", { required: true })}
        error={!!errors.lastname}
      />
      {errors.lastname && (
        <FormHelperText sx={{ color: "#920606" }}>
          {errors.lastname.message}
        </FormHelperText>
      )}

      <TextField
        value={profile.email}
        id="email"
        label="Email"
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#a10345",
            },
            "&:hover fieldset": {
              borderColor: "#960340",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a30647",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#3f041c",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#5f0028",
          },
        }}
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
        label="New Password"
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#a10345",
            },
            "&:hover fieldset": {
              borderColor: "#960340",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a30647",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#3f041c",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#5f0028",
          },
        }}
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

      <br />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#620fe7",
          color: "#fff",
          ":hover": { backgroundColor: "#4e0bb4" },
        }}
      >
        {loading ? <LodingSpinner /> : "Update"}
      </Button>
    </Box>
  );
}
