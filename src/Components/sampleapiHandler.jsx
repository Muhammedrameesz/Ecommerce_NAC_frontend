import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/loadinSpinner.jsx";

export default function SampleApiHandler() {
  const categories = [
    { value: "Water", label: "Water" },
    { value: "Soda", label: "Soda" },
    { value: "CoolDrinks", label: "CoolDrinks" },
    { value: "Lays", label: "Lays" },
    { value: "Sweets&Candy", label: "Sweets&Candy" },
  ];
  const productQuantity = [
    { value: "250ml", label: "250ml" },
    { value: "500ml", label: "500ml" },
    { value: "750ml", label: "750ml" },
    { value: "1ltr", label: "1ltr" },
    { value: "1.25ltr", label: "1.25ltr" },
    { value: "1.5ltr", label: "1.5ltr" },
    { value: "2ltr", label: "2ltr" },
    { value: "2.5ltr", label: "2.5ltr" },
    { value: "100grm", label: "100grm" },
    { value: "500grm", label: "500grm" },
    { value: "20ltr", label: "20ltr" },
  ];

  const ErrorStyle = {
    color: "#FF4D4D",
    fontSize: "14px",
    marginTop: "5px",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSave = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    formData.append("productQuantity", data.productQuantity);

    try {
      await axios.post(
        "https://ecommerce-nac-backend.onrender.com/product/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("tokens")}`,
          },
        }
      );
      toast.success("Product added successfully");
      reset();
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#c5c5c5",
      fontSize: "14px",
      "& input": {
        padding: "14px ",
      },
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
      color: "#333333",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#a87489",
    },
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={{ xs: "100%", sm: "90%", md: "80%" }}
        ml={{ md: 34,xs:2,sm:8 }} 
        mt={1}
        mb={4}
        mr={{xs:10,md:5}}
        overflow="hidden" 
        sx={{
          overflowX: "hidden",
         
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ flex: 1 }}
        >
          <Box
            width={"100%"}
            maxWidth={{ xs: "95%", md: "90%" }}
            // mx="auto"
            // px={2}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#b5c0b6",
                fontSize: "20px",
                fontWeight: "bold",
                margin: "2%",
                textDecoration: "underline 1px solid #a89f9f",
                textAlign: "center",
              }}
            >
              Add Products
            </Typography>
            <form
              onSubmit={handleSubmit(onSave)}
              style={{  overflow: "hidden" }}
            >
              <Stack
                spacing={2}
                direction="column"
                sx={{
                  border: "1px solid #a10345",
                  padding: { xs: "15px", md: "20px" },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <label
                    htmlFor="image"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#2a3036",
                      color: "#b6b6b6",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      transition:
                        "background-color 0.3s ease, transform 0.2s ease",
                      textAlign: "center",
                      width: "100%",
                      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
                      gap: "10px",
                      fontFamily: "cursive",
                    }}
                  >
                    <CloudUploadIcon style={{ fontSize: "1.5rem" }} />
                    Upload Image
                  </label>

                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="image"
                    name="image"
                    {...register("image", { required: true })}
                  />
                </div>

                {errors.image && (
                  <span style={ErrorStyle}>Please select an image.</span>
                )}
                <Stack direction={{xs:'column',md:'row'}} spacing={3}>
                  <TextField
                    fullWidth
                    sx={textFieldStyle}
                    id="title"
                    label="Title"
                    variant="outlined"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <span style={ErrorStyle}>Title is required.</span>
                  )}
                  <TextField
                    fullWidth
                    sx={textFieldStyle}
                    id="price"
                    label="Price"
                    variant="outlined"
                    {...register("price", { required: true })}
                  />
                  {errors.price && (
                    <span style={ErrorStyle}>Price is required.</span>
                  )}
                </Stack>
                <TextField
                  sx={textFieldStyle}
                  id="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span style={ErrorStyle}>Description is required.</span>
                )}

                <Stack direction={{xs:'column',md:'row'}} spacing={3}>
                  <FormControl variant="outlined" sx={textFieldStyle} fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      id="category"
                      label="Category"
                      defaultValue=""
                      {...register("category", { required: true })}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#1b1b1b",
                            "& .MuiMenuItem-root": {
                              color: "#c2c2c2",
                              fontSize: "14px",
                              "&.Mui-selected": {
                                backgroundColor: "#575757",
                                color: "#fff",
                              },
                              "&:hover": {
                                backgroundColor: "#242424",
                              },
                            },
                          },
                        },
                      }}
                    >
                      {categories.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.category && (
                    <span style={ErrorStyle}>Please select a category.</span>
                  )}

                  <FormControl variant="outlined" sx={textFieldStyle} fullWidth>
                    <InputLabel>Product Quantity</InputLabel>
                    <Select
                      id="productQuantity"
                      label="Product Quantity"
                      defaultValue=""
                      {...register("productQuantity", { required: true })}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#1b1b1b",
                            "& .MuiMenuItem-root": {
                              color: "#c2c2c2",
                              fontSize: "14px",
                              "&.Mui-selected": {
                                backgroundColor: "#575757",
                                color: "#fff",
                              },
                              "&:hover": {
                                backgroundColor: "#242424",
                              },
                            },
                          },
                        },
                      }}
                    >
                      {productQuantity.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.productQuantity && (
                    <span style={ErrorStyle}>
                      Please select a product quantity.
                    </span>
                  )}
                </Stack>

                <Stack
                  direction={'row'}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      textTransform: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      letterSpacing: "0.5px",
                      padding: "12px 24px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      background:
                        "linear-gradient(45deg, #a10345 30%, #560726 90%)",
                        transition:'all 0.5s',
                        color:'#d3d3d3',
                      "&:hover": {
                        transform: "scale(1.03)",
                        background:
                          "linear-gradient(45deg, #960340 30%, #720631 90%)",
                      },
                      "&:active": {
                        background:
                          "linear-gradient(45deg, #780335 30%, #560726 90%)",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                        transform: "scale(0.95)",
                      },
                    }}
                  >
                    {isLoading ? <LoadingSpinner /> : "Add Product"}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

