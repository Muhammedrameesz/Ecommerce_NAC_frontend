import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DeliveryAddressModel from "./modal/deliveryAddressModel.jsx";

export default function OrdersAdmn() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-nac-backend.onrender.com/payment/getAllOrdersWithDeliveryAddress"
        );
        if (response.status === 200) {
          setOrderDetails(response.data);
          console.log("Response Data:", response.data);
        } else {
          console.log(response.data.message);
          setError(response.data.message);
        }
      } catch (error) {
        console.log(error);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Typography color="primary">Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const tableHead = {
    color: "#12a119",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px",
    borderBottom: "2px solid #0d8513",

  };

  const tableBody = {
    color: "#afafaf",
    fontSize: "12px",
    textAlign: "center",
      borderBottom: "2px solid #696969",
    fontWeight: "bold",

  };

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        maxWidth:{xs:'100%',md:"calc(100% - 200px)"} , 
        ml:{xs:'20px',md:"230px"} , 
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{
        textAlign:'center',
        color:'#666666'
      }}>
        Orders Administration
      </Typography>
      {orderDetails.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#181818",
            color: "#fff",
            maxWidth: "100%",
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: "650px" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHead}>User</TableCell>
                <TableCell sx={tableHead}>Payment</TableCell>
                <TableCell sx={tableHead}>Product</TableCell>
                <TableCell sx={tableHead}>Quantity</TableCell>
                <TableCell sx={tableHead}>Product Quantity</TableCell>
                <TableCell sx={tableHead}>Price</TableCell>
                <TableCell sx={tableHead}>Date&Time</TableCell>
                <TableCell sx={tableHead}>Total</TableCell>
                <TableCell sx={tableHead}>Delivery Address</TableCell>

             
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetails.map((order) =>
                order.cart.map((item, i) => (
                  <TableRow key={item._id || i}>
                    <TableCell sx={tableBody}>{order.user}</TableCell>
                    <TableCell sx={tableBody}>{order.payment}</TableCell>
                    <TableCell sx={tableBody}>
                      {item.title} <br />
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          marginLeft: "8px",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={tableBody}>{item.quantity}</TableCell>
                    <TableCell sx={tableBody}>{item.productQuantity}</TableCell>
                    <TableCell sx={tableBody}>₹{item.price}</TableCell>
                    <TableCell sx={tableBody}>
                      {new Date(order.date).toLocaleString()}
                    </TableCell>
                    <TableCell sx={tableBody}>₹{item.quantity*item.price}/-</TableCell>
                    
                    <TableCell sx={tableBody}>
                      <DeliveryAddressModel
                        name={order.userAddress?.fullname}
                        address={order.userAddress?.address}
                        contact ={order.userAddress?.contactnumber}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No orders available.</Typography>
      )}
    </Box>
  );
}
