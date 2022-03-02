import { useState, useContext } from 'react'
import axios from 'axios'
import UserContext from './UserContext'
import '../Css/Register.css'
import { useHistory } from 'react-router-dom'

function Register() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [userNameExists, setuserNameExists] = useState(false)

  const [isFieldBlank, setIsFieldBlank] = useState(false)

  const user = useContext(UserContext)
  let history = useHistory()

  function registerUser(e) {
    e.preventDefault()

    //sets error message if register fields are blank
    if (userName === '' || password == '') {
      setIsFieldBlank(true)
    } else {
      setIsFieldBlank(false)

      //sends request to backend to store new user if they don't exist
      const data = { userName, password }
      axios
        .post('http://localhost:5000/register', data, { withCredentials: true })
        .then((response) => {
          console.log(response.data)
          if (response.data === 'userNameExists') {
            setuserNameExists(true)
          } else {
            console.log('Posted!')
            user.setUserName(response.data.userName)
            setUserName('')
            setPassword('')
            setuserNameExists(false)
            history.push('/homepage')
          }
        })
    }
  }

  return (
    <div className="container">
      <h3>Welcome to Data House</h3>
      <h4>Register</h4>
      <form action="" onSubmit={(e) => registerUser(e)}>
        {isFieldBlank && (
          <div style={{ color: 'red' }}>Please fill out both fields!</div>
        )}
        {userNameExists && (
          <div style={{ color: 'red' }}>Username already exists!</div>
        )}

        <div style={{ color: 'white' }}>Username: </div>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          maxLength="15"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />

        <div style={{ color: 'white', paddingTop: '10px' }}>Password</div>
        <input
          type="password"
          placeholder="password"
          value={password}
          maxLength="20"
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
            REGISTER
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
