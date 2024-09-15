import { create } from "zustand";
import axios from "axios";


const verifyToken = async (token) => {
  const result = await axios.post(
    "https://ecommerce-nac-backend.onrender.com/user/verify-token",
    { token },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (result.status !== 200) {
    throw new Error("Token is invalid");
  }
  return result.data;
};


const veryfyGtoken = async (token) => {
  const result = await axios.post(
    "https://ecommerce-nac-backend.onrender.com/user/verify-g-token",
    {token}
  );
  if (result.status !== 200) {
    throw new Error("Token is invalid");
  }
    
  const decode = result.data.decode;
  let profileArray = JSON.parse(localStorage.getItem('profileArray')) || [];
  profileArray.push(decode);
  localStorage.setItem('profileArray', JSON.stringify(profileArray));
  localStorage.setItem('profile', JSON.stringify(decode));
  const event = new Event('profileUpdated');
  window.dispatchEvent(event);
  return result.data;
};



const useAuthStore = create((set) => ({

  isAuth: false,
  loading: true,

  login: async (token) => {
    try {
      await verifyToken(token);
      localStorage.setItem("token", token);
      set({ isAuth: true, loading: false });
    } catch (error) {
      console.error("Token verification failed:", error);
      set({ isAuth: false, loading: false });
    }
  },

  signup: async (token) => {
    try {
      await verifyToken(token);
      localStorage.setItem("token", token);
      set({ isAuth: true, loading: false });
    } catch (error) {
      console.error("Token verification failed:", error);
      set({ isAuth: false, loading: false });
    }
  },

  googleAuth: async (token) => {
    try {
      await veryfyGtoken(token);
      localStorage.setItem("gtoken", token);
      set({ isAuth: true, loading: false });
    } catch (error) {
      console.error("Token verification failed:", error);
      set({ isAuth: false, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("gtoken");
    localStorage.removeItem("profile");
    set({ isAuth: false });

      // Dispatch custom event
      const event = new Event('logout');
      window.dispatchEvent(event);
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    const gtoken = localStorage.getItem("gtoken");
  
    const verifyTokens = async (token) => {
      if (token) {
        try {
          await verifyToken(token);
          return true;
        } catch (error) {
          return false;
        }
      }
      return false;
    };
  
    const verifyGTokens = async (gtoken) => {
      if (gtoken) {
        try {
          await veryfyGtoken(gtoken);
          return true;
        } catch (error) {
          return false;
        }
      }
      return false;
    };
  
    set({ loading: true });
  
    const isAuth = (await verifyTokens(token)) || (await verifyGTokens(gtoken));
  
    set({ isAuth, loading: false });
  },
}));

export default useAuthStore;
//  checkAuth: () => set(() => ({ isAuth: !!localStorage.getItem('token') }))
