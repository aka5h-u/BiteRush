import { User, ShoppingBag } from "lucide-react";

const Header = () => {
  return (
    <div className="shadow-md flex justify-between items-center">
      <div>
        <img src="logo.jpeg" className="w-15 m-2 " />
      </div>
      <div className="flex justify-end items-center gap-10">
        <div className="flex">
          <User className="mr-2" />
          <span>Sign in</span>
        </div>
        <div className="mr-10">
          <ShoppingBag />
        </div>
      </div>
    </div>
  );
};

export default Header;
