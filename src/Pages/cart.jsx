import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, {useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../store/cartContext";
import Buttn from "../UI/+-button.jsx";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Modal from "@mui/material/Modal";
import Form from "../UI/formModal.jsx";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import axios from "axios";
import LodingSpinner from "../UI/loadinSpinner.jsx";
import Confetti from "../UI/confette.jsx";
import useGetUserDetals from "../customHooks/useGetUserDetails.js";
import { styled } from '@mui/material/styles';
import Footer from "../Components/footer.jsx"
import EmptyCart from "../image/black-bg-error.jfif"
import Payments from "../Components/payments.jsx"
import { toast } from "react-toastify";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: '#3d3d3d', 
    color: '#d1d1d1', 
    fontSize: '12px', 
  },
  [`& .MuiTooltip-arrow`]: {
    color: '#333', 
  },
}));

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transition: "all 0.5s ease-in-out",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "60%", md: "40%" },
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "50px",
  textAlign: "center",
  backgroundImage:
    "url(https://img.freepik.com/premium-photo/white-3d-figure-with-bottle-mineral-water-hand-white-background-ai-generated_1034098-11716.jpg?w=740)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundBlendMode: "darken",
  opacity: 0.8,
  padding: "20px",
  color: "white",
  fontFamily: "Poppins, sans-serif",
  fontWeight: "600",
  boxShadow: "0px 0px 10px 0px #302d2d",

  // backdropFilter: 'blur(15px)',
  // backgroundColor: "#291947",
  // p: 2,
  "@media (max-width: 600px)": {
    width: "50%", // Adjust width for small screens
    // p: 2,
  },
};

export default function Cart() {
  const [open, setOpen] = useState(false);
  const { userDetails, detailsExists, fetchUserDetails } = useGetUserDetals();
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 6000);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    cartLength,
    loading,
    grantTotal,
    setCartLength,
    setProduct,
    product,
  } = useCart();

  const style = {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  };

  const handleDelete = async (itemId) => {
    setLoadingItemId(itemId);
    try {
      const deleteItem = await axios.delete(
        `https://ecommerce-nac-backend.onrender.com/product/delete-cart-item/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (deleteItem.status !== 200) {
        toast.error("Failed to delete cart item");
        return;
      }

      setTimeout(() => {
        setProduct((prevProducts) =>
          prevProducts.filter((item) => item._id !== itemId)
        );
        const newCartLength = deleteItem.data.updatedLength;
        setCartLength(newCartLength);
        toast.success(deleteItem.data.message);
        setLoadingItemId(null);
      }, 2000);
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to delete cart item");
      setLoadingItemId(null);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ width: "99%", mt: "10px" }}
      >
        {" "}
        <div>{isVisible && <Confetti />}</div>
        <Link
          to={"/orders"}
          style={{ textDecoration: "none", textTransform: "none" }}
        >
          <Button
            size="small"
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#1a868a",
              textTransform: "none",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                color: "white",
                backgroundColor: "#1a868a",
                transform: "scale(1.03)",
              },
            }}
          >
            View Orders
          </Button>
        </Link>
      </Stack>
      <Box
        className="cart"
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          maxWidth: "1200px",
          margin: "auto",
          fontFamily: "Trebuchet MS",
        }}
      >
        {product.length === 0 ? (
          <div
            style={{
              display: isVisible ? "none": "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              gap: "8px",
              // marginTop: "0rem",
            }}
          >
            <img src={EmptyCart} alt="empty" style={{
              width:'35%'
            }}/>
            <h4
              style={{
                color: "red",
                fontSize: "16px",
                fontFamily: "cursive",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              Cart Is Empty
            </h4>
            <a
              href="/home"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CustomTooltip  title='Add products'>
              <AddIcon sx={{ color: "#9e9e9e" }} />
              </CustomTooltip>
            </a>
          </div>
        ) : (
          <Box mt={0}>
            {/* <hr style={{border:'1px dashed #7e7777 '}}/> */}
            <Box
              sx={{
                display: "flex",
                flexDirection:{xs:'column',md: "row"},
                alignItems: "center",
                gap: 4,
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  width: "30%",
                  margin: "2%",
                  backgroundColor: "#880d88",
                  color: "#e7e7e7",
                  borderRadius: "10px",
                  padding: "10px",
                  cursor: "pointer",
                  textTransform: "none",
                  transition:
                    "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
                  fontWeight: "bold",

                  "&:hover": {
                    backgroundColor: "#880d88",
                    fontWeight: "bold",
                    transform: "scale(1.03)",
                  },
                  "@media (max-width: 600px)": {
                    width: "80%",
                    margin: "5%",
                  },
                }}
              >
                <AddIcon />
                {detailsExists
                  ? "Edit Delivery Details"
                  : "Add Delivery Details"}
              </Button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyles}>
                  <Form
                    fetchUserDetails={fetchUserDetails}
                    handleClose={handleClose}
                    detailsExists={detailsExists}
                    userDetails={userDetails}
                  />
                </Box>
              </Modal>

              {detailsExists ? (
                <Stack sx={{ width: "auto", padding: "2%" }}>
                  <Grid
                    container
                    sx={{
                      border: "1px solid #928888",
                      padding: "10px",
                      borderRadius: "10px",
                      boxSizing: "border-box",
                      "@media (max-width: 600px)": {
                        padding: "5px",
                      },
                    }}
                  >
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "12px", color: "#b918a4aa" }}
                      >
                        <span style={{ color: "#888383" }}> Name:</span>{" "}
                        {userDetails.fullname}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "12px", color: "#b918a4aa" }}
                      >
                        <span style={{ color: "#888383" }}> Contact:</span>{" "}
                        {userDetails.contactnumber}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "12px", color: "#b918a4aa" }}
                      >
                        <span style={{ color: "#888383" }}> Address:</span>{" "}
                        {userDetails.address}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              ) : (
                <>
                  <Stack sx={{ width: "30%", padding: "2%" }}>
                    <Grid
                      container
                      sx={{
                        border: "1px solid #928888",
                        padding: "10px",
                        borderRadius: "10px",
                        boxSizing: "border-box",
                        "@media (max-width: 600px)": {
                          padding: "5px",
                        },
                      }}
                    >
                      <Grid item xs={12} textAlign={"center"} color={"#a00101"}>
                        <h5>Delivery Details Not Found...!</h5>
                        {/* <span> <HourglassEmptyIcon/></span>  */}
                      </Grid>
                    </Grid>
                  </Stack>
                </>
              )}
            </Box>
            <hr style={{ border: "1px dashed #7e7777 ", marginBottom: "5%" }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Stack spacing={2}>
                  {product.map((item, index) => (
                    <Stack
                      key={`${item._id}-${index}`}
                      direction={{ xs: "column", sm: "row" }}
                      spacing={6}
                      sx={{
                        // boxShadow: "rgba(255, 255, 255, 0.35) 0px 2px 10px",
                        borderBottom: "1px solid #696969",
                        p: 2,
                        alignItems: "center",
                      }}
                    >
                      <Stack spacing={3}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: "100px", height: "65px" }}
                        />
                        <Buttn item={item} />
                      </Stack>
                      <Stack spacing={1} sx={{ flex: 1 }}>
                        <h3 style={{ color: "#a8a8a8", letterSpacing: "1px" }}>
                          {item.title}
                        </h3>
                        <span
                          style={{ color: "#159111", letterSpacing: "1px" }}
                        >
                          <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                          {item.price * item.quantity}
                        </span>
                        <span
                          style={{
                            color: "#a8a8a8",
                            letterSpacing: "1px",
                            fontSize: "12px",
                          }}
                        >
                          {item.description}
                        </span>

                        <Stack direction="row" spacing={2}>
                          <Button
                            onClick={() => handleDelete(item._id)}
                            sx={{
                              color: "#ce1717",
                              border: "none",
                              textTransform: "none",
                              transition: "all 0.3s linear",
                              fontWeight: "bold",

                              "&:hover": {
                                backgroundColor: "#1a1a1a",
                              },
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            size="small"
                            variant="outlined"
                          >
                            {loadingItemId === item._id ? (
                              <LodingSpinner />
                            ) : (
                              <>
                              <CustomTooltip title="Delete This Product" placement="right">
                                <DeleteIcon
                                  sx={{
                                    fontSize: "20px",
                                    transition: "all 0.3s linear",

                                    "&:hover": {
                                      border: "none",
                                      // fontSize: "22px",
                                      backgroundColor: "#080808",
                                    },
                                  }}
                                />
                                </CustomTooltip>
                              </>
                            )}
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={12} md={5} justifyContent={"center"} >
                <Stack
                  spacing={1}
                  sx={{
                    p: 2,
                    border: "1px solid #8b8b8b",
                    textAlign: "center",
                    background: "linear-gradient(320deg,black,#111111,black)",
                    width: "65%",
                    ml: "10%",
                    borderRadius: "10px",
                  }}
                >
                  <h2
                    style={{
                      textAlign: "center",
                      textDecoration: "underline 1px solid #8d8686",
                      color: "#c9c9c9",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Product Details
                  </h2>
                  <br />
                  <Box sx={style}>
                    <span style={{ color: "#b2b2b3" }}>Quantity</span>
                    <span style={{ marginTop: "5px", color: "#b2b2b3" }}>
                      {cartLength} items
                    </span>
                  </Box>

                  <Box sx={style}>
                    <span style={{ marginTop: "10px", color: "#b2b2b3" }}>
                      Price
                    </span>
                    <span style={{ marginTop: "10px", color: "#b2b2b3" }}>
                      <CurrencyRupeeIcon
                        style={{ fontSize: "14px", color: "##b2b2b3" }}
                      />
                      {grantTotal}
                    </span>
                  </Box>

                  <Box sx={style}>
                    <span style={{ color: "#b2b2b3", marginTop: "10px" }}>
                      Discount
                    </span>
                    <span style={{ color: "#b2b2b3", marginTop: "10px" }}>
                      10%
                    </span>
                  </Box>

                  <Box sx={style}>
                    <span style={{ color: "#b2b2b3", marginTop: "10px" }}>
                      Discount price
                    </span>
                    <span style={{ color: "#b2b2b3", marginTop: "10px" }}>
                      -<CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                      {grantTotal / 10}
                    </span>
                  </Box>

                  <Box sx={style}>
                    <span style={{ color: "#b2b2b3", marginTop: "10px" }}>
                      Delivery Charges
                    </span>
                    <span style={{ color: "#b2b2b3", marginTop: "10px" }}>
                      Free
                    </span>
                  </Box>

                  <hr
                    style={{ width: "100%", border: "1px dashed #a09898 " }}
                  />

                  <Box sx={style}>
                    <Typography
                      variant="h6"
                      color="#10c510"
                      fontSize="20px"
                      fontWeight={"bold"}
                    >
                      Total Price
                    </Typography>
                    <Typography
                      variant="h6"
                      color="#10c510"
                      fontSize="20px"
                      display="flex"
                      alignItems="center"
                      fontWeight={"bold"}
                    >
                      <CurrencyRupeeIcon
                        style={{
                          fontSize: "16px",
                          marginRight: "4px",
                          color: "#10c510",
                          fontWeight: "bold",
                        }}
                      />
                      {grantTotal - grantTotal / 10}
                    </Typography>
                  </Box>

                  <hr
                    style={{ width: "100%", border: "1px dashed #a09898 " }}
                  />

                  <span style={{ color: "#b9b9b9", marginTop: "10px" }}>
                    You will save{" "}
                    <CurrencyRupeeIcon
                      style={{ fontSize: "14px", color: "green" }}
                    />
                    <span style={{ color: "green" }}>{grantTotal / 10}</span> on
                    this order
                  </span>

                  <Box padding={2}>
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={loading}
                    >
                      <CircularProgress color="inherit" />
                      <div className="loading-text">Processing....</div>
                    </Backdrop>
                  </Box>

                  <Payments
                    grantTotal={grantTotal - grantTotal / 10}
                    cartItems={product}
                    handleClick={handleClick}
                    NoDetails={detailsExists}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <footer style={{
        display:isVisible ? "none":'block'
      }}>
        <Footer/>
      </footer>
    </>
  );
}
