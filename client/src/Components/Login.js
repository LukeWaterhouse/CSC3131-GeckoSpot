import { useState, useContext } from 'react'
import axios from 'axios'
import UserContext from './UserContext'
import '../Css/Register.css'
import { useHistory } from 'react-router-dom'

function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [userNameError, setUserNameError] = useState(false)

  const [isFieldBlank, setIsFieldBlank] = useState(false)

  const user = useContext(UserContext)
  let history = useHistory()

  function loginUser(e) {
    e.preventDefault()

    if (userName == '' || password == '') {
      setIsFieldBlank(true)
      setPasswordError(false)
      setUserNameError(false)
    } else {
      setIsFieldBlank(false)

      const data = { userName, password }
      axios
        .post('http://localhost:5000/login', data, { withCredentials: true })
        .then((response) => {
          console.log(response.data)
          console.log('Posted!')

          if (response.data === 'noUserName') {
            setPasswordError(false)
            setUserNameError(true)
          } else {
            user.setUserName(response.data.userName)
            setUserName('')
            setPassword('')
            setPasswordError(false)
            setUserNameError(false)
            history.push('/homepage')
          }
        })
        .catch(() => {
          setPasswordError(true)
          setUserNameError(false)
        })
    }
  }

  return (
    <div className="container">
      <h3>Welcome to Data House</h3>
      <h4>Login</h4>
      <form action="" onSubmit={(e) => loginUser(e)}>
        <div>
          {isFieldBlank && (
            <div style={{ color: 'red' }}>Please fill out both fields!</div>
          )}

          {passwordError && (
            <div style={{ color: 'red' }}>Password incorrect!</div>
          )}
          {userNameError && (
            <div style={{ color: 'red' }}>Username does not exist!</div>
          )}
        </div>

        <div style={{ color: 'white' }}>Username: </div>
        <input
          type="text"
          id="usernameInput"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <div style={{ color: 'white', paddingTop: '10px' }}>Password</div>
        <input
          type="password"
          id="passwordInput"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div
          style={{
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <button className="btn-1" type="submit">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
