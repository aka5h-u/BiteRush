import React from "react";
import Header from "./Header";
import Carousel from "./Carousel";
import TopChainRestoCarousel from "./TopChainRestoCarousel";
import RestoList from "./RestoList";
const MainContainer = () => {
  return (
    <div>
      <Carousel />
      <TopChainRestoCarousel />
      <RestoList />
    </div>
  );
};

export default MainContainer;
