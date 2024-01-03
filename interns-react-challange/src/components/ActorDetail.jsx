import { IoMdClose } from 'react-icons/io'
import Gallery from './Gallery'

export default function ActorDetail({ actor, close }) {
  const {
    name,
    height,
    birthYear,
    gender,
    imageUrl,
    filmUrls,
    mass,
    hairColor,
    skinColor,
  } = actor
  return (
    <div
      data-testid='actor-detail'
      className='
        fixed z-10 top-0 left-0 w-screen h-screen 
        backdrop-blur bg-[#00000085] p-6
        flex flex-col overflow-y-scroll
      '
      onClick={close}
    >
      <div
        className='
            flex-1 p-6 bg-[black] 
            max-w-[1000px] m-auto relative z-5
          '
        onClick={(e) => e.stopPropagation()}
      >
        {/* x bar  */}
        <div className='flex justify-end'>
          <button
          data-testid='close-details'
          onClick={() => close()}>
            <IoMdClose className='text-white' />
          </button>
        </div>
        {/* main content  */}
        <div className='flex flex-col gap-6'>
          {/* basic intro  */}
          <div className='flex flex-col gap-6'>
            <h2 className='text-white text-3xl'>{name}</h2>
            <div>
              {height ? <p>{height} Feet Tall</p> : <p>Height not known</p>}

              {birthYear ? (
                <p>Born In {birthYear}</p>
              ) : (
                <p>Unknown birthdate</p>
              )}

              {gender ? <p> {gender}</p> : <p>No gender</p>}
            </div>
            <div>
              {mass ? <p>Weighs {mass} pounds</p> : <p>Unknown weight</p>}

              {skinColor ? (
                <p>Skin color is {skinColor}</p>
              ) : (
                <p>No skin color</p>
              )}

              {hairColor ? (
                <p>Hair color is {hairColor}</p>
              ) : (
                <p>No hair color</p>
              )}
            </div>

            <Gallery imageUrls={[imageUrl, ...filmUrls]} />
          </div>
        </div>
      </div>
    </div>
  )
}
