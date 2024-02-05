import { useState } from "react";
import "../SignupPage/SignUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ setToken }) => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email,
          username,
          password,
          newsletter,
        }
      );
      setToken(response.data.token);
      // console.log(response.data);
      navigate("/");
    } catch (error) {}
  };
  return (
    <div className="containersignup">
      <form className="signup" onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <input
          className="userInput"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          className="userInput"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="userInput"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="newsletter">
          <input
            className="check"
            type="checkbox"
            checked={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <p>S'inscrire à notre newsletter</p>
        </div>

        <input className="buttonsign" type="submit" value="S'inscrire" />
        <Link className="logredir" to="/login">
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
