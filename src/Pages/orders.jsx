import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import "./orders.css";
import useGetOrders from "../customHooks/useGetOrder";
import { styled } from "@mui/material/styles";
import axios from "axios";
import LoadingSpinner from "../UI/loadinSpinner.jsx";
import useGetAdminNotify from "../customHooks/getAdminNotifications";
import ReviewModal from "./admin/modal/reviewModal.jsx";
import Footer from "../Components/footer.jsx"

const style = {
  fontWeight: "bold",
  fontSize: "15px",
  color: "#9c9494",
  textAlign: "center",
};

const AnimatedText = ({ text }) => (
  <div className="animated-text-container">
    <h1 className="animated-text">
      {text.split("").map((char, index) => (
        <span key={index} style={{ "--char-index": index, color: "#888888" }}>
          {char}
        </span>
      ))}
    </h1>
  </div>
);

export default function Orders() {
  const orders = useGetOrders() || [];
  const [cancelStatus, setCancelStatus] = useState({});
  const [loading, setLoading] = useState({});
  const { fetchCancelRequests } = useGetAdminNotify();

  const calculateGrandTotal = () => {
    return orders.reduce((acc, order) => acc + order.total, 0);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#1d1d1d",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#1d1d1d",
    },
    "&:hover": {
      backgroundColor: "#1d1d1d",
    },
    "& td, & th": {
      borderBottom: "2px solid #353535",
    },
  }));

  const handleCancel = (order, product, user) => {
    setLoading((prevState) => ({
      ...prevState,
      [`${order}_${product}`]: true,
    }));

    setTimeout(async () => {
      try {
        const response = await axios.post(
          "https://ecommerce-nac-backend.onrender.com/cancel/order",
          {
            order,
            product,
            user,
          }
        );

        if (response.status === 200) {
          setCancelStatus((prevStatus) => ({
            ...prevStatus,
            [`${order}_${product}`]: "Cancel requested",
          }));
          await fetchCancelRequests();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading((prevState) => ({
          ...prevState,
          [`${order}_${product}`]: false,
        }));
      }
    }, 3000);
  };

  const fetchCancelRequest = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-nac-backend.onrender.com/cancel/getCancellation",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const canceled = response.data.data.reduce((acc, item) => {
          acc[`${item.order_id}_${item.product_id}`] = "Cancel requested";
          return acc;
        }, {});

        setCancelStatus(canceled);
      } else {
        console.log(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error fetching cancel order", error);
    }
  };

  useEffect(() => {
    fetchCancelRequest();
  }, []);

  return (
    <>
    <Box
      sx={{
        ml: { xs: 3, md:  3.5,lg:6 },
        maxWidth: "90%",
        backgroundColor: "#1d1d1d",
        borderRadius: "10px",
        padding: "20px",
        fontFamily: "Helvetica",
        mt: "50px",
        mb: "50px",
        mr: { xs: 3, md: 0 },
        border: "1px solid #505050",
      }}
    >
      <AnimatedText text="My Orders" />
      <Stack
        sx={{
          textAlign: "center",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#257400",
          fontWeight: "bold",
          fontSize: "14px",
          padding: "10px",
          borderBottom: "1px solid #8d8888",
          marginBottom: "10px",
          mt: "-10px",
        }}
      >
        <span>
          {orders.length > 0 ? orders[0].user : "No Orders Available"}
        </span>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#0f0f0f",
          borderRadius: "10px",
          fontFamily: "Helvetica",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={style}>Title</TableCell>
              <TableCell sx={style}>Image</TableCell>
              <TableCell sx={style}>Price</TableCell>
              <TableCell sx={style}>Quantity</TableCell>
              <TableCell sx={style}>Product Quantity</TableCell>
              <TableCell sx={style}>Total</TableCell>
              <TableCell sx={style}>Payment</TableCell>
              <TableCell sx={style}>Order-Date</TableCell>
              <TableCell sx={style}>Cancel-Order</TableCell>
              <TableCell sx={style}>Add-Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) =>
                order.cart.map((item, j) => (
                  <StyledTableRow key={item._id || j}>
                    <TableCell sx={style}>{item.title}</TableCell>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.title}
                        width="50px"
                        height="50px"
                      />
                    </TableCell>
                    <TableCell sx={style}>{item.price}</TableCell>
                    <TableCell sx={style}>{item.quantity}</TableCell>
                    <TableCell sx={style}>{item.productQuantity}</TableCell>
                    <TableCell sx={style}>
                      {item.price * item.quantity}
                    </TableCell>
                    <TableCell sx={style}>{order.payment}</TableCell>
                    <TableCell sx={style}>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={style}>
                      {cancelStatus[`${order._id}_${item._id}`] ===
                      "Cancel requested" ? (
                        <span style={{ fontSize: "14px", color: "#d42c2c" }}>
                          {cancelStatus[`${order._id}_${item._id}`]}
                        </span>
                      ) : (
                        <Button
                          onClick={() =>
                            handleCancel(order._id, item._id, order.user)
                          }
                          variant="outlined"
                          size="small"
                          sx={{
                            textTransform: "none",
                            color: "#e0e0e0",
                            borderColor: "#4f4f4f",
                            "&:hover": {
                              borderColor: "#4f4f4f",
                              backgroundColor: "#303030",
                            
                            },
                            padding: "6px 20px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "500",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {loading[`${order._id}_${item._id}`] ? (
                            <LoadingSpinner />
                          ) : (
                            "Cancel"
                          )}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <ReviewModal itemId = {item.productId} />
                    </TableCell>
                  </StyledTableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "#b60f0f",
                    textAlign: "center",
                  }}
                >
                  No items purchased
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 15px",
          margin: "20px 0",
          display: "flex",
          backgroundColor: "#0e0e0e",
        }}
      >
        <span style={{ color: "#9e9e9e", fontWeight: "bold" }}>
          Grand Total:
        </span>
        <span style={{ color: "#14a314", fontWeight: "bold" }}>
          ₹{calculateGrandTotal()}/-
        </span>
      </Stack>
    </Box>
    <footer>
      <Footer/>
    </footer>
    </>
  );
}
