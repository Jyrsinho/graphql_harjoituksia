import useField from "../hooks/useField.js";
import {useMutation} from "@apollo/client/react";
import {ALL_PERSONS, CREATE_PERSON} from "../queries/queries.js";

const PersonForm = () => {
    const [name, resetName] = useField("text", 'name')
    const [street, resetStreet] = useField('text', 'street')
    const [city, resetCity] = useField('text', 'city')
    const [phone, resetPhone] = useField('text', 'phone')

    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries: [{query: ALL_PERSONS}],
    })

    const submit = (e) => {
        e.preventDefault()
        createPerson({variables: {name: name.value, street: street.value, city: city.value, phone:phone.value}})

        resetName()
        resetStreet()
        resetCity()
        resetPhone()
    }

    return (
        <div>
            <h3>add person</h3>
            <form onSubmit={submit} style={ {
                display: 'flex',
                flexDirection: 'column',
            }}>
                <label>{name.label}<input {...name}/></label>
                <label>{street.label}<input {...street}/></label>
                <label>{city.label}<input {...city}/></label>
                <label>{phone.label}<input {...phone}/></label>
                <button type="submit">Add person</button>
            </form>
        </div>
    )
}

export default PersonForm