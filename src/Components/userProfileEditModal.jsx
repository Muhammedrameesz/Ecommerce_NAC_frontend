import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { Stack, TextField, Tooltip } from "@mui/material";
import UserProfileUpdateForm from "./userProfileUpdateForm";
import closeIcon from "../image/closeIconimGe.png";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  // background: "linear-gradient(.25turn, #0F3443, #1db676)",
  borderRadius: "10px",
  backgroundColor:'#b9b9b9'
};

export default function KeepMountedModal({
  display,
  currentPassword,
  profile,
  setLoading,
  getUserDetails,
  setStatus,
  status,
  handleDispay,
  fetchUserDetails,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce-nac-backend.onrender.com/user/update/verifyPassword`,
        { currentPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status !== 200) {
        setStatus(false);
        toast.error("Incorrect Password");
        return;
      }
  
      setStatus(true);
      handleDispay(false);
  
      setTimeout(() => {
        setLoading(false);
        toast.success("Password verification successful");
      }, 3000);
  
       handleOpen();  
      
    } catch (error) {
      setTimeout(() => {
        console.error(error);
        setStatus(false);
        setLoading(false);
        toast.error("Incorrect Password...");
      }, 3000);
    }
  };
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {status ? (
        <CustomTooltip title="Edit user Profile" placement="right">
          <EditIcon
            onClick={handleOpen}
            sx={{
              color: "#620fe7",
              fontSize: "20px",
              cursor: "pointer",
              ml: "10px",
              mb:'10px'
            }}
          />
        </CustomTooltip>
      ) : (
        <SendIcon
          onClick={handleClick}
          sx={{
            display: display && currentPassword.length > 0 ? "block" : "none",
            fontSize: "20px",
            textTransform: "none",
            color: "#6035a7",
            ml: "10px",
            cursor: "pointer",
          }}
        ></SendIcon>
      )}

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width:{xs:'50%',md:'100%'},
            }}
          >
            <CustomTooltip title='close'>
            <img
            onClick={handleClose}
              src={closeIcon}
              alt="close"
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",

              }}
            />
            </CustomTooltip>
          </Stack>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            sx={{
              color: "#030303",
              textAlign: "center",
              fontWeight:'bold'
            }}
          >
            Update User Profile
          </Typography>
          <UserProfileUpdateForm
            profile={profile}
            fetchUserDetails={fetchUserDetails}
            getUserDetails={getUserDetails}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
