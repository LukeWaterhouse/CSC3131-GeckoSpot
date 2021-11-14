import React from "react";
import Register from "./Register";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";

function Entry() {
  const [email, setEmail] = useState("");
  const [switchView, setSwitchView] = useState(true);

  function logout() {
    axios
      .post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then(() => setEmail(""));
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((response) => {
        setEmail(response.data.email);
      });

    logout();
  }, []);

  function switchViewFunc() {
    let currentView = switchView;
    setSwitchView(!currentView);
  }

  return (
    <div>
      <button onClick={() => switchViewFunc()}>Switch</button>
      <div>
        {switchView && <Register />}
        {!switchView && <Login />}
      </div>
    </div>
  );
}

export default Entry;
