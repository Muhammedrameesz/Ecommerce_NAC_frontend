import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import { useCart } from "../store/cartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Confetti from "../UI/confette.jsx";
import { useState } from "react";
import LoadingSpinner from "../UI/loadinSpinner.jsx"


const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;

  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width:{xs:300,md:350,lg:400},
  bgcolor: "#202020",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function Payments({
  grantTotal,
  cartItems,
  handleClick,
  NoDetails,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    if (NoDetails) {
      return setOpen(true);
    } else {
      toast.error("Please Add Delivery Details ");
    }
  };
  const handleClose = () => setOpen(false);
  const { setProduct } = useCart();
  const navigate = useNavigate();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!window.Razorpay) {
      console.error("Razorpay SDK is not loaded");
      return;
    }

    try {
      const response = await axios.post("https://ecommerce-nac-backend.onrender.com/payment/order", {
        amount: grantTotal,
      });

      const order = response.data.data;
      console.log("order", order);

      const options = {
        key: "rzp_test_54hIf49p1a39tZ",
        amount: grantTotal,
        currency: order.currency,
        name: "Ramees",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          console.log(response);
          const result = await axios.post(
            "https://ecommerce-nac-backend.onrender.com/payment/verify",
            {
              razorpay_order_id: order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              grantTotal,
              cartItems,
              paymentStatus: "paid",
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("result", result);
          setProduct([]);
          handleClick();
          // setTimeout(()=>{
          //   toast.success("Payment successful");
          //   navigate("/orders", { replace: true });
          // },6000)
        },
        prefill: {
          name: "Ramees",
          email: "rameesta555@gmail.com",
          contact: "6238339877",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#0f0f8d",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
      });

      rzp1.open();
    } catch (error) {
      console.error("Error in payment process:", error);
    }
  };

  const handleCashOnDelivery = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce-nac-backend.onrender.com/payment/cashOnDelivery`,
        {
          grantTotal,
          cartItems,
          paymentStatus: "Cash On Delivery",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      setTimeout(() => {
        if (response.status === 200) {
          toast.success("Order Placed Successfully");
          setProduct([]);
          handleClick();
        } else {
          console.log(response.data.message);
          toast.error("Something went wrong");
        }
        setLoading(false);
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        console.error("Error placing order:", error);
        toast.error("Internal server error");
        setLoading(false);
      }, 3000);
    }
  };
  

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          mt: 3,
          width: "100%",
          textTransform: "none",
          backgroundColor: "#15b100f8",
          transition: "all 0.5s ease-in-out",
          color: "black",
          fontWeight: "bold",
          border: "1px solid #fff",
          "&:hover": {
            transform: "scale(1.02)",
            border: "none",
            color: "black",
            backgroundColor: "#15b100f8",

            border: "1px solid #fff",

            fontWeight: "bold",
          },
        }}
      >
        <CheckCircleIcon style={{ fontSize: "medium" }} />
        Place Order
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Tooltip title="Close">
              <CloseIcon
                onClick={handleClose}
                sx={{
                  display: "flex",
                  marginLeft: "auto",
                  cursor: "pointer",
                  fontSize: "1.7rem",
                  color: "#7e7e7e",
                  "&:hover": {
                    transform: "scale(1.05)",
                    cursor: "pointer",
                  },
                }}
              />
            </Tooltip>
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "#c7c7c7" }}
            >
              Payment Options
            </Typography>
            <Typography
              id="spring-modal-description"
              sx={{ mt: 2, color: "#c7c7c7" }}
            >
              Select a payment option and proceed ?
            </Typography>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{
                marginTop: "20px",
                padding: "5px",
              }}
            >
              <Button
                variant="contained"
                onClick={(e) => handlePayment(e)}
                size="small"
                sx={{
                  backgroundColor: "#2e8d09",
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  transition:
                    "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#226b05",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Pay Now
              </Button>
              <Button
                variant="contained"
                onClick={(e) => handleCashOnDelivery(e)}
                size="small"
                sx={{
                  backgroundColor: "#880d88",
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  transition:
                    "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#6a0d6a",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {loading ? <LoadingSpinner/>:'Cash On Delivery'}
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
