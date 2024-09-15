import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Components/firebase";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

export default function SignupWithGoogle() {
  const googleAuth = useAuthStore((state) => state.googleAuth);
  const navigate = useNavigate();

  async function SigninWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);

      if (result.user) {
        const token = await result.user.getIdToken();
        await googleAuth(token);
        toast.success("Successfully logged in");
        navigate("/home");
      } else {
        toast.error("Failed to log in");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to log in. Please try again.");
    }
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Stack spacing={1} alignItems="center">
        <Typography variant="body1" color="textSecondary">
          --or continue with--
        </Typography>

        <Button
          // onClick={SigninWithGoogle}
          aria-label="Sign up with Google"
          // disabled={true}
          sx={{
            color: "#fff",
            backgroundColor: "black",
            borderRadius: "5px",
            textTransform: "none",
            padding: '6px 12px',
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: "Helvetica",
            cursor:'not-allowed',
            transition:'all 0.5s ',
            "&:hover": {
              backgroundColor: "black",
              color: "#fff",
              transform: 'scale(1.02)',
            },
          }}
          startIcon={<FcGoogle size={18} />} // Adjusted icon size
        >
          Sign up with Google
        </Button>
      </Stack>
    </Box>
  );
}
