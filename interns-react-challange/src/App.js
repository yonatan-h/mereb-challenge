import './App.css'
import actors from './actors'
import { FiArrowDownRight } from 'react-icons/fi'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useEffect } from 'react'
import { transform } from 'framer-motion'
import { useRef } from 'react'

function getActors() {
  return actors.map(
    ({
      name,
      height,
      birth_year,
      url,
      gender,
      homeworld,
      films,
      mass,
      hair_color,
      skin_color,
    }) => {
      const homeId = homeworld.match(/\d+/)[0]
      const homeUrl = `https://starwars-visualguide.com/assets/img/planets/${homeId}.jpg`

      const id = url.match(/\d+/)[0]
      const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`

      const filmUrls = films.map((film) => {
        const id = film.match(/\d+/)[0]
        return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`
      })

      if (gender === 'n/a') gender = null

      const hairColor = hair_color
      const skinColor = skin_color

      const birthYear = birth_year
      return {
        name,
        height,
        birthYear,
        url,
        imageUrl,
        homeUrl,
        filmUrls,
        gender,
        mass,
        hairColor,
        skinColor,
      }
    }
  )
}

function ActorList({ actors }) {
  return (
    <div
      className='
      bg-black grid gap-6
      grid-cols-1 md:grid-cols-3'
    >
      {actors.map((actor) => (
        <ActorCard actor={actor} key={actor.url} />
      ))}
    </div>
  )
}

function ActorCard({ actor }) {
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
              <p>{height} Feet Tall</p>
              <p>Born In {birthYear}</p>
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

function Gallery({ imageUrls }) {
  const [contactX, setContactX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const carousel = useRef(null)

  useEffect(() => {
    const endEvents = ['mouseup', 'mouseleave', 'touchend']
    const handleDragEnd = () => setIsDragging(false)
    endEvents.forEach((e) => window.addEventListener(e, handleDragEnd))

    return () => {
      endEvents.forEach((e) => window.removeEventListener(e, handleDragEnd))
    }
  }, [setIsDragging])

  const handleDragStart = (e) => {
    setIsDragging(true)
    setContactX(e.clientX || e.touches[0].clientX)
  }

  const handleDrag = (e) => {
    if (!isDragging || !carousel.current) return
    const newContactX = e.clientX || e.touches[0].clientX
    const dx = newContactX - contactX
    setContactX(newContactX)
    carousel.current.scrollLeft -= dx
  }

  const noImage = imageUrls.length === 0
  const oneImage = imageUrls.length === 1
  const manyImages = imageUrls.length > 1

  return (
    <div>
      {noImage && <hr />}

      {oneImage && (
        <img
          src={imageUrls[0]}
          alt='character'
          className='max-w-full h-[500px] object-cover'
        />
      )}

      {manyImages && (
        <div
          className='overflow-scroll flex gap-6 cursor-pointer'
          ref={carousel}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onMouseMove={handleDrag}
          onTouchMove={handleDrag}
        >
          {imageUrls.map((imageUrl, i) => (
            <img
              className='
                  h-[500px] flex-shrink-0 object-cover
                  pointer-events-none
                '
              key={i}
              src={imageUrl}
              alt='character'
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ActorDetail({ actor, close }) {
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
          <button onClick={() => close()}>
            <IoMdClose className='text-white' />
          </button>
        </div>
        {/* main content  */}
        <div className='flex flex-col gap-6'>
          {/* basic intro  */}
          <div className='flex flex-col gap-6'>
            <h2 className='text-white text-3xl'>{name}</h2>
            <div>
              <p>{height} Feet Tall</p>
              <p>Born In {birthYear}</p>
              {gender && <p> {gender}</p>}
            </div>
            <div>
              <p>Weighs {mass} pounds</p>
              <p>Skin color is {skinColor}</p>
              <p>Hair color is {hairColor}</p>
            </div>

            <Gallery imageUrls={[imageUrl, ...filmUrls]} />
          </div>
        </div>
      </div>
    </div>
  )
}

function getStartPositions(count) {
  const starPositions = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 100)
    const y = Math.floor(Math.random() * 200)
    starPositions.push({ x, y })
  }
  return starPositions
}

function StarBackground() {
  const [offset, setOffset] = useState(0)
  const [starPositions, setStarPositions] = useState(getStartPositions(100))

  useEffect(() => {
    const handleScroll = () => setOffset(-window.scrollY / 15)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0'>
        <div className='relative w-full h-full transition-all'>
          {starPositions.map(({ x, y }, i) => (
            <div
              className='absolute bg-white w-[2px] h-[2px]'
              key={i}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translateY(${offset}px)`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section
      className='
      h-[60vh] min-h-[600px]
      grid grid-cols-2 relative
    '
    >
      <div className='outline outline-1 outline-[#4141417a] flex'></div>
      <div className='outline outline-1 outline-[#4141417a]'></div>
      <div className='outline outline-1 outline-[#4141417a]'></div>
      <div className='outline outline-1 outline-[#4141417a]'></div>
      <h1
        className='
        outline outline-2 outline-[#414141] p-6 bg-black
        text-4xl text-[#f3ff00] font-[600] text-center font-poller
        absolute top-[50%] left-[50%] transofrm translate-x-[-50%] translate-y-[-50%]
      '
      >
        STARWARS <br /> ACTORS
      </h1>

      <div
        className='
        w-6 h-6 bg-white transform rotate-45
        transofrm translate-x-[-50%] translate-y-[-50%]
        absolute bottom-[10%] left-[50%]
        flex items-center justify-center
      '
      >
        <FiArrowDownRight className='text-black' />
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <StarBackground />
      <main className='bg-black text-[#ffffff9c] p-6'>
        <div
          className='
          max-w-[1000px] m-auto relative z-5
          flex flex-col gap-6
        '
        >
          <Hero />
          <ActorList actors={getActors()} />
        </div>
      </main>
    </>
  )
}

export default App
