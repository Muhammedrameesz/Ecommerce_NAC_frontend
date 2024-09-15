import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useForm } from "react-hook-form";
import { useCart } from "../store/cartContext";
import CloseIconImage from "../image/closeIconimGe.png";
import { toast } from "react-toastify";
import axios from "axios";

export default function FormModal({
  fetchUserDetails,
  handleClose,
  detailsExists,
  userDetails,
}) {
  const { formCart } = useCart();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); 

  const onSave = async (data) => {
    try {
      setLoading(true);
      setOpen(true); 
      setTimeout(async () => {
        await formCart(data);
        fetchUserDetails();
        handleClose();
        toast.success("Details added successfully");
        reset();
        setLoading(false);
        setOpen(false); 
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
      setLoading(false);
      setOpen(false); 
    }
  };

  const onUpdate = async (data) => {
    setLoading(true);
    setOpen(true); 
    try {
      const response = await axios.post(
        `https://ecommerce-nac-backend.onrender.com/payment/update-details`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) {
        console.log(response.data.message);
        return;
      }
      setTimeout(() => {
        fetchUserDetails();
        handleClose();
        toast.success(response.data.message);
        reset();
        setLoading(false);
        setOpen(false); 
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
      setLoading(false);
      setOpen(false); 
    }
  };

  const style = {
    width: "75%",
    height: "100%",
    padding: "12px",
    backgroundColor: "black",
    color: "#fff",
    border: "1px solid black",
    boxShadow: "0px 0px 10px 0px black",
    borderRadius: "10px",
    margin: "5px",
  };

  useEffect(() => {
    if (detailsExists && userDetails) {
      setValue("fullname", userDetails.fullname);
      setValue("contactnumber", userDetails.contactnumber);
      setValue("address", userDetails.address);
    }
  }, [detailsExists, userDetails, setValue]);

  return (
    <>
      <Box>
        {detailsExists ? (
          <>
            <form onSubmit={handleSubmit(onUpdate)}>
              {loading && (
                <Backdrop
                  sx={{
                    color: "#faf5f5",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open} 
                >
                  <CircularProgress color="inherit" />
                  <div className="loading-text">Saving....</div>
                </Backdrop>
              )}
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                <img
                  onClick={handleClose}
                  width={"20px"}
                  src={CloseIconImage}
                  alt="close"
                  style={{
                    cursor: "pointer",
                  }}
                />
              </Stack>
              <h3 style={{ textAlign: "center", color: "#080808" }}>
                <u>Edit Personal Details</u>
              </h3>
              <input
                {...register("fullname", { required: true })}
                type="text"
                placeholder="Full Name"
                style={style}
              />
              <input
                {...register("contactnumber", { required: true })}
                type="text"
                placeholder="Contact Number"
                style={style}
              />
              <input
                {...register("address", { required: true })}
                type="text"
                placeholder="Add New Address"
                style={style}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100px",
                  height: "30px",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid black",
                  boxShadow: "0px 0px 10px 0px black",
                  backgroundColor: "#9b1996",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "15px",
                  textTransform: "none",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.5s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#9b1996",
                    transform: "scale(1.1)",
                  },
                }}
              >
                save
              </Button>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSave)}>
              {loading && (
                <Backdrop
                  sx={{
                    color: "#faf5f5",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open} 
                >
                  <CircularProgress color="inherit" />
                  <div className="loading-text">Saving....</div>
                </Backdrop>
              )}
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                <img
                  onClick={handleClose}
                  width={"20px"}
                  src={CloseIconImage}
                  alt="close"
                  style={{
                    cursor: "pointer",
                  }}
                />
              </Stack>
              <h3 style={{ textAlign: "center", color: "#080808" }}>
                <u>Add Personal Details</u>
              </h3>
              <input
                {...register("fullname", { required: true })}
                type="text"
                placeholder="Full Name"
                style={style}
              />
              <input
                {...register("contactnumber", { required: true })}
                type="text"
                placeholder="Contact Number"
                style={style}
              />
              <input
                {...register("address", { required: true })}
                type="text"
                placeholder="Address"
                style={style}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100px",
                  height: "30px",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "#9b1996",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "15px",
                  textTransform: "none",
                  transition: "all 0.5s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#9b1996",
                    transform: "scale(1.1)",
                  },
                }}
              >
                save
              </Button>
            </form>
          </>
        )}
      </Box>
    </>
  );
}
