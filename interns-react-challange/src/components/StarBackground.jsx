import { useState } from 'react'
import { useEffect } from 'react'

function getStartPositions(count) {
  const starPositions = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 100)
    const y = Math.floor(Math.random() * 200)
    starPositions.push({ x, y })
  }
  return starPositions
}

export default function StarBackground({ count = 100 }) {
  const [offset, setOffset] = useState(0)
  const [starPositions, setStarPositions] = useState(getStartPositions(count))

  useEffect(() => {
    const handleScroll = () => setOffset(-window.scrollY / 15)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='fixed top-0 left-0 w-screen h-[150vh]'>
      <div className='relative w-full h-full transition-all'>
        {starPositions.map(({ x, y }, i) => (
          <div
            data-testid='star'
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
  )
}
