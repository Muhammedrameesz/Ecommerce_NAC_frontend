import React, { useEffect, useState } from "react";
import { Button, Popover, Avatar } from "@mui/material";
import Profile from "./profile.jsx";
import useAuthStore from "../store/authStore";
import userIcon from "../image/paragraph_13125504.png";
import axios from "axios";

export default function ProfilePopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { isAuth, login, signup } = useAuthStore();
  const [imageUrl, setImageUrl] = useState(null);

  const getImage = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-nac-backend.onrender.com/profile/getProfilePicture`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setImageUrl(response.data.user.image);
      } else {
        console.log(response.data.message || "Something went wrong");
      }
    } catch (error) {
      setImageUrl(null);
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-nac-backend.onrender.com/profile/getUser`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setUserProfile(response.data.user);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      getUserDetails();
      getImage();
    }
  }, [isAuth, login, signup]);

  const handleLogout = () => {
    setProfile(null);
    setUserProfile(null);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {isAuth && (
        <>
          {profile ? (
            <Button aria-describedby={id} onClick={handleClick}>
              <Avatar
                src={profile.picture}
                alt="Google Profile"
                sx={{
                  width: 40,
                  height: 40,
                  transition: "all 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.08)",
                  },
                }}
              />
            </Button>
          ) : (
            userProfile && (
              <Button aria-describedby={id} onClick={handleClick}>
                <Avatar
                  src={imageUrl || userIcon}
                  alt="User Profile"
                  sx={{
                    width: 40,
                    height: 40,
                    transition: "all 0.5s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.08)",
                    },
                  }}
                />
              </Button>
            )
          )}
        </>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 50, left:1170 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            ml: 1,
            boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.3)",
            borderRadius: 2,
          },
        }}
      >
        {isAuth && profile && <Profile profile={profile} />}
        {isAuth && !profile && userProfile && (
          <Profile
            profile={userProfile}
            imageUrl={imageUrl}
            getImage={getImage}
            handleClose={handleClose}
            getUserDetails={getUserDetails}
          />
        )}
      </Popover>
    </div>
  );
}
