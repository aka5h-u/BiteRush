import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SWIGGY_API, IMG_CAROUSEL } from "../utils/constants";
import { useSelector } from "react-redux";
const Carousel = () => {
  const [imageData, setImageData] = useState([]);
  const latlngCode = useSelector((store) => store.location.locCode);
  const fetchData = async () => {
    const caraouselApi = SWIGGY_API(
      latlngCode[0]?.geometry?.location?.lat
        ? latlngCode[0]?.geometry?.location?.lat
        : "12.9352403",
      latlngCode[0]?.geometry?.location?.lng
        ? latlngCode[0]?.geometry?.location?.lng
        : "77.624532"
    );
    const data = await fetch(caraouselApi);
    const json = await data.json();
    //console.log(json?.data?.cards[0]?.card?.card?.imageGridCards?.info);  //carousel data

    setImageData(json?.data?.cards[0]?.card?.card?.imageGridCards?.info || {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (imageData.length > 0) {
      console.log(imageData[0]?.id); // Now, it won't be undefined
    }
  }, [imageData]);
  // Ref to control the slider
  const sliderRef = useRef(null);

  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 10, // Ensures 3 items are visible at once
    slidesToScroll: 1,
    arrows: false, // Hide default arrows
  };

  return (
    <div className="mx-auto px-6 ">
      <div className="border-b-2 border-gray-200 py-2">
        <div className="flex justify-between items-center px-4 mx-4 ">
          <h1 className="text-2xl font-bold  flex-1">What's on your mind?</h1>
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
        <div className="relative overflow-hidden">
          <Slider ref={sliderRef} {...settings}>
            {imageData.map((item) => (
              <div key={item?.id} className="px-2">
                <div className="">
                  {/* <h3>{item}</h3> */}
                  <img
                    src={IMG_CAROUSEL + item?.imageId}
                    className="w-40 mx-4 cursor-pointer py-2"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
