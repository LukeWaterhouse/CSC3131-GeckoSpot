import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const user = useContext(UserContext);

  function registerUser(e) {
    e.preventDefault();
    const data = { email, password };
    axios
      .post("http://localhost:5000/register", data, { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        if (response.data === "emailExists") {
            setEmailExists(true);
        } else {
          console.log("Posted!");
          user.setEmail(response.data.email);
          setEmail("");
          setPassword("");
          setEmailExists(false);

        }
      });
  }

  return (
    <div>
      <h2>Register</h2>
      {}
      <form action="" onSubmit={(e) => registerUser(e)}>
          {emailExists && (
              <div>Email already exists!</div>
          )}
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">register</button>
      </form>
    </div>
  );
}

export default Register;
