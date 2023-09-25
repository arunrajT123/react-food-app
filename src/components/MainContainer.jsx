import React, { useState, useEffect } from "react";
import HomeContainer from "./HomeContainer";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      {/* home container */}
      <HomeContainer />

      {/* fruits */}
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl text-headingColor font-semibold capitalize relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-green-500 transition-all ease-in-out duration-100">
            Our fresh &and healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center ">
            <div
              className="w-8 h-8 rounded-lg bg-green-400 hover:bg-green-600 cursor-pointer   hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft />
            </div>
            <div
              className="w-8 h-8 rounded-lg bg-green-400 hover:bg-green-600 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight />
            </div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
      </section>

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
