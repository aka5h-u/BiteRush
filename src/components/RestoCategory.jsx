import React, { useEffect, useState } from "react";
import RestoMenuItems from "./RestoMenuItems";

const RestoCategory = ({ name, data }) => {
  const [isOpen, setIsOpen] = useState();
  const [menuItems, setMenuItems] = useState(null);
  useEffect(() => {
    setMenuItems(data?.card?.card?.itemCards);
    //console.log(menuItems);
  }, [data]);

  return (
    <div className="flex justify-center items-center p-1">
      <div className=" text-center m-2 p-2 shadow-md w-200 ">
        <div
          className="flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-bold">
            {data?.card?.card?.title} ({data?.card?.card.itemCards?.length})
          </span>
          <span className="text-gray-600 pl-2">{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && <RestoMenuItems items={menuItems} />}
      </div>
    </div>
  );
};

export default RestoCategory;
