/*
Create a new component PhoneForm in the file src/components/PhoneForm.jsx for updating a phone number.
The component adds a form to the application where you can enter a new phone number for a selected person.
 */

import useField from "../hooks/useField.js";
import {useMutation} from "@apollo/client/react";
import {EDIT_NUMBER} from "../queries/mutations.js";

const PhoneForm = ({setError}) => {
    const [name, resetName] = useField('text', 'name')
    const [phone, resetPhone] = useField('text', 'phone')

    const [changeNumber] = useMutation(EDIT_NUMBER, {
        onCompleted: (data) => {
            console.log('mutationdata- ',data)
            if (!data.editNumber) {
                setError('person not found')
            }
        }
    })

    const submit = (e) => {
        e.preventDefault()
        changeNumber({variables: {name: name.value, phone: phone.value}})
        resetPhone()
        resetName()
    }

    return (
        <div>
            <h3>update phonenumber</h3>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
            }} onSubmit={(e) => submit(e)}>
                <label>{name.label}<input {...name}></input></label>
                <label>{phone.label}<input {...phone}></input></label>
                <button type={"submit"}>update phonenumber</button>
            </form>
        </div>
    )
}

export default PhoneForm