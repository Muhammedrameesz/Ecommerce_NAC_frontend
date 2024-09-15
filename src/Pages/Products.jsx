import React from "react";
import Footer from "../Components/footer.jsx";
import Slides from "../Components/Slides.jsx";
import Card from "../Components/cards.jsx";
import SecondDes from "../Components/secendHomeDes.jsx";
import Accordion from "../Components/accordian.jsx";


export default function Products() {
  return (
    <div>
      <Card />
      {/* <SecondDes /> */}
      {/* <Slides /> */}
      <Accordion/>
      <Footer />
    </div>
  );
}
