import { play } from "@/redux/features/player";
import Image from "next/image";
import React, { useState } from "react";
import {BsFillPlayFill} from "react-icons/bs"
import { useDispatch } from "react-redux";
import {AiFillHeart} from "react-icons/ai"

type SongCardProps = { 
  image: string;
  songUrl: string;
  name: string;
  singer: string;
};


const Songcard = ({ image, songUrl, name, singer }: SongCardProps) => {
  const [isFav,setIsFav] = useState<boolean>(false)
  const dispatch = useDispatch()
  const playSong = () => {
    dispatch(play({song:songUrl,name,image,singer}))
  }

  const handleFavorite = () =>{
    setIsFav(!isFav)
  }
  return (
    <div className="flex flex-col  group py-3 bg-neutral-800 hover:bg-neutral-700  rounded px-2 transition relative" >
      <div>

      <div className="w-full relative" onClick={playSong}>
        <Image
          src={image}
          alt="Image not available"
          className="w-full rounded  pt-1"
          width={1000}
          height={1000}
        />
        <button
          className="absolute p-1 bg-green-600 mr-2  rounded-full scale-0 flex 
            items-center justify-center    group-hover:scale-125
            transition duration-75 bottom-2 right-0"
        >
          <BsFillPlayFill size={28} className="text-black" />
        </button>
      </div>
      <div className="song-body mb-2 ">
      <h3 className="mt-3 text-lg text-white first-letter:uppercase">{name}</h3>
      <h3 className=" text-md text-neutral-400 first-letter:uppercase">{singer}</h3>
      </div>
      </div>
      <h3 className="cursor-pointer" onClick={handleFavorite}>
      <AiFillHeart className={`transition text-2xl ${isFav?"text-green-600":"opacity-80"} absolute bottom-1 right-1`} />
      </h3>
    </div>
  );
};

export default Songcard;
