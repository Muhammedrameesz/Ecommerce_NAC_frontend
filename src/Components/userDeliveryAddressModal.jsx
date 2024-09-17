import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack, Tooltip, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useCart } from "../store/cartContext";
import { useForm } from "react-hook-form";
import CloseIconImage from "../image/closeIconimGe.png";
import { styled } from "@mui/material/styles";


const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#3d3d3d",
    color: "#d1d1d1",
    fontSize: "12px",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#333",
  },
}));


const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width:{xs:280,sm:350,md:400},
  bgcolor: "#b3b3b3",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const inputStyle = {
  width: "75%",
  height: "100%",
  padding: "12px",
  backgroundColor: "black",
  color: "#dddddd",
  border: "1px solid black",
  boxShadow: "0px 0px 10px 0px black",
  borderRadius: "10px",
  margin: "5px",
};

export default function TransitionsModal({
  userDetails,
  detailsExists,
  fetchUserDetails,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { formCart } = useCart();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    if (detailsExists && userDetails) {
      setValue("fullname", userDetails.fullname);
      setValue("contactnumber", userDetails.contactnumber);
      setValue("address", userDetails.address);
    }
  }, [detailsExists, userDetails, setValue]);
     
  const onSave = async (data) => {
    try {
      setLoading(true);
      setTimeout(async () => {
        await formCart(data);
        fetchUserDetails();
        handleClose();
        toast.success("Details added successfully");
        reset();
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
      setLoading(false);
    }
  };

  const onUpdate = async (data) => {
    setLoading(true);
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
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
      setLoading(false);
    }
  };

  return (
    <div>
      {detailsExists ? (
        <CustomTooltip title="Edit Delivery Address" placement="right">
          <IconButton onClick={handleOpen}>
            <EditIcon
              sx={{
                color: "#620fe7",
                fontSize: "20px",
              }}
            />
          </IconButton>
        </CustomTooltip>
      ) : (
        <CustomTooltip title="Add Delivery Address" placement="right">
          <IconButton onClick={handleOpen}>
            <AddIcon
              sx={{
                color: "#620fe7",
                fontSize: "20px",
              }}
            />
          </IconButton>
        </CustomTooltip>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
          <form onSubmit={detailsExists ? handleSubmit(onUpdate) : handleSubmit(onSave)}>
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
                <CustomTooltip title="Close">
                <img
                  onClick={handleClose}
                  width={"20px"}
                  src={CloseIconImage}
                  alt="close"
                  style={{
                    cursor: "pointer",
                  }}
                />
                </CustomTooltip>
              </Stack>
              <Typography variant="h6" sx={{ textAlign: "center", color: "#080808" }}>
                 {detailsExists ?<u>Edit Delivery Details</u>:<u>Add Delivery Details</u>}
              </Typography>
              <input
                {...register("fullname", { required: true })}
                type="text"
                placeholder="Full Name"
                style={inputStyle}
              />
              <input
                {...register("contactnumber", { required: true })}
                type="text"
                placeholder="Contact Number"
                style={inputStyle}
              />
              <input
                {...register("address", { required: true })}
                type="text"
                placeholder="Add New Address"
                style={inputStyle}
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
                  backgroundColor: "#5f039c",
                  color: "#bdbdbd",
                  fontWeight: "bold",
                  fontSize: "15px",
                  textTransform: "none",
                  cursor: "pointer",
                  transition: "all 0.5s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#41026b",
                    transform: "scale(1.08)",
                  },
                }}
              >
                Save
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
