import React, { useState } from "react";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Slider from "react-slick";
import { SWIGGY_API } from "../utils/constants";
import { useEffect } from "react";
import RestoCard from "./RestoCard";
import { Link } from "react-router-dom";

const TopChainRestoCarousel = () => {
  const [imageData, setImageData] = useState([]);

  const fetchData = async () => {
    const data = await fetch(SWIGGY_API);
    const json = await data.json();

    console.log(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle); //top restao data

    setImageData(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || {}
    );
  };

  useEffect(() => {
    fetchData();
  }, []);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4, // Ensures 3 items are visible at once
    slidesToScroll: 1,
    arrows: false, // Hide default arrows
  };
  return (
    <div className="mx-auto px-6 ">
      <div className="border-b-2 border-gray-200 py-2">
        <div className="flex justify-between items-center px-4 mx-4 ">
          <h1 className="text-2xl font-bold  flex-1">
            Top Restaurants in Bangalore
          </h1>
          <div className="flex items-center justify-between py-4">
            {/* Left Arrow */}
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 mr-3"
            >
              <ArrowLeft size={14} className="text-gray-700" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300"
            >
              <ArrowRight size={14} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Slider Container (Fix stacking issue) */}
        <div className="relative overflow-hidden ">
          <Slider ref={sliderRef} {...settings}>
            {imageData.map((item) => (
              <div className="mr-20" key={item?.info?.id}>
                <Link to={"restaurant/" + item?.info?.id}>
                  <RestoCard data={item} />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TopChainRestoCarousel;
