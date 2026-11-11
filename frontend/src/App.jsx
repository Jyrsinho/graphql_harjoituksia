import {useApolloClient, useQuery} from '@apollo/client/react'
import {Persons} from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import {ALL_PERSONS} from "./queries/queries.js";
import {useState} from "react";
import Notification from "./components/Notification.jsx";
import PhoneForm from "./components/PhoneForm.jsx";
import LoginForm from "./components/LoginForm.jsx";

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('phonebook-user-token'));
    const client = useApolloClient();

    const result = useQuery(ALL_PERSONS )
    console.log('result- ', result)
    if (result.loading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    function handleLogOut() {
        console.log('handling logout')
        setToken(null)
        localStorage.clear()
        client.resetStore()

    }

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    if (!token) {
        return (
            <div>
                <Notification notification={errorMessage}/>
                <LoginForm setErrorMessage={setErrorMessage} setToken={setToken}/>
            </div>
        )
    }


    return (
        <div>
            <button onClick={handleLogOut}>logout</button>
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={notify}/>
            <PhoneForm  setError={notify}/>
            <Notification notification={errorMessage}/>
        </div>
    )
}

export default App
