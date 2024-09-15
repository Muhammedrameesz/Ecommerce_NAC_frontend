import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import NoResult from "../../image/no result.png";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AllUsers from "../../Components/instructer/getAllUser";
import ProductHook from "../../customHooks/productHook";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
);

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [monthlySales, setMonthlySales] = useState({});
  const [paymentStatus, setPaymentStatus] = useState({});
  const [productSales, setProductSales] = useState([]);
  const [paid, setPaid] = useState(0);
  const [COD, setCOD] = useState(0);
  const { usersCount } = AllUsers();
  const { productCount } = ProductHook();
  const [visible, setVisible] = useState("");
 

  const handleVisible = (visible) => {
    setVisible(visible);
  };

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-nac-backend.onrender.com/payment/allOrders"
      );
      const data = response.data.data;

      if (!data || data.length === 0) {
        console.log("No orders");
        return;
      }

      setOrders(data);
      aggregateData(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const aggregateData = (data) => {
    let totalAmount = 0;
    let totalQuantity = 0;
    let totalPaidAmount = 0;
    let totalCODAmount = 0;
    const monthlySales = {};
    const paymentStatus = { paid: 0, "cash on delivery": 0 };
    const productSales = {};

    data.forEach((order) => {
      totalAmount += order.total;

      // Update payment status counts
      if (order.payment === "paid") {
        totalPaidAmount += order.total;
      } else if (order.payment === "Cash On Delivery") {
        totalCODAmount += order.total;
      }

      paymentStatus[order.payment] = (paymentStatus[order.payment] || 0) + 1;

      order.cart.forEach((item) => {
        totalQuantity += item.quantity;
        const key = `${item.title} - ${item.productQuantity}`;
        productSales[key] = (productSales[key] || 0) + item.quantity;
      });

      const month = new Date(order.date).toLocaleString("default", {
        month: "short",
      });
      monthlySales[month] = (monthlySales[month] || 0) + order.total;
    });

    setTotalAmount(totalAmount);
    setTotalQuantity(totalQuantity);
    setMonthlySales(monthlySales);
    setPaymentStatus(paymentStatus);
    setPaid(totalPaidAmount);
    setCOD(totalCODAmount);
    setProductSales(
      Object.entries(productSales).map(([title, quantity]) => ({
        title,
        quantity,
      }))
    );
    // Setting totals for payment methods
    // setTotalPaidAmount(totalPaidAmount);
    // setTotalCODAmount(totalCODAmount);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const monthlySalesData = {
    labels: Object.keys(monthlySales),
    datasets: [
      {
        label: "Monthly Sales",
        data: Object.values(monthlySales),
        backgroundColor: "rgba(230, 7, 55, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const paymentStatusData = {
    labels: Object.keys(paymentStatus),
    datasets: [
      {
        label: "Payment Status",
        data: Object.values(paymentStatus),
        backgroundColor: ["#42A5F5", "#FF7043"],
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const productSalesData = {
    labels: productSales.map((p) => p.title),
    datasets: [
      {
        label: "Product Sales",
        data: productSales.map((p) => p.quantity),
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return;

          const { top, bottom } = chartArea;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, "rgba(0, 128, 128, 0.2)");
          gradient.addColorStop(0.3, "rgba(0, 102, 204, 0.2)");
          gradient.addColorStop(0.6, "rgba(102, 51, 153, 0.2)");
          gradient.addColorStop(1, "rgba(51, 0, 102, 0.2)");

          return gradient;
        },
        borderColor: "rgba(33, 150, 243, 1)",
        borderWidth: 1,
      },
    ],
  };

  const titleTypo = {
    color: "#cacaca",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize:{xs:"14px",md:'16px',lg:'18px'}
  };

  const canceled = localStorage.getItem("AdminNotificationLength")

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: { xs: "90%", md: '"70%"' },
        ml: { xs: 2, md: 30 },
        mr: { xs: 5, md: 2 },
        height: "auto",
      }}
    >
      {orders.length === 0 ? (
        <>
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#af2a2a" }}>
              No Orders found....!
            </Typography>
            <Box
              component="img"
              src={NoResult}
              alt="No Result"
              sx={{ width: "50%", height: "auto" }}
            />
          </Stack>
        </>
      ) : (
        <Stack spacing={0}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            mb={{ xs: 17, md: 2 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                height: 250,
                borderRadius: 1,
                p: 3,
              }}
            >
              <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "#141414",
                      height: "100%",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack spacing={1} direction="column">
                      <Typography sx={titleTypo}>Total Amount</Typography>
                      <Typography
                        sx={{
                          color: "#07a707",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: { xs: "18px", md: "20px", lg: "24px" },
                        }}
                      >
                        <CurrencyRupeeIcon
                          sx={{ fontSize: "16px", marginRight: "5px" }}
                        />
                        {totalAmount}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "#141414",
                      height: "100%",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction={"column"} spacing={1}>
                      <Typography sx={titleTypo}>
                        Total Items Purchased
                      </Typography>
                      <Typography
                        sx={{
                          color: "#4b32da",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: { xs: "18px", md: "20px", lg: "24px" },
                        }}
                      >
                        {totalQuantity}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>

                {/* 1 col 2nd row  */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "#141414",
                      height: "100%",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction={"column"} spacing={1}>
                      <Typography sx={titleTypo}>Cash Received</Typography>
                      <Typography
                        sx={{
                          color: "#d1d40e",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: { xs: "18px", md: "20px", lg: "24px" },
                        }}
                      >
                        <CurrencyRupeeIcon
                          sx={{ fontSize: "16px", marginRight: "5px" }}
                        />{" "}
                        {paid}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "#141414",
                      height: "100%",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction={"column"} spacing={1}>
                      <Typography sx={titleTypo}>Cash on Delivery</Typography>
                      <Typography
                        sx={{
                          color: "#c41827",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: { xs: "18px", md: "20px", lg: "24px" },
                        }}
                      >
                        <CurrencyRupeeIcon
                          sx={{ fontSize: "16px", marginRight: "5px" }}
                        />
                        {COD}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* 2nd clm 1st row  */}

            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                height: 250,
                borderRadius: 1,
                p: 3,
              }}
            >
              <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "#141414",
                      height: "100%",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction={"column"} spacing={1}>
                      <Typography sx={titleTypo}>Total Users</Typography>
                      <Typography
                        sx={{
                          color: "#0ecdd4",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: { xs: "18px", md: "20px", lg: "24px" },
                        }}
                      >
                        {usersCount}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "#141414",
                      height: "100%",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction={"column"} spacing={1}>
                      <Typography sx={titleTypo}>Total Products</Typography>
                      <Typography
                        sx={{
                          color: "#0ecdd4",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: { xs: "18px", md: "20px", lg: "24px" },
                        }}
                      >
                        {productCount}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>

                {/* 2nd clmn 2nd row  */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "#141414",
                      height: "100%",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction={"column"} spacing={1}>
                      <Typography sx={titleTypo}>Total Admins</Typography>
                      <Typography
                        sx={{
                          color: "#0ecdd4",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: { xs: "18px", md: "20px", lg: "24px" },
                        }}
                      >
                        1
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "#141414",
                      height: "100%",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction={"column"} spacing={1}>
                      <Typography sx={titleTypo}>Canceled Oredrs</Typography>
                      <Typography
                        sx={{
                          color: "#0ecdd4",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: { xs: "18px", md: "20px", lg: "24px" },
                        }}
                      >
                        {canceled}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            mb={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleVisible("chart1")}
              sx={{
                fontWeight:'bold',
                background: visible==="chart1"
                  ? "linear-gradient(45deg, #0f0f0f, #3c3c3c, #5a5a5a)"
                  : "linear-gradient(45deg, #681ab1,  #181818)" , 
                  
                color: "#b1b1b1",
                boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                "&:hover": {
                  background:
                  "linear-gradient(45deg, #0f0f0f, #3c3c3c, #5a5a5a)",
                },
              }}
            >
              Product Sales
            </Button>

            <Button variant="contained" onClick={() => handleVisible("chart2")}
            sx={{
              fontWeight:'bold',
              background: visible==="chart2"
                ? "linear-gradient(45deg, #0f0f0f, #3c3c3c, #5a5a5a)"
                : "linear-gradient(45deg, #681ab1,  #181818)" , 
                
              color:"#b1b1b1",
              boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
              "&:hover": {
                background:
                "linear-gradient(45deg, #0f0f0f, #3c3c3c, #5a5a5a)",
              },
            }}>
              monthlysales
            </Button>
            <Button variant="contained" onClick={() => handleVisible("chart3")} sx={{
                fontWeight:'bold',
                background: visible==="chart3"
                  ? "linear-gradient(45deg, #0f0f0f, #3c3c3c, #5a5a5a)"
                  : "linear-gradient(45deg, #681ab1,  #181818)" , 
                  
                color: "#b1b1b1",
                boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                "&:hover": {
                  background:
                  "linear-gradient(45deg, #0f0f0f, #3c3c3c, #5a5a5a)",
                },
              }}>
              payments
            </Button>
          </Stack>
          {/* <Stack direction={{xs:'column',md:'row'}} spacing={2}> */}
          <Box
            sx={{
              width: { xs: "100%", md: "80%", lg: "80%" },
              height: 200,
              backgroundColor: "#111111",
              borderRadius: 1,
              p: 2,
              display: visible === "chart1" ? "block" : "none",
              ml: { xs: 0, md: 8, lg: 13 },
            }}
          >
            <Bar
              data={productSalesData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: "#c2c2c2" } },
                  tooltip: { backgroundColor: "#333" },
                  title: {
                    display: true,
                    text: "Product Sales Overview",
                    color: "#c2c2c2",
                    font: {
                      size: 16,
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#c2c2c2",
                      font: {
                        size: 9,
                      },
                    },
                    grid: {
                      color: "#555",
                    },
                  },
                  y: {
                    ticks: {
                      color: "#c2c2c2",
                      font: {
                        size: 12, // Set the desired font size here
                      },
                    },
                    grid: {
                      color: "#555",
                    },
                  },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "80%", lg: "80%" },
              height: 200,
              backgroundColor: "#111111",
              borderRadius: 1,
              p: 2,
              display: visible === "chart2" ? "block" : "none",
              ml: { xs: 0, md: 8, lg: 13 },
            }}
          >
            <Line
              data={monthlySalesData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: "#c2c2c2" } },
                  tooltip: { backgroundColor: "#333" },
                  title: {
                    display: true,
                    text: "Monthly Sales Overview",
                    color: "#c2c2c2",
                    font: {
                      size: 16,
                    },
                  },
                },
                scales: {
                  x: { ticks: { color: "#c2c2c2" }, grid: { color: "#555" } },
                  y: { ticks: { color: "#c2c2c2" }, grid: { color: "#555" } },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "80%", lg: "80%" },
              height: 200,
              backgroundColor: "#111111",
              borderRadius: 1,
              p: 2,
              display: visible === "chart3" ? "block" : "none",
              ml: { xs: 0, md: 8, lg: 13 },
            }}
          >
            <Doughnut
              data={{
                labels: ["Total Payments", "Cash Received", "Cash on Delivery"],
                datasets: [
                  {
                    label: "Payment Status",
                    data: [totalAmount, paid, COD],
                    backgroundColor: ["#15c01b", "#2141f3", "#d81647"],
                    hoverBackgroundColor: ["#44d849", "#465ff0", "#e7436c"],
                    borderColor: "#fff",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: { color: "#c2c2c2" },
                  },
                  tooltip: {
                    backgroundColor: "#333",
                  },
                  title: {
                    display: true,
                    text: "Payment Status Overview",
                    color: "#c2c2c2",
                    font: {
                      size: 16,
                    },
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </Box>

          {/* </Stack> */}
        </Stack>
      )}
    </Box>
  );
}
