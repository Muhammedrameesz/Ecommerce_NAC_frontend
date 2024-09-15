import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGetCartProduct from "../customHooks/useGetCartProduct";
import useAuthStore from "./authStore";
// import useGetUserNotification from "../customHooks/getUserNotifications"

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { product, setProduct, fetchCartProducts } = useGetCartProduct();
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [grantTotal, setGrantTotal] = useState(0);
  const [cartLength, setCartLength] = useState(0);
  const { isAuth, checkAuth } = useAuthStore();
  const[notificationLength,setNotificationLenght] =useState(0)
 

  useEffect(() => {
    if (isAuth) {
      fetchCartProducts();
      // fetchCanceledOrder()
    }
  }, [isAuth]);

  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required. Please log in.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `https://ecommerce-nac-backend.onrender.com/product/add-to-cart`,
        { item },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        await fetchCartProducts();
        toast.success("Item added to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Item already added to cart");
          navigate("/product/cart");
        } else if (error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Internal server error");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };
  useEffect(() => {
    setCartLength(product.length);
  }, [product]);

  // Update quantity and give it back to calculate the price
  const updateQuantity = async (item, quantity) => {
    try {
      const updatedCartItems = product.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity } : cartItem
      );
      setProduct(updatedCartItems);
      calculateTotalPrice(updatedCartItems);
      const response = await axios.post(
        `https://ecommerce-nac-backend.onrender.com/product/update/cart/quantity`,
        updatedCartItems,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Cart updated successfully");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Calculate the total price along with the updated  quantity
  const calculateTotalPrice = (updatedProduct = product) => {
    const totalPrice = updatedProduct.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setGrantTotal(totalPrice);
  };

  useEffect(() => {
    if (product.map((item) => item.quantity === 1)) {
      calculateTotalPrice(product);
    }
  }, [product]);

  // Contact Address Form
  const formCart = async (data) => {
    try {
      const response = await axios.post(
        `https://ecommerce-nac-backend.onrender.com/payment/add/user-address`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) {
        console.log("Something went wrong");
        return;
      }
       return response.data
    } catch (error) {
      console.error("Error saving contact details:", error);
    }
  };

  const buyItems = async ({ discountPrice }) => {
    if (product.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    try {
      const newOrders = product.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        discountPrice: item.discountPrice,
        subtotal: item.discountPrice * item.quantity,
      }));
      setLoading(true);
      const response = await axios.post(
        `https://ecommerce-nac-backend.onrender.com/api/product/order-products`,
        {
          orderItems: newOrders,
          discountPrice,
        }
      );

      setOrders(response.data.data);
      localStorage.removeItem("cartItems");
      setProduct([]);
      setGrantTotal(0);
      setCartLength(0);
      toast.success("Order successful");
      navigate("/products/order-summary");
      setLoading(false);
    } catch (error) {
      console.error("Error during purchase:", error);
      toast.error("Purchase failed");
      setLoading(false);
    }
  };

  const value = {
    product,
    setProduct,
    addToCart,
    updateQuantity,
    buyItems,
    grantTotal,
    cartLength,
    userDetails,
    setUserDetails,
    orders,
    setCartLength,
    loading,
    formCart,
    notificationLength,
    setNotificationLenght,

  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
