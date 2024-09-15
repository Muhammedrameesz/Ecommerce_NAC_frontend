import { Backdrop, Box, CircularProgress, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import useProductList from "../customHooks/productHook";
import SearchBar from "../UI/searchBar";
import NotFound from "../image/no result.png";
import ReactSwipeCards from "./reactSwipeCards.jsx"


const headingStyle = {
  fontFamily: '"Poppins", sans-serif',
  fontSize: "2rem", // Slightly smaller for better balance
  color: "transparent",
  backgroundImage: "linear-gradient(320deg, #1d8cf8, #e0e1e6,red, #1d8cf8)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
  // textAlign: "center",
  margin: "20px 0",
  padding: "3%",
  position: "relative",
};

export default function ProductList() {
  const { data, loading } = useProductList();
  const [query, setQuery] = useState("");

  const displayProduct = (category) => {
    return data.filter((item) => item.category === category);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {loading && (
        <Backdrop
          sx={{
            color: "#faf5f5",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
          <div className="loading-text">Processing....</div>
        </Backdrop>
      )}

      <SearchBar setQuery={setQuery} />

      {query ? (
        <>
          {query && filteredData.length !== 0 && (
            <div
              style={{
                marginTop: "3%",
                textAlign: "center",
                marginBottom: "5%",
              }}
            >
              <Typography
                variant="h6"
                component="h4"
                style={{ color: "#4CAF50", fontWeight: "bold" }}
              >
                Search Results for "{query}"
              </Typography>
            </div>
          )}

          {query && filteredData.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "30px",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <Typography
                variant="h5"
                style={{ color: "#df1616", marginBottom: "20px" }}
              >
                No results for "{query}""
              </Typography>

              <Typography sx={{ marginBottom: "50px", fontSize: "14px" }}>
                Try using other words..
              </Typography>

              <img
                src={NotFound}
                alt="No results found"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}
          <Box alignItems={"center"} textAlign={"center"} m={3} mb={10}>
            <Stack>
              <Grid container spacing={3}>
                {filteredData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/product/${item._id}`}
                    >
                      <Card
                         sx={{
                          width: "auto",
                          backgroundImage: 'linear-gradient(147deg, #1d1d1d 0%, #0a0a0a 74%)',
                          color: "#afafaf",
                          borderRadius: "10px",
                          transition: "all 0.30s",
                          padding: 2,
                          ":hover": {
                            transform: "translatey(-10px)",
                            transition: "all 0.30s",
                            cursor: "pointer",
                            boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",
                            filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))",
                          },
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                          sx={{
                            objectFit: "fill",
                          }}
                            component="img"
                            height="140"
                            image={item.image}
                            alt={item.title}
                          />
                          <CardContent>
                            <Typography
                              sx={{ textAlign: "center" }}
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              sx={{ textAlign: "center" }}
                              gutterBottom
                              variant="body2"
                              component="div"
                            >
                              {`Rs/-${item.price}`}
                            </Typography>
                            <Typography
                              sx={{ textAlign: "center" }}
                              variant="body2"
                            >
                              {item.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Box>
        </>
      ) : (
        <>
          {/* Product 1 */}
          <div style={{ marginTop: "-2%", textAlign: "center" }}>
            <h4 style={headingStyle}>
              <span style={{ padding: "10px", borderRadius: "10px" }}>
                Cool-Drinks
              </span>
            </h4>
          </div>
          <Box alignItems={"center"} textAlign={"center"} m={3}>
            <Stack>
              <Grid container spacing={3}>
                {displayProduct("CoolDrinks").map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/product/${item._id}`}
                    >
                      <Card
                        sx={{
                          width: "auto",
                          backgroundImage: 'linear-gradient(147deg, #1d1d1d 0%, #0a0a0a 74%)',
                          color: "#afafaf",
                          borderRadius: "10px",
                          transition: "all 0.30s",
                          padding: 2,
                          ":hover": {
                            transform: "translatey(-10px)",
                            transition: "all 0.30s",
                            cursor: "pointer",
                            boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",
                            filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))",
                          },
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            sx={{
                              objectFit: "fill",
                            }}
                            component="img"
                            height="140"
                            image={item.image}
                            alt={item.title}
                          />
                          <CardContent>
                            <Typography
                              sx={{ textAlign: "center" }}
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {item.title}
                            </Typography> 
                            <Typography
                              gutterBottom
                              sx={{ textAlign: "center" }}
                              variant="body2"
                            >
                              {item.productQuantity}
                            </Typography> 
                            <Typography
                              sx={{ textAlign: "center" }}
                              variant="body2"
                              component="div"
                            >
                              {`Rs/-${item.price}`}
                            </Typography>
                           
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Box>

          {/* Product 2 */}

          <div style={{ marginTop: "3%", textAlign: "center" }}>
            <h4 style={headingStyle}>
              <span style={{ padding: "10px", borderRadius: "10px" }}>
                Drinking-Water
              </span>
            </h4>
          </div>
          <Box alignItems={"center"} textAlign={"center"} m={3}>
            <Stack>
              <Grid container spacing={3}>
                {displayProduct("Water").map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/product/${item._id}`}
                    >
                      <Card
                        sx={{
                          width: "auto",
                          backgroundImage: 'linear-gradient(147deg, #1d1d1d 0%, #0a0a0a 74%)',
                          color: "#afafaf",
                          borderRadius: "10px",
                          transition: "all 0.30s",
                          padding: 2,
                          ":hover": {
                            transform: "translatey(-10px)",
                            transition: "all 0.30s",
                            cursor: "pointer",
                            boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",
                            filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))",
                          },
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            sx={{
                              objectFit: "fill",
                            }}
                            component="img"
                            height="140"
                            image={item.image}
                            alt={item.title}
                          />
                          <CardContent>
                            <Typography
                              sx={{ textAlign: "center" }}
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {item.title}
                            </Typography>
                            <Typography
                             gutterBottom
                              sx={{ textAlign: "center" }}
                              variant="body2"
                            >
                              {item.productQuantity}
                            </Typography>
                            <Typography
                              sx={{ textAlign: "center" }}
                             
                              variant="body2"
                              component="div"
                            >
                              {`Rs/-${item.price}`}
                            </Typography>
                          
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Box>

          {/* Product 3 */}
          <div style={{ marginTop: "3%", textAlign: "center" }}>
            <h4 style={headingStyle}>
              <span style={{ padding: "10px", borderRadius: "10px" }}>
                Soda
              </span>
            </h4>
          </div>
          <Box alignItems={"center"} textAlign={"center"} m={3}>
            <Stack>
              <Grid container spacing={3}>
                {displayProduct("Soda").map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/product/${item._id}`}
                    >
                      <Card
                         sx={{
                          width: "auto",
                          backgroundImage: 'linear-gradient(147deg, #1d1d1d 0%, #0a0a0a 74%)',
                          color: "#afafaf",
                          borderRadius: "10px",
                          transition: "all 0.30s",
                          padding: 2,
                          ":hover": {
                            transform: "translatey(-10px)",
                            transition: "all 0.30s",
                            cursor: "pointer",
                            boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",
                            filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))",
                          },
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            sx={{
                              objectFit: "fill",
                            }}
                            component="img"
                            height="140"
                            image={item.image}
                            alt={item.title}
                          />
                          <CardContent>
                            <Typography
                              sx={{ textAlign: "center" }}
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {item.title}
                            </Typography>
                            <Typography
                            gutterBottom
                              sx={{ textAlign: "center" }}
                              variant="body2"
                            >
                              {item.productQuantity}
                            </Typography>
                            <Typography
                              sx={{ textAlign: "center" }}
                              
                              variant="body2"
                              component="div"
                            >
                              {`Rs/-${item.price}`}
                            </Typography>
                           
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Box>

          {/* Product 4 */}
          <div style={{ marginTop: "3%", textAlign: "center" }}>
            <h4 style={headingStyle}>
              <span style={{ padding: "10px", borderRadius: "10px" }}>
                Lays & Chips
              </span>
            </h4>
          </div>
          <Box alignItems={"center"} textAlign={"center"} m={3}>
            <Stack>
              <Grid container spacing={3}>
                {displayProduct("Lays").map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/product/${item._id}`}
                    >
                      <Card
                         sx={{
                          width: "auto",
                          backgroundImage: 'linear-gradient(147deg, #1d1d1d 0%, #0a0a0a 74%)',
                          color: "#afafaf",
                          borderRadius: "10px",
                          transition: "all 0.30s",
                          padding: 2,
                          ":hover": {
                            transform: "translatey(-10px)",
                            transition: "all 0.30s",
                            cursor: "pointer",
                            boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",
                            filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))",
                          },
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            sx={{
                              objectFit: "fill",
                            }}
                            component="img"
                            height="140"
                            image={item.image}
                            alt={item.title}
                          />
                          <CardContent>
                            <Typography
                              sx={{ textAlign: "center" }}
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              gutterBottom
                              sx={{ textAlign: "center" }}
                              variant="body2"
                            >
                              {item.productQuantity}
                            </Typography>
                            <Typography
                              sx={{ textAlign: "center" }}
                            
                              variant="body2"
                              component="div"
                            >
                              {`Rs/-${item.price}`}
                            </Typography>
                           
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Stack>
            {/* <ReactSwipeCards/> */}

          </Box>
        </>
      )}
    </>
  );
}
