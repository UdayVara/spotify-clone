"use client";
import loginModal from "@/redux/features/loginModal";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input";
import { close } from "@/redux/features/uploadModal";
import {toast} from "react-toastify"
type song = {
  name: string;
  singer: string;
  image: any;
  song: any;
};
function UploadModal() {
  const loginData = useSelector((state) => state.login);
  const uploadModal = useSelector((state) => state.uploadModal);
  const [data, setData] = useState<song>({name:"",singer:"",image:{},song:{}});
  const dispatch = useDispatch();

  const handleChange = (name: string,value: string) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async() => {
    console.log(data);
    
    const songData = new FormData()
    songData.append("name",data.name)
    songData.append("singer",data.singer)
    songData.append("song",data.song)
    songData.append("image",data.image)


    const fetchdata = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/song/upload`,{
      method:"POST",
      headers:{
        "spotify-auth-token":loginData.token
      },
      body:songData
    })

    const parsedData = await fetchdata.json()
    console.log(parsedData);
    
    if (parsedData.success) {
      
      toast.success("Song Uploaded")
      dispatch(close())
    } else {
      toast.error(parsedData.message)
    }
  }
  return (
    <>
      {loginData.isLogin && (
        <div
          className={`w-full ${
            uploadModal.isOpen ? "scale-100" : "scale-0"
          } h-full flex flex-col items-center  justify-center fixed top-0 backdrop-blur-sm backdrop-brightness-90 transition origin-bottom duration-500 z-20`}
        >
          <div className="bg-neutral-800 text-white rounded w-[380px] md:w-[470px] px-4 py-4  z-50 opacity-100">
            <div className="modal-header text-xl flex justify-between items-center">
              <h1
                className="cursor-pointer"
                onClick={() => {
                  dispatch(close());
                  
                }}
              >
                <AiOutlineClose size={25} />
              </h1>
              <h4 className="mr-5 text-2xl  first-letter:uppercase font-semibold mb-1">
                Upload Song
              </h4>
              <h4></h4>
            </div>
            <hr />

            <div className="modal-body mt-3">
              <Input
                name="name"
                onChange={handleChange}
                title="Name"
                type="text"
                value={data.name}
              />
              <Input
                name="singer"
                onChange={handleChange}
                title="Author"
                type="text"
                value={data.singer}
              />
              <div className="my-3">
                <label
                  className="text-lg first-letter:uppercase"
                  htmlFor="song"
                >
                  Song File
                </label>
                <input
                  type="file"
                  name="song"
                  id="song"
                  className="w-full bg-neutral-700 py-1 text-lg px-2  mt-1 rounded text-neutral-400 
              file:border-t-0 file:border-b-0 file:border-l-0 
              file:border-r-2 file:border-r-white
              file:bg-neutral-700  file:pr-2 file:text-white file:mr-3" onChange={(e)=>{setData({...data,song:e.target.files[0]})}}
                />
              </div>
              <div className="my-4  ">
                <label
                  className="text-lg first-letter:uppercase"
                  htmlFor="song"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="w-full bg-neutral-700 py-1 text-lg px-2  mt-1 rounded text-neutral-400 
              file:border-t-0 file:border-b-0 file:border-l-0 
              file:border-r-2 file:border-r-white
              file:bg-neutral-700  file:pr-2 file:text-white file:mr-3" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setData({...data,image:e.target.files[0]})}}
                />
              </div>
              <button
                className="mt-3 py-3 w-full rounded-lg text-lg hover:bg-green-700 bg-green-600"
                onClick={handleSubmit}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UploadModal;
