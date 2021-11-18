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
import ColoredLine from "./Line";
import EnterPost from "./EnterPost";
import Post from "./Post";

function Forum() {
  const user = useContext(UserContext);

  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((response) => {
        user.setEmail(response.data.email);
        console.log(response.data.email);
      })
      .catch((error) => {
        console.log(error);
        history.push("/entry");
      });
  }, []);

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
      <ColoredLine color="white" />
      <h1
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          paddingTop: "30px",
          fontWeight: "400",
        }}
      >
        <u>Forum</u>
      </h1>

      <Post
        content="orem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
    esse cillum dolore eu fugiat nulla pariatur"
        date="10/23/21"
        userName="Luke"
      />
    </div>
  );
}

export default Forum;
