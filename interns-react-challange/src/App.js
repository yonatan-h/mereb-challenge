import logo from './logo.svg'
import './App.css'
import actors from './actors'
import { FiArrowDownRight } from 'react-icons/fi'
import { FaGalacticRepublic } from 'react-icons/fa'
import { FaRebel } from 'react-icons/fa'

function ActorList({ actors }) {
  return (
    <ul>
      {actors.map((actor) => (
        <ActorCard key={actor.name} {...actor} />
      ))}
    </ul>
  )
}

function ActorCard({ name, height, birthYear, detail }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Height: {height}</p>
      <p>Birth Year: {birthYear}</p>
      <p>Detail: {detail}</p>
    </div>
  )
}

function Star({ x, y }) {
  return (
    <div
      className='fixed w-[2px] h-[2px] bg-white'
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
      className={`
      p-[2rem] bg-[#0c09298a] h-[60vh]
      grid grid-cols-2 relative
    `}
    >
      <div className='outline outline-1 outline-[#4141417a] flex'></div>
      <div className='outline outline-1 outline-[#4141417a]'></div>
      <div className='outline outline-1 outline-[#4141417a]'></div>
      <div className='outline outline-1 outline-[#4141417a]'></div>
      <h1
        className={`
        outline outline-2 outline-[#414141] p-[2rem] bg-[#060516]
        text-4xl text-[#f3ff00] font-[600] text-center
        absolute top-[50%] left-[50%] transofrm translate-x-[-50%] translate-y-[-50%]
      `}
      >
        THE FORCE <br /> IS CALLING <br /> TO YOU
      </h1>

      <div
        className={`
        w-5 h-5 bg-white transform rotate-45
        transofrm translate-x-[-50%] translate-y-[-50%]
        absolute bottom-[10%] left-[50%]
        flex items-center justify-center
      `}
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
      <main className='bg-black text-white px-[2rem] '>
        <div className='max-w-[1400px] m-auto relative z-5'>
          <Hero />
          <ActorList actors={actors} />
        </div>
      </main>
    </>
  )
}

export default App
