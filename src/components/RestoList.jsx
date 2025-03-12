import React, { useEffect, useState } from "react";
import RestoCard from "./RestoCard";
import { SWIGGY_API } from "../utils/constants";
import { Link } from "react-router-dom";

const RestoList = () => {
  const [restoData, setRestoData] = useState([]);
  const fetchData = async () => {
    const data = await fetch(SWIGGY_API);
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
    <div className="flex flex-wrap gap-4 p-2 m-2">
      {restoData.map((restaurant) => (
        <Link to={"restaurant/" + restaurant?.info?.id}>
          <RestoCard key={restaurant?.info?.id} data={restaurant} />
        </Link>
      ))}
    </div>
  );
};

export default RestoList;
