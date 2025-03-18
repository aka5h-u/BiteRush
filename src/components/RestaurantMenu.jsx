import React from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestoCategory from "./RestoCategory";

const RestaurantMenu = () => {
  const { id } = useParams();
  //console.log(restaurantId?.id);
  const restInfo = useRestaurantMenu(id);
  if (!restInfo) return;
  // console.log(restInfo?.data?.cards[2]?.card?.card?.info);
  const { name, areaName, cuisines, totalRatingsString, avgRating } =
    restInfo?.data?.cards[2]?.card?.card?.info;

  const categories =
    restInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card.card["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  //
  //console.log(categories);
  return (
    <div className="">
      <h1 className="font-bold text-2xl p-2 mx-77 my-2 ">{name}</h1>
      <div className="flex justify-around items-center">
        <div>
          <h2 className="font-bold mb-1">{name}</h2>
          <p className="text-gray-400 text-sm mb-1">{cuisines.join(", ")}</p>
          <p className="text-gray-400 text-sm">{areaName}</p>
        </div>
        <div className="border border-gray-300 p-1 rounded-lg">
          <div className="flex items-center border-b-2 border-gray-200">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              role="img"
              aria-hidden="true"
              strokecolor="rgba(2, 6, 12, 0.92)"
              fillcolor="rgba(2, 6, 12, 0.92)"
            >
              <circle
                cx="10"
                cy="10"
                r="9"
                fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
              ></circle>
              <path
                d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                fill="white"
              ></path>
              <defs>
                <linearGradient
                  id="StoreRating20_svg__paint0_linear_32982_71567"
                  x1="10"
                  y1="1"
                  x2="10"
                  y2="19"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#21973B"></stop>
                  <stop offset="1" stopColor="#128540"></stop>
                </linearGradient>
              </defs>
            </svg>
            <p className=" border-gray-100 text-center p-1  m-1 text-green-700">
              {avgRating}
            </p>
          </div>

          <p className="text-gray-400 font-bold text-sm ">
            {totalRatingsString}
          </p>
        </div>
      </div>
      <div>
        {categories.map((cat) => (
          <RestoCategory data={cat} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
