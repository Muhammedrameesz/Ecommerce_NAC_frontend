import { useState, useEffect } from "react";
import axios from "axios";

function useGetUser() {
  const [userMail, setUserMail] = useState("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axios.post(
          `https://ecommerce-nac-backend.onrender.com/user/verify-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const email = response.data.data.data; 
        setUserMail(email);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, []); 
  
  return userMail;
}

export default useGetUser;
