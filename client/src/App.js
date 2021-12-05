import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Register from './Components/Register'
import UserContext from './Components/UserContext'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './Components/Login'
import Entry from './Components/Entry'
import HomePage from './Components/Homepage'
import Forum from './Components/Forum'

function App() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:5000/user', { withCredentials: true })
      .then((response) => {
        setUserName(response.data.userName)
      })
  }, [])

  //using context to globally access and change usename

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Entry} />
          <Route exact path={'/entry'} component={Entry} />
          <Route exact path={'/homepage'} component={HomePage} />
          <Route exact path={'/forum'} component={Forum} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
