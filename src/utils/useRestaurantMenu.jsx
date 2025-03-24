import { useEffect, useState } from "react";
import { MENU_URL } from "./constants";
import { useSelector } from "react-redux";
const useRestaurantMenu = (resId) => {
  const [restInfo, setRestInfo] = useState();

  const latlngCode = useSelector((store) => store.location.locCode);
  const fetchData = async () => {
    const menuApi = MENU_URL(
      latlngCode[0]?.geometry?.location?.lat
        ? latlngCode[0]?.geometry?.location?.lat
        : "12.9352403",
      latlngCode[0]?.geometry?.location?.lng
        ? latlngCode[0]?.geometry?.location?.lng
        : "77.624532"
    );
    console.log("menuapi", menuApi);
    const data = await fetch(menuApi + resId);
    const json = await data.json();
    setRestInfo(json);
    console.log(json);
  };
  useEffect(() => {
    fetchData();
  }, [latlngCode]);

  return restInfo;
};

export default useRestaurantMenu;
