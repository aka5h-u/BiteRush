import { User, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useSelector } from "react-redux";
const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="shadow-md flex justify-between items-center min-h-16">
      <div>
        <Link to="/">
          <img src={logo} className="w-15 m-2 " />
        </Link>
      </div>
      <div className="flex justify-end items-center gap-10">
        <div className="flex">
          <User className="mr-2" />
          <span>Sign in</span>
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
