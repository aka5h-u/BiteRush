import React, { useEffect, useState } from "react";
import RestoCard from "./RestoCard";
import { SWIGGY_API } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const RestoList = () => {
  const [restoData, setRestoData] = useState([]);
  const latlngCode = useSelector((store) => store.location.locCode);
  const fetchData = async () => {
    const resDataApi = SWIGGY_API(
      latlngCode[0]?.geometry?.location?.lat
        ? latlngCode[0]?.geometry?.location?.lat
        : "12.9352403",
      latlngCode[0]?.geometry?.location?.lng
        ? latlngCode[0]?.geometry?.location?.lng
        : "77.624532"
    );
    const data = await fetch(resDataApi);
    const json = await data.json();
    // console.log(
    //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    setRestoData(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl px-12 py-4">
        Restaurants with online food delivery in{" "}
        {latlngCode[0]?.address_components[0]?.long_name
          ? latlngCode[0]?.address_components[0]?.long_name
          : "Bangalore"}
      </h1>
      <div className="flex flex-wrap gap-4 p-2 m-2">
        {restoData.map((restaurant) => (
          <Link to={"restaurant/" + restaurant?.info?.id}>
            <RestoCard key={restaurant?.info?.id} data={restaurant} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default RestoList;
