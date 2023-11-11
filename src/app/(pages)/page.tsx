"use client";
import Header from "@/components/Header";
import Songcard from "@/components/Songcard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type song = {
  name: string;
  song: string;
  image: string;
  singer: string;
};
export default function Home() {
  const [songs, setSongs] = useState<song[]>([]);

  const getSongs = async () => {
    const data = await fetch("http://localhost:5000/song/getall");
    const parsedData = await data.json();

    if (parsedData.success) {
      setSongs(parsedData.songs);
      console.log(parsedData);
    } else {
      toast.error(parsedData.message);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);
  return (
    <>
      <div className="h-full overflow-y-scroll no-scrollbar bg-neutral-900">
        <Header />
        <h3 className="text-white font-semibold text-2xl ml-3 mt-2">
          Newest Songs
        </h3>
        <div className="container place-content-center mx-auto grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8 px-5 mt-4">
          {songs.map(
            (
              element: {
                image: string;
                song: string;
                name: string;
                singer: string;
              },
              index
            ) => {
              return (
                <Songcard
                  image={element.image}
                  songUrl={element.song}
                  name={element.name}
                  singer={element.singer}
                  key={index}
                />
              );
            }
          )}
        </div>
      </div>
    </>
  );
}
