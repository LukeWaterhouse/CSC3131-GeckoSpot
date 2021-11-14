import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import UserContext from "./Components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Components/Login";
function App() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((response) => {
        setEmail(response.data.email);
      });
  }, []);

  function logout() {
    axios
      .post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then(() => setEmail(""));
  }

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <BrowserRouter>
        <div>
          {!!email && (
            <div>
              <button onClick={() => logout()}>Logout</button>
              <div> Logged in as {email}</div>
            </div>
          )}
          {!email && <div>Not logged in</div>}
        </div>
        <div>
          <Link to={"/"}>Hodme</Link>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>

        <Switch>
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/login"} component={Login} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
