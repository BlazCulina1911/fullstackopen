const Phonebook = ({filteredPersons}) => {
    return (
        <div>
            {filteredPersons.map((person) => {
                return <li key={person.id}>{person.name}
                    <ul>
                        <li>{person.phone}</li>
                    </ul>
                </li>;
            })}
        </div>
    )
}

export default Phonebook