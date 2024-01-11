const Countries = ({ countries, showbtn }) => {

    console.log(showbtn)
    
    return (
        <ul>
            {countries.map(country => 
                <li key={country.name.common}>{country.name.common} <span></span>
                <button onClick={() => showbtn(country.name.common)}>show</button>
                </li>
            )}
        </ul>
    )
}

export default Countries
