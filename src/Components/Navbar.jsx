import {
  Box,
  Button,
  Stack,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCart } from "../store/cartContext";
import ProfilePopover from "./profilePopover";
import Tooltip from "@mui/material/Tooltip";
import LogOutIcon from "../image/logout.ico";
import NacLabel from "../image/NAC-8.jfif";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { styled } from "@mui/material/styles";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import hamburger from "../image/hamburger.png"

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

export default function Navbar({ toggleNav }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { cartLength, notificationLength } = useCart();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isAuth = useAuthStore((state) => state.isAuth);
  const [color, setColor] = useState("");

  const realNotifyLength = localStorage.getItem('notificationLength')

  const handleColor = (data) => {
    setColor(data);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    toast.info("Logged out successfully");
    navigate("/");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const styles = {
    textDecoration: "none",
    color: "#fff",
  };

  const newStyles = {
    textDecoration: "none",
    color: "#000",
  };

  const handleButtonClick = () => {
    toggleNav();
    localStorage.setItem("userNav", "userNav");
    localStorage.removeItem("adminNav");
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        width: "auto",
        backgroundColor: "#0e0d0d",
        zIndex: 1000,
        boxShadow: "rgba(255, 255, 255, 0.35) 0px 2px 10px",
        display: "flex",
        alignItems: "center",
        padding: "1% 1%",
      }}
    >
      <Stack direction={"row"} spacing={4} ml={3}>
        <Link to="/admin-dashboard" style={styles}>
          <Stack direction={"column"}>
            <CustomTooltip title="Admin Dashboard">
              <AdminPanelSettingsOutlinedIcon
                onClick={handleButtonClick}
                sx={{
                  color: "#aa1286",
                  ml: "20%",
                  mt: "20%",
                  fontSize: "2rem",
                  cursor: "pointer",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              />
            </CustomTooltip>
          </Stack>
        </Link>

        <Typography
          variant="span"
          sx={{
            textAlign: "center",
            cursor: "pointer",
            marginLeft: "1%",
            fontSize: "20px",
            fontWeight: "600",
            fontFamily: "Helvetica Neue",
            textDecoration: "none",
            color: "blue",
            transition: "transform 0.5s ease-in-out",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Link style={{ textDecoration: "none", color: "#fff" }} to={"/home"}>
            <img
              src={NacLabel}
              alt="NAC LABEL"
              style={{
                width: "60px",
                height: "40px",
                borderRadius: "50%",
              }}
            />
          </Link>
        </Typography>
      </Stack>

      <Stack
        spacing={5}
        direction={"row"}
        sx={{
          display: { xs: "none", md: "flex" },
          marginLeft: "auto",
          marginRight: "1%",
          alignItems: "center",
          color: "white",
          justifyContent: "center",
        }}
      >
        <Link to="/home" style={styles} onClick={() => handleColor("home")}>
          <Stack direction={"column"}>
            <CustomTooltip title="Home">
              <HomeOutlinedIcon
                sx={{
                  color: color === "home" ? "rgb(75, 8, 230)" : "#b8b8b8",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              />
            </CustomTooltip>
          </Stack>
        </Link>

        <Link
          to="/product/cart"
          style={styles}
          onClick={() => handleColor("cart")}
        >
          <Stack direction={"column"}>
            <CustomTooltip title=" Cart" arrow>
              <Badge badgeContent={isAuth ? cartLength : ""} color="error">
                <ShoppingCartOutlinedIcon
                  sx={{
                    // ml: "-15%",
                    color: color === "cart" ? "rgb(75, 8, 230)" : "#b8b8b8",

                    fontSize: "1.6rem",
                    cursor: "pointer",
                    transition: "transform 0.5s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                      cursor: "pointer",
                    },
                  }}
                />
              </Badge>
            </CustomTooltip>
          </Stack>
        </Link>

        <Link to="/orders" style={styles} onClick={() => handleColor("orders")}>
          <Stack direction={"column"}>
            <CustomTooltip title="My Orders">
              <ShoppingBagOutlinedIcon
                sx={{
                  // ml: "20%",
                  color: color === "orders" ? "rgb(75, 8, 230)" : "#b8b8b8",

                  fontSize: "1.6rem",
                  cursor: "pointer",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              />
            </CustomTooltip>
          </Stack>
        </Link>

        <Link
          to="/products"
          style={styles}
          onClick={() => handleColor("products")}
        >
          <Stack direction={"column"}>
            <CustomTooltip title="About">
              <InfoOutlinedIcon
                sx={{
                  color: color === "products" ? "rgb(75, 8, 230)" : "#b8b8b8",

                  // ml: "1%",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              />
            </CustomTooltip>
          </Stack>
        </Link>

        <Link
          to="/contact"
          style={styles}
          onClick={() => handleColor("contact")}
        >
          <Stack direction={"column"}>
            <CustomTooltip title="Contact">
              <ContactMailOutlinedIcon
                sx={{
                  color: color === "contact" ? "rgb(75, 8, 230)" : "#b8b8b8",

                  // ml: "10%",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              />
            </CustomTooltip>
          </Stack>
        </Link>

        <Link
          to="/user/notifications"
          style={styles}
          onClick={() => handleColor("notify")}
        >
          <Stack direction={"column"}>
            <CustomTooltip title="Notifications">
              <Badge
                badgeContent={isAuth ? realNotifyLength: ""}
                color="error"
              >
                < NotificationsNoneOutlinedIcon 
                  sx={{
                    color: color === "notify" ? "rgb(75, 8, 230)" : "#b8b8b8",

                    // ml: "20%",
                    fontSize: "1.6rem",
                    cursor: "pointer",
                    transition: "transform 0.5s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                      cursor: "pointer",
                    },
                  }}
                />
              </Badge>
            </CustomTooltip>
          </Stack>
        </Link>

        <Link to="/" style={styles} onClick={handleLogout}>
          <Button
            size="small"
            variant="outlined"
            sx={{
              textTransform: "none",
              textDecoration: "none",
              transition: "transform 0.5s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                cursor: "pointer",
              },
            }}
          >
            Log-Out
          </Button>
        </Link>

        <Stack>
          <ProfilePopover />
        </Stack>
      </Stack>

      <Box
        sx={{
          display: { xs: "block", md: "none" },
          marginLeft: "auto",
        }}
      >
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
                
          <img src={hamburger} alt="burger" style={{ height: "30px", width: "30px" }} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: "#111111", 
              color: "#fff", 
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/home" style={newStyles}>
              <HomeOutlinedIcon
                sx={{
                  color: "#c2790b",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              />
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/product/cart" style={newStyles}>
              <Badge badgeContent={isAuth ? cartLength : ""} color="error">
                <ShoppingCartOutlinedIcon
                  sx={{
                    color: "green",
                    fontSize: "1.6rem",
                    cursor: "pointer",
                    transition: "transform 0.5s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                      cursor: "pointer",
                    },
                  }}
                />
              </Badge>
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/orders" style={newStyles}>
              <ShoppingBagOutlinedIcon
                sx={{
                  color: "#969696",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              />
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/products" style={newStyles}>
              <InfoOutlinedIcon
                sx={{
                  color: "#a71212",
                  ml: "1%",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              />
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/contact" style={newStyles}>
              <ContactMailOutlinedIcon
                sx={{
                  color: "#16149e",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              />
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              to="/user/notifications"
              style={styles}
              onClick={() => handleColor("notify")}
            >
               <Badge
                badgeContent={isAuth ? realNotifyLength: ""}
                color="error"
              >
              < NotificationsNoneOutlinedIcon 
                sx={{
                  color: "#0ce4d2",

                  // ml: "20%",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              />
              </Badge>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <img
              src={LogOutIcon}
              alt="LogOut"
              style={{
                width: "35px",
                height: "35px",
                cursor: "pointer",
              }}
            />
          </MenuItem>
          <Stack>
          <ProfilePopover />
        </Stack>
        </Menu>
      </Box>
    </Box>
  );
}
