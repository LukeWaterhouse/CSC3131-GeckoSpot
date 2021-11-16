import React, { Component, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

export const ProtectedRoute = ({ component: Component, ...rest }) => {


    const [email, setEmail] = useState("");


    useEffect(() => {

        axios
          .get("http://localhost:5000/user", { withCredentials: true })
          .then((response) => {
            setEmail(response.data.email);
          });
      
    }, []);


    useEffect(() => {

        console.log("Email changed: ", email)

      
    }, [email]);



  return (
    <Route
      {...rest}
      render={(props) => {
          if(!email){
              console.log("uhoh")
            return <Redirect to={
                {
                  pathname: "/",
                  state: {
                      from: props.location
                  }

                }
                

            }/>
            
          }else{
              console.log("yay")
            return <Component {...props} />;
              
          }
      }}
    />
  );
};


