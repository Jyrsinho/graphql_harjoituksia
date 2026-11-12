import useField from "../hooks/useField.js";
import {useMutation} from "@apollo/client/react";
import {ALL_PERSONS } from "../queries/queries.js";
import {CREATE_PERSON} from "../queries/mutations.js";

const PersonForm = ({setError}) => {
    const [name, resetName] = useField("text", 'name')
    const [street, resetStreet] = useField('text', 'street')
    const [city, resetCity] = useField('text', 'city')
    const [phone, resetPhone] = useField('text', 'phone')

    const [createPerson] = useMutation(CREATE_PERSON, {
        onError: (error) => {setError(error.message)},
        update: (cache, response) => {
            cache.updateQuery({query: ALL_PERSONS}, ({allPersons}) => {
                return {allPersons: allPersons.concat(response.data.addPerson)}
            })
        }
    })

    const submit = (e) => {
        e.preventDefault()
        try {
            createPerson({
                variables: {
                    name: name.value,
                    street: street.value,
                    city: city.value,
                    phone: phone.length > 0 ? phone.value : undefined
                }})
            resetName()
            resetStreet()
            resetCity()
            resetPhone()
        }catch(err) {
            console.log(err)
        }
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