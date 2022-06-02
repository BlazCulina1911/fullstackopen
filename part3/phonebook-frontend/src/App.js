import {useEffect, useState} from "react";
import personService from "./services/personsService"
import InputForm from "./components/InputForm"
import Phonebook from "./components/Phonebook";
import SearchFilter from "./components/SearchFilter";
import Notification from "./components/Notification";
import personsService from "./services/personsService";

function App() {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")
    const [notificationObject, setNotificationObject] = useState(null)

    //Short functions for handling state changes
    const handleNameChange = (event) => setNewName(event.target.value);
    const handlePhoneChange = (event) => setNewNumber(event.target.value);
    const handleFilterChange = (event) => setFilter(event.target.value)

    //simple hook to load up people from the backend
    const hook = () => {
        personService.getAll()
            .then(request => setPersons(request))
    }

    useEffect(hook, [])

    /* AddNewPerson mechanism (works for updating too)
     * It's not really readable so I'll explain how it works 
     * 
     * The function is called when the "add" button is pressed
     * 
     * Data is placed in an object, but before proceeding it checks if a person with that name exists already
     * If it exists, then the function sends a PUT request to the backend with results in updating the number of the person
     * 
     * If the person doesn't exist the function sends a POST request to the backend which results in creating the person
     * 
     * The function also triggers a notification display with an appropriate message
     */
    const addNewPerson = (event) => {
        event.preventDefault();

        const newPersonObject = {name: newName, number: newNumber}
        const personFound = persons.find(p => p.name === newName)

        if(personFound){
            personsService.update(newPersonObject, personFound.id)
            .then((personFromServer) => {
                const updatedPersonIndex = persons.map(p => p.id).indexOf(personFound.id)
                const newPersons = persons.concat()
                newPersons[updatedPersonIndex] = personFromServer
                setPersons(newPersons)
                setNotificationObject({
                    message: `Updated ${personFromServer.name}'s number to ${personFromServer.number}`,
                    mode: true
                })
                setTimeout(() => {
                    setNotificationObject(null)
                }, 5000)
            })
        } else {

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
            }).catch(error => {
                setNotificationObject({
                    message: error.response.data.error,
                    mode: false
                })
                setTimeout(() => {
                    setNotificationObject(null)
                }, 5000)
            })
        }
    }

    /* deletePerson mechanism
     * 
     * The function is called when the "delete" button is pressed under a person
     * 
     * Before deleting the person, his data is temporarily saved into an object 'deletedPerson' so his data can be displayed after deletion
     * 
     * The function does a DELETE request to the backend which results in deleting the person from the database
     * If database sends an error, it's usually because that persons data has been already deleted in an another tab of the application
     * 
     * The function also triggers a notification display with an appropriate message
     */
    const deletePerson = (id) => {
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

    /* filteredPersons variable
     * 
     * Stores people that are supposed to be shown on the screen depending on the search input
     * 
     * If search input is empty; all people are shown
     * in other case, it takes the phrase from the input and shows names that include the phrase
     * -> case insensitive
     */
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
        <Phonebook filteredPersons={filteredPersons} deleteFunction={deletePerson}/>

    </div>);
}

export default App;
