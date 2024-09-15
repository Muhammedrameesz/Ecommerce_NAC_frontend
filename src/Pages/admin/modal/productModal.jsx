import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingSpinner from "../../../UI/loadinSpinner.jsx"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400, // Decreased width
  bgcolor: "#141414", // White background
  color: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const styles = {
  color: "red",
};

export default function BasicModal({ item, onProductUpdate }) {
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

  const ErrorStyle = {
    color: "#FF4D4D",
    fontSize: "14px",
    marginTop: "5px",
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    console.log("products", item);
    setValue("image", item.image);
    setValue("title", item.title);
    setValue("category", item.category);
    setValue("description", item.description);
    setValue("price", item.price);
    setValue("image", item.image);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const onSave = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("productQuantity",data.productQuantity)
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await axios.put(
        `https://ecommerce-nac-backend.onrender.com/product/edit-product/${item._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("res", response.data);
      onProductUpdate(response.data);
      handleClose(); // Close the modal after successful update
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Error updating product");
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <IconButton
        sx={{
          position: "relative",
          left: "5px",
          color: "#7814ca",
        }}
        onClick={handleOpen}
      >
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2, color: "blue" }}>
            Edit Product
          </Typography>
          <form
            onSubmit={handleSubmit(onSave)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "400px",
            }}
          >
            <input
              style={{
                color: "#ee0c50",
                cursor: "pointer",
                width: "100%",
              }}
              type="file"
              accept="image"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span style={styles}>Please upload an image.</span>
            )}

            <img
              src={item.image}
              alt={item.title}
              style={{ width: "60px", height: "50px" }}
            />
            <Stack direction={"row"} spacing={2}>
              <TextField
                fullWidth
                sx={textFieldStyle}
                id="title"
                label="Title"
                variant="outlined"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span style={styles}>this is a required column</span>
              )}
              <TextField
              fullWidth
                sx={textFieldStyle}
                id="price"
                label="Price"
                variant="outlined"
                type="number"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span style={styles}>this is a required column</span>
              )}
            </Stack>

            <TextField
              sx={textFieldStyle}
              id="description"
              label="Description"
              variant="outlined"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span style={styles}>this is a required column</span>
            )}

            <Stack direction={"row"} spacing={2}>
              <FormControl variant="outlined" sx={textFieldStyle} fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  id="demo-simple-select"
                  label="Category"
                  defaultValue={item.category}
                  {...register("category", { required: true })}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: "#1b1b1b",
                        "& .MuiMenuItem-root": {
                          color: "#c2c2c2",
                          fontSize: "14px",
                          "&.Mui-selected": {
                            backgroundColor: "#333333",
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
                <span style={styles}>Please select a category.</span>
              )}
              <FormControl variant="outlined" fullWidth sx={textFieldStyle}>
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
                            backgroundColor: "#333333",
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
            <Button
              size="small"
              sx={{
                mt: 2,
                backgroundColor: "#c5133f",
                color: "black",
                borderRadius: "10px",
                fontWeight: "bold",
                transition: "all 0.3s ease-in-out",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#c5133f",
                  color: "#bdacac",
                  fontWeight: "bold",
                  transform: "scale(1.03)",
                },
              }}
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Update Product"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
