import {useQuery} from '@apollo/client/react'
import {Persons} from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import {ALL_PERSONS} from "./queries/queries.js";

const App = () => {

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
            <PersonForm/>
        </div>
    )
}

export default App
