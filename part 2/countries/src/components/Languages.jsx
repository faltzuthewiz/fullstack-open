const Languages = ({ languages}) => {

    return (
        <div>
            <h2>languages:</h2>
            <ul>
                {Object.entries(languages).map(([code, name]) => (
                    <li key={code}>{name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Languages