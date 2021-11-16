import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import UserContext from "./Components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Components/Login";
import Entry from "./Components/Entry";
import HomePage from "./Components/Homepage";
import { ProtectedRoute } from "./Components/ProtectedRoute";

function App() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((response) => {
        setEmail(response.data.email);
      });
  }, []);

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <BrowserRouter>
        <Switch>
        <Route exact path={"/"} component={Entry} />
          <Route exact path={"/entry"} component={Entry} />
          <Route exact path={"/homepage"} component={HomePage} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
