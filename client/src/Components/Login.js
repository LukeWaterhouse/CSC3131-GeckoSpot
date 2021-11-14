import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from './UserContext';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const user = useContext(UserContext)

    function loginUser(e) {
        e.preventDefault();
        const data = {email, password}
        axios.post('http://localhost:5000/login', data, {withCredentials:true}).then(response => {
            console.log(response.data)
            console.log("Posted!")
            if(response.data === "noEmail"){
                setPasswordError(false)
                setEmailError(true)
            }else{
                user.setEmail(response.data.email)
            setEmail('')
            setPassword('')
            setPasswordError(false)
            setEmailError(false)


            }
            
        }).catch(() => {
            setPasswordError(true);
            setEmailError(false)
        })
    }

    return(
        <div>
            <h2>Login</h2>
            <form action="" onSubmit={e => loginUser(e)}>
                {passwordError && (
                    <div>Password incorrect!</div>
                )}
                {emailError && (
                    <div>Email does not exist!</div>
                )}
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login; 