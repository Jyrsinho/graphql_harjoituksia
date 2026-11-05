const Person = ({person, onClose}) =>{

    return (
        <div>
            <div>{person.name}</div>
            <div>{person.phone}</div>
            <div>{person.address.street}</div>
            <div>{person.address.city}</div>
            <button onClick={onClose}>close</button>
        </div>
    )
}

export default Person