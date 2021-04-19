import { ErrorType, LocationType, RootDataType } from './types'

const apiKey = process.env.REACT_APP_API_KEY

export const fetchData = async (query: string) => {
  const location: LocationType[] = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=20&appid=${apiKey}`
  )
    .then(res => {
      return res.json()
    })
    .catch(err => console.error(err.message))

  if (!!location.length) {
    const { lon, lat } = location[0]

    const data: RootDataType | ErrorType = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=deyly&units=metric&appid=${apiKey}`
    )
      .then(res => {
        return res.json()
      })
      .catch(err => console.error(err.message))
    return data
  }
  return location
}
