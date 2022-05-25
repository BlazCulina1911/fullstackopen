import {useState, useEffect} from "react";
import axios from "axios";
import personService from "./services/personsService"
import InputForm from "./components/InputForm"
import Phonebook from "./components/Phonebook";
import SearchFilter from "./components/SearchFilter";

function App() {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")

    const handleNameChange = (event) => setNewName(event.target.value);
    const handlePhoneChange = (event) => setNewNumber(event.target.value);
    const handleFilterChange = (event) => setFilter(event.target.value)

    const hook = () => {
        personService.getAll()
            .then(request => setPersons(request))
    }

    useEffect(hook, [])

    const addNewPerson = (event) => {
        event.preventDefault();

        const newPersonObject = {name: newName, number: newNumber}
        const personNames = persons.map(p => p.name)

        console.log(personNames)

        if (personNames.includes(newName)) {
            const id = persons.find(p => p.name === newName).id
            personService.update(newPersonObject, id)
                .then(data => setPersons(
                    persons.slice(0, persons.length - 1)
                        .concat(data)
                ))
            return
        }

        personService.create(newPersonObject)
            .then(data => setPersons(persons.concat(data)))
    }

    const deleteFunction = (id) => {
        personService
            .remove(id)
            .then(() => {
                personService.getAll()
                    .then(request => setPersons(request))
            })
    }

    const filteredPersons = filter ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : persons

    return (<div>

        <h1>Phonebook</h1>

        <h2>add a new person</h2>

        <InputForm addNewPerson={addNewPerson} handleNameChange={handleNameChange}
                   handlePhoneChange={handlePhoneChange}/>

        <h2>Contacts</h2>

        <SearchFilter func={handleFilterChange}/>
        <br/>
        <Phonebook filteredPersons={filteredPersons} deleteFunction={deleteFunction}/>

    </div>);
}

export default App;
