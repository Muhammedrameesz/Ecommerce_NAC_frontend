import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Button,useTheme, useMediaQuery } from "@mui/material";
import { ReactComponent as CartIcon }  from "../image/transperent.svg";
import { toast } from "react-toastify";
import { useCart } from "../store/cartContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LoadingSpinner from "../UI/loadinSpinner.jsx";
import UseGetuserNotifications from "../customHooks/getUserNotifications"
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import useGetAdminNotifications from "../customHooks/getAdminNotifications"

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

export default function UserNotifications() {
  const {notifications,fetchCanceledOrder} = UseGetuserNotifications();
  const [loadingStates, setLoadingStates] = useState({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { fetchCancelRequests} = useGetAdminNotifications()

  let count =1;

  const handleNotifyDelete = async (notifyId) => {
    setLoadingStates((prev) => ({ ...prev, [notifyId]: true }));
    try {
      const response = await axios.post(
        `https://ecommerce-nac-backend.onrender.com/cancel/delete/notification/${notifyId}`
      );

      setTimeout(async () => {
        if (response.status === 200) {
          toast.success("Deleted successfully");
          await fetchCanceledOrder();
          await  fetchCancelRequests()
        } else {
          toast.error("Deleting failed");
        }
        setLoadingStates((prev) => ({ ...prev, [notifyId]: false }));
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        console.log(error);
        toast.error("Deleting failed");
        setLoadingStates((prev) => ({ ...prev, [notifyId]: false }));
      }, 3000);
    }
  };

  // Text styles
  const baseTextStyle = {
    fontSize: "14px",
    color: "#c9c9c9",
    display: "flex",
    alignItems: "center",
    fontFamily: "cursive",
  };

  const orderTextStyle = {
    ...baseTextStyle,
    color: "#34b814",
  };

  return (
    <Box
      sx={{
        padding: 3,
        color: "#fff",
        borderRadius: 2,
      }}
    >
      {notifications.length > 0 ? (
        <>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "#c4c4c4",
              textDecoration: "1px dotted underline",
              fontFamily: "cursive",

            }}
          >
            Order Cancellation Notifications
          </Typography>
          <Box
            sx={{
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            {notifications.map((notify) => (

              <Stack
                key={notify._id}
                direction={isSmallScreen ? 'column' : 'row'}
                spacing={{xs:1,md:2,lg:3}}
                sx={{
                  overflowX: "auto",
                  backgroundColor: "#1f1f1f",
                  padding: "15px",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
                  alignItems: "center",
                  marginBottom: "15px",
                  transition: "transform 0.3s ease-in-out",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  maxWidth: "auto",
                }}
              >
                <Typography sx={{mr:5,...orderTextStyle}} > {count++}) </Typography>
                <Typography sx={baseTextStyle}>
                  Your order for cancellation orderId:
                </Typography>
                <Typography sx={orderTextStyle}>{notify.order_id}</Typography>
                <Typography sx={baseTextStyle}>ProductId:</Typography>
                <Typography sx={orderTextStyle}>{notify.product_id}</Typography>
                <Typography sx={baseTextStyle}>
                  has been successfully confirmed.
                </Typography>

                {loadingStates[notify._id] ? (
                  <LoadingSpinner />
                ) : (
                  <CustomTooltip title="delete" >
                  <DeleteOutlineOutlinedIcon
                    onClick={() => handleNotifyDelete(notify._id)}
                    sx={{
                      color: "#c71313",
                      fontWeight: "bold",
                      // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
                      borderRadius: "12px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      ml: 5,
                      transition: "all 0.5s",
                      "&:hover": {
                        transform: "scale(1.2)",
                      },
                    }}
                  />
                  </CustomTooltip>
                )}
              </Stack>
            ))}
          </Box>
        </>
      ) : (
        <Stack
          spacing={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            mt: 3,
          }}
        >
          <Typography variant="body1" sx={{ color: "#b62a00",
          fontFamily:'cursive',
          fontSize:{xs:'12px',md:'16px'}
         }}>
            Notifications Not Found..!
          </Typography>
          <Stack width={'35%'}>
          <CartIcon />
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
