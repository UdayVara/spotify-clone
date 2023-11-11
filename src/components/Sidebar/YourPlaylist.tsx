"use client";
import React, { useEffect, useState } from "react";
import { BsMusicNoteList } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { open } from "@/redux/features/uploadModal";
import { toast } from "react-toastify";
import Mediacard from "../Mediacard";

type song = {
  name:string,
  song:string,
  image:string,
  singer:string
}
function YourPlaylist() {
  const loginData = useSelector((state) => state.login);
  const [songs, setSongs] = useState<song[]>([]);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (loginData.isLogin) {
      dispatch(open());
    } else {
      toast.error("Login Required");
    }
  };

  const getMySongs = async () => {
    if (loginData.isLogin) {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/song/getmy`,
        {
          headers: {
            "spotify-auth-token": loginData.token,
          },
        }
      );
      const parsedData = await data.json();
      console.log(parsedData);

      if (parsedData.success) {
        setSongs(parsedData.songs);
      } else {
        toast.error(parsedData.message);
      }
    }
  };

  useEffect(() => {
    getMySongs();
  }, [loginData]);
  return (
    <>
      <h4 className="pl-4  gap-x-2 flex items-center text-neutral-500  ">
        <BsMusicNoteList /> Your Created Playlist{" "}
        <p onClick={handleClick}>
          <AiOutlinePlus
            size={22}
            className="cursor-pointer hover:text-white"
          />
        </p>
      </h4>
      <div className="flex flex-col gap-1 px-2">
        {songs.map((element, index) => {
          return (
            <Mediacard
              image={element.image}
              song={element.song}
              name={element.name}
              singer={element.singer}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}

export default YourPlaylist;
