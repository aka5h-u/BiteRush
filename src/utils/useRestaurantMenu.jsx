import { useEffect, useState } from "react";
import { MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [restInfo, setRestInfo] = useState();
  const fetchData = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();
    setRestInfo(json);
    console.log(json);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return restInfo;
};

export default useRestaurantMenu;
