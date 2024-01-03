export default async function getActors() {
  const res = await fetch('https://swapi.dev/api/people/')
  const data = await res.json()
  const actors = data.results.map(
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
      const nullify = (value) => {
        const isNullish = ['n/a', 'unknown'].includes(value)
        return isNullish ? null : value
      }

      const homeId = homeworld.match(/\d+/)[0]
      const homeUrl = `https://starwars-visualguide.com/assets/img/planets/${homeId}.jpg`

      const id = url.match(/\d+/)[0]
      const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`

      const filmUrls = films.map((film) => {
        const id = film.match(/\d+/)[0]
        return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`
      })

      const hairColor = nullify(hair_color)
      const skinColor = nullify(skin_color)
      const birthYear = nullify(birth_year)
      height = nullify(height)
      mass = nullify(mass)
      gender = nullify(gender)

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

  return actors
}
