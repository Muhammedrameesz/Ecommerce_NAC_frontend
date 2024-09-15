import { Box, Button, Stack, TextField, CircularProgress, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCart } from "../store/cartContext";

export default function QuantityControl({ item }) {
  const { updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity || 1);

  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setLoading(true);
      setTimeout(() => {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        updateQuantity(item, newQuantity);
        setLoading(false);
      }, 2000);
    }
  };

  const handleIncrement = () => {
    setLoading(true);
    setTimeout(() => {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(item, newQuantity);
      setLoading(false);
    }, 2000);
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
      updateQuantity(item, value);
    } else if (event.target.value === "") {
      setQuantity(1);
      updateQuantity(item, 1);
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "50%",
            minWidth: "25px",
            height: "25px",
            fontWeight: 500,
            backgroundColor: "#000",
            color: "#ffffff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={handleDecrement}
          // disabled={loading}
        >
          -
        </Button>

        <TextField
          value={quantity}
          onChange={handleChange}
          variant="outlined"
          size="small"
          sx={{
            width: "40px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#918888",
                borderRadius: "10%",
              },
              "&:hover fieldset": {
                borderColor: "#ddd6d6",
                borderRadius: "10%",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#918888",
                borderRadius: "10%",
              },
            },
            "& input": {
              textAlign: "center",
              padding: 0,
              height: "25px",
              lineHeight: "30px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#ffffff",
              borderRadius: "50%",
              boxShadow: "0px 4px 8px rgba(255, 5, 5, 0.2)",
            },
          }}
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          disabled={loading}
          InputProps={{
            endAdornment: loading && (
              <InputAdornment position="end">
                <CircularProgress size={18} sx={{ color: '#ada7a7' }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "50%",
            minWidth: "25px",
            height: "25px",
            backgroundColor: "#000",
            fontWeight: 500,
            color: "#ffffff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={handleIncrement}
          // disabled={loading}
        >
          +
        </Button>
      </Stack>
    </Box>
  );
}
