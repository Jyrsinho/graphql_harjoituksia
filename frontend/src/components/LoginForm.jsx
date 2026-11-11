import {useState} from "react";
import {useMutation} from "@apollo/client/react";
import {LOGIN} from "../queries/mutations.js";

const LoginForm = ({setErrorMessage, setToken}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const token = data.login.value
            setToken(token)
            localStorage.setItem('phonebook-user-token', token)
        },
        onError: (error) => {
            setErrorMessage(error.message)
        }
    })

    const submit = (e) => {
        e.preventDefault();
        login({variables: {username, password}})
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h3>login:</h3>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
            }} onSubmit={submit}>
                <div>
                    <label>username:
                        <input type={"text"} name={"username"} value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>password:
                        <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                </div>
                <button type={"submit"}>login</button>
            </form>
        </div>
    )
}
export default LoginForm;