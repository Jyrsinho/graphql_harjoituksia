import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

function App() {

    const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`


  return (
    <>
    </>
  )
}

export default App
