import axios from "axios";
import { useState, useEffect } from "react";
import { useCart } from "../store/cartContext";
import useAuthStore from "../store/authStore"

function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const { setNotificationLenght } = useCart() || {};
  const {isAuth}=useAuthStore()

  const fetchCanceledOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, unable to fetch notifications");
        return;
      }

      const response = await axios.get(
        "https://ecommerce-nac-backend.onrender.com/cancel/notification",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotifications(response.data);
        if (setNotificationLenght) {
          setNotificationLenght(response.data.length);
          localStorage.setItem("notificationLength", response.data.length); 
        }
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.status);
      } else if (error.request) {
        console.error("No response from the server:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchCanceledOrder();
  }, [isAuth]); 

  return {
    notifications,
    fetchCanceledOrder,
  };
}

export default useNotifications;
