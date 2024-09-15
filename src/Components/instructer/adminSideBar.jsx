import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Badge, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import useInstructerAuthStore from "../../store/InstructerAuthStore";
import { toast } from "react-toastify";
import useNotifications from "../../customHooks/getAdminNotifications";

// Importing the required icons
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import NacLabel from "../../image/NAC-5.jfif";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

export default function PermanentDrawer() {
  const location = useLocation();
  const { insLogout, isInAuth } = useInstructerAuthStore();
  // const { adminNotificationLength } = useNotifications();

  const length = localStorage.getItem('AdminNotificationLength')
  const handleLog = async () => {
    await insLogout();
    toast.success("Logged out successfully");
  };

  const DrawerList = (
    <Box
      sx={{
        width: 220,
        backgroundColor: "#000000",
        color: "#c2c2c2",
        pt: 5,
        height: "100%",
        display:{xs:'none',md:'block'}
      }}
      role="presentation"
    >
      <Stack
        sx={{
          display: "flex",
          textAlign: "center",
          mb: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={NacLabel}
          alt="NAC LABEL"
          style={{
            width: "100px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
      </Stack>
      <Divider sx={{ borderColor: "#333333" }} />
      <List>
        {[
          { text: "Home", icon: <HomeOutlinedIcon />, link: "/admin-dashboard" },
          { text: "Products", icon: <StorefrontIcon />, link: "/admin/products" },
          { text: "Add Products", icon: <AddCircleOutlineOutlinedIcon />, link: "/add-product" },
          { text: "Orders", icon: <ShoppingCartOutlinedIcon />, link: "/view-orders" },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              sx={{
                color: location.pathname === item.link ? "#0c47e9" : "#c2c2c2",
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "#333333" }} />

      <List>
        {[
          {
            text: "Notifications",
            icon: (
              <Badge
                badgeContent={ length}  // Use state for badge content
                color="error"
              >
                <NotificationsOutlinedIcon />
              </Badge>
            ),
            link: "/notifications",
          },
          { text: "Trash", icon: <DeleteSweepOutlinedIcon />, link: "/trash" },
          {
            text: "LogOut",
            icon: <LogoutIcon sx={{ color: "#ce0909" }} />,
            link: "#",
            action: handleLog,
            textColor: "#ce0909",
          },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.link === "#" ? "button" : Link}
              to={item.link === "#" ? undefined : item.link}
              sx={{
                color: location.pathname === item.link ? "#0c47e9" : "#c2c2c2",
              }}
              onClick={item.action ? item.action : undefined}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: item.textColor || "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="permanent" // Makes the drawer always open
      open
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#1a1a1a",
          color: "#c2c2c2",
        },
      }}
    >
      {isInAuth && DrawerList}
    </Drawer>
  );
}
