import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './Components/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
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
    </div>
  );
}

export default App;
