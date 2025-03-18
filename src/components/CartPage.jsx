import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RES_MENU_IMG } from "../utils/constants";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();

  const clearCartHandler = () => {
    dispatch(clearCart());
  };
  const cartItem = useSelector((store) => store.cart.items);
  console.log(cartItem);

  return cartItem.length <= 0 ? null : (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="font-bold text-2xl">Cart</h1>
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        {cartItem.map((item) => (
          <div
            key={item?.card?.info?.id}
            className="flex flex-col md:flex-row items-center md:items-start justify-between border-b pb-4 mb-4"
          >
            {/* Left: Name & Description */}
            <div className="flex-1 text-left">
              <p className="font-bold text-lg">{item?.card?.info?.name}</p>
              <p className="font-bold text-sm ">
                ₹{" "}
                {isNaN(item?.card?.info?.defaultPrice)
                  ? item?.card?.info?.price / 100
                  : item?.card?.info?.defaultPrice / 100}
              </p>
              <p className="text-gray-600">{item?.card?.info?.description}</p>
            </div>

            {/* Right: Image & Button */}
            <div className="flex flex-col items-center md:items-end">
              <img
                src={RES_MENU_IMG + item?.card?.info?.imageId}
                className="w-24 h-24 object-cover rounded-md mb-2"
                alt={item?.card?.info?.name}
              />
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => dispatch(removeItem(item))}
                  className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg font-bold">{item.quantity}</span>
                <button
                  onClick={() => dispatch(addItem(item))}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-3xl bg-green-600 text-white font-bold p-2 justify-between">
        <h1>Total Price </h1>
        <span>
          ₹{" "}
          {cartItem.reduce(
            (acc, item) =>
              acc +
              (isNaN(item?.card?.info?.defaultPrice)
                ? item?.card?.info?.price / 100
                : item?.card?.info?.defaultPrice / 100) *
                item.quantity,
            0
          )}
        </span>
      </div>
      <div className="p-2 m-2 ">
        <button className="bg-green-500 text-white p-2 rounded-lg cursor-pointer mx-5">
          Place Order
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded-lg cursor-pointer"
          onClick={() => clearCartHandler()}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
