import { React, useContext } from "react";
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
  const user = useContext(UserContext);

  let history = useHistory();

  const [switchView, setSwitchView] = useState(true);

  useEffect(() => {
      axios
        .get("http://localhost:5000/user", { withCredentials: true })
        .then((response) => {
          user.setEmail(response.data.email);  
           
        })  
  }, []);


  //sends back to entry if trying to access homepage without logging in
  useEffect(()=>{
    console.log(user.email)
    if(!user.email){
      history.push("/entry");

    }  
  }, [user.email])


  function logout() {
    axios
      .post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then(() => user.setEmail(""));

    history.push("/entry");
  }


  return (
    <div className="rootClass">
      <NavigationBar />
      <div>
        {!!user.email && (
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
                Logged in as {user.email}
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
        {!user.email && <div>Not Logged in</div>}
      </div>
      Home
    </div>
  );
}

export default HomePage;
