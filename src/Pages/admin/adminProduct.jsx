import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import EditModal from "./modal/productModal.jsx";
import Loading from "../../UI/loading.jsx";
import ProductHook from "../../customHooks/productHook";
import SearchBar from "../../UI/searchbarTwo.jsx";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#c4c4c4",
    backgroundColor: "#212121",
    fontWeight: "bold",
    fontSize: "16px",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "14px",
    backgroundColor: "#1d1d1d",
    color: "#acacac",
    borderBottom: "2px solid #353535",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#1a1a1a",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#1f1f1f",
  },
  "&:hover": {
    backgroundColor: "#333",
  },
  "& td, & th": {
    borderBottom: "2px solid #353535",
  },
}));

export default function CustomizedTables() {
  const { data, setData } = ProductHook();
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [query, setQuery] = useState("");

  const handleDelete = async (id) => {
    setLoadingProductId(id);
    setTimeout(async () => {
      try {
        const response = await axios.delete(
          `https://ecommerce-nac-backend.onrender.com/product/delete-product/${id}`
        );
        setData((prevData) => prevData.filter((item) => item._id !== id));
        toast.success(response.data.message || "Product deleted successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting product");
      } finally {
        setLoadingProductId(null);
      }
    }, 2000);
  };

  const handleProductUpdate = async (updatedProduct) => {
    setData((previousProducts) =>
      previousProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const filteredData = query
    ? data.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    : data;

  if (!data) return <Loading />;

  return (
    <>
      <Box>
        <SearchBar setQuery={setQuery} />
        <div style={{ marginLeft: {xs:'200px',md:"400px"} ,overflowX:'hidden'}}>
          {query && (
            <>
              {filteredData.length > 0 ? (
                <Typography color="success">
                  Your result for search "{query}"
                </Typography>
              ) : (
                <Typography color="success">No results found for "{query}"</Typography>
              )}
            </>
          )}
        </div>
      </Box>
      <Grid
        container
        justifyContent="center"
        spacing={1}
        sx={{
          marginTop: "10px",
          ml: {xs:3,md:25},
          maxWidth: "85%",
          overflowX: "hidden",
        }}
      >
        <Grid item xs={12} md={10} lg={11}>
          <TableContainer component={Paper} sx={{ backgroundColor: "#212121" }}>
            <Table aria-label="customized table">
              <TableHead sx={{display:query && filteredData.length === 0 && 'none'}}>
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell align="right">Title</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">Quantity</StyledTableCell>
                  <StyledTableCell align="right">Edit</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell component="th" scope="row">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          height: "50px",
                          width: "60px",
                          borderRadius: "4px",
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.price}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.category}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.description}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.productQuantity}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <EditModal
                        item={item}
                        onProductUpdate={handleProductUpdate}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton onClick={() => handleDelete(item._id)}>
                        {loadingProductId === item._id ? (
                          <Loading />
                        ) : (
                          <DeleteIcon sx={{ color: "#fc0362d3" }} />
                        )}
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
