import {gql} from '@apollo/client'

export const EDIT_NUMBER = gql`
    mutation editNumber($name: String!, $phone: String! ) {
        editNumber(name: $name, phone: $phone) {
            name
            phone
            address {
                street
                city
            }
            id
        }
    }
`

export const CREATE_PERSON = gql`
mutation CreatePerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String!
) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone ) {
        name
        phone
        id
        address {
            street
            city
        }
}}`
