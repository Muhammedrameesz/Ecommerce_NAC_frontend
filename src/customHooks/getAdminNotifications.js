import axios from "axios";
import { useState, useEffect } from "react";
import { useCart } from "../store/cartContext";
import useAuthStore from "../store/InstructerAuthStore"

function useNotifications() {
  const [cancelRequests, setCancelRequests] = useState([]);
  const [requestedProducts, setRequestedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {isInAuth}=useAuthStore()

  // const { setAdminNotificationLenght } = useCart();

  const API_BASE_URL = "https://ecommerce-nac-backend.onrender.com";
  const FETCH_CANCEL_REQUESTS_ENDPOINT = `${API_BASE_URL}/cancel/getCancelationOrdersForAdmin`;

  const fetchCancelRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(FETCH_CANCEL_REQUESTS_ENDPOINT);

      if (response.status === 200) {
        const { cancelRequest, productDetails } = response.data;

        setCancelRequests(cancelRequest);
        setRequestedProducts(productDetails);
        localStorage.setItem("AdminNotificationLength", cancelRequest.length.toString());

        setError(null); 
      } else {
        throw new Error("Failed to fetch cancel requests");
      }
    } catch (error) {
      console.log("Error fetching cancellation requests:", error);
      setError(error.message || "Something went wrong");
      setCancelRequests([]);
      setRequestedProducts([]);

      localStorage.setItem("AdminNotificationLength", "0");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchCancelRequests();
  }, [isInAuth]);

  return {
    cancelRequests,
    requestedProducts,
    loading,
    fetchCancelRequests,
    error,
  };
}

export default useNotifications;
