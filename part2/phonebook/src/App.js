import { useState } from "react";
import InputForm from "./components/InputForm"
import Phonebook from "./components/Phonebook";
import SearchFilter from "./components/SearchFilter";
function App() {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: "Blaž Čulina",
      phone: "063969360",
    },
    {
      id: 2,
      name: "Marko Marinović",
      phone: "063969360",
    },
    {
      id: 3,
      name: "Martina Vladić",
      phone: "063969360",
    }
  ]);
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [filter, setFilter] = useState("")

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addNewPerson = (event) => {
    event.preventDefault();

    const personIds = persons.map((p) => p.id);
    const personObject = {
      name: newName,
      phone: newPhone,
    };
    //Converting objects to JSON format for object comparison
    //There must exist a better way! :(
    const stringifiedObject = JSON.stringify(personObject);
    const stringifiedPersons = persons.map((p) => JSON.stringify(
      { //Removed id from comparison
        name: p.name,
        phone: p.phone
      }))

    if (stringifiedPersons.includes(stringifiedObject)) {
      alert(`${personObject.name} is already added to phonebook`)
      return
    }
      personObject.id = personIds.length
        ? personIds[personIds.length - 1] + 1
        : 0;
      setPersons(persons.concat(personObject))
  }

  const filteredPersons = filter ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>

      <h1>Phonebook</h1>

      <h2>add a new person</h2>

      <InputForm addNewPerson={addNewPerson} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>

      <h2>Contacts</h2>

      <SearchFilter func={handleFilterChange}/>
      <br />
      <Phonebook filteredPersons={filteredPersons}/>

    </div>
  );
}

export default App;
