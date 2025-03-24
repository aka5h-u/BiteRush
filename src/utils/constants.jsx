export const IMG_CAROUSEL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

export const SWIGGY_API = (lat, lng) =>
  `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

export const MENU_URL = (lat, lng) =>
  `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=`;

export const RES_MENU_IMG =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";

export const ADDRESS_AUTO_COMPLETE =
  "https://www.swiggy.com/dapi/misc/place-autocomplete?input=";

export const ADDRESS_LAT_LNG =
  "https://www.swiggy.com/dapi/misc/address-recommend?place_id=";

//12.9352403
//77.624532
