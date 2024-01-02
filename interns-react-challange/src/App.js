import logo from './logo.svg'
import './App.css'
import actors from './actors'

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

function App() {
  return (
    <main>
      <ActorList actors={actors} />
    </main>
  )
}

export default App
