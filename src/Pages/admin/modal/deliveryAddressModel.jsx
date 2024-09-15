import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import closeIconDark from "../../../image/Close_Icon_Dark-512.webp"
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";


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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "#1d1d1d",
  border: "2px solid #858585",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

export default function TransitionsModal({ name, address, contact }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const TypoStyle = {
    color: "#c4c4c4", 
    mt: 2, 
    fontSize: "16px", 
    lineHeight: "1.5", 
  };
  const spanStyle ={
    ...TypoStyle,
    color:'#8d8d8d'
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        size="small"
        sx={{
          fontSize: "12px",
          textTransform: "none",
          color:'#6822eb',
          border:'1px solid #6822eb',
          "&:hover":{
            color:'#5788e2',
            border:'1px solid #5788e2',
          }
        }}
      >
        Address
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
       
        <Fade in={open}>
        
          <Box sx={style}>
            <CustomTooltip title="close" >
            <img src={closeIconDark} alt="close" onClick={handleClose}  style={{
              width:'33px',
              height:'33px',
              cursor:'pointer',
              display:'flex',
              marginLeft:'280px',
              marginTop:'-15px',
              marginBottom:'5px'
            }}/>
            </CustomTooltip>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                color: "#31be44", 
                fontWeight: "bold", 
                // textAlign: "center", 
                mb: 2, 
                textDecoration:'underline'
              }}
            >
              Delivery Details
            </Typography>
            <Typography id="transition-modal-description" sx={TypoStyle}>
              <strong>Full-Name:</strong> <span style={spanStyle}>{name}</span>
            </Typography>
            <Typography id="transition-modal-description" sx={TypoStyle}>
              <strong>Contact:</strong> <span style={spanStyle}>{contact}</span>
            </Typography>
            <Typography id="transition-modal-description" sx={TypoStyle}>
              <strong>Address:</strong> <span style={spanStyle}>{address}</span>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
