const Display = ({displayCountry}) => {
    if(displayCountry === undefined)
        return <></>
    return (
        <div>
            <h1>{displayCountry.name.common}</h1>
            <p>capital: {displayCountry.capital}</p>
            <p>area: {displayCountry.area}</p>
            <h2>languages:</h2>
            <ol>
                {Object.values(displayCountry.languages).map(language => <li key={language}>{language}</li>)}
            </ol>
            <div>
                <img src={displayCountry.flags.png} alt={"flag of " + displayCountry.name.common}/>
            </div>
        </div>
    )
}

export default Display