import {
  Box,
  Button,
  Stack,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoResult from "../../image/transperent.svg";
import LoadingSpinner from "../../UI/loadinSpinner.jsx";
import useGetUserNotifications from "../../customHooks/getUserNotifications";
import useGetAdminNotify from "../../customHooks/getAdminNotifications";

export default function AdminNotifications() {
  const { cancelRequests, requestedProducts, loading, error, fetchCancelRequests } = useGetAdminNotify();
  const [processing, setProcessing] = useState({});
  const { fetchCanceledOrder } = useGetUserNotifications();

  const API_BASE_URL = "https://ecommerce-nac-backend.onrender.com";
  const CONFIRM_CANCEL_ENDPOINT = `${API_BASE_URL}/cancel/deletePermenently`;

  const typoStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#a5a5a5",
  };

  const paperStyle = {
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "#161616",
    transition: "transform 0.4s, box-shadow 0.4s",
    width: "auto",
    maxWidth: "80%",
    "&:hover": {
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.5)",
    },
  };

  const buttonStyle = {
    textTransform: "none",
    backgroundColor: "#0caa0c",
    color: "#000",
    fontSize: "14px",
    fontWeight: "bold",
    ml: "auto",
    transition: "all 0.5s",
    "&:hover": {
      backgroundColor: "#087708",
      color: "#000",
      transform: "scale(1.05)",
    },
  };

  const handleConfirmCancel = async (order, product, user) => {
    const processingKey = `${order}_${product}_${user}`;
    setProcessing((prev) => ({ ...prev, [processingKey]: true }));
    try {
      const response = await axios.post(CONFIRM_CANCEL_ENDPOINT, {
        order,
        product,
        user,
      });

      setTimeout(async () => {
        if (response.status === 200) {
          toast.success("Order cancelled successfully");
          await fetchCancelRequests();
          await fetchCanceledOrder();
        } else {
          toast.error("Order cancellation failed");
        }
        setProcessing((prev) => ({ ...prev, [processingKey]: false }));
      }, 3000);
    } catch (error) {
      console.error("Order cancellation failed:", error);
      setTimeout(() => {
        toast.error("Order cancellation failed");
        setProcessing((prev) => ({ ...prev, [processingKey]: false }));
      }, 3000);
    }
  };

  return (
    <Box ml={{ xs: 8, md: 40 }} mt={2} mr={2} mb={3}>
      {loading ? (
        <Stack alignItems="center">
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Stack>
      ) : error ? (
        <>
             
          <img
            src={NoResult}
            alt="Error"
            style={{
              width: "40%",
              height: "auto",
              marginLeft:'100px',
            }}
          />
        </>
      ) : cancelRequests.length === 0 ? (
        <>
          <Typography sx={{ color: "#be1414" }}>
            No Cancellation Requests...
          </Typography>
          <img
            src={NoResult}
            alt="Error"
            style={{
              width: "40%",
              height: "auto",
            }}
          />
        </>
      ) : (
        <>
          <Typography
            sx={{
              textAlign: "center",
              color: "#5618b3",
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              fontWeight: "bold",
              mb: 4,
              width: "auto",
              maxWidth: "80%",
              textDecoration: '1px dotted underline'
            }}
          >
            Order Cancellation Requests
          </Typography>
          <Stack spacing={8}>
            {cancelRequests.map((item) => (
              <Paper key={item._id} elevation={10} sx={paperStyle}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3, md: 5 }} alignItems="center">
                  <Stack spacing={1}>
                    <Typography sx={typoStyle}>User: {item.user}</Typography>
                    <Typography sx={typoStyle}>
                      Order ID: {item.order_id}
                    </Typography>
                    <Typography sx={typoStyle}>
                      Product ID: {item.product_id}
                    </Typography>
                  </Stack>

                  {requestedProducts && requestedProducts
                    .filter((order) => order._id === item.order_id)
                    .flatMap((product) =>
                      product.cart
                        .filter((canc) => canc._id === item.product_id)
                        .map((data) => (
                          <Stack key={data._id} spacing={1}>
                            <Typography sx={typoStyle}>
                              Product: {data.title}
                            </Typography>
                            <Typography sx={typoStyle}>
                              Quantity: {data.productQuantity}
                            </Typography>
                            <Typography sx={typoStyle}>
                              Volume: {data.quantity}
                            </Typography>
                            <Typography sx={typoStyle}>
                              Price: ${data.price}
                            </Typography>
                          </Stack>
                        ))
                    )}

                  <Button
                    onClick={() =>
                      handleConfirmCancel(
                        item.order_id,
                        item.product_id,
                        item.user
                      )
                    }
                    variant="contained"
                    size="small"
                    disabled={processing[`${item.order_id}_${item.product_id}_${item.user}`]}
                    sx={buttonStyle}
                    aria-label={`Confirm cancellation for order ${item.order_id} and product ${item.product_id}`}
                  >
                    {processing[`${item.order_id}_${item.product_id}_${item.user}`]
                      ? <LoadingSpinner />
                      : "Confirm Cancellation"}
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
}
