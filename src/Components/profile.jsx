import React, { useRef, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  Tooltip,
  IconButton,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import userIcon from "../image/paragraph_13125504.png";
import CloseIcon from "../image/closeIconimGe.png";
import LoadingSpinner from "../UI/loadinSpinner.jsx";
import useGetUserDetals from "../customHooks/useGetUserDetails.js";
import UserProfileModal from "./userProfileEditModal.jsx";
import UserDeliveryAddressModal from "./userDeliveryAddressModal.jsx";
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


export default function Profile({
  profile,
  imageUrl,
  getImage,
  handleClose,
  getUserDetails,
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  const { userDetails, detailsExists, fetchUserDetails } = useGetUserDetals();
  const [display, handleDispay] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const endpoint = imageUrl
        ? "https://ecommerce-nac-backend.onrender.com/profile/editPicture"
        : "https://ecommerce-nac-backend.onrender.com/profile/addPicture";

      const response = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to upload the image.");
      }
      await getImage();
      console.log(response.data.message);
    } catch (error) {
      setUploadError(
        error.response?.data?.message || "An error occurred during upload."
      );
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };
  const handleDisplay = () => {
    handleDispay(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#191717",
        padding: { xs: 2, sm: 3, md: 5 },
        color: "white",
        maxWidth: { xs: 250, sm: 300, md: 500 },
        width: "100%",
        margin: "auto",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
        mt: "-25px",
        "&:hover": {
          backgroundColor: "#191717",
        },
      }}
    >
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginLeft: "35%",
        marginTop: {
          xs: '20px',
          md: '1px',  
        },
      }}
    >
      <CustomTooltip title="Close">
        <img
          onClick={() => handleClose()}
          src={CloseIcon}
          alt="close"
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            backgroundColor: "#949494",
          }}
        />
      </CustomTooltip>
    </Box>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center">
          {uploading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Avatar
                sx={{
                  width: { xs: 40, sm: 50, md: 85 },
                  height: { xs: 40, sm: 50, md: 85 },
                  cursor: "pointer",
                }}
                alt="Profile Picture"
                src={imageUrl ? imageUrl : userIcon}
              />
              <CustomTooltip
                title={
                  imageUrl ? "Change profile picture" : "Upload profile picture"
                }
                placement="left"
              >
                <IconButton
                  onClick={handleClick}
                  sx={{ mt: "60px", marginBottom: 0 }}
                >
                  {imageUrl ? (
                    <EditIcon sx={{ color: "#620fe7", fontSize: "20px" }} />
                  ) : (
                    <AddIcon sx={{ color: "#561ab8" }} />
                  )}
                </IconButton>
              </CustomTooltip>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </>
          )}
        </Stack>

        {uploading && (
          <Typography variant="body2" color="info.main">
            Uploading...
          </Typography>
        )}
        {uploadError && (
          <Typography variant="body2" color="error.main">
            {uploadError}
          </Typography>
        )}

        <Stack mt={3}>
          <Typography variant="body2" sx={{ color: "#c9c9c9" }}>
            {profile.email}
          </Typography>
          <Typography variant="body2" sx={{ color: "#c9c9c9" }}>
            {profile.firstname} {profile.lastname}
          </Typography>

          <CustomTooltip title="Edit Profile Details" placement="right">
            <Button
              onClick={handleDisplay}
              variant="outlined"
              sx={{
                fontSize: "10px",
                textDecoration: "none",
                textTransform: "none",
                mb: 1,
                width: "50px",
                display: display || status ? "none" : "block",
                padding: 0,
                fontWeight: "bold",
                letterSpacing: 1,
                mt: 1,
              }}
            >
              Edit
            </Button>
          </CustomTooltip>
          {loading ? (
            <>
              <Stack direction={"row"} spacing={1.5} mt={1} mb={2}>
                <LoadingSpinner />
                <Typography
                  color={"#1a279e"}
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  validating....
                </Typography>
              </Stack>
            </>
          ) : (
            <>
              <div
                style={{
                  maxWidth: "150px",
                  flexDirection: "row",
                  display: "flex",
                  marginTop: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder="current password"
                  required={true}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={{
                    display: display ? "block" : "none",
                    maxWidth: "130px",
                    height: "25px",
                    backgroundColor: "#1f1f1f",
                    border: "1px solid #1f1f1f",
                    borderRadius: "5px",
                    color: "#dbdbdb",
                    marginBottom: "20px",
                    padding: "5px",
                    outline: "1px solid green",
                    outlineColor: "green",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />

                <UserProfileModal
                  display={display}
                  currentPassword={currentPassword}
                  profile={profile}
                  setLoading={setLoading}
                  getUserDetails={getUserDetails}
                  setStatus={setStatus}
                  status={status}
                  handleDispay={handleDispay}
                  fetchUserDetails={fetchUserDetails}
                />
              </div>
            </>
          )}

          {detailsExists ? (
            <>
              <Grid
                container
                maxWidth={"180px"}
                sx={{
                  // border: "1px dashed #5e5e5e",
                  p: "10px",
                  backgroundColor: "rgb(29, 29, 29)",
                  boxShadow:'rgba(44, 44, 44, 0.5) -3px -3px 6px 1px inset',
                  borderRadius:'15px'

                }}
              >
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "12px", color: "#88dfa8aa" }}
                  >
                    <span style={{ color: "#888383" }}>Name:</span>{" "}
                    {userDetails.fullname}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "12px", color: "#88dfa8aa" }}
                  >
                    <span style={{ color: "#888383" }}>Contact:</span>{" "}
                    {userDetails.contactnumber}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "12px", color: "#88dfa8aa" }}
                  >
                    <span style={{ color: "#888383" }}>Address:</span>{" "}
                    {userDetails.address}
                  </Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      ml: "150px",
                      mt: "-13px",
                    }}
                  >
                    <UserDeliveryAddressModal
                      userDetails={userDetails}
                      detailsExists={detailsExists}
                      fetchUserDetails={fetchUserDetails}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Stack
                direction="row"
                spacing={2}
                maxWidth={"130px"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 20px",
                  backgroundColor: "#cfcfcf",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "10px", // Slightly larger for readability
                    color: "#d30f0f",
                  }}
                >
                  No Delivery Details Added
                </Typography>
                <UserDeliveryAddressModal
                  userDetails={userDetails}
                  detailsExists={detailsExists}
                  fetchUserDetails={fetchUserDetails}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
