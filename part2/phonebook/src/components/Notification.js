const Notification = ({message, mode}) => {
    if (message === undefined) {
        return null
    }

    const positiveStyle = {
        color: 'lightgreen',
        backgroundColor: 'gray',
        padding: 0,
        border: 1,
        borderColor: 'green'
    }

    const negativeStyle = {
        color: 'crimson',
        backgroundColor: 'azure',
        padding: 0,
    }

    return (
        <div style={mode ? positiveStyle : negativeStyle}>
            <h2>{`${message}`}</h2>
        </div>
    )
}

export default Notification