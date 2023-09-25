import React from "react";
import MP4 from "../img/video3.mp4";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      {/* left container */}
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <p className="text-[2.5rem] lg:text-[2.5rem] font-bold tracking-wide md:text-[3rem]  text-headingColor">
          Hungry? Don't worry,
          <span className="text-red-600 text-[3rem] lg:text-[4rem]">
            we've got you covered.
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%] ">
          "Order Your Favorite Meals from Local Restaurants with Just a Few Taps
          on Your Phone! Fast and Reliable Delivery Guaranteed."
        </p>
      </div>
      {/* right video container */}
      <div className="py-2 flex-1 flex items-center relative ">
        <video src={MP4} autoPlay loop className="w-full h-full" />

        <div className="w-full h-full top-0 left-0 absolute flex items-center justify-center  py-4 gap-4 flex-wrap"></div>
      </div>
    </section>
  );
};

export default HomeContainer;
