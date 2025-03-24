import React from "react";
import { RES_MENU_IMG } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const RestoMenuItems = ({ items }) => {
  const dispatch = useDispatch();
  const addBtnHandler = (item) => {
    console.log("Add items", item);

    dispatch(addItem(item));
  };
  console.log("Menu items", items);
  return (
    <div className="">
      {items.map((item) => (
        <div
          key={item?.card?.info?.id}
          className="p-4 border-b-2 border-gray-100 flex items-center justify-between"
        >
          {/* Text Container - Takes up available space */}
          <div className="flex-1 flex flex-col items-start">
            <p className="">{item?.card?.info?.name}</p>
            <p>
              ₹
              {isNaN(item?.card?.info?.price / 100)
                ? 100
                : item?.card?.info?.price / 100}
            </p>
            <p className="text-sm text-left">{item?.card?.info?.description}</p>
          </div>

          {/* Image Container - Stays on the right */}
          <div className="flex-shrink-0">
            <img
              src={RES_MENU_IMG + item?.card?.info?.imageId}
              className="w-20"
            />
            <button
              className="text-md font-bold text-green-600 p-2 rounded-md border border-gray-200 px-6 cursor-pointer"
              onClick={() => addBtnHandler(item)}
            >
              ADD
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestoMenuItems;
