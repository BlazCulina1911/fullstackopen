const SearchFilter = ({func}) => {
    return (
        <div>
            Search contacts: <input onChange={func}/>
        </div>
    )
}

export default SearchFilter