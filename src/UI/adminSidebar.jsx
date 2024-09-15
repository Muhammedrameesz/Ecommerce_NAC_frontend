import React from "react";
import { motion } from "framer-motion";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useInstructerAuthStore from "../store/InstructerAuthStore";
import { toast } from "react-toastify";

const variants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const Items = ({ onItemClick }) => (
  <ul
    style={{
      listStyleType: "none",
      padding: 0,
      margin: 0,
    }}
  >
    {["View Products", "View Admins", "Settings"].map((item, index) => (
      <motion.li
        key={index}
        whileHover={{ scale: 1.1 }}
        onClick={() => onItemClick(item)}
        style={{
          padding: "5px",
          backgroundColor: "#383535",
          color: "#f1f1f1",
          margin: "5px 0",
          borderRadius: "5px",
          cursor: "pointer",
          fontFamily: "Consolas",
        }}
      >
        {item}
      </motion.li>
    ))}
  </ul>
);

export default function AdminSidebar() {
  const logout = useInstructerAuthStore((state) => state.insLogout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
  };

  const handleItemClick = (item) => {
    switch (item) {
      case "View Products":
        navigate("/admin/products");
        break;
      case "View Admins":
        navigate("/admin/admins");
        break;
      case "Settings":
        navigate("/settings");
        break;
      default:
        break;
    }
  };

  return (
    <motion.nav
      animate={"open"}
      variants={variants}
      initial="closed"
      style={{
        height: "75vh",
        width: "250px",
        backgroundColor: "#181717",
        padding: "20px",
        boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.5)",
        borderRadius: "0 10px 10px 0",
        zIndex: 9,
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom>
        Controllers
      </Typography>
      <Items onItemClick={handleItemClick} />
      <Button
        size="small"
        onClick={handleLogout}
        variant="outlined"
        sx={{
          color: "red",
          border: "1px solid red",
          opacity: 0.7,
          transition: "all 0.5s ease-in-out",
          textTransform: "none",
          borderRadius: "5px",
          mt: "10px",
          "&:hover": {
            color: "red",
            border: "1px solid red",
            transform: "scale(1.03)",
            opacity: 1,
          },
        }}
      >
        Log-Out instructor
      </Button>
    </motion.nav>
  );
}
