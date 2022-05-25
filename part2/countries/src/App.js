import {useEffect, useState} from "react"
import axios from 'axios'

import Input from './components/Input'
import Display from "./components/Display"
import CountryList from "./components/CountryList";

function App() {
    const [countries, setCountries] = useState(undefined)
    const [filter, setFilter] = useState('')
    const [displayCountry, setDisplayCountry] = useState(undefined)

    const handleFilterInput = (event) => setFilter(event.target.value)

    const hook = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => setCountries(response.data))
    }

    useEffect(hook, [])

    return (
        <div>
            <Input value={filter} handler={handleFilterInput}/>
            <CountryList countries={countries} filter={filter} setDisplayCountry={setDisplayCountry}/>
            <Display displayCountry={displayCountry}/>
        </div>
    );
}

export default App;
