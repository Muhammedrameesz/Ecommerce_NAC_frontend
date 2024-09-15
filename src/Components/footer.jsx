import { Box, Grid, Stack, Typography } from "@mui/material";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  const Gmail = () => {
    window.location.href = "https://mail.google.com/mail/";
  };
  const LinkedIn = () => {
    window.location.href = "https://in.linkedin.com/";
  };
  const Twitter = () => {
    window.location.href = "https://twitter.com/?lang=en";
  };
  const Insta = () => {
    window.location.href = "https://www.instagram.com/";
  };
  const Github = () => {
    window.location.href = "https://github.com/";
  };

  const styles = {
    textDecoration: "none",
    color: "purple",
    display: "block",
  };

  return (
    <>
      <footer>
        <Card
          style={{
            marginTop: "30px",
            width: "100%",
            // border: "1px solid #8d8888",
            color: "white",
            textAlign: "center",
            alignItems: "center",
            overflow: "hidden",
            boxSizing: "border-box",
              backgroundColor: "rgb(13, 26, 25)",
              paddingBottom:'5px',
              marginBottom:'3px'

          }}
          className="text-center"
        >
          <Card.Header
            style={{
              color: "white",
              textAlign: "center",
              // backgroundColor: "#000000cc",
              fontSize: "15px",
              fontFamily: "cursive",
              fontWeight: "bold",
              padding: "10px",
              // borderBottom: "1px solid #8d8888",
            }}
          >
            NAC DISTRIBUTIONS
          </Card.Header>

          <Card.Body
            style={{
              // backgroundColor: "black",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Box sx={{ flexGrow: 1, padding: "20px", overflow: "hidden" }}>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={2}>
                  <Stack spacing={2}>
                    <Typography sx={{ textAlign: "center" }}>About</Typography>
                    <Link style={styles} to={"/home"}>
                      <Typographyx variant="body1">Home</Typographyx>
                    </Link>
                    <Link style={styles} to={"/products"}>
                      <Typographyx variant="body1">Products</Typographyx>
                    </Link>
                    <Link style={styles} to={"/contact"}>
                      <Typographyx variant="body1">Contact</Typographyx>
                    </Link>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Stack spacing={2}>
                    <Typography sx={{ textAlign: "center" }}>
                      Partners
                    </Typography>
                    <Link to={"https://www.pepsi.com/"} style={styles}>
                      <Typographyx variant="body1">Pepsi</Typographyx>
                    </Link>
                    <Link
                      to={"https://www.coca-colacompany.com/"}
                      style={styles}
                    >
                      <Typographyx variant="body1">CocaCola</Typographyx>
                    </Link>
                    <Link to={"https://www.7up.com/"} style={styles}>
                      <Typographyx variant="body1">7-up</Typographyx>
                    </Link>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Stack spacing={2}>
                    <Typography sx={{ textAlign: "center" }}>
                      Partners
                    </Typography>
                    <Link to={"https://www.aquafina.com/"} style={styles}>
                      <Typographyx variant="body1">Aquafina</Typographyx>
                    </Link>
                    <Link
                      to={"https://www.coca-cola.com/in/en/brands/kinley"}
                      style={styles}
                    >
                      <Typographyx variant="body1">Kinley</Typographyx>
                    </Link>
                    <Link to={"https://www.lays.com/"} style={styles}>
                      <Typographyx variant="body1">Lays</Typographyx>
                    </Link>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Stack spacing={2}>
                    <Typography sx={{ textAlign: "center" }} component="div">
                      Office Address
                    </Typography>
                    <Typography component="div">
                      <Typography
                        component="div" 
                        style={{
                          fontSize: "small",
                          textAlign: "center",
                          color: "#ada6a6",
                          fontFamily: "cursive",
                        }}
                      >
                        NAC DISTRIBUTIONS
                      </Typography>
                      <Typography
                        component="div" 
                        style={{
                          fontSize: "small",
                          textAlign: "center",
                          color: "#ada6a6",
                          fontFamily: "cursive",
                        }}
                      >
                        Nirappam, near hospital road,
                      </Typography>
                      <Typography
                        component="div" 
                        style={{
                          fontSize: "small",
                          textAlign: "center",
                          color: "#ada6a6",
                          fontFamily: "cursive",
                        }}
                      >
                        Sulthan Bathery, Wayanad,
                      </Typography>
                      <Typography
                        component="div" 
                        style={{
                          fontSize: "small",
                          textAlign: "center",
                          color: "#ada6a6",
                          fontFamily: "cursive",
                        }}
                      >
                        Kerala, India,
                      </Typography>
                      <Typography
                        component="div"
                        style={{
                          fontSize: "small",
                          textAlign: "center",
                          color: "#ada6a6",
                          fontFamily: "cursive",
                        }}
                      >
                        +91 9999999999
                      </Typography>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ paddingTop: "10px" }}
            >
              <img
                onClick={Gmail}
                src="https://img.icons8.com/?size=48&id=ho8QlOYvMuG3&format=png"
                alt="G-mail"
                style={{ cursor: "pointer", height: "30px", width: "30px" }}
              />
              <img
                onClick={LinkedIn}
                style={{ cursor: "pointer", height: "30px", width: "30px" }}
                src="https://img.icons8.com/?size=48&id=13930&format=png"
                alt="LinkedIn"
              />
              <img
                onClick={Twitter}
                style={{ cursor: "pointer", height: "30px", width: "30px" }}
                src="https://img.icons8.com/?size=48&id=ClbD5JTFM7FA&format=png"
                alt="TwitterX"
              />
              <img
                onClick={Insta}
                style={{ cursor: "pointer", height: "30px", width: "30px" }}
                src="https://img.icons8.com/?size=48&id=32323&format=png"
                alt="Instagram"
              />
              <img
                onClick={Github}
                style={{ cursor: "pointer", height: "30px", width: "30px" }}
                src="https://img.icons8.com/?size=48&id=AZOZNnY73haj&format=png"
                alt="GitHub"
              />
            </Stack>
          </Card.Body>

          <Card.Footer
            style={{
              color: "#f0f0f0",
              textAlign: "center",
              fontSize: "14px",
              fontFamily: "cursive",
              padding: "10px",
            }}
            className="text-muted"
          >
            Copyright © 2024 NAC, Inc. All rights reserved.
          </Card.Footer>
        </Card>
      </footer>
    </>
  );
}

export default Footer;

const Typographyx = styled.span`
  position: relative;
  text-decoration: none;
  cursor: pointer;
  color: #9e979e;
  font-weight: bold;
  font-size: 15px;
  font-family: cursive;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: #ada6a6;
    visibility: hidden;
    transform: scaleX(0);
    transition: transform 0.5s ease-in-out;
  }

  &:hover::before {
    visibility: visible;
    transform: scaleX(1);
  }
`;
