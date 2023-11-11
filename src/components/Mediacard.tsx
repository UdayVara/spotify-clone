import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'
import { play } from '@/redux/features/player'
type songProps = {
    song:string,
    image:string,
    name:string,
    singer:string
}
function Mediacard({song,image,name,singer}:songProps) {
  const dispatch = useDispatch()
  const playSong = () => {
    dispatch(play({song:song,name,image,singer}))
  }
  return (
    <div className='flex items-center gap-2 cursor-pointer rounded hover:bg-neutral-800 py-3 w-full' onClick={playSong}>
        <div>
            <Image src={image} alt="Not available" className='h-14 w-14' width={1000} height={1000} />
        </div>
        <div >
            <h3 className='first-letter:uppercase text-white'>{name}</h3>
            <h3 className='first-letter:uppercase text-sm text-neutral-300'>{singer}</h3>
        </div>
    </div>
  )
}

export default Mediacard