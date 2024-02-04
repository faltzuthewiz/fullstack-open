const Filter = ({ onChange, value }) => {
    return (
        <>
        <p>find countries</p>
        <input type="search" value={value} onChange={onChange} autoFocus />
        </>
    )
}

export default Filter