import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useTheme, useMediaQuery, Box } from "@mui/material";

export default function StandardImageList() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  let cols = 4; // default number of columns
  let rowHeight = 120; // default row height
  if (isXs) {
    cols = 1;
    rowHeight = 80;
  } else if (isSm) {
    cols = 2;
    rowHeight = 90;
  } else if (isMd) {
    cols = 3;
    rowHeight = 100;
  } else if (isLg) {
    cols = 4;
    rowHeight = 110;
  }

  return (
    <Box sx={{ width: "100%", height: "auto", p: 2 }}>
      <ImageList cols={cols} rowHeight={rowHeight} gap={10}>
        {itemData.map((item, index) => (
          <ImageListItem key={index}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: "https://api.freelogodesign.org/assets/blog/thumb/4d422f79f0274913aeb31571270b9ea2_1176x840.jpg?t=638369671740000000",
    title: "7-up",
  },
  {
    img: "https://www.shutterstock.com/image-vector/cocacola-bottle-prepared-cleaned-vector-600nw-2399811785.jpg",
    title: "coca-cola",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcRRHlCMaqBMCXeWMc7P5ETo5sM68bB3g5-g&s",
    title: "pepsi",
  },
  
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjyWi51N1ffuhzCyZi9tYO4KeVYiX3c_dJOg&s",
    title: "sprite",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTdhWuu_aypZ5IWZTM52EKeYI6QaaHdv_whQ&s",
    title: "slice",
  },
  {
    img: "https://i.pinimg.com/564x/18/ba/dc/18badc9e3f9532594c756ae8e6ae6582.jpg",
    title: "aquafina",
  },
 
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3kwZa7nPvekkJVj4A3EhRhM_4c9e0YVr4XA&s",
    title: "thumbsup",
  },
  {
    img: "https://ik.imagekit.io/wlfr/wellness/images/products/250905-1.png/tr:w-3840,dpr-1,c-at_max,cm-pad_resize,ar-1210-700,pr-true,f-webp,q-80,l-image,i-Wellness_logo_BDwqbQao9.png,lfo-bottom_right,w-200,h-90,c-at_least,cm-pad_resize,l-end",
    title: "limca",
  },
  {
    img: "https://5.imimg.com/data5/SELLER/Default/2023/10/350942448/RQ/HO/BP/39892504/265690-2-15-maaza-mango-drink.jpg",
    title: "maaza",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7_Z5guDJY5HqAVN8btXKD_pWtzuHCLs1zWA&s",
    title: "mountain dew",
  },
 
  
  {
    img: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/ej5bdlh7l7jp2rma7cii",
    title: "kinley water",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdB8wuoMS9IU9XyR4z2_O3Urrwd-CdZWEBBA&s",
    title: "kinley soda",
  },
   {
    img: "https://www.bigbasket.com/media/uploads/groot/images/20102020-d55f4257-a-section-3-3.png",
    title: "bingo",
  },
  {
    img: "https://www.lays.com/sites/lays.com/files/styles/product_thumbnail/public/2020-11/lays-bbq.jpg?itok=u27sQU-l",
    title: "lays",
  },
  {
    img: "https://m.media-amazon.com/images/I/81TKrMs+vcL._AC_UF350,350_QL80_.jpg",
    title: "bingo",
  },
  {
    img: "https://wallpapers.com/images/hd/lays-potato-chips-in-yellow-background-43ouo5h6q7gnfyen.jpg",
    title: "lays",
  },
 
];
