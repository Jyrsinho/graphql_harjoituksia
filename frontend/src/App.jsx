import {useQuery} from '@apollo/client/react'
import {Persons} from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import {ALL_PERSONS} from "./queries/queries.js";
import {useState} from "react";
import Notification from "./components/Notification.jsx";

const App = () => {
    const [error, setError] = useState(null);

    const result = useQuery(ALL_PERSONS )
    console.log('result- ', result)
    if (result.loading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    return (
        <div>
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={setError}/>
            <Notification notification={error}/>
        </div>
    )
}

export default App
