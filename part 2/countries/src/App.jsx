import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Results from './components/Results'
import Filter from './components/Filter'

function App() {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  const [filterName, setFilterName] = useState('')

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setCountries(response.data)
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

  const handleShowButton = (name) => {
    const searchUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
   // console.log(name)
    console.log(searchUrl)

    const filteredCountry = countries.find((country) => {
      return country.name.common.toLowerCase() === name.toLowerCase()
    })
    setCountriesToShow(filteredCountry)
    
    console.log("this is the filtered country", filteredCountry)

    /*
    const [countriesToShow, setCountriesToShow] = useState([])

    useEffect(() => {
      fetch(searchUrl)
        .then((response) => response.json())
        .then(actualData => {
          setCountriesToShow(actualData)
        })
    }, [searchUrl])
    */
  }

  return (
    <>
      <Filter onChange={handleCountryFilter} value={filterName} />
      <Results countries={countriesToShow} showbtn={handleShowButton}/>
    </>
  )
}

export default App
