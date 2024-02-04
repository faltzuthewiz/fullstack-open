const Weather = ({ country, weatherInfo }) => {
    
    if (weatherInfo === null) {
        return (
            <></>
        )
    } else {
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`
        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>temperature {weatherInfo.main.temp} Celcius</p>
                <img src={weatherIconUrl} alt={weatherInfo.weather[0].description} />
                <p>wind {weatherInfo.wind.speed} m/s</p>
            </div>
        )
    }
    
}

export default Weather