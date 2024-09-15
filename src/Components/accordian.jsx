import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Box, Grid, Stack ,useMediaQuery, useTheme} from "@mui/material";
import datas from "../cardData/accordianData.json";
import ImageList from "./imageList.jsx";

export default function AccordionUsage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const AccStyle = {
    backgroundColor: "black",
    color: "#6d6d6d",
    border: "1px solid #555555",
  };
  return (
    <div>
      <Box sx={{ m: "4%", maxWidth: "100%", overflow: "hidden" }}>
        <Stack spacing={isSmallScreen ? 5:15} direction={isSmallScreen ? 'column' : 'row'} maxWidth={"100%"}>
          <Grid container sx={{ maxWidth:isSmallScreen ? '100%':'50%', fontFamily: "sans-serif" ,}}>
            {datas.map((data, index) => (
              <Grid item key={index}>
                <Accordion sx={AccStyle}>
                  <AccordionSummary
                    sx={{ color: "#c7c7c7" }}
                    expandIcon={<ExpandMoreIcon sx={{ color: "#cfcfcf" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {data.head}
                  </AccordionSummary>
                  <AccordionDetails>{data.des}</AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>

          <Grid item>
            <ImageList />
          </Grid>
        </Stack>
      </Box>
    </div>
  );
}
