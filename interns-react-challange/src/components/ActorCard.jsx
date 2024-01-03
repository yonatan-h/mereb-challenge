import { useState } from 'react'
import ActorDetail from './ActorDetail'

export default function ActorCard({ actor }) {
    const [showDetail, setShowDetail] = useState(false)
  
    const { name, height, birthYear, imageUrl } = actor
    return (
      <>
        {showDetail && (
          <ActorDetail actor={actor} close={() => setShowDetail(false)} />
        )}
        <div className='h-[500px] flex flex-col'>
          <div className='flex-1 relative overflow-hidden'>
            <div
              className='
            absolute w-full h-full
            bg-gradient-to-b from-transparent to-black
          '
            ></div>
            <img
              src={imageUrl}
              alt={name}
              className='w-full h-full object-cover'
            />
  
            <div
              className='
            absolute bottom-0 left-0 right-0
            flex flex-col gap-3 px-6
            text-[#ffffff9c]
          '
            >
              <h1 className='text-xl text-white'>{name}</h1>
  
              <div>
                {height ? <p>{height} Feet Tall</p> : <p>Height not known</p>}
  
                {birthYear ? (
                  <p>Born In {birthYear}</p>
                ) : (
                  <p>Birthdate not known</p>
                )}
                <div>
                  <button
                    onClick={() => setShowDetail(true)}
                    className='text-[#f3ff00] hover:text-[white]'
                  >
                    DETAIL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  