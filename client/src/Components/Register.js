import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import "../Css/Register.css";
import { useHistory } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const user = useContext(UserContext);
  let history = useHistory();

  function registerUser(e) {
    e.preventDefault();
    const data = { email, password };
    axios
      .post("http://localhost:5000/register", data, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data === "emailExists") {
          setEmailExists(true);
        } else {
          console.log("Posted!");
          user.setEmail(response.data.email);
          setEmail("");
          setPassword("");
          setEmailExists(false);
          history.push("/homepage");
        }
      });
  }

  return (
    <div className="container">
      <h3>Welcome to GeckoSpot</h3>
      <h4>Register</h4>
      <form action="" onSubmit={(e) => registerUser(e)}>
        {emailExists && (
          <div style={{ color: "red" }}>Email already exists!</div>
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
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
