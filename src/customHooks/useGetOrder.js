import axios from "axios";
import { useState, useEffect } from "react";

function useGetOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'https://ecommerce-nac-backend.onrender.com/payment/get-payment/order',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error('Failed to fetch orders');
        }
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return orders;
}

export default useGetOrder;
