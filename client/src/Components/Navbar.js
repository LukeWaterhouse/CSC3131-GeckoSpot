import { React, useState, useContext } from 'react'
import UserContext from './UserContext'
import '../Css/navigation.css'

function NavigationBar() {
  const [homeView, setHomeView] = useState('Home')

  const user = useContext(UserContext)

  function setViewFunc() {
    user.setHomeView(!homeView)
  }

  return (
    <div>
      <nav
        className="navbar"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div className="navbar-links">
          <div style={{ paddingLeft: '50%' }}>
            <ul>
              <li>
                <a href="/homepage">HOME</a>
              </li>
              <li>
                <a href="/forum"> FORUM</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar
