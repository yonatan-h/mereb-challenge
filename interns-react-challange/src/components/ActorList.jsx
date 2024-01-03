import ActorCard from "./ActorCard"
import LoadingError from "./LoadingError"

export default function ActorList({ actors }) {
  const isEmpty = actors.length === 0

  if (isEmpty) return <LoadingError />

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
