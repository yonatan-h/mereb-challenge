import './App.css'
import { useState, useEffect } from 'react'
import Loading from './components/Loading'
import ActorList from './components/ActorList'
import LoadingError from './components/LoadingError'
import StarBackground from './components/StarBackground'
import getActors from './services/get-actors'
import Hero from './components/Hero'

function App() {
  const [actors, setActors] = useState([])
  const fetchActors = async () => {
    try {
      setActors([])
      const actors = await getActors()
      setActors(actors)
    } catch (e) {
      setActors(null)
      console.error(e)
    }
  }
  useEffect(() => {
    fetchActors()
  }, [])

  const isError = actors === null
  const isLoading = actors?.length === 0
  const hasLoaded = actors?.length > 0

  return (
    <>
      <StarBackground />
      <main className='bg-black text-[#ffffff9c] p-6 min-h-screen'>
        <div
          className='
          max-w-[1000px] m-auto relative z-5
          flex flex-col gap-6
        '
        >
          <Hero />
          {isLoading && <Loading />}
          {hasLoaded && <ActorList actors={actors} />}
          {isError && <LoadingError refresh={fetchActors} />}
        </div>
      </main>
    </>
  )
}

export default App
