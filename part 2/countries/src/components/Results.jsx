import Countries from "./Countries"
import Country from "./Country"

const Results = ({countries, showbtn}) => {

    console.log(showbtn)

    if(countries === null) {
        return (
            <div>
                Find countries by typing the name of the country in the field.
            </div>
        )
    } else if 
     (countries.length > 10 ) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    } else if (countries.length > 1 && countries.length <= 10 ) {
        return (
            <Countries countries={countries} showbtn={showbtn}/>
        )
    } else {
        return (
            <div>
                No results. Try another keyword.
            </div>
        )
    }
}

export default Results