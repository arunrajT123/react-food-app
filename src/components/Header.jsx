import React, { useState } from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdAdd, MdLogout } from "react-icons/md";

import { BsMinecartLoaded } from "react-icons/bs";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "../context/StateProvider";
import { app } from "../firebase.config";
import { actionType } from "../context/Reducer";

const Header = () => {
  const fireBaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  // login
  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(fireBaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  // logout
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop $tablet */}
      <div className="hidden md:flex w-full h-full items-center  justify-between">
        {/* logo container */}
        <Link to={"/"} className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold">QuickPlate</p>
        </Link>
        <div className="flex items-center gap-8">
          {/* list  */}
          <ul className="flex items-center gap-8">
            <Link
              to={"/"}
              className="text-base text-textColor hover:text-headingColor duration-100 ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Home
            </Link>
          </ul>

          {/* cart info */}
          <div
            className="relative flex items-center justify-center "
            onClick={showCart}
          >
            <BsMinecartLoaded className="text-textColor text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg">
                <p className=" text-xs text-white font-semibold flex items-center justify-center text-center">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          {/* avatar img */}
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              // when user is there then show use.photoUrl otherwise avatar
              src={user ? user.photoURL : Avatar}
              alt="user-profile"
              onClick={login}
            />
            {/* menu card */}
            {isMenu && (
              <div className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 ">
                {user && user.email === "praveensk1819@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Log Out <MdLogout />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}

      {/* cart container */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <div
          className="relative flex items-center justify-center "
          onClick={showCart}
        >
          {/* shop logo */}
          <BsMinecartLoaded className="text-textColor text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg">
              <p className=" text-xs text-white font-semibold flex items-center justify-center text-center">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        {/* logo  */}
        <Link to={"/"} className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold">QuickPlate</p>
        </Link>
        {/* avatar img */}
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            // when user is there then show use.photoUrl otherwise avatar
            src={user ? user.photoURL : Avatar}
            alt="user-profile"
            onClick={login}
          />
          {/* menu card */}
          {isMenu && (
            <div className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 ">
              {user && user.email === "praveensk1819@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col px-4 py-2  ">
                <Link
                  to="/"
                  className="text-base text-textColor hover:text-headingColor duration-100 ease-in-out cursor-pointer hover:bg-slate-100"
                >
                  Home
                </Link>
              </ul>
              <p
                className="m-2 p-2 rounded-md shadow-md items-center flex justify-center gap-3 cursor-pointer hover:bg-gray-500 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Log Out <MdLogout />
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
