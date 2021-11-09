import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './Components/Register';
import UserContext from './Components/UserContext';
import { useState } from 'react';

function App() {

  const [email, setEmail] = useState('')

  return (
      <UserContext.Provider value={{email, setEmail}}>
        <BrowserRouter>
        <div>
          {!!email && (
            <div> Logged in as {email}</div>
          )}
          {!email && (
            <div>Not logged in</div>
          )}
        </div>
        <div>
          <Link to={'/'}>Hodme</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
        </div>

        <Switch>
          <Route exact path={'/register'} component={Register}>
          </Route>
        </Switch>
      </BrowserRouter>
      </UserContext.Provider>
      
  );
}

export default App;
