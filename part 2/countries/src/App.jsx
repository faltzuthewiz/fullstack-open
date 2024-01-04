import { useEffect, useState } from 'react'
import './App.css'
import Results from './components/Results'
import Filter from './components/Filter'

function App() {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  const [filterName, setFilterName] = useState('')

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then(actualData => {
        setCountries(actualData)
        setCountriesToShow(null)
      })
  }, [])

  const handleCountryFilter = (event) => {
    const keyword = event.target.value

    if (keyword !== '') {
      const results = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(keyword.toLowerCase())
      })
      setCountriesToShow(results)
    } else {
      setCountriesToShow(countries)
    }
    if (keyword === '') {
      setCountriesToShow(null)
    }

    setFilterName(keyword)
  }

  return (
    <>
      <Filter onChange={handleCountryFilter} value={filterName} />
      <Results countries={countriesToShow} />
    </>
  )
}

export default App
