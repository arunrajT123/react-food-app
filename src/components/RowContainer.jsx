import React, { useEffect, useRef, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { actionType } from "../context/Reducer";
import { useStateValue } from "../context/StateProvider";
import NotFound from "../img/empty-cart.gif";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });

    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={` flex items-center gap-3 w-full my-12 ${
        flag
          ? "overflow-x-scroll scrollbar-none   "
          : "overflow-x-hidden flex-wrap justify-center"
      } 
         
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-250 min-w-[300px] md:min-w-[300px] md:w-200  h-[225px] bg-cardOverlay my-12 rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg flex flex-col justify-between  "
          >
            <div className="w-full flex items-center justify-between">
              <div className="w-40 h-40  -mt-8 drop-shadow-2xl">
                <img
                  src={item?.imageURL}
                  alt={item?.title}
                  className="w-full h-full object-contain "
                />
              </div>

              <div
                className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdAddShoppingCart className="text-white" />
              </div>
            </div>
            <div className="w-full flex flex-col  items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories}calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="Not Found" className="h-340 w-200" />

          <p className="text-xl text-headingColor font-semibold">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
