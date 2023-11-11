"use client";
import Header from "@/components/Header";
import Mediacard from "@/components/Mediacard";
import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";

type song = {
  name:string,
  song:string,
  image:string,
  singer:string
}

function Page() {
  const [query, setQuery] = useState<string>("");
  const [songs,setSongs] = useState<song[]>([])
  let timeoutId = [];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(async() => {
      console.log("fetched");
      if(query!==""){
        const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/song/search?song=${query}`)
        const parsedData = await data.json()
  
        if (parsedData.success) {
          setSongs(parsedData.songs)
        } else {
          toast.error(parsedData.error)
        }
      }else{
        setSongs([])
      }
      
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  return (
    <>
      <div className="w-full h-full bg-neutral-900">
        <Header />
        <div className="px-4">
          <h4 className="text-2xl mb-1 font-semibold text-white">Search</h4>
          <input
            type="text"
            name="search"
            id="search"
            className="text-lg w-full  block  bg-neutral-800 text-white px-2 py-1 rounded focus:outline-none"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2 px-4 mt-3">
          {songs.map((element,index)=>{
            return <Mediacard song={element.song} image={element.image} name={element.name} singer={element.singer} key={index}/>
          })}
        </div>
      </div>
    </>
  );
}

export default Page;
