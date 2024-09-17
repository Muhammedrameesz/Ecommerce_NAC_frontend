import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Stack, TextField } from "@mui/material";
import { Star, StarBorderSharp } from "@mui/icons-material";
import CloseIcon from "../../../image/Close_Icon_Dark-512.webp";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../../../UI/loadinSpinner.jsx";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#181818",
    color: "#d1d1d1",
    fontSize: "12px",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#181818",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width:{xs:280,sm:350,md:400},
  bgcolor: "#1f1f1f",
  border: "2px solid #242424",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  //   textAlign:'center'
};

const status = [
  { status: "Very Bad", color: "#eb3326" },
  { status: "Bad", color: "#eb700c" },
  { status: "Average", color: "#2668e2" },
  { status: "Good", color: "#7dc71b" },
  { status: "Excellent", color: "#20cc0a" },
];

export default function BasicModal(props) {
  const itemId = props.itemId;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setRating(0);
    setReview("");
  };
  const handleClose = () => {
    setOpen(false);
    setRating(0);
    setReview("");
  };
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#c5c5c5",
      fontSize: "14px",
      "& input": {
        padding: "14px ",
      },
      "& fieldset": {
        borderColor: "#c5c5c5",
      },
      "&:hover fieldset": {
        borderColor: "#dddddd",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#c5c5c5",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#727272",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#8b8b8b",
    },
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async () => {
    try {
      if (rating === 0) {
        toast.error("Rating is required");
        return;
      }
      if (review === null) {
        toast.error("Review is required");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `https://ecommerce-nac-backend.onrender.com/rateAndReview/saveReview`,
        {
          review,
          rating,
          itemId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setTimeout(() => {
          toast.success(response.data.message);
          setOpen(false);
          setRating(0);
          setReview("");
          setLoading(false);
          // window.location.reload()
        }, 3000);
      }
    } catch (error) {
      setTimeout(() => {
        console.log(error);
        toast.error(error.response?.data?.message);
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#0a0a0a",
          borderRadius: "10px",
          backgroundColor: "rgba(18, 172, 23, 0.8)",

          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "rgba(20, 163, 24, 0.7)",
            color: "#0a0a0a",
            fontWeight: "bold",
          },
        }}
      >
        Add a review
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              mt: "-25px",
            }}
          >
            <CustomTooltip title={"Close"}>
              <IconButton onClick={handleClose}>
                <img
                  src={CloseIcon}
                  alt="close"
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </IconButton>
            </CustomTooltip>
          </Stack>
          <Stack spacing={1}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                color: "#b9b9b9",
              }}
            >
              Add Review and Rating
            </Typography>
            <TextField
              sx={textFieldStyle}
              fullWidth
              id="outlined-multiline-static"
              label="Add review"
              multiline
              rows={6}
              required={true}
              onChange={(e) => setReview(e.target.value)}
            ></TextField>
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography component="span" sx={{ mr: 1, color: "#b9b9b9" }}>
              Rating:
            </Typography>
            {Array.from({ length: 5 }).map((_, index) => (
              <IconButton
                key={index}
                onClick={() => handleStarClick(index)}
                sx={{
                  transition: "transform 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.2)",
                    color: "#ffdf00",
                  },
                  "&:active": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                {index < rating ? (
                  <Star
                    sx={{
                      color: "yellow",
                      fontSize: "25px",
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "#ffeb3b",
                      },
                    }}
                  />
                ) : (
                  <StarBorderSharp
                    sx={{
                      color: "#8d8d8d",
                      fontSize: "25px",
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "#eece19",
                      },
                    }}
                  />
                )}
              </IconButton>
            ))}
            <Typography component={"div"} sx={{ ml: 2 }}>
              {status[rating - 1] && (
                <Typography
                  color={status[rating - 1].color}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    opacity: 0.9,
                    transition: "color 0.4s ease, opacity 0.3s ease",
                  }}
                >
                  {status[rating - 1].status}
                </Typography>
              )}
            </Typography>
          </Box>
          <Button
            onClick={handleSubmit}
            disabled={review.length === 0}
            variant="contained"
            sx={{
              backgroundColor: "#5a13ac",
              textTransform: "none",
              mt: 2,
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#430c81",
              },
            }}
          >
            {loading ? <LoadingSpinner /> : " Submit"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
