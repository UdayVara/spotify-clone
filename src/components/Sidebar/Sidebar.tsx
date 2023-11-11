"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React,{useMemo} from 'react'
import {AiFillHome} from "react-icons/ai"
import {BiSolidSearch} from "react-icons/bi"
import YourPlaylist from './YourPlaylist'
type sidebarProps = {
    children:React.ReactNode
}
function Sidebar({children}:sidebarProps):React.ReactNode {
  const pathname = usePathname()
  const options = useMemo(() => [
    {
      label:"Home",
      icon:< AiFillHome />,
      link:"/",
      active: pathname != "/search"
    },
    {
      label:"Search",
      icon:< BiSolidSearch />, 
      link:"/search",
      active: pathname == "/search"
    }
  ], [pathname])
  return (
    <>
        <div className='flex gap-4 h-full'>
            <div className=' w-[250px] hidden shrink-0 md:flex flex-col gap-y-3 text-white  h-full '>
              <div className='flex flex-col gap-y-3  bg-neutral-900 p-6 rounded-lg'>
              {
                options.map((element,index)=>{
                  return <Link className={`text-lg flex items-center ${element.active?"text-white":"text-neutral-500"} gap-x-3 `}  key={index} href={element.link}>{element.icon}{element.label}</Link>
                })
              }
              </div>
              <div className='flex flex-col gap-y-3 bg-neutral-900 py-3 rounded-lg h-full'>
              <YourPlaylist />
              
              </div>
             
            </div>
            <main className=' grow'>{children}</main>
        </div>
    </>
  )
}

export default Sidebar