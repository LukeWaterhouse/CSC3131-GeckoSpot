import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Register from "./Register";
import UserContext from "./UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import { useHistory } from "react-router-dom";
import NavigationBar from "./Navbar";
import "../Css/homepage.css";

function HomePage() {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [switchView, setSwitchView] = useState(true);

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

    history.push("/entry");
  }

  return (
    <div className="rootClass">
        <NavigationBar/>
      <div>
        {!!email && (
          <div>
            <button onClick={() => logout()}>Logout</button>
            <div> Logged in as {email}</div>
          </div>
        )}
        {!email && <div>Not Logged in</div>}
      </div>
      Home
    </div>
  );
}

export default HomePage;
