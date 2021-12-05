import React from 'react'
import Register from './Register'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './Login'



function Entry() {
  const [userName, setUserName] = useState('')
  const [switchView, setSwitchView] = useState(true)

  function logout() {
    axios
      .post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then(() => setUserName(''))
  }

  useEffect(() => {
    //ensures the user is logged out on entry page
    axios
      .get('http://localhost:5000/user', { withCredentials: true })
      .then((response) => {
        setUserName(response.data.userName)
      })

    logout()
  }, [])

  function switchViewFunc() {
    //conditionally renders either Login or Register button based on button click
    let currentView = switchView
    setSwitchView(!currentView)
  }

  return (
    <div>
      <button style={{ marginBottom: '5px' }} onClick={() => switchViewFunc()}>
        <b>Switch</b> Login/Register{' '}
      </button>
      <div>
        {switchView && <Register />}
        {!switchView && <Login />}
      </div>
    </div>
  )
}

export default Entry
