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

function HomePage() {


  const user = useContext(UserContext);
  


  let history = useHistory();

  useEffect(() => {
      axios
        .get("http://localhost:5000/user", { withCredentials: true })
        .then((response) => {
          user.setUserName(response.data.userName);         
          console.log(response.data.userName)             
        }).catch((error) => {
          console.log(error)
          history.push("/entry");
        });  
  }, []);


  function logout() {
    axios
      .post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then(() => user.setUserName(""));

    history.push("/entry");
  }

  return (
    <div className="rootClass">
      <NavigationBar />
      <div>
        {!!user.userName && (
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
                Logged in as {user.userName}
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
        {!user.userName && <div>Not Logged in</div>}
      </div>
      <ColoredLine color="white"/>
      <h1 style={{color: 'white', display: 'flex', justifyContent:'center', paddingTop: '30px', fontWeight: '400' }}><u>Welcome to GeckSpot!</u></h1>
      <div style={{color: 'white', paddingTop: '30px', marginRight: '15%', marginLeft: '15%' }}>
      GeckoSpot is an online community of people that love geckos! Check out your profile section 
      to customize your own gecko avatar. This could be a gecko you own as a pet, or perhaps just a 
      fantasy gecko that you really like. You can also hop on the forum and discuss your love of geckos 
      with the rest of the community!
      </div>

      <div style={{display: 'flex', justifyContent: 'center', paddingTop: '30px'}}>
      <img src="/GeckoFace.jpeg" alt="" className="img-fluid" style={{zIndex: '1'}}/>
      </div>


    </div>
  );
}

export default HomePage;