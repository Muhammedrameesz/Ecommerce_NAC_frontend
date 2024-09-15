import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function useGetUserDetals(){
  const [userDetails, setuserDetails] = useState([]);
  const [detailsExists, setDetailsExists] = useState(false);
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-nac-backend.onrender.com/payment/get/user-address`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.userDetails === false) {
        setDetailsExists(false);
        return; 
      }

      setuserDetails(response.data.data); 
      setDetailsExists(true);
    } catch (error) {
      console.error("Error fetching user details:", error.message || error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return {userDetails,setuserDetails,detailsExists, setDetailsExists,fetchUserDetails}
    
}