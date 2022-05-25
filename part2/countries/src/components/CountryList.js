const CountryList = ({filter, countries, setDisplayCountry}) => {
    if (countries === undefined) return <></>
    const array = () => {
        if (filter === '')
            return ["Type in a country"]

        const filteredCountries = countries.filter(
            country => country.name.common.toLowerCase().includes(filter.toLowerCase())
        )
        if (filteredCountries.length > 10) {
            setDisplayCountry(undefined)
            return ["Too many country names match this string"]
        }
        if (filteredCountries.length === 0) {
            setDisplayCountry(undefined)
            return ["No country matches this string"]
        }
        if (filteredCountries.length === 1) {
            setDisplayCountry(filteredCountries[0])
            return
        }
        return filteredCountries.map(
            country => <p key={country.name.common}>{country.name.common}
                <button onClick={() => setDisplayCountry(country)}>show data</button>
            </p>
        )
    }

    return (
        <div>
            {array()}
        </div>
    )
}

export default CountryList