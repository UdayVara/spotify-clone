"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { close } from "@/redux/features/loginModal";
import Input from "../Input";
import { toast } from "react-toastify";
import { login } from "@/redux/features/login";

function LoginModal() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const loginModal = useSelector((state) => state.loginmodal);
  const dispatch = useDispatch();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(data);
    if (loginModal.option === "signup") {
      if (!/.{4,}/.test(data.username)) {
        toast.error("Username must be of atleast 4 characters.");
        return;
      }
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data.email)) {
      toast.error("Email must be valid");
      return;
    }
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm.test(
        data.password
      )
    ) {
      toast.error(
        "Length of password must be atleast 8 and should contain 1 alphabet, 1 number and 1 special character"
      );
      return;
    }

    const fetchData = await fetch(`${url}/auth/${loginModal.option}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const parsedData = await fetchData.json();

    if (parsedData.success) {
      toast.success(parsedData.message);
      localStorage.setItem("spotify-token", parsedData.token);
      setData({ username: "", email: "", password: "" });
      dispatch(login(parsedData.token));
      dispatch(close());
    } else {
      toast.error(parsedData.message);
    }
  };
  return (
    <>
      <div
        className={`w-full ${
          loginModal.isOpen ? "scale-100" : "scale-0"
        } h-full flex flex-col items-center  justify-center fixed top-0 backdrop-blur-sm backdrop-brightness-90 z-40 transition origin-bottom duration-500`}
      >
        <div className="bg-neutral-800 text-white rounded w-[380px] px-4 py-4  z-50 opacity-100">
          <div className="modal-header text-xl flex justify-between items-center">
            <h1
              className="cursor-pointer"
              onClick={() => {
                dispatch(close());
                setData({ username: "", email: "", password: "" });
              }}
            >
              <AiOutlineClose size={25} />
            </h1>
            <h4 className="mr-5 text-2xl  first-letter:uppercase font-semibold mb-1">
              {loginModal.option}
            </h4>
            <h4></h4>
          </div>
          <hr className="mt-1" />
          <div className="modal-body mt-5">
            {loginModal.option === "signup" && (
              <Input
                title="username"
                name="username"
                onChange={handleChange}
                type="text"
                value={data.username}
              />
            )}
            <Input
              title="email"
              name="email"
              onChange={handleChange}
              type="email"
              value={data.email}
            />
            <Input
              title="password"
              name="password"
              onChange={handleChange}
              type="password"
              value={data.password}
            />
          </div>
          <button
            className="mt-4 mb-5 w-full py-2 bg-green-700 hover:bg-green-600  text-xl first-letter:uppercase"
            onClick={handleSubmit}
          >
            {loginModal.option}
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
