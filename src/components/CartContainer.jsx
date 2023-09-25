import React, { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import NotFound from "../img/empty-cart.gif";

import { RiRefreshFill } from "react-icons/ri";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
import CartItem from "./CartItem";
import { useState } from "react";

const CartContainer = () => {
  const [tot, setTot] = useState(0);
  const [flag, setFlag] = useState(1);
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (acc, item) {
      return acc + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });
  };
  localStorage.setItem("cartItems", JSON.stringify([]));

  return (
    <div className=" fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]">
      <div
        className="w-full flex items-center justify-between p-4 cursor-pointer"
        onClick={showCart}
      >
        <MdOutlineKeyboardBackspace className="text-textcolor text-3xl" />
        <p className="text-textcolor text-lg font-semibold">Cart</p>
        <p
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base "
          onClick={() => clearCart}
        >
          Clear
          <RiRefreshFill />
        </p>
      </div>
      {/* bottom */}

      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col ">
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-hidden scrollbar-none">
            {/* cart item */}
            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  flag={flag}
                  setFlag={setFlag}
                />
              ))}
          </div>

          {/* cart total  */}

          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2 ">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">${tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">${tot + 2.5}</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2">
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-400 text-lg">Total</p>
                <p className="text-gray-400 text-lg">$ 2.5</p>
              </div>
              {user ? (
                <button
                  type="button"
                  className="w-full p-2 rounded-full bg-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
                >
                  Check Out
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full p-2 rounded-full bg-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
                >
                  Log in to Check Out
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="Not Found" className="h-200 w-200" />

          <p className="text-xl text-headingColor font-semibold">
            Add some Quick
          </p>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
