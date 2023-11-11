"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { BiSolidSearch } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { open } from "@/redux/features/loginModal";
import { logout, login } from "@/redux/features/login";
import { toast } from "react-toastify";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const path = usePathname();
  console.log(path);

  const loginData = useSelector((state) => state.login);

  return (
    <>
      <nav
        className={`
        ${
          path !== "/search" ? "from-emerald-800" : "from-neutral-900"
        } bg-gradient-to-b  to-neutral-900 p-6 
        h-fit 
    `}
      >
        <div className="flex mb-1 justify-between items-center">
          <div className=" flex gap-2 ">
            <button
              className="p-2 bg-black text-white rounded-full hover:opacity-75 transition md:block hidden"
              onClick={() => {
                router.back();
              }}
            >
              <IoChevronBackOutline size={20} />
            </button>
            <button
              className="p-2 bg-black text-white rounded-full  justify-center md:block hidden hover:opacity-75 transition"
              onClick={() => {
                router.forward();
              }}
            >
              <IoChevronForwardOutline size={20} />
            </button>
            <button className="p-2 bg-white text-black rounded-full  justify-center md:hidden block hover:opacity-75 transition">
              <AiFillHome size={20} />
            </button>
            <button className="p-2 bg-white text-black rounded-full  justify-center md:hidden block hover:opacity-75 transition">
              <BiSolidSearch size={20} />
            </button>
          </div>
          {!loginData.isLogin && (
            <div className=" flex gap-2">
              <button
                className="px-5 py-2 rounded-3xl bg-black text-white hover:opacity-80"
                onClick={() => {
                  dispatch(open("signup"));
                }}
              >
                Signup
              </button>
              <button
                className="px-5 py-2 rounded-3xl bg-white text-black hover:opacity-80"
                onClick={() => {
                  dispatch(open("login"));
                }}
              >
                Login
              </button>
            </div>
          )}

          {loginData.isLogin && (
            <button
              className="px-5 py-2 rounded-3xl bg-white text-black font-bold hover:opacity-80"
              onClick={() => {
                dispatch(logout());
                toast.success("Logged out successfully.");
              }}
            >
              Logout
            </button>
          )}
        </div>
        {path !== "/search" && (
          <>
            {" "}
            <h4 className="text-3xl font-bold text-white mt-5">Welcome Back</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 gap-3">
              <div className="mt-3 bg-neutral-400  flex items-center cursor-pointer group justify-between">
                <div className="flex items-center">
                  <Image
                    height={12}
                    width={50}
                    className="object-cover opacity-100"
                    src={"/liked.png"}
                    alt="image not found"
                  />
                  <h5 className="ml-2 font-semibold md:text-lg ">
                    Liked Songs
                  </h5>
                </div>

                <button
                  className=" p-1 bg-green-600 mr-2  rounded-full scale-0 flex 
            items-center justify-center    group-hover:scale-100
            transition duration-75 "
                >
                  <BsFillPlayFill size={28} className="text-black" />
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
}

export default Header;
