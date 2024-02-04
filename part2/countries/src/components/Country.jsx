import Languages from "./Languages"
import Weather from "./Weather"
import { useState } from "react"
import axios from "axios"

const Country = ({ country }) => {
  
    const [weatherInfo, setWeatherInfo] = useState(null)
    const api_key = import.meta.env.VITE_APIKEY
    const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0].toLowerCase()}&appid=${api_key}&units=metric`

    if (weatherInfo === null) {
        axios
            .get(searchUrl)
            .then(response => {
                setWeatherInfo(response.data)
            })
            .catch(error =>
                console.log(error)
            )
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <Languages languages={country.languages}/>
            <img src={country.flags.png} alt={country.flags.alt} />
            <Weather country={country} weatherInfo={weatherInfo} />
        </div>
    )
}

export default Country