import {useQuery} from '@apollo/client/react'
import {Persons} from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import {ALL_PERSONS} from "./queries/queries.js";
import {useState} from "react";
import Notification from "./components/Notification.jsx";

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const result = useQuery(ALL_PERSONS )
    console.log('result- ', result)
    if (result.loading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    return (
        <div>
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={notify}/>
            <Notification notification={errorMessage}/>
        </div>
    )
}

export default App
