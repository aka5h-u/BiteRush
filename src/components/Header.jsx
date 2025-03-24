import { User, ShoppingBag, MapPinHouse } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { useEffect, useState } from "react";
import SidebarLogin from "./SidebarLogin";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { ADDRESS_AUTO_COMPLETE, ADDRESS_LAT_LNG } from "../utils/constants";
import { addLatLng } from "../utils/locationSlice";
import { updateName } from "../utils/userSlice";

const Header = () => {
  const user = useSelector((store) => store.user.name);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState([]);
  const [dropdownToggle, setDropdownToggle] = useState(true);
  const dispatch = useDispatch();
  console.log(user);
  const locationSelectHandler = async (placeId) => {
    console.log("clicked");
    const data = await fetch(ADDRESS_LAT_LNG + placeId);
    const json = await data.json();
    console.log(json);
    dispatch(addLatLng(json?.data[0]));
  };
  const handleSearchLocation = async (e) => {
    setSearchQuery(e.target.value);
    if (searchQuery.length >= 3) {
      const data = await fetch(ADDRESS_AUTO_COMPLETE + searchQuery);
      const json = await data.json();

      setLocation(json?.data);
      console.log(location);
    }
  };

  const handleSignIn = () => {
    setIsOpen(!isOpen);
  };
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="shadow-md flex justify-between items-center min-h-16">
      <div className="flex items-center gap-20 p-1 relative">
        <Link to="/">
          <img src={logo} className="w-15 m-2" />
        </Link>

        <div className="relative w-72">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for city, area..."
            onChange={(e) => handleSearchLocation(e)}
            value={searchQuery}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onBlur={() => setTimeout(() => setDropdownToggle(false), 200)}
            onFocus={() => setDropdownToggle(true)}
          />

          {/* Dropdown Results */}
          <div className=" absolute z-20 top-full left-0 w-full bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-48 overflow-y-auto">
            {dropdownToggle &&
              location.map((loc) => (
                <div
                  className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
                  onClick={() => locationSelectHandler(loc?.place_id)}
                  key={loc?.place_id}
                >
                  <MapPinHouse className="mr-2" />
                  {loc?.structured_formatting?.main_text +
                    ", " +
                    loc?.structured_formatting?.secondary_text}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-10 cursor-pointer">
        <div className="flex" onClick={() => handleSignIn()}>
          <User className="mr-2" />

          <span>{user}</span>

          {isOpen && <SidebarLogin />}
        </div>

        <div className="mr-10 ">
          <Link to="/cart" className="flex items-center gap-1">
            <ShoppingBag />
            <span>{cartItems.length > 0 ? cartItems.length : 0}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
