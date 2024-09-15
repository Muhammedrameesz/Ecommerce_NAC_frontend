import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import AddProduct from "./Pages/AddProduct";
import Contact from "./Pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "./store/authStore";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/cart.jsx";
import Signup from "./Pages/Signup.jsx";
import Instructer from "./Pages/instructerLogin.jsx";
import useInstructerAuthStore from "./store/InstructerAuthStore";
import { CartProvider } from "./store/cartContext";
import ProtectedRoute from "./Components/protectedRouts/protectedRoute.js";
import InsProtectedRoute from "./Components/protectedRouts/instructorProtectedRout.js";
import Orders from "./Pages/orders.jsx";
import AdminProduct from "./Pages/admin/adminProduct.jsx";
import AdminNav from "./Components/AdminNavbar.jsx";
import { useState } from "react";
import AdminDashBoard from "./Pages/admin/adminDashBoard.jsx";
import OrdersAdmn from "./Pages/admin/ordersAdmn.jsx"
import AdminNotifications from "./Pages/admin/adminNotifications.jsx"
import UserNotificatins from "./Pages/userNotifications.jsx"
import Trash from "./Pages/admin/trash.jsx"


export default function App() {
  const { isAuth, checkAuth, loading } = useAuthStore();
  const { isInAuth, checkInsAuth, loadings } = useInstructerAuthStore();
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleNav = () => {
    setIsAdmin((prev) => !prev); 
  };

  useEffect(() => {
    if (localStorage.getItem('adminNav')) {
      setIsAdmin(false);
    } else if (localStorage.getItem('userNav')) {  
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();
    checkInsAuth();
  }, [checkAuth, checkInsAuth]);

  return (
    <CartProvider>
      <div>
        {isAdmin ? <AdminNav toggleNav={toggleNav} /> : <Navbar toggleNav={toggleNav}/>}

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Routes for Authenticated Users */}
          <Route
            path="/home"
            element={
                <Home />
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute isAuth={isAuth} loading={loading}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute isAuth={isAuth} loading={loading}>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute isAuth={isAuth} loading={loading}>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/cart"
            element={
              <ProtectedRoute isAuth={isAuth} loading={loading}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isAuth={isAuth} loading={loading}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/notifications"
            element={
              <ProtectedRoute isAuth={isAuth} loading={loading}>
                <UserNotificatins />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes for Instructor Auth */}
          <Route path="/instructer" element={<Instructer />} />
          <Route
          path="/admin-dashboard"
          element={
            <InsProtectedRoute
              isInAuth={isInAuth}
              loading={loadings}
              redirectPath="/instructer"
            >
              <AdminDashBoard/>
            </InsProtectedRoute>
          }
          />
          <Route
            path="/add-product"
            element={
              <InsProtectedRoute
                isInAuth={isInAuth}
                loading={loadings}
                redirectPath="/instructer"
              >
                <AddProduct />
              </InsProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <InsProtectedRoute
                isInAuth={isInAuth}
                loading={loadings}
                redirectPath="/instructer"
              >
                <AdminProduct />
              </InsProtectedRoute>
            }
          />
          <Route
            path="/view-orders"
            element={
              <InsProtectedRoute
                isInAuth={isInAuth}
                loading={loadings}
                redirectPath="/instructer"
              >
                <OrdersAdmn />
              </InsProtectedRoute>
            }
          />
           <Route
            path="/notifications"
            element={
              <InsProtectedRoute
                isInAuth={isInAuth}
                loading={loadings}
                redirectPath="/instructer"
              >
                <AdminNotifications />
              </InsProtectedRoute>
            }
          />
           <Route
            path="/trash"
            element={
              <InsProtectedRoute
                isInAuth={isInAuth}
                loading={loadings}
                redirectPath="/instructer"
              >
                <Trash/>
              </InsProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer autoClose={1500} />
      </div>
    </CartProvider>
  );
}
