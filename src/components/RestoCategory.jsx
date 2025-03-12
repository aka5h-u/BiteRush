import React, { useEffect, useState } from "react";

const RestoCategory = ({ data }) => {
  const [isOpen, setIsOpen] = useState();
  const [menuItems, setMenuItems] = useState(null);
  useEffect(() => {
    setMenuItems(data?.card?.card?.itemCards);
    console.log(menuItems);
  }, [data]);

  return (
    <div className="flex justify-center items-center p-1">
      <div
        className="font-bold text-center m-2 p-2 shadow-md w-200 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          {data?.card?.card?.title} ({data?.card?.card.itemCards?.length})
          <span className="text-gray-600 pl-2">{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className="p-3 bg-white">
            <ul>
              {menuItems.map((item) => {
                //console.log(item);
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestoCategory;
