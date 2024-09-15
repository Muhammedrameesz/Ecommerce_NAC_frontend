import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import useInstructerAuthStore from "../store/InstructerAuthStore";
import { toast } from "react-toastify";
import AdminSideBar from "./instructer/adminSideBar.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import hamburger from "../image/hamburger.png";
import NacLabel from "../image/NAC-5.jfif";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AdminNavbar({ toggleNav }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { insLogout } = useInstructerAuthStore();
  const [linkV, setLinkv] = useState("");

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const handleColor = (value) => {
    setLinkv(value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLog = async () => {
    await insLogout();
    handleClose();
    toast.success("Logged out successfully");
  };
  const handleButtonClick = () => {
    toggleNav();
    localStorage.setItem("adminNav", "adminNav");
    localStorage.removeItem("userNav");
  };

  const styles = {
    textDecoration: "none",
    color: "#fff",
  };

  const linkStyle = {
    textDecoration: "none",
    // fontWeight: "90px",
    fontFamily: "Trebuchet MS",
  };

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          width: { xs: "100%", md: "100%" },
          backgroundColor: "#1a1a1a",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          overflow: "hidden",
          height: "60px",
          maxHeight: "60px",
        }}
      >
        <Stack
          direction="row"
          spacing={10}
          sx={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            display: "flex",
          }}
        >
           <Link to="/home" style={styles}>
            <Tooltip title="User Dashboard">
              <SupervisedUserCircleIcon
                onClick={handleButtonClick}
                sx={{
                  color: "#1229aa",
                  fontSize: "2rem",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                  ml: "10px",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              />
            </Tooltip>
          </Link>
          <img
            src={NacLabel}
            alt="NAC LABEL"
            style={{
              width: "100px",
              height: "50px",
              borderRadius: "50%",
              display: matches ? "none" : "block",
            }}
          />
          <Typography
            sx={{
              display: matches ? "block" : "none",
              fontWeight: "bold",
              fontFamily: "Trebuchet MS, sans-serif",
              fontSize: "1.2rem",
              background:
                "linear-gradient(90deg, rgba(255, 140, 0, 0.8), rgba(255, 0, 128, 0.8))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.9,
              textShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            NAC DISTRIBUTIONS -{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, rgba(0, 201, 255, 0.8), rgba(146, 254, 157, 0.8))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: 0.85,
                textShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              }}
            >
              Admin Pannel
            </span>
          </Typography>

         
        </Stack>

        

        {/* Mobile Menu Toggle */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            display: { xs: "flex", md: "none" },
          }}
        >
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <img
                src={hamburger}
                alt="menu"
                style={{ height: "30px", width: "30px" }}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                sx: {
                  backgroundColor: "#111111",
                  color: "#fff",
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  to={"/admin-dashboard"}
                  style={{
                    ...linkStyle,
                    color: linkV === "home" ? "#106dd8" : "#a8a8a8",
                  }}
                  onClick={() => handleColor("home")}
                >
                  {" "}
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to={"/admin/products"}
                  style={{
                    ...linkStyle,
                    color: linkV === "Products" ? "#106dd8" : "#a8a8a8",
                  }}
                  onClick={() => handleColor("Products")}
                >
                  {" "}
                  Products
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to={"/add-product"}
                  style={{
                    ...linkStyle,
                    color: linkV === "Add Products" ? "#106dd8" : "#a8a8a8",
                  }}
                  onClick={() => handleColor("Add Products")}
                >
                  Add Products{" "}
                </Link>{" "}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to={"/view-orders"}
                  style={{
                    ...linkStyle,
                    color: linkV === " Orders" ? "#106dd8" : "#a8a8a8",
                  }}
                  onClick={() => handleColor(" Orders")}
                >
                  View Orders
                </Link>{" "}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to={"/notifications"}
                  style={{
                    ...linkStyle,
                    color: linkV === " Notifications" ? "#106dd8" : "#a8a8a8",
                  }}
                  onClick={() => handleColor(" Notifications")}
                >
                  Notifications
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to={"/trash"}
                  style={{
                    ...linkStyle,
                    color: linkV === "trash" ? "#106dd8" : "#a8a8a8",
                  }}
                  onClick={() => handleColor("trash")}
                >
                  Trash
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLog}>
                <Typography
                  sx={{
                    color: "#d10e0e",
                    fontWeight: "bold",
                  }}
                >
                  LogOut
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        </Stack>
      </Box>
      <AdminSideBar />
    </>
  );
}
