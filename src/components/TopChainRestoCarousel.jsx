import React, { useState } from "react";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Slider from "react-slick";
import { SWIGGY_API } from "../utils/constants";
import { useEffect } from "react";
import RestoCard from "./RestoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopChainRestoCarousel = () => {
  const [imageData, setImageData] = useState([]);
  //const [locationData, setLocationData] = useState();
  const latlngCode = useSelector((store) => store.location.locCode);
  const fetchData = async () => {
    const toprestaurantApi = SWIGGY_API(
      latlngCode[0]?.geometry?.location?.lat
        ? latlngCode[0]?.geometry?.location?.lat
        : "12.9352403",
      latlngCode[0]?.geometry?.location?.lng
        ? latlngCode[0]?.geometry?.location?.lng
        : "77.624532"
    );

    console.log(
      latlngCode[0]?.geometry?.location?.lat,
      latlngCode[0]?.geometry?.location?.lng
    );
    console.log(toprestaurantApi);
    const data = await fetch(toprestaurantApi);
    const json = await data.json();

    console.log(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle); //top restao data
    // setLocationData(latlngCode);
    //console.log(latlngCode[0]?.address_components[0]?.long_name);

    console.log("Lat lng code", latlngCode);
    setImageData(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || {}
    );
  };

  useEffect(() => {
    fetchData();
  }, [latlngCode]);
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
            Top Restaurants in{" "}
            {latlngCode[0]?.address_components[0]?.long_name
              ? latlngCode[0]?.address_components[0]?.long_name
              : "Bangalore"}
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
