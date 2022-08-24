import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import "./Carousel.css";
import { Grid } from "@mui/material";

function Carrosel() {
  var items = [
    {
      img: "https://imgur.com/rxuxi0h.png",
    },
    {
      img: "https://imgur.com/OmUZiIk.png",
    },
    {
      img: "https://imgur.com/E2eud95.png",
    },
  ];

  return (
    <>

        <Carousel itemsToShow={1} enableAutoPlay={true} autoPlaySpeed={3000} showArrows={true} className="carrosel-container">
          {items.map((item) => (
            <>
              <img className="img-carrosel" src={item.img} alt="Item" />
            </>
          ))}
        </Carousel>

    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Carrosel />, rootElement);

export default Carrosel;
