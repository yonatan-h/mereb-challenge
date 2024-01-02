import logo from './logo.svg'
import './App.css'
import actors from './actors'
import { FiArrowDownRight } from 'react-icons/fi'

function getActors() {
  return actors.map(
    ({ name, height, birth_year, url, vehicles, starships }) => {
      const id = url.match(/\d+/)[0]
      const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
      const birthYear = birth_year
      return { name, height, birthYear, url, imageUrl, vehicles, starships }
    }
  )
}

function ActorList({ actors }) {
  return (
    <div
      className='
      bg-black grid gap-12
      grid-cols-1 md:grid-cols-3'
    >
      {actors.map((actor) => (
        <ActorCard {...actor} key={actor.url} />
      ))}
    </div>
  )
}

function ActorCard({ name, height, birthYear, imageUrl }) {
  return (
    <div
      className='h-[500px] flex flex-col'
    >
      <div className='flex-1 relative overflow-hidden'>
        <div
          className='
          absolute w-full h-full
          bg-gradient-to-b from-transparent to-black
        '
        ></div>
        <img src={imageUrl} alt={name} className='w-full h-full object-cover' />

        <div
          className='
          absolute bottom-0 left-0 right-0
          flex flex-col gap-3 px-3
          text-[#ffffff9c]
        '
        >
          <h1 className='text-xl text-white'>{name}</h1>

          <div>
            <p>Height: {height}</p>
            <p>Birth Year: {birthYear}</p>
          </div>
          <div>
            <button className='text-[#f3ff00] hover:text-[white]'>
              DETAIL
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Star({ x, y }) {
  return (
    <div
      className='fixed w-[2px] h-[2px] bg-[#ffffffa2]'
      style={{ left: `${x}%`, top: `${y}%` }}
    ></div>
  )
}

function StarBackground() {
  const stars = []
  for (let i = 0; i < 100; i++) {
    const x = Math.floor(Math.random() * 100)
    const y = Math.floor(Math.random() * 100)
    stars.push(<Star x={x} y={y} key={i} />)
  }
  return <>{stars}</>
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
        outline outline-2 outline-[#414141] p-[2rem] bg-black
        text-4xl text-[#f3ff00] font-[600] text-center font-poller
        absolute top-[50%] left-[50%] transofrm translate-x-[-50%] translate-y-[-50%]
      '
      >
        STARWARS <br /> ACTORS
      </h1>

      <div
        className='
        w-5 h-5 bg-white transform rotate-45
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
      <main className='bg-black text-white p-[2rem]'>
        <div
          className='
          max-w-[1000px] m-auto relative z-5
          flex flex-col gap-12
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
