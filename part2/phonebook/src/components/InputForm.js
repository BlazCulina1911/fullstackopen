const InputForm = ({addNewPerson, handleNameChange, handlePhoneChange}) => {

    return (
        <form onSubmit={addNewPerson}>
            <div>
                name: <input onChange={handleNameChange}/>
            </div>
            <div>
                number: <input onChange={handlePhoneChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default InputForm