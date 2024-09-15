import axios from "axios";
import { useEffect, useState } from "react";

export default function useAllUsers() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usersCount,setUsersCount]=useState()

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://ecommerce-nac-backend.onrender.com/userList/allUsers");
      if (response.status === 200) {
        setUserList(response.data); 
        setUsersCount(response.data.length)
      } else {
        setError(response.data.message || 'Error fetching users');
      }
    } catch (error) {
      setError(error.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { userList, loading, error,usersCount };
}
