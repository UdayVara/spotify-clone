"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { GrPrevious, GrNext } from "react-icons/gr";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import {BsSpeakerFill} from "react-icons/bs"
function Player() {
  const playerData = useSelector((state: any) => state.player);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const player = useRef<null | HTMLAudioElement>();
  console.log(playerData.currentSong.song);

  const togglePlayback = () => {
    if (isPlaying) {
      player.current?.pause();
      setIsPlaying(false);
    } else {
      player.current?.play();
      setIsPlaying(true);
    }
  };

  const toggleVolume = () => {
    if (isMute) {
      setIsMute(!isMute);
    } else {
      setIsMute(!isMute);
    }
  };

  const handleVolume = (e) => {
    document.getElementById("player").volume = e.target.value
  }

  useEffect(() => {
    setIsPlaying(true);
  }, [playerData.currentSong]);
  return (
    <>
      {playerData.hasPlayed && (
        <div className="bg-neutral-950 flex items-center justify-between py-2 w-full z-30  opacity-80 fixed bottom-0 text-white">
          <div className="flex gap-3 w-[200px]">
            <Image
              src={playerData.currentSong.image}
              className="h-16 w-16"
              alt="not available"
              width={1000}
              height={1000}
            />
            <div>
              <audio
                src={playerData.currentSong.song}
                ref={player}
                className="invisible"
                autoPlay={isPlaying}
                onEnded={()=>{setIsPlaying(false)}}
                muted={isMute}
                id="player"
              ></audio>
              <h4 className="text-white text-lg first-letter:uppercase">
                {playerData.currentSong.name}
              </h4>
              <h4 className="text-neutral-400 first-letter:uppercase">
                {playerData.currentSong.singer}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-3 ">
            <button
              className="rounded-full p-2  bg-neutral-100 hover:opacity-90 text-white text-xl"
              onClick={() => {
                player.current?.load();
              }}
            >
              <GrPrevious />
            </button>
            <button
              className="rounded-full p-2 bg-white hover:opacity-90 text-black text-2xl"
              onClick={togglePlayback}
            >
              {!isPlaying ? <BsFillPlayFill /> : <BsPauseFill />}
            </button>
            <button className="rounded-full p-2  bg-neutral-100 hover:opacity-90 text-black text-xl">
              <GrNext />
            </button>
          </div>
          <div className="mr-3 w-[200px]  items-center lg:flex hidden">
            <button
              className="rounded-full p-2 text-white text-2xl "
              onClick={toggleVolume} title="Mute"
            >
              {!isMute ? <HiSpeakerWave /> : <HiSpeakerXMark />}
            </button>
            <div className="flex">
              <BsSpeakerFill size={20} className="mr-2"/>
            <input type="range" min={0}  max={1} step={0.1} name="volume" id="volume" className="accent-green-500 cursor-pointer" onChange={handleVolume}/>
            </div>
          </div> 
        </div>
      )}
    </>
  );
}

export default Player;
