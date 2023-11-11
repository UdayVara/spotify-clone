"use client";
import { store } from "@/redux/store";
import React,{useState,useEffect} from "react";
import { Provider } from "react-redux";

function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [isMounted,setIsmounted] = useState<boolean>(false)

  useEffect(()=>{
    setIsmounted(true)
  },[])
  return (
    <>
      {isMounted && <Provider store={store}>{children}</Provider> }
    </>
  );
}

export default ReduxProvider;
