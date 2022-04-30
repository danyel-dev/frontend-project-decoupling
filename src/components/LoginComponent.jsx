import { useState } from "react";
import axios from 'axios';

import Core from '../Core'


export default function LoginComponent() {
    const [inputUsername, setInputUsername] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [token, setToken] = useState('')

    function HandleSubmit(event) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: inputUsername,
            password: inputPassword,
        }).then(response => {
            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
        })

        event.preventDefault()
    };

    function handleUsernameChange(event) {
        setInputUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setInputPassword(event.target.value)
    }

    if (!token) {
        return (
            <form onSubmit={HandleSubmit}>
                <label>
                    Username: 
                    <input type="text" value={inputUsername} onChange={handleUsernameChange} />
                </label>

                <label>
                    Password: 
                    <input type="password" value={inputPassword} onChange={handlePasswordChange} />
                </label>

                <button>Submit</button>
            </form>
        )    
    } else return <Core />
};
