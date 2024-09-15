import axios from "axios";
import { useEffect, useState } from "react";

function GetCartProducts() {
  const [product, setProduct] = useState([]);
  const [cartLength, setCartLength] = useState(0);

  const fetchCartProducts = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-nac-backend.onrender.com/product/get-cart-products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProduct(response.data);
      setCartLength(response.data.length); 
    } catch (error) {
      console.error("Error fetching cart products:", error);
     
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return { product, cartLength, setProduct, fetchCartProducts };
}

export default GetCartProducts;
