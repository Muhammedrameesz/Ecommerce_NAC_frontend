import { create } from "zustand";
import axios from "axios";

const verification = async (tokens) => {
  try {
    const result = await axios.post(
      "https://ecommerce-nac-backend.onrender.com/instructer/verification",
      { tokens },
      {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      }
    );
    if (result.status !== 200) {
      throw new Error("Token is invalid");
    }
    return result.data;
  } catch (error) {
    console.error("Token verification failed", error);
    throw new Error("Token verification failed");
  }
};
const useInstructerAuthStore = create((set) => ({
  isInAuth: false,
  loadings: true,

  instructer: async (tokens) => {
    try {
      await verification(tokens);
      localStorage.setItem("tokens", tokens);
      set({ isInAuth: true, loadings: false });
    } catch (error) {
      console.log(error);
      set({ isInAuth: false, loadings: false });
    }
  },

  insLogout: () => {
    localStorage.removeItem("tokens");
    set({ isInAuth: false });
  },

  checkInsAuth: async () => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      try {
        await verification(tokens);
        set({ isInAuth: true, loadings: false });
      } catch (error) {
        set({ isInAuth: false, loadings: false });
      }
    } else {
      set({ isInAuth: false, loadings: false });
    }
  },
}));

export default useInstructerAuthStore;
