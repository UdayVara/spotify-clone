"use client";

import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout, login } from "@/redux/features/login";
import { useDispatch, useSelector } from "react-redux";
function ToastProvider() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("spotify-token")) {
      dispatch(login(localStorage.getItem("spotify-token") as string));
    }
  }, []);
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
}

export default ToastProvider;
