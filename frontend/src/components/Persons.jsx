import {useState} from "react";
import {useQuery} from "@apollo/client/react";
import Person from "./Person.jsx";
import {FIND_PERSON} from "../queries/queries.js";

export function Persons({persons}) {
    const [nameToSearch, setNameToSearch] = useState(null)
    const result = useQuery(FIND_PERSON, {
        variables: {nameToSearch},
        skip: !nameToSearch
    });
    
    console.log('Persons')
    console.log('nameToSearch ',nameToSearch)
    console.log('result - ', result)

    if (nameToSearch && result.data) {
        return (
            <Person person={result.data.findPerson} onClose={() => setNameToSearch(null)}/>
        )
    }

    return (
        <div>
            {persons.map((person) => (
                <div key={person.id}>
                    <p>{person.name}: {person.phone}</p>
                    <button onClick={() => setNameToSearch(person.name)}>show address</button>
                </div>
            ))}
        </div>
    )
}

export default Persons