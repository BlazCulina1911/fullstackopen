import {useEffect, useState} from "react";
import personService from "./services/personsService"
import InputForm from "./components/InputForm"
import Phonebook from "./components/Phonebook";
import SearchFilter from "./components/SearchFilter";
import Notification from "./components/Notification";

function App() {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")
    const [notificationObject, setNotificationObject] = useState(null)

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

        if (personNames.includes(newName)) {
            const id = persons.find(p => p.name === newName).id
            personService.update(newPersonObject, id)
                .then(data => {
                    setPersons(persons.slice(0, -1)
                        .concat(data))
                    setNotificationObject({
                        message: `Changed ${data.name}'s number to '${data.number}'!`,
                        mode: true
                    })
                    setTimeout(() => {
                        setNotificationObject(null)
                    }, 5000)
                }).catch(error => {
                setPersons(persons.filter(p => p.name !== newName))
                setNotificationObject({
                    message: `Information of ${newName}' has been removed from server!`,
                    mode: false
                })
                setTimeout(() => {
                    setNotificationObject(null)
                }, 5000)
            })
            return
        }

        personService.create(newPersonObject)
            .then(data => {
                setPersons(persons.concat(data))
                setNotificationObject({
                    message: `Added ${data.name} to the phonebook!'`,
                    mode: true
                })
                setTimeout(() => {
                    setNotificationObject(null)
                }, 5000)
            })
    }

    const deleteFunction = (id) => {
        const deletedPerson = persons.find(p => p.id === id)
        personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== id))
                setNotificationObject({
                    message: `Deleted ${deletedPerson.name} from the phonebook server!'`,
                    mode: false
                })
                setTimeout(() => {
                    setNotificationObject(null)
                }, 5000)
            }).catch(error => {
                setPersons(persons.filter(p => p.id !== id))
                setNotificationObject({
                    message: `Information of '${deletedPerson.name}' has been removed from server!`,
                    mode: false
                })
            }
        )
    }

    const filteredPersons = filter ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : persons

    return (<div>

        <h1>Phonebook</h1>

        <Notification {...notificationObject}/>

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
