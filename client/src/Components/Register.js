import {useState} from 'react';
import axios from 'axios';

function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function registerUser(e) {
        e.preventDefault();
        const data = {email, password}
        axios.post('http://localhost:5000/register', data, {withCredentials:true}).then(() => {
            console.log("Posted!")
        })
    }

    return(
        <div>
            <h2>Register</h2>
            <form action="" onSubmit={e => registerUser(e)}>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <button type="submit">register</button>
            </form>
        </div>
    )
}

export default Register; 