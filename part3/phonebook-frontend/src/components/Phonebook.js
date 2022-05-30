const Phonebook = ({filteredPersons, deleteFunction}) => {
    return (
        <div>
            {filteredPersons.map((person) => {
                return <li key={person.id}>{person.name}
                    <ul>
                        <li>{person.number}</li>
                    </ul>
                    <ul>
                        <button onClick={() => deleteFunction(person.id)}>delete</button>
                    </ul>
                </li>;
            })}
        </div>
    )
}

export default Phonebook