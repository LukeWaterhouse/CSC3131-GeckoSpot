import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import "../Css/Register.css";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [isFieldBlank, setIsFieldBlank] = useState(false);

  const user = useContext(UserContext);
  let history = useHistory();

  function loginUser(e) {
    e.preventDefault();

    if (email == "" || password == "") {
      setIsFieldBlank(true);
    } else {
      setIsFieldBlank(false);

      const data = { email, password };
      axios
        .post("http://localhost:5000/login", data, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          console.log("Posted!");

          if (response.data === "noEmail") {
            setPasswordError(false);
            setEmailError(true);
          } else {
            user.setEmail(response.data.email);
            setEmail("");
            setPassword("");
            setPasswordError(false);
            setEmailError(false);
            history.push("/homepage");
          }
        })
        .catch(() => {
          setPasswordError(true);
          setEmailError(false);
        });
    }
  }

  return (
    <div className="container">
      <h3>Welcome to GeckoSpot</h3>
      <h4>Login</h4>
      <form action="" onSubmit={(e) => loginUser(e)}>
        {isFieldBlank && (
          <div style={{ color: "red" }}>Please fill out both fields!</div>
        )}

        {passwordError && (
          <div style={{ color: "red" }}>Password incorrect!</div>
        )}
        {emailError && (
          <div style={{ color: "red" }}>Email does not exist!</div>
        )}
        <div style={{ color: "white" }}>Email: </div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <div style={{ color: "white", paddingTop: "10px" }}>Password</div>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button className="btn-1" type="submit">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
