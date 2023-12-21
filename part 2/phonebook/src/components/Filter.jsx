const Filter = ({ onChange, value }) => {
    
    return (
        <p>filter shown with <input type="search" value={value} onChange={onChange}/> </p>
    )
}

export default Filter