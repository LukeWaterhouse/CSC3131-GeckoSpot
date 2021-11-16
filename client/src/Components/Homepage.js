import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
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
        })  
  }, []);


  useEffect(()=>{
    console.log(email)
  }, [email])


  function logout() {
    axios
      .post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then(() => setEmail(""));

    history.push("/entry");
  }


  return (
    <div className="rootClass">
      <NavigationBar />
      <div>
        {!!email && (
          <div className="row">
            <div className="column">
              <div
                style={{
                  color: "white",
                  fontSize: "25px",
                  alignSelf: "start",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                }}
              >
                Logged in as {email}
              </div>
            </div>

            <div className="column">
              <div style={{ alignSelf: "end", padding: "10px" }}>
                <button className="btn-1" onClick={() => logout()}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        {!email && <div>Not Logged in</div>}
      </div>
      Home
    </div>
  );
}

export default HomePage;
